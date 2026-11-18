# Trình khử định danh PHI

Ẩn/xóa **18 nhóm thông tin định danh theo quy chuẩn HIPAA Safe Harbor** khỏi văn bản lâm sàng — ghi chú bệnh án, bản chép lời, thư chuyển tuyến, hồ sơ tiếp nhận — và nhận lại văn bản đã làm sạch cùng một **bản kê kiểm toán (audit manifest)** ghi rõ chính xác những gì đã bị loại bỏ. Được xây dựng cho môi trường sandbox Python bị khóa của agent: **chỉ dùng thư viện chuẩn, không pip, không mạng.**

## Lý do tồn tại

Các agent trong lĩnh vực y tế và khoa học sự sống thường xuyên xử lý PHI — tóm tắt ghi chú lâm sàng, soạn thư chuyển tuyến, chuẩn bị hồ sơ cho phân tích hoặc xây dựng tài liệu giảng dạy — nên *rủi ro* để lọt một thông tin định danh vào hành động hướng ra bên ngoài luôn hiện hữu. Skill này cung cấp cho agent một cách thức **tất định và có thể kiểm toán** để loại bỏ các thông tin định danh *trước khi* nội dung đó rời khỏi ranh giới tin cậy hoặc đi vào một hành động hướng ra bên ngoài (Gửi email, Tạo bản ghi, Xuất dữ liệu).

## Vị trí phù hợp trong luồng xử lý

Hãy hình dung đây là **bước khử định danh mà agent chạy ngay trước khi dữ liệu vượt qua một ranh giới tin cậy** — một rào chắn bảo vệ được gắn thẳng vào luồng xử lý của agent, chứ không phải công cụ để con người gọi thủ công. Nó phát huy giá trị lớn nhất khi được gọi *ngay trước*:

- **Một hành động hướng ra bên ngoài** — Gửi email, Đăng lên Teams/Slack, Tạo/Cập nhật bản ghi trong hệ thống hạ nguồn, hoặc Xuất ra tệp mà agent sắp bàn giao. Làm sạch trước, hành động sau.
- **Một lượt gửi biểu mẫu hoặc phiếu yêu cầu** — đính kèm hồ sơ ca bệnh vào phiếu hỗ trợ, biểu mẫu tiếp nhận nghiên cứu, cơ quan đăng ký hoặc cổng thông tin nhà cung cấp chưa được cấp phép cho PHI thô.
- **Chuyển giao nội dung cho một bước kém tin cậy hơn** — một mô hình khác, một connector của bên thứ ba, một pipeline phân tích hoặc một đích thu thập nhật ký/đo từ xa (telemetry) không được phép nhìn thấy thông tin định danh.
- **Tạo tài liệu có thể chia sẻ** — ca bệnh giảng dạy, tóm tắt hội nghị, dữ liệu minh họa hoặc bộ dữ liệu kiểm thử được tạo từ hồ sơ thực tế.

Một chỉ dẫn tự nhiên cho agent đơn giản là: *"Trước mọi hành động gửi, xuất hoặc chia sẻ nội dung bệnh nhân, hãy chạy nội dung đó qua trình khử định danh PHI và chuyển tiếp bất kỳ mục nào được gắn cờ để con người xem xét."* Người dùng không bao giờ cần phải yêu cầu khử định danh theo tên gọi — agent sẽ coi đó là một phản xạ mặc định.

## Cách hoạt động — mô hình kết hợp có thể giải trình

- **Lõi tất định (hệ thống ghi nhận chuẩn).** Một bộ máy kết hợp regex + từ điển ngoại tuyến sẽ loại bỏ các thông tin định danh có cấu trúc — SSN (có dấu gạch nối, khoảng trắng hoặc có nhãn), MRN, số điện thoại/fax (Mỹ, quốc tế và có nhãn), email, URL, địa chỉ IP, ngày tháng (rút gọn về năm), mã ZIP (cắt còn 3 chữ số), đường/thành phố, số tài khoản, số giấy phép và mã số thiết bị — một cách nhất quán, lặp lại y hệt qua từng lần chạy.
- **Bộ tăng cường độ phủ bằng mô hình.** Với những tên người lạ trong văn xuôi tự do mà regex dễ bỏ sót, agent sẽ truyền vào các tên mà nó phát hiện được; bộ máy vẫn thực hiện ẩn/xóa chúng một cách tất định. Mô hình chỉ có thể *bổ sung* các mục cần ẩn — không thể âm thầm sửa đổi nhật ký kiểm toán.
- **Lớp kiểm tra tích hợp sẵn.** Sau khi ẩn thông tin, công cụ sẽ xác minh rằng các thông tin định danh phát hiện được thực sự đã biến mất khỏi đầu ra, đồng thời liệt kê mọi nội dung cần mắt người kiểm tra lại dưới mục `needs_human_review` — bao gồm bất kỳ chuỗi số từ 7 chữ số trở lên không có nhãn nào trông giống một mã định danh mà công cụ chưa thể neo chắc chắn.

## Kết quả nhận lại

1. **Văn bản đã khử định danh** với các token bí danh nhất quán
   (`[NAME-1]`, `[DATE:1959]`, `[ORG-1]`, `[ZIP:441XX]`).
2. **Bản kê kiểm toán**: số lượng theo từng danh mục, giá trị băm có muối (salted hash) của các giá trị đã xóa, các mục được gắn cờ chờ con người xem xét và phần ghi chú bằng ngôn ngữ thông thường.

