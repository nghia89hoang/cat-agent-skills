# Pattern Radar (Theo lịch trình)

Một tác vụ tự động hóa Scout chạy **Pattern Radar** cho bạn hai lần mỗi tuần
(**thứ Tư và thứ Sáu lúc 16:00**) và đăng một **bản tóm tắt duy nhất lên Teams** — giúp
những thông tin chi tiết có giá trị cao nhất tự tìm đến bạn mà không cần bạn phải hỏi.

Mỗi lượt chạy sẽ quét các **tín hiệu Microsoft 365** gần đây của bạn (Hộp thư đến + Thư đã gửi, các cuộc trò chuyện và kênh đang hoạt động,
tiêu đề sự kiện lịch) trong 7 ngày qua và đưa ra tối đa
ba khuôn mẫu lặp lại đáng để chuẩn hóa thành sản phẩm:

- **Ứng viên viết blog** — những điều bạn cứ phải giải thích lặp đi lặp lại với nhiều người khác nhau.
- **Ứng viên tự động hóa** — những tác vụ nhiều bước mà bạn vẫn thường xuyên làm thủ công.

Tác vụ này ở chế độ **chỉ đọc** (không bao giờ thay mặt bạn gửi tin nhắn ngoại trừ
bản tóm tắt của chính nó) và **bảo vệ quyền riêng tư** (tên khách hàng và cá nhân luôn được ẩn danh).

> Bạn muốn chạy theo yêu cầu thay vì theo lịch trình? Hãy xem kỹ năng đồng hành
> **Pattern Radar**, công cụ thực hiện chính phân tích này dưới dạng tương tác.

## Những gì tác vụ thực hiện trong mỗi lượt chạy

1. Truy xuất thời điểm chạy gần nhất (và gắn cờ nếu đang chạy bù sau một khoảng gián đoạn).
2. Lấy tiêu đề email, tin nhắn trò chuyện/kênh đang hoạt động và tiêu đề lịch
   trong 7 ngày gần nhất — ưu tiên độ phủ rộng hơn chiều sâu.
3. Gom nhóm các tín hiệu đó, chỉ giữ lại những khuôn mẫu xuất hiện **≥3 lần trên ≥2
   người/chuỗi hội thoại/sự kiện riêng biệt**.
4. Đăng **0–3 ứng viên** lên Teams (hoặc *"✅ No new patterns this run."* — tức chưa có khuôn mẫu mới trong lượt chạy này — khi
   tuần đó ít biến động), ưu tiên làm nổi bật ít nhất một cơ hội
   tự động hóa.
5. Ghi nhớ các nhãn chủ đề đã đưa ra (không lưu dữ liệu riêng tư) để không lặp lại
   ở lượt chạy tiếp theo.

## Trước khi nhập

- **Một tài khoản Microsoft 365 đã kết nối** trong Scout, với các công cụ có quyền đọc email, trò chuyện,
  kênh và lịch.
- **Đã bật bộ nhớ (remember/recall)** — tác vụ tự động hóa theo dõi lần chạy gần nhất và
  những nội dung nó đã đưa ra trước đó.
- Tác vụ tự động hóa được đóng gói ở trạng thái **tắt** (`enabled: false`). Hãy rà soát lại, sau đó bật
  trong Scout để kích hoạt lịch trình thứ Tư/thứ Sáu. Điều chỉnh ngày/giờ theo ý muốn.

## Thông tin cần biết

- **Không có nội dung nào được gửi thay mặt bạn.** Hành động gửi ra duy nhất là bản
  tóm tắt Teams gửi tới bạn; tác vụ không bao giờ trả lời tin nhắn chat, kênh hay email.
- **Ngưỡng lọc khắt khe.** Các trường hợp đơn lẻ đều bị bỏ qua; một tuần thực sự ít hoạt động sẽ trả về
  "không có khuôn mẫu mới" thay vì cố tạo ra thông tin gây nhiễu.
- **Ẩn danh ngay từ thiết kế.** Bằng chứng sẽ ghi là "3 khách hàng khác nhau", tuyệt đối không ghi
  tên thật; chi tiết cụ thể trên lịch và đường dẫn tệp được loại khỏi bản tóm tắt.
- **Điều chỉnh nhịp độ.** Thứ Tư/thứ Sáu lúc 16:00 chỉ là mặc định — hãy thay đổi
  lịch trình trong Scout sau khi nhập.
