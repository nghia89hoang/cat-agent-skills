# Work IQ Signalboard

Hai mươi tám ngày làm việc, hiển thị sống động đầy màu sắc.

> **Xây dựng cho bản xem trước (preview):** Kỹ năng này nhắm tới Work IQ (bản xem trước)
> trong Copilot Studio và có thể gặp lỗi hoặc cần cập nhật khi Work IQ đạt trạng thái
> phát hành chính thức (general availability). Mục đích duy nhất của kỹ năng là trình
> diễn Work IQ vận hành trên trình điều phối mới.

Hãy yêu cầu:

> Hãy hiển thị Work IQ Signalboard của tôi.

Kỹ năng này biến bốn tuần hoạt động trên Microsoft 365 thành một bảng thông tin
(dashboard) đầy màu sắc, độc lập, bao quát các cuộc họp, luồng email, tin nhắn
trò chuyện Teams và nhịp độ làm việc hằng tuần. Kết quả là một tệp HTML duy nhất
mà bạn có thể mở, tải xuống hoặc trình chiếu trực tiếp lên màn hình lớn.

## Tín hiệu thực tế, không thông tin thừa

Bảng thông tin hiển thị các con số đằng sau nhịp làm việc: số lượng và thời lượng
cuộc họp, email đã gửi so với đã nhận, tin nhắn trò chuyện Teams, nhịp độ lịch họp
và bốn tổng số liệu hằng tuần khớp với tổng số trong 28 ngày. Một phần nhận xét
ngắn từ AI sẽ khép lại bảng thông tin mà không biến mức độ hoạt động thành điểm
số năng suất.

Kỹ năng đếm khối lượng công việc mà không hiển thị nội dung công việc. Tên người,
tiêu đề thư, nội dung tin nhắn, tên tệp, liên kết, dự án, khách hàng và ngày tháng
cụ thể đều được loại bỏ.

Nếu Work IQ không thể đọc một nguồn dữ liệu, bảng thông tin sẽ hiển thị **No data**
(Không có dữ liệu). Kỹ năng tuyệt đối không biến một nguồn bị thiếu thành giá trị 0
đo lường được, và cũng không bao giờ suy đoán về chế độ làm việc, mức độ phân mảnh,
sự tập trung hay ranh giới giờ làm việc.

## Trước khi bắt đầu

Sử dụng trải nghiệm agent Copilot Studio mới và thêm **Work IQ (preview)** từ
**Tools > Add Tool > Model Context Protocol** (Công cụ > Thêm công cụ > Model Context Protocol).
Tenant cần được bật Work IQ, có kết nối cho người dùng đã đăng nhập và đáp ứng chính
sách chi tiêu bắt buộc.

[Thiết lập Work IQ trong Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-work-iq)

## Dùng thử

- “Hãy hiển thị các tín hiệu Work IQ của tôi.”
- “Tạo Work IQ Signalboard của tôi.”
- “Chuyển bốn tuần vừa qua của tôi thành một bảng thông tin Work IQ.”

Kỹ năng sử dụng khung thời gian trượt 28 ngày, xử lý khéo léo các giới hạn thu thập
dữ liệu của môi trường thử nghiệm bản xem trước (preview harness), báo cáo các nguồn
bị thiếu và tạo ra bảng thông tin mà không cần tài nguyên web bên ngoài.

Tệp tin nằm ngoài phạm vi hiện tại của Signalboard. Phiên bản Work IQ xem trước chưa
cung cấp nguồn cấp dữ liệu hoạt động tệp gần đây có thể truy xuất đầy đủ, vì vậy kỹ
năng sẽ không suy đoán từ danh sách thư mục chưa trọn vẹn hay kết quả tìm kiếm một phần.
