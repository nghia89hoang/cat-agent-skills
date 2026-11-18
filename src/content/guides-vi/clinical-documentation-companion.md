# Trợ lý Tài liệu Lâm sàng

Dành cho bác sĩ lâm sàng và đội ngũ chăm sóc y tế để chuyển đổi ghi chú thăm khám đã ký thành các tài liệu tiếp theo sau buổi khám.

Công cụ soạn thảo thư chuyển tuyến, tóm tắt sau buổi khám (after-visit summary) và bản bàn giao giữa các bác sĩ lâm sàng, xây dựng cơ sở giải trình mã hóa (coding rationale) cho các mã đã có trên hồ sơ yêu cầu thanh toán (claim) và kiểm tra các tiêu chí chất lượng, mỗi mục đều được trích dẫn tới một dòng cụ thể trong ghi chú.

Nguyên tắc thiết kế cốt lõi là ưu tiên bằng chứng hơn tính đầy đủ hình thức: một tiêu chí chỉ được tính là đạt, và một mã chỉ được coi là có căn cứ, khi ghi chú thực sự có thông tin đó.

## Thành phần bao gồm

1. **note-context** đọc ghi chú khám bệnh đã ký thành các dữ kiện lâm sàng có cấu trúc kèm trích dẫn, và dừng xử lý nếu ghi chú chưa được ký.
2. **document-derive** soạn thảo thư chuyển tuyến, bản tóm tắt sau buổi khám và bản cập nhật kế hoạch chăm sóc, mỗi tài liệu đều có trích dẫn và được đánh dấu là bản nháp.
3. **coding-rationale** tập hợp tài liệu chứng minh đằng sau mã mức độ thăm khám và mã chẩn đoán đã có trên hồ sơ yêu cầu thanh toán, đồng thời gắn cờ mọi điểm không được ghi chú chứng minh.
4. **quality-gap-check** chấm điểm ca khám dựa trên các tiêu chí chất lượng đã cấu hình của bạn chỉ từ các dữ kiện có ghi nhận trong hồ sơ.
5. **handoff-draft** soạn thảo bản bàn giao cho bác sĩ lâm sàng kèm danh sách mọi khoảng trống còn mở và các thành phần trên hồ sơ thanh toán chưa có căn cứ.

## Trước khi bắt đầu

Ghi chú khám bệnh đã ký, danh sách vấn đề sức khỏe và thuốc điều trị, y lệnh và kết quả xét nghiệm, tệp xuất hồ sơ yêu cầu thanh toán (claim export) và định nghĩa các tiêu chí chất lượng của bạn.

Các connector gợi ý: Salesforce, Box, Oracle Database, Snowflake, Azure Databricks và Adobe PDF Services.

Mỗi skill đều có thư mục `config/` chứa các thiết lập được đánh dấu `[TO CONFIGURE]`. Hãy điền các giá trị này cho tổ chức của bạn; cho đến khi bạn hoàn tất, các skill sẽ báo cáo mục đó là chưa được định tuyến thay vì tự suy đoán.

- `quality-measures.json`: các tiêu chí chất lượng bạn theo dõi và nội dung nào dùng để chứng minh chúng.
- `escalation-policy.json`: người tiếp nhận xử lý các câu hỏi về tuân thủ mã hóa và chất lượng.

## Dùng thử

- **Soạn thư chuyển tuyến và bản tóm tắt sau buổi khám:** "Hãy soạn thư chuyển tuyến và bản tóm tắt sau buổi khám từ ghi chú đã ký [note id] trong [folder]."
- **Kiểm tra tiêu chí chất lượng:** "Những tiêu chí chất lượng nào vẫn còn mở cho lần khám trong ghi chú [note id]? Yêu cầu trạng thái tiêu chí nằm trong [file]."
- **Chứng minh các mã trên hồ sơ thanh toán:** "Hãy chỉ ra phần tài liệu chứng minh đằng sau các mã trên hồ sơ yêu cầu thanh toán cho ghi chú [note id] và gắn cờ bất kỳ điểm nào ghi chú không hỗ trợ. Tệp xuất hồ sơ thanh toán là [file]."

## Giới hạn

Các bản nháp và lập luận giải trình dùng để bác sĩ lâm sàng rà soát. Công cụ không bao giờ đánh dấu một tiêu chí là đạt khi thiếu tài liệu chứng minh, không bao giờ tự thay đổi hay nâng bậc mã và không bao giờ tự động gửi bất cứ thứ gì.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán lâm sàng và chuyên môn. Hãy sử dụng dữ liệu giả lập hoặc dữ liệu đã khử định danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
