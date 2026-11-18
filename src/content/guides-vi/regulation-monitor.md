# Trình giám sát quy định

Cấu hình kỹ năng này một lần cho quy định bạn quan tâm, sau đó để kỹ năng tự động chạy theo lịch trình và gửi một bảng thông tin (dashboard) mới vào hộp thư đến của bạn.

## Kỹ năng này làm gì

Biến một **hồ sơ theo dõi (watch profile)** đã lưu — gồm chủ đề, khu vực pháp lý, danh sách nguồn, tần suất — thành một lượt rà quét quy định có thể lặp lại. Trong mỗi lần chạy, kỹ năng chỉ truy cập đúng các nguồn bạn đã chốt trong hồ sơ khi thiết lập: những nguồn chính thống hàng đầu do kỹ năng đề xuất cho từng chủ đề, cộng thêm bất kỳ URL khởi đầu (seed URL) nào bạn tự bổ sung. Kỹ năng phân loại từng mục mới (chủ đề, khu vực pháp lý, giai đoạn, ngày tháng), gắn cờ các mục khớp với từ khóa lĩnh vực chuyên môn của nhóm bạn dựa trên một hồ sơ gọn nhẹ lấy từ WorkIQ, và tạo ra một bảng thông tin HTML độc lập.

Đây là một công cụ **giám sát**. Nó báo cáo những gì cơ quan quản lý, cơ quan lập pháp và tòa án đang làm. Nó không bao giờ nộp hồ sơ, tính toán nghĩa vụ pháp lý hay đưa ra ý kiến tư vấn pháp luật.

## Khi nào nên sử dụng

- Bạn muốn nhận bản tổng hợp định kỳ về các thay đổi quy định trong một lĩnh vực xác định (thuế, quyền riêng tư, AI, y tế, ESG, lao động, cạnh tranh hoặc bất kỳ lĩnh vực chuyên ngành nào).
- Bạn đã biết sơ bộ những gì cần theo dõi (chủ đề + khu vực pháp lý) và muốn một lượt rà quét có giới hạn, dự đoán được thay vì tìm kiếm mở mỗi tuần.
- Bạn muốn giữ cùng một cấu trúc hiển thị cho cùng một hồ sơ mỗi tuần để dễ dàng đối chiếu sự thay đổi qua từng tuần.

## Khi nào không nên sử dụng

- Nghiên cứu pháp lý hoặc quy định một lần → hãy dùng một kỹ năng nghiên cứu.
- Đọc một tài liệu đơn lẻ mà bạn đã có sẵn → hãy dùng `docx` / `pptx`.
- Tính toán nghĩa vụ tuân thủ hoặc lập trường khai báo → nằm ngoài phạm vi. Hãy chuyển cho con người xử lý.

## Hướng dẫn thiết lập

Lần đầu tiên bạn gọi kỹ năng cho một quy định mới, kỹ năng sẽ dẫn dắt bạn qua một bước thiết lập tương tác ngắn:

1. **Tên hồ sơ (Profile name)**, ví dụ `pillar-ii`, `eu-ai-act`, `hipaa-sec-2`.
2. **Chủ đề theo dõi (Watch topics)** — từ 2 đến 8 chủ đề, mỗi chủ đề gồm một tên hiển thị và một vài từ khóa mà lượt rà quét sẽ tìm kiếm.
3. **Khu vực pháp lý (Jurisdictions)** — quốc gia, khu vực, lĩnh vực hoặc `global`.
4. **Tần suất (Cadence)** — hằng ngày, hằng tuần (mặc định), hai tuần một lần, hằng tháng.
5. **Cửa sổ thời gian (Window)** — số ngày nhìn lại cho mỗi lần chạy (mặc định khớp với tần suất).
6. **Nơi nhận kết quả (Delivery target)** — email của chính bạn (mặc định), một cuộc trò chuyện Teams, một trang Loop hoặc chỉ hiển thị nội tuyến (inline).

Sau đó, kỹ năng thực hiện một **lượt khám phá (discovery pass)** nhỏ để đề xuất 5 nguồn chính thống hàng đầu cho mỗi chủ đề (trang cơ quan quản lý → công báo chính thức → tổ chức đa phương → trang theo dõi uy tín → thông báo công khai từ các hãng luật/tư vấn). Kỹ năng **dừng lại chờ bạn xác nhận** — bạn có thể thay thế bất kỳ nguồn nào trong 5 nguồn, giảm số lượng mục tiêu hoặc thêm các URL khởi đầu của riêng mình — trước khi bắt đầu mọi hoạt động giám sát.

