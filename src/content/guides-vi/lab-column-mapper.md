# Trình ánh xạ cột xét nghiệm

**Tác giả:** [Rafsan Huseynov](https://www.linkedin.com/in/rafsanhuseynov) — Kiến trúc sư giải pháp AI, Microsoft MVP
**Nền tảng:** Copilot Studio
**Phiên bản:** 1.0.0

Một kỹ năng của Copilot Studio giúp xử lý tình trạng **lệch lược đồ (schema drift)** trong đường ống nạp dữ liệu kết quả xét nghiệm của hệ thống y tế. Khi một tiêu đề cột mới xuất hiện trong nguồn dữ liệu xét nghiệm mà Azure Data Factory chưa biết cách ánh xạ, kỹ năng này sẽ đối khớp theo ngữ nghĩa với lược đồ lâm sàng chuẩn và đề xuất một ánh xạ để người quản trị tin học lâm sàng phê duyệt.

## Lý do ra đời

Một hệ thống y tế khu vực thường nạp kết quả xét nghiệm từ nhiều nguồn bên ngoài: các phòng xét nghiệm tham chiếu quốc gia (LabCorp, Quest, Mayo Clinic Labs), các phòng xét nghiệm thuộc bệnh viện, các phòng xét nghiệm chuyên khoa (giải phẫu bệnh, chẩn đoán phân tử, hệ gen học) và các nhà cung cấp thiết bị xét nghiệm tại điểm chăm sóc. Mỗi phòng xét nghiệm gửi các tệp kết quả (CSV, Excel hoặc văn bản phân tách bằng ký tự) với tiêu đề cột hơi khác nhau cho cùng một khái niệm lâm sàng:

- `patient_mrn` so với `medical_record_number` so với `pat_id` so với `subject_identifier`
- `loinc_code` so với `test_code` so với `analyte_id` so với `assay_code`
- `result_value_numeric` so với `observation_value` so với `numeric_result` so với `qty`
- `collection_datetime` so với `specimen_collected_at` so với `sample_drawn_time`
- `abnormal_flag` so với `interpretation` so với `result_flag` so với `abn_ind`

Bảng trong kho dữ liệu chuẩn chỉ có một tên tiêu chuẩn duy nhất cho mỗi khái niệm, thường gắn với mã **LOINC** cho chính xét nghiệm đó. Khi một phòng xét nghiệm bổ sung bộ xét nghiệm mới, nâng cấp hệ thống thông tin xét nghiệm (LIS) của họ, hoặc khi một phòng xét nghiệm mới được tích hợp vào hệ thống, tệp dữ liệu gửi đến sẽ có những tên cột mà đường ống chưa từng gặp. Azure Data Factory sẽ báo lỗi khi nạp dữ liệu. Nếu không có kỹ năng này, kỹ sư dữ liệu phải đọc tệp thủ công, đoán ánh xạ, cập nhật bảng ánh xạ của ADF rồi chạy lại đường ống — thường gây chậm trễ tới 24 giờ.

Kỹ năng này tự động hóa bước *đề xuất*. Người quản trị tin học lâm sàng vẫn là người phê duyệt trước khi bất kỳ thay đổi nào đi vào SQL.

## Kiến trúc

```
┌──────────────────────┐        ┌───────────────────────┐        ┌──────────────────────┐
│ Tệp xét nghiệm đến   │───────▶│ Azure Data Factory    │───────▶│ Kho dữ liệu lâm sàng │
│ (CSV / Excel)        │        │ đường ống nạp dữ liệu │        │ SQL                  │
└──────────────────────┘        └───────────┬───────────┘        └──────────────────────┘
                                            │
                                            │ (khi gặp cột lạ)
                                            ▼
                                ┌───────────────────────┐
                                │ Luồng Power Automate  │
                                │ (xử lý lỗi)           │
                                └───────────┬───────────┘
                                            │
                                            ▼
                                ┌───────────────────────┐        ┌──────────────────────┐
                                │ Agent Copilot Studio  │───────▶│ Azure AI Search      │
                                │ (kỹ năng này)         │◀───────│ chỉ mục lược đồ      │
                                └───────────┬───────────┘        │ chuẩn                │
                                            │                    └──────────────────────┘
                                            │ (ghi đề xuất)
                                            ▼
                                ┌───────────────────────┐        ┌──────────────────────────┐
                                │ Hàng đợi xem xét      │◀──────▶│ Người quản trị tin học   │
                                │ trên Dataverse        │        │ lâm sàng (qua ứng dụng   │
                                │                       │        │ hướng mô hình)           │
                                └───────────┬───────────┘        └──────────────────────────┘
                                            │ (khi phê duyệt)
                                            ▼
                                ┌───────────────────────┐
                                │ Bảng ánh xạ cột SQL   │
                                └───────────┬───────────┘
                                            │
                                            │ (lập lại chỉ mục hằng tuần)
                                            ▼
                                ┌───────────────────────┐
                                │ Chỉ mục Azure AI      │
                                │ Search được làm mới   │
                                │ với lịch sử ánh xạ mới│
                                └───────────────────────┘
```

Vòng lặp hoạt động là: **Đề xuất → Xem xét → Áp dụng → Học hỏi.** Việc lập lại chỉ mục hằng tuần là yếu tố giúp hệ thống thông minh hơn theo thời gian — các ánh xạ đã phê duyệt trở thành một phần của kho dữ liệu tìm kiếm, nhờ vậy cùng một cột sẽ không bao giờ phải đề xuất lại lần thứ hai.

## Những thành phần người tạo giải pháp cần xây dựng

Kỹ năng này đóng vai trò là **trí tuệ xử lý khi chạy (runtime intelligence)**. Người tạo giải pháp sẽ cung cấp hạ tầng xung quanh. Dưới đây là yêu cầu cho từng thành phần.

### 1. Chỉ mục Azure AI Search — `lab-canonical-schema`

Tạo một chỉ mục tìm kiếm mô tả mọi cột trong kho dữ liệu lâm sàng chuẩn của bạn. Các trường được khuyến nghị:

| Trường | Kiểu dữ liệu | Có thể tìm kiếm | Có thể lọc | Có thể phân nhóm (Facetable) | Mục đích |
|---|---|---|---|---|---|
| `canonical_column_name` | Edm.String | Có | Có | Không | Cột đích trong SQL (ví dụ: `patient_mrn`). |
| `column_description` | Edm.String | Có | Không | Không | Mô tả dễ hiểu về ý nghĩa của cột. **Đây là tín hiệu đối khớp mạnh nhất.** |
| `data_type` | Edm.String | Không | Có | Có | Kiểu dữ liệu SQL (`nvarchar`, `datetime2`, `decimal`, v.v.). Dùng để loại bỏ các ánh xạ không tương thích. |
| `clinical_domain` | Edm.String | Không | Có | Có | Một trong các giá trị `lab-observations`, `orders`, `specimens`, `results`. |
| `loinc_code` | Edm.String | Có | Có | Không | Mã LOINC, nếu có. |
| `synonyms` | Collection(Edm.String) | Có | Không | Không | Các tên gọi khác đã biết (bổ sung dần theo thời gian khi các ánh xạ được phê duyệt). |
| `previously_mapped_from_labs` | Collection(Edm.String) | Không | Có | Có | Các mã phòng xét nghiệm đã từng ánh xạ vào cột này trong lịch sử. Giúp tăng điểm ưu tiên cho các trường hợp khớp từ cùng phòng xét nghiệm. |
| `example_source_names` | Collection(Edm.String) | Có | Không | Không | Các tên nguồn thực tế đã được ánh xạ vào đây (ví dụ: `PT_MRN`, `patient_number`, `mrn`). |

Bật tính năng **xếp hạng ngữ nghĩa (semantic ranking)** trên chỉ mục và tạo một cấu hình ngữ nghĩa (semantic configuration) có tên `column-descriptions` ưu tiên các trường `column_description` và `example_source_names` cho bước xếp hạng lại (reranking).

Các bước truy xuất trong SKILL.md mặc định sử dụng các tên trường và tên cấu hình này. Nếu bạn đổi tên chúng, hãy cập nhật SKILL.md tương ứng.

### 2. Bảng Dataverse — `lab_column_mapping_suggestions`

Tạo một bảng Dataverse để lưu giữ các đề xuất đang chờ người quản trị xem xét. Các cột được khuyến nghị:

| Cột | Kiểu dữ liệu | Ghi chú |
|---|---|---|
| `suggestion_id` | GUID (khóa chính) | Do kỹ năng tự tạo. |
| `pipeline_run_id` | Văn bản (Text) | ID lần chạy ADF để truy vết. |
| `source_column_name` | Văn bản (Text) | Tiêu đề cột chưa được nhận diện. |
| `source_lab_id` | Tra cứu (Lookup) hoặc Văn bản (Text) | Tham chiếu đến phòng xét nghiệm gửi dữ liệu. |
| `source_lab_name` | Văn bản (Text) | Phi chuẩn hóa (denormalized) để dễ đọc. |
| `source_file_name` | Văn bản (Text) | Tệp gặp lỗi. |
| `suggested_destination_column` | Văn bản (Text) | Cột đích chuẩn (có thể để trống/null). |
| `suggested_destination_loinc` | Văn bản (Text) | Mã LOINC, nếu có. |
| `confidence` | Lựa chọn (Choice) | `high`, `medium`, `low`, `no_confident_match`. |
| `confidence_score` | Số thập phân (Decimal) | Từ 0.0 đến 1.0. |
| `reasoning` | Văn bản nhiều dòng (Multiline text) | Lý do kỹ năng chọn phương án này. |
| `alternatives` | Văn bản nhiều dòng (JSON) | Các phương án ứng viên tiếp theo. |
| `status` | Lựa chọn (Choice) | `pending_review`, `approved`, `rejected`, `search_unavailable`. |
| `steward_notes` | Văn bản nhiều dòng (Multiline text) | Ghi chú tùy chọn từ người xem xét. |
| `approved_by` | Tra cứu (Lookup - Người dùng) | Người phê duyệt. |
| `approved_at` | Ngày giờ (DateTime) | Thời điểm phê duyệt. |

Xây dựng một **Power App hướng mô hình (model-driven Power App)** nhỏ trên bảng này với một chế độ xem (view) cho các mục `pending_review` và một biểu mẫu (form) cho phép người quản trị phê duyệt, từ chối hoặc ghi đè đề xuất.

### 3. Luồng Power Automate — xử lý lỗi

Tạo một luồng Power Automate được kích hoạt bởi thông báo lỗi từ ADF (qua HTTP webhook, cảnh báo Azure Monitor hoặc trình kết nối Azure Data Factory).

Luồng này thực hiện các bước:

1. Phân tích thông báo lỗi của ADF để trích xuất tên cột nguồn, phòng xét nghiệm gửi dữ liệu, tên tệp và ID lần chạy đường ống.
2. Ẩn danh hóa các giá trị mẫu nếu có (xem lưu ý về an toàn dữ liệu PHI bên dưới).
3. Gọi agent Copilot Studio bằng [trình kết nối Copilot Studio](https://learn.microsoft.com/connectors/copilotstudio/) với payload được định nghĩa trong SKILL.md.
4. Khi được phê duyệt sau đó (một luồng riêng được kích hoạt bởi trạng thái `approved` trong Dataverse), ghi ánh xạ mới vào bảng ánh xạ cột SQL để lần chạy ADF tiếp theo sử dụng.

### 4. Bảng ánh xạ cột SQL

Một bảng đơn giản được đường ống ADF đọc vào đầu mỗi lần chạy để biết cách ánh xạ các cột đầu vào.

```sql
CREATE TABLE lab_column_mappings (
    mapping_id            uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
    lab_id                nvarchar(64)     NOT NULL,
    source_column_name    nvarchar(256)    NOT NULL,
    destination_column    nvarchar(256)    NOT NULL,
    clinical_domain       nvarchar(64)     NOT NULL,
    approved_by           nvarchar(256)    NOT NULL,
    approved_at           datetime2        NOT NULL,
    dataverse_suggestion_id uniqueidentifier NULL
);

CREATE UNIQUE INDEX ix_lab_source
    ON lab_column_mappings (lab_id, source_column_name);
```

### 5. Lập lại chỉ mục Azure AI Search hằng tuần

Lập lịch cho một Azure Function hoặc đường ống Data Factory chạy hằng tuần. Tác vụ này đọc các ánh xạ đã được phê duyệt từ SQL, cập nhật các trường `previously_mapped_from_labs`, `synonyms` và `example_source_names` trên các tài liệu chuẩn tương ứng trong chỉ mục tìm kiếm, rồi đẩy chúng trở lại bằng thao tác cập nhật từng phần (partial update).

## An toàn dữ liệu PHI

**Kỹ năng này ánh xạ siêu dữ liệu lược đồ, không xử lý dữ liệu bệnh nhân.** Nó nhận tên cột nguồn, các giá trị mẫu (vốn phải được bên gọi ẩn danh hóa trước), mã định danh phòng xét nghiệm và tên tệp. Logic của kỹ năng không bao giờ đụng tới dữ liệu PHI.

Tuy nhiên, khi bạn triển khai đường ống xung quanh, các biện pháp bảo vệ dữ liệu y tế tiêu chuẩn vẫn được áp dụng:

- Luồng Power Automate **bắt buộc** phải ẩn danh hóa hoặc băm (hash) các giá trị mẫu trước khi đưa vào payload gửi cho agent. Tuyệt đối tránh kiểu làm "cứ gửi thô 5 dòng đầu tiên" — vì điều đó sẽ đưa dữ liệu PHI vào nhật ký hội thoại chat.
- Bật **mã hóa dữ liệu lưu trữ (encryption at rest)** trên Dataverse, SQL và chỉ mục Azure AI Search.
- Sử dụng **điểm cuối riêng tư (private endpoints)** cho Azure AI Search và SQL nếu mức phân loại dữ liệu của hệ thống y tế yêu cầu.
- Bật các chính sách DLP của Microsoft **Purview** trên môi trường Copilot Studio.
- Ghi nhật ký mọi đề xuất và quyết định phê duyệt — đây là dấu vết kiểm toán mà các cán bộ tuân thủ HIPAA sẽ yêu cầu.

## Thiết lập Copilot Studio

1. Tạo một agent mới trong Copilot Studio (trải nghiệm mới).
2. Bật tính năng **tải tệp lên (file uploads)** và thêm các trình kết nối Dataverse và Azure AI Search.
3. Tải kỹ năng này lên dưới dạng tệp ZIP: `Build → Skills → Add skill → Upload a skill`.
4. Thêm một **công cụ (tool)** cho `Search documents in Azure AI Search` trỏ tới chỉ mục `lab-canonical-schema`.
5. Thêm một **công cụ (tool)** cho `Create a new row in Dataverse` trỏ tới bảng `lab_column_mapping_suggestions`.
6. Thêm một **công cụ (tool)** để gọi agent Copilot Studio từ Power Automate (nhờ đó luồng có thể gọi agent).
7. Trong phần cài đặt của agent, bật **điều phối tạo sinh (generative orchestration)** để các điều kiện kích hoạt của kỹ năng hoạt động chính xác.

## Cấp phép

**Mức tiêu thụ Copilot Studio — Copilot Credits.** Tính từ ngày 1 tháng 9 năm 2025, các agent Copilot Studio tiêu thụ **Copilot Credits** (đơn vị kế nhiệm cho "messages" — tin nhắn). Credits đến từ một trong ba cấu hình sau:

- **Chỉ dùng gói dung lượng trả trước** — các gói đăng ký dung lượng Copilot Studio cung cấp 25.000 credits mỗi gói mỗi tháng. Khi hết credits, agent sẽ không khả dụng cho đến kỳ đặt lại hằng tháng tiếp theo.
- **Chỉ trả theo mức sử dụng (Pay-as-you-go)** — liên kết một môi trường Power Platform với gói thanh toán thuộc đăng ký Azure; mỗi credit được tính phí qua Azure. Không cần cam kết trả trước.
- **Trả trước + trả theo mức sử dụng (khuyên dùng)** — credits trả trước được tiêu thụ trước, và phần vượt mức sẽ tự động chuyển sang trả theo mức sử dụng để không bị gián đoạn dịch vụ. Đây là cấu hình tiêu chuẩn cho doanh nghiệp.

Ước tính mức tiêu thụ credit dự kiến bằng [công cụ ước tính mức sử dụng agent Copilot Studio](https://microsoft.github.io/copilot-studio-estimator/) trước khi chọn quy mô gói.

**Xuất bản agent** — người dùng thực hiện xuất bản phải có một trong các giấy phép sau:
- Giấy phép Microsoft 365 Copilot, hoặc
- Giấy phép Copilot Studio User kèm credits được phân bổ cho môi trường (hoặc đã bật tùy chọn "Draw from tenant pool" — lấy từ nguồn chung của tenant).

**Các thành phần khác trong kiến trúc:**
- **Azure AI Search** — gói Standard S1 trở lên. Bộ xếp hạng ngữ nghĩa (semantic ranker, được kỹ năng này sử dụng) yêu cầu gói S1+ và có mức giá đo lường riêng cho các yêu cầu xếp hạng lại (reranking).
- **Dataverse** — bảng `lab_column_mapping_suggestions` tiêu thụ dung lượng lưu trữ tiêu chuẩn của Dataverse, thường đã được bao gồm trong giấy phép Power Platform ở mức dung lượng thấp.
- **Power Automate** — các trình kết nối Dataverse và Copilot Studio dùng trong luồng xử lý lỗi là trình kết nối tiêu chuẩn. Trình kết nối SQL Server là trình kết nối cao cấp (premium) và yêu cầu giấy phép Power Automate Premium hoặc giấy phép theo luồng (per-flow).
- **Azure Data Factory** — áp dụng mức tiêu thụ đường ống ADF tiêu chuẩn cho đường ống nạp dữ liệu đầu nguồn mà kỹ năng này hỗ trợ.

Để biết thông tin mới nhất và đầy đủ nhất về thanh toán và giá cả, hãy xem [Hướng dẫn cấp phép Microsoft Copilot Studio](https://go.microsoft.com/fwlink/?linkid=2320995) và [Hướng dẫn về Copilot Credit](https://go.microsoft.com/fwlink/?linkid=2368800).

## Kiểm thử ngoại tuyến

Tệp trợ giúp `scripts/rank_column_matches.py` cho phép bạn kiểm thử logic xếp hạng dựa trên tệp JSON lược đồ chuẩn mà không cần kết nối với Azure AI Search. Điều này rất hữu ích khi bạn mới bắt đầu định nghĩa phần mô tả cột chuẩn và muốn xem mức độ đối khớp ngữ nghĩa hoạt động tốt ra sao với các tên cột nguồn phổ biến.

```bash
python scripts/rank_column_matches.py \
    --source-column "PT_MRN" \
    --source-samples "MRN-hash-abc,MRN-hash-def" \
    --canonical-schema canonical_schema.json \
    --lab-id LAB-QUEST-001
```

Lệnh này sẽ in ra danh sách xếp hạng các cột đích ứng viên kèm điểm tương đồng, khớp với những gì agent sẽ nhận về từ Azure AI Search. Hãy tinh chỉnh lặp đi lặp lại các trường `column_description` cho đến khi kết quả khớp hàng đầu đối với các đầu vào phổ biến ổn định, sau đó đẩy những mô tả đó lên chỉ mục thực tế.

## Các hạn chế đã biết

- Kỹ năng này chỉ giả định ánh xạ ở cấp độ cột. Các phép biến đổi liên cột (ví dụ: "nối `first_name` + `last_name` thành `patient_full_name`") đòi hỏi một mô hình thiết kế riêng.
- Mã LOINC là điểm neo từ vựng chính. Các cột kết quả không có mã LOINC tương đương (các cột quy trình như `report_status`) chỉ dựa vào việc đối khớp mô tả.
- Chất lượng đề xuất phụ thuộc rất lớn vào chất lượng của trường `column_description` trong chỉ mục. Hãy đầu tư viết mô tả theo cách một bác sĩ lâm sàng diễn đạt về trường dữ liệu đó, thay vì theo cách của một DBA.
- Cơ chế dự phòng `search_unavailable` chỉ giúp phát hiện và đưa sự cố ra hàng đợi chứ không tự động thử lại sau đó. Việc xây dựng một luồng riêng để thử lại các đề xuất bị gián đoạn được để cho người tạo giải pháp tự triển khai.

## Lời cảm ơn

Thiết kế kỹ năng, kiến trúc và các mẫu thiết kế miền nghiệp vụ do Rafsan Huseynov thực hiện. Việc soạn thảo tài liệu, cấu trúc SKILL.md và công cụ hỗ trợ xếp hạng ngoại tuyến được chuẩn bị với sự cộng tác cùng Claude (Anthropic), tuân theo mẫu nộp bài dạng mô-đun do nhóm đánh giá CAT Agent Skills thiết lập.
