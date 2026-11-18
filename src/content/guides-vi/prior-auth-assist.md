# Bộ hồ sơ Chấp thuận trước (Prior Authorization)

Dành cho nhân viên quản lý sử dụng dịch vụ y tế (utilization management) và xét duyệt chấp thuận trước (prior authorization) khi chuẩn bị yêu cầu trước lúc gửi tới bên chi trả.

Công cụ tìm kiếm chính sách chi trả điều chỉnh dịch vụ được chỉ định, đối chiếu hồ sơ bệnh án theo từng tiêu chí, trích dẫn các ghi chú đáp ứng tiêu chí đó, soạn thảo phần giải trình tính cần thiết về mặt y khoa (medical necessity) và liệt kê những gì vẫn còn thiếu.

Nguyên tắc thiết kế cốt lõi là ưu tiên một bộ hồ sơ đầy đủ, có trích dẫn hơn là tốc độ: một yêu cầu gửi đi với thông tin còn thiếu sẽ quay trở lại dưới dạng thư từ chối.

## Thành phần bao gồm

1. **policy-ingest** tìm kiếm chính sách chi trả của bên chi trả điều chỉnh dịch vụ được chỉ định và ghi nhận điều khoản tương ứng.
2. **criteria-extract** kiểm tra yêu cầu đối chiếu từng điều khoản trong chính sách đó và báo cáo tiêu chí nào đã đạt, tiêu chí nào vẫn còn bỏ ngỏ.
3. **evidence-match** tìm kiếm các ghi chú bệnh án, ngày tháng và trích dẫn nguyên văn chứng minh cho từng tiêu chí.
4. **necessity-draft** viết phần giải trình tính cần thiết về mặt y khoa chỉ dựa trên các tiêu chí đã đạt và có trích dẫn.
5. **gap-report** liệt kê mọi bằng chứng vẫn còn thiếu và trình bày bộ hồ sơ dưới dạng bản nháp để rà soát.

## Trước khi bắt đầu

Y lệnh, ghi chú lâm sàng, báo cáo chẩn đoán hình ảnh và giải phẫu bệnh, kết quả xét nghiệm, lịch sử chấp thuận trước cùng thư viện chính sách y khoa của bên chi trả.

Các connector gợi ý: X12, Salesforce, Box, Oracle Database, Snowflake, ServiceNow và Adobe PDF Services.

Mỗi skill đều có thư mục `config/` chứa các thiết lập được đánh dấu `[TO CONFIGURE]`. Hãy điền các giá trị này cho tổ chức của bạn; cho đến khi bạn hoàn tất, các skill sẽ báo cáo mục đó là chưa được định tuyến thay vì tự suy đoán.

- `payer-policy-library.json`: các chính sách chi trả của bên chi trả cùng tiêu chí đi kèm.
- `escalation-contacts.json`: đầu mối tiếp nhận khi cần chuyển xử lý các câu hỏi về lâm sàng, bên chi trả và tuân thủ.

## Dùng thử

- **Kiểm tra tiêu chí của bên chi trả:** "Bệnh nhân trên y lệnh [order id] có đủ điều kiện sử dụng [service] theo chính sách chi trả của [payer] không? Y lệnh và ghi chú bệnh án nằm trong [folder]."
- **Xây dựng bộ hồ sơ chấp thuận trước:** "Hãy lập bộ hồ sơ chấp thuận trước cho [service] trên y lệnh [order id] và viết phần giải trình tính cần thiết về mặt y khoa từ các ghi chú bệnh án trong [folder]."
- **Tìm các nội dung còn thiếu:** "Hồ sơ chấp thuận trước cho y lệnh [order id] vẫn còn thiếu những gì trước khi gửi tới [payer]?"

## Giới hạn

Các bộ hồ sơ nháp và báo cáo khoảng trống thông tin dùng để con người rà soát. Công cụ không bao giờ tự phê duyệt, từ chối hay gửi yêu cầu chấp thuận trước.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán lâm sàng và chuyên môn. Hãy sử dụng dữ liệu giả lập hoặc dữ liệu đã khử định danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