Sau khi bạn xác nhận, kỹ năng thu thập một hồ sơ tổ chức gọn nhẹ từ WorkIQ (`workiq_get_my_profile`, `workiq_get_my_manager`, `workiq_get_relevant_people`) và đề xuất 5–15 từ khóa thuộc lĩnh vực chuyên môn cho cờ mức độ liên quan với nhóm. Bạn cũng sẽ chỉnh sửa và xác nhận các từ khóa này.

Mọi thứ được ghi vào tệp `config.json` nằm cạnh đầu ra bảng thông tin. Mỗi lần chạy tiếp theo sẽ đọc tệp này và chỉ truy cập danh sách nguồn đã được xác nhận.

## Lập lịch chạy

Bản thân kỹ năng lõi không có lịch chạy riêng — nó chỉ thực thi khi được gọi. Hãy nối kỹ năng này với bộ lập lịch của nền tảng bạn đang dùng:

### Scout

Tạo một tác vụ tự động hóa Scout:

```
name: Regulation Monitor — <profile-name>
schedule: every Monday at 8am
prompt: |
  Run the regulation-monitor skill for profile "<profile-name>".
  Load the profile's config.json, sweep the window since the last run,
  build the dashboard, and email the digest to the user per the
  delivery block. Always send the dashboard, including on quiet weeks —
  topics with no items are reported explicitly as "No significant
  developments this period" and the empty-state view is intentional.
teamsNotify: auto
```

Scout sẽ duy trì chu kỳ lặp lại và gọi kỹ năng.

### Cowork

Tạo một tác vụ Cowork định kỳ với cùng câu lệnh (prompt) ở trên, tên tác vụ là `Regulation Monitor — <profile-name>`, tần suất lặp lại khớp với tần suất của hồ sơ.

### Những điều lịch trình không nên làm

- **Không cấu hình lại hồ sơ từ lịch chạy tự động.** Thiết lập là một bước tương tác. Nếu hồ sơ bị thiếu hoặc lỗi thời, lần chạy theo lịch nên gửi một thông báo ngắn và dừng lại, chứ không tự ý dựng lại một cách âm thầm.
- **Không thêm người nhận email bên ngoài từ lịch chạy tự động.** Người nhận được ủy quyền sẵn chỉ là bạn (người dùng). Mọi người nhận khác đều cần có xác nhận tương tác.
- **Không nối tiếp bộ giám sát vào hành động phía sau (downstream action).** Kỹ năng này chỉ thực hiện giám sát; nó không đưa ra lập trường khai báo hay kích hoạt quy trình xử lý tiếp theo. Hãy giữ cho tác vụ chạy theo lịch chỉ phục vụ một mục đích duy nhất.

## Đầu ra

- **Bảng thông tin (Dashboard)**: `output/regulation-dashboard.html` — các ô KPI, bảng mã màu có thể sắp xếp ở phía máy khách (nhấp vào tiêu đề bất kỳ cột nào để sắp xếp theo ngày, chủ đề, khu vực pháp lý, giai đoạn, tiêu đề hoặc nguồn), huy hiệu liên quan đến nhóm, liên kết nguồn theo từng dòng (đã lọc giao thức URL — chỉ hiển thị `http`/`https`/`mailto`), và mục "Quiet this period" (Ít biến động trong kỳ này) liệt kê mọi chủ đề theo dõi không có mục nào là **"No significant developments this period"** (Không có diễn biến đáng kể nào trong kỳ này).
- **Tệp JSON các mục (Items JSON)**: `working/regulation-items.json` — các mục dữ liệu thô từ lần chạy này.
- **Bản tóm tắt nội tuyến (Inline summary)**: ≤12 dòng — khung thời gian, số lượng mục theo chủ đề, các mục hàng đầu liên quan đến nhóm. Các chủ đề không có biến động được báo cáo rõ ràng, không nhồi nhét thêm nội dung.

## Mẹo sử dụng

- Hãy giữ các chủ đề theo dõi đủ hẹp. Chọn "Pillar Two" (Trụ cột Hai) làm một chủ đề sẽ mang lại cho bạn bản tổng hợp hằng tuần mạch lạc. Chọn "Thuế quốc tế" sẽ mang lại nhiều nhiễu.
- Danh sách cho phép (allowlist) các nguồn uy tín không phụ thuộc lĩnh vực dùng cho tìm kiếm dự phòng nằm tại `references/sources-and-taxonomy.md`. Hãy mở rộng danh sách này thông qua `domain_allowlist_extensions` trong tệp cấu hình nếu lĩnh vực của bạn cần thêm nguồn ngoài danh sách mặc định.
- Điều chỉnh `runtime_budget` trong tệp cấu hình nếu bạn thấy lượt rà quét lấy quá nhiều dữ liệu (giảm `max_items`) hoặc quá ít dữ liệu (tăng `max_fallback_searches`).