Hai tiêu chuẩn được hỗ trợ: **Safe Harbor** (mặc định) và **Limited Data Set** (giữ lại ngày tháng và thành phố/bang/mã ZIP). Dữ liệu đầu vào có cấu trúc (JSON / `Field: value`) được ẩn theo **tên trường** ở chế độ bản ghi; văn xuôi tự do sử dụng lượt rà soát tăng cường phát hiện tên.

## Ví dụ

**Đầu vào:**

```
Patient Maria Gonzalez (MRN 55810342), DOB 04/12/1959, seen 03/03/2025.
Call (216) 555-0147 or maria.g@example.com. Lives at 88 Oak St,
Cleveland, OH 44113. Discussed with Dr. Alan Reyes.
```

**Đầu ra (Safe Harbor):**

```
Patient [NAME-1] (MRN [MRN-1]), DOB [DATE:1959], seen [DATE:2025].
Call [PHONE-1] or [EMAIL-1]. Lives at [STREET-1], [GEO-1], OH [ZIP:441XX].
Discussed with Dr. [NAME-2].
```

Lưu ý các phép biến đổi giúp dữ liệu vẫn giữ được giá trị sử dụng: ngày tháng được thu gọn về **năm**, mã ZIP được cắt chỉ giữ **ba chữ số đầu tiên**, **bang vẫn được giữ lại**, và mỗi thông tin định danh nhận một **token ổn định** để cùng một người luôn ánh xạ về cùng một nhãn trong suốt văn bản. Song song với đó, lượt chạy xuất ra một bản kê kiểm toán (`10 identifiers removed` — NAME ×2, DATE ×2, MRN, PHONE, EMAIL, STREET, GEO, ZIP).

## Giới hạn trung thực

Công cụ này **giảm thiểu rủi ro và đẩy nhanh quá trình rà soát của con người — nó không chứng nhận mức độ tuân thủ và cũng không hoàn hảo.** Không có trình khử định danh tự động nào hoàn hảo: regex và từ điển ngoại tuyến sẽ bỏ sót một cái tên viết sai chính tả, một định dạng mã định danh bất thường hoặc một yếu tố bán định danh (quasi-identifier) chỉ trở thành định danh lại khi đặt trong ngữ cảnh. Tự thân công cụ không đáp ứng điều khoản "không có hiểu biết thực tế" ("no actual knowledge") của Safe Harbor hay thực hiện Thẩm định Chuyên gia (Expert Determination), và nó chỉ xử lý **văn bản thuần túy** (không xử lý hình ảnh, bản quét hay dữ liệu sinh trắc học).

Hãy xem đầu ra như một **bước lọc sơ bộ mạnh mẽ, chứ không phải bản phát hành cuối cùng**. Một nhân sự có chuyên môn bắt buộc phải rà soát lại — đặc biệt là mọi mục nằm dưới `needs_human_review` — trước khi nội dung rời khỏi ranh giới tin cậy.

## Mở rộng công cụ

Bộ máy được thiết kế cố ý nhỏ gọn và dễ chỉnh sửa để bạn có thể tinh chỉnh theo nhóm đối tượng, địa phương và mức độ chấp nhận rủi ro của mình:

- **Mở rộng độ phủ tên riêng** — thêm tên/họ vào `assets/name_lexicon.txt` (mỗi dòng một tên). Đây là thay đổi mang lại hiệu quả cao nhất cho đa số đội ngũ; nó trực tiếp mở rộng phạm vi mà lượt xử lý tất định bắt được mà không cần chạm vào mã nguồn.
- **Mẫu nhận diện định danh mới** — thêm mới hoặc siết chặt các biểu thức regex trong `scripts/deidentify.py` (ví dụ: định dạng mã bệnh nhân nội bộ hoặc số tiếp nhận mẫu xét nghiệm đặc thù của hệ thống EHR bên bạn). Mỗi mẫu đều mang một độ ưu tiên để xử lý chồng chéo một cách dự đoán được.
- **Quy tắc theo tên trường** — với dữ liệu đầu vào có cấu trúc/dạng bản ghi, hãy mở rộng bảng ánh xạ nhãn trường để các khóa JSON riêng của bạn (ví dụ: `subscriberId`, `guarantorName`) được ẩn đúng cách.
- **Các tiêu chuẩn** — chế độ Limited Data Set là điểm khởi đầu; hãy điều chỉnh danh mục nào được giữ lại cho khớp với thỏa thuận sử dụng dữ liệu (data-use agreement) của bạn.
- **Tăng cường độ phủ mạnh hơn (tùy chọn)** — lượt tăng cường phát hiện bằng mô hình chính là nơi bạn có thể gắn thêm một mô hình NER (ví dụ: spaCy) nếu sandbox của bạn cho phép; mã nguồn vốn đã xử lý các tên do mô hình cung cấp theo cơ chế *bổ sung* nên không thể làm sai lệch nhật ký kiểm toán.

Vì lõi tất định là hệ thống ghi nhận chuẩn, mọi phần mở rộng bạn thêm vào vẫn sẽ được lớp kiểm tra tích hợp sẵn xác minh ở mỗi lượt chạy.

## Tệp thành phần

- `SKILL.md` — bản đặc tả giao tiếp với agent và hướng dẫn chạy.
- `scripts/deidentify.py` — bộ máy chạy ngoại tuyến (chỉ dùng stdlib).
- `assets/name_lexicon.txt` — từ điển tên riêng ngoại tuyến được đóng gói sẵn.
- `references/hipaa-safe-harbor.md` — tài liệu tham chiếu các thông tin định danh Safe Harbor.
