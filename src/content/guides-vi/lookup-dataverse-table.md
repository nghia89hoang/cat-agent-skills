# Tra cứu bảng Dataverse

Một kỹ năng của Copilot Studio giúp tìm kiếm bất kỳ bảng Microsoft Dataverse nào,
duyệt qua các bản ghi khớp kết quả và xem sâu toàn bộ chi tiết bản ghi — tất cả
đều được lấy dữ liệu **trực tiếp** thông qua Dataverse MCP Server.

## Khởi nguồn

Một agent hội thoại rất giỏi trong việc trao đổi thông tin, nhưng khi cần đưa ra
một lựa chọn cụ thể và chính xác, người dùng cần một danh sách tùy chọn có tính
xác thực để chọn lựa. Danh sách đó phải đến từ hệ thống lưu trữ gốc (system of record).

Kỹ năng này bọc một quy trình tra cứu có kỷ luật và nhận biết lược đồ (schema-aware)
quanh Dataverse MCP Server để agent cung cấp thao tác tra cứu đơn giản và đáng
tin cậy: xác định bảng, khám phá lược đồ của bảng (tên chính + các trường khóa),
truy vấn các bản ghi phù hợp, rồi đi sâu vào bản ghi được chọn. Các mã GUID và
định danh nội bộ luôn được ẩn đi, số lượng kết quả được giới hạn và agent sẽ
nhắc bạn thu hẹp phạm vi tìm kiếm thay vì âm thầm phân trang. Kỹ năng cũng ghi
nhớ tập trường ưu tiên của bạn qua nhiều cuộc hội thoại.

## Kỹ năng này làm gì

- **Tìm kiếm** bất kỳ bảng Dataverse nào theo tên, từ khóa, trạng thái, khoảng ngày
  hoặc bản ghi liên quan.
- **Duyệt** các kết quả khớp dưới dạng danh sách đánh số gọn gàng (hoặc bảng có cột
  số thứ tự ở đầu) hiển thị tên bản ghi + mã định danh chính.
- **Xem chi tiết** các trường hữu ích nhất của bản ghi được chọn, lược bỏ các trường trống.
- **Ghi nhớ** các trường ưu tiên để giao diện chi tiết phù hợp với cách bạn thích làm việc.

## Vì sao lại dùng danh sách đánh số?

Kiểu trình bày danh sách đánh số không chỉ là lựa chọn về phong cách — đó là một
quyết định thiết kế có chủ đích. Trong **trải nghiệm Copilot Studio mới**, các
thành phần giao diện phong phú hơn thường dùng trong các agent cổ điển/tiêu chuẩn
hiện chưa khả dụng:

- **Hành động gợi ý (Suggested actions)** không được hỗ trợ.
- **Adaptive cards** không được hỗ trợ.
- **Thực thể tùy chỉnh (Custom entities)** không được hỗ trợ.

Với những ràng buộc đó, một danh sách đánh số thuần túy là cách đơn giản và hiệu quả
để trình bày các tùy chọn cho người dùng: nó hiển thị ổn định dưới dạng văn bản,
không cần thành phần giao diện đặc biệt nào và cho phép người dùng chọn nhanh một
tùy chọn bằng cách trả lời bằng một con số.

## Nguyên tắc kiểm soát (Guardrails)

Chỉ sử dụng dữ liệu trực tiếp — tuyệt đối không tự bịa đặt. Không để lộ GUID thô,
cú pháp truy vấn hoặc dữ liệu tải (payload) của công cụ tới người dùng. Khi không
có kết quả phù hợp, kỹ năng sẽ thông báo rõ và gợi ý các phương án thay thế thay
vì phỏng đoán.

## Yêu cầu

Chạy trong **Copilot Studio** đã kết nối sẵn công cụ **Dataverse MCP Server**.
