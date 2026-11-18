# Nhắc nhở có điều kiện trong cuộc trò chuyện

Lên lịch nhắn tin theo dõi công việc trên Teams mà không gửi đi những lời nhắc nhở thừa thãi. Kỹ năng dành cho Scout này ghi lại những gì hiện đã biết trong một cuộc trò chuyện, tạo một tác vụ tự động hóa dùng một lần, và kiểm tra xem có cập nhật nào có ý nghĩa hay không ngay trước thời điểm đến hạn nhắc nhở.

Ví dụ:

> Vào 3 giờ chiều thứ Năm, nhắc Alex trong cuộc trò chuyện Project North về ngày ra mắt đã điều chỉnh, nhưng chỉ gửi nếu đến lúc đó Alex chưa đăng bất kỳ cập nhật nào.

## Cách hoạt động

Khi yêu cầu được đưa ra, Scout xác định chính xác cuộc trò chuyện và ghi lại một mốc cơ sở cố định: tin nhắn mới nhất, trạng thái hiện tại của chủ đề, người dự kiến sẽ cập nhật, nội dung lời nhắc và thời gian được yêu cầu. Đến thời điểm đã lên lịch, tác vụ tự động hóa sẽ:

1. Đọc các tin nhắn được đăng sau mốc cơ sở đó.
2. Tìm kiếm một thay đổi trạng thái có liên quan từ người được nêu tên.
3. Kiểm tra lại cuộc trò chuyện lần thứ hai ngay trước khi hành động.
4. Hủy gửi lời nhắc và thông báo cho bạn nếu đã có cập nhật.
5. Nếu chưa, đăng lời nhắc đã thống nhất đúng một lần.

Một cập nhật hợp lệ có thể là báo cáo hoàn thành, tiến độ công việc, điểm nghẽn (blocker), sự chậm trễ, mốc ngày mới, một quyết định hoặc sản phẩm bàn giao được yêu cầu. Các câu tán gẫu không liên quan, biểu tượng cảm xúc phản hồi (reaction), lời chào hỏi và những câu xác nhận chung chung sẽ không được tính.

## Cơ chế an toàn

- Tác vụ tự động hóa nhắm tới một ID cuộc trò chuyện đã được phân giải chính xác, chứ không chỉ dựa vào tên hiển thị vốn có thể gây nhầm lẫn.
- Các tin nhắn đã tồn tại từ lúc đưa ra yêu cầu chỉ đóng vai trò ngữ cảnh, không phải bằng chứng cho một cập nhật phát sinh sau đó.
- Nếu Scout không thể đọc toàn bộ khoảng thời gian cần kiểm tra, không thể xác định tác giả một cách đáng tin cậy hoặc không thể xác nhận việc gửi tin nhắn đã thành công hay chưa, hệ thống sẽ không đăng tin. Thay vào đó, hệ thống sẽ thông báo cho bạn.
- Nội dung trò chuyện được xử lý như dữ liệu thuần túy, vì vậy các chỉ thị được nhúng bên trong tin nhắn không thể điều hướng sai tác vụ tự động hóa.
- Lời nhắc chỉ chạy một lần và sử dụng đúng nguyên văn nội dung đã được phê duyệt khi khởi tạo.

## Yêu cầu

Được xây dựng cho **Scout** với quyền truy cập các công cụ tự động hóa của Scout và Microsoft Teams thông qua Work IQ.
