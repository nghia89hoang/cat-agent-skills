# Pattern Radar

Hai trong số những câu hỏi mang lại đòn bẩy giá trị cao nhất mà một nhân sự tri thức bận rộn có thể đặt ra là *"tôi
nên viết về điều gì?"* và *"tôi có thể tự động hóa việc gì?"* — và câu trả lời
thường nằm ngay trước mắt, trong chính những công việc bạn đã làm trong tuần này.

Pattern Radar rà quét các **tín hiệu Microsoft 365** gần đây của bạn — hộp thư đến (Inbox) và thư đã gửi (Sent mail),
các cuộc trò chuyện và kênh đang hoạt động, cùng tiêu đề lịch hẹn — rồi làm nổi bật những **mô thức
lặp lại** đáng để chuyển hóa thành đòn bẩy công việc:

- **Ứng viên bài viết blog** — những chủ đề bạn liên tục phải giải thích lặp đi lặp lại cho nhiều người khác nhau.
- **Ứng viên tự động hóa** — những tác vụ nhiều bước bạn vẫn phải thực hiện thủ công hết lần này đến lần khác.

Kỹ năng này hoàn toàn **chỉ đọc** và đề cao quyền riêng tư: nó không bao giờ gửi bất cứ thứ gì và không bao giờ nêu tên
khách hàng hay cá nhân nào trong kết quả đầu ra.

> Bạn muốn tính năng này tự chạy theo lịch trình? Có một tác vụ tự động hóa đồng hành tên là **Pattern Radar
> (Scheduled)** sẽ tự động đăng bản tóm tắt tương tự lên Teams hai lần mỗi tuần.

## Trước khi bắt đầu

- **Một tài khoản Microsoft 365 đã kết nối** — kỹ năng đọc tiêu đề email, tin nhắn trò chuyện/
  kênh và tiêu đề sự kiện lịch thông qua các công cụ dạng `m365_*` của agent.
- Tên công cụ có thể khác nhau tùy môi trường lưu trữ; kỹ năng mô tả theo năng lực chứ không cố định theo
  tên công cụ của riêng một nhà cung cấp nào.

## Cách sử dụng

Ví dụ, bạn có thể hỏi:

- *"/pattern-radar"*
- *"Tuần này tôi nên viết về điều gì?"*
- *"Hãy tìm những việc tôi có thể tự động hóa từ công việc gần đây của mình."*

Kỹ năng rà soát lại **7 ngày gần nhất**, phân cụm các tín hiệu của bạn và trả về **0–3
ứng viên**. Mỗi ứng viên nêu rõ chủ đề, bằng chứng đã được ẩn danh, loại
cơ hội (viết blog hay tự động hóa) và một dòng lý giải ngắn gọn (đối với tự động hóa là
trình kích hoạt và hành động thực hiện).

## Điều cần biết

- **Ngưỡng lọc khắt khe.** Một mô thức chỉ được tính nếu xuất hiện **≥3 lần trên
  ≥2 người/cuộc trò chuyện/chuỗi hội thoại/sự kiện riêng biệt**. Các việc phát sinh đơn lẻ bị xem là nhiễu, vì vậy một
  tuần yên ắng sẽ trả về thông báo trung thực là *"No new patterns."* (Không có mô thức mới nào).
- **Ưu tiên hướng tới tự động hóa.** Các ứng viên bài blog và tự động hóa được đánh giá ngang nhau về trọng số,
  nhưng khi một ứng viên tự động hóa đủ điều kiện thì nó sẽ được ưu tiên hơn — giải phóng
  khỏi công việc lặp đi lặp lại thường mang lại giá trị lớn hơn.
- **Thư đã gửi là mỏ vàng.** Kỹ năng đặc biệt chú ý đến những gì *bạn* gửi đi (chuyển tiếp thư,
  thư giới thiệu, tin nhắn hỏi tiến độ, bàn giao kiểu "thêm X vào luồng trao đổi") — đó là nơi công việc thủ công lặp đi lặp lại
  thường ẩn mình.
- **Quyền riêng tư là trên hết.** Chỉ đọc, luôn ẩn danh ("3 khách hàng khác nhau", tuyệt đối không nêu
  tên thật), và bỏ qua mọi nội dung bạn đã đánh dấu là riêng tư hoặc đã loại trừ.
