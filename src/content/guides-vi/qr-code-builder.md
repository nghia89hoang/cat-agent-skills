# Trình tạo mã QR

Chỉ cần đưa vào một đường dẫn và bạn sẽ nhận được một mã QR có thể quét được. Bạn có thể
thêm logo, chú thích, khung viền hoặc màu sắc thương hiệu nếu muốn mã QR trông hài hòa với
tờ rơi của mình. Kỹ năng cũng hỗ trợ nhiều biến thể mã QR: mạng Wi-Fi, danh thiếp liên hệ
(vCard), email, SMS, số điện thoại, ghim vị trí bản đồ và sự kiện lịch.

## Những gì bạn nhận được

- Các tệp mã QR định dạng PNG, SVG, PDF, JPG và/hoặc WEBP.
- Ước tính mức độ dễ đọc để bạn kịp thời phát hiện vấn đề trước khi in, kèm kiểm thử giải mã
  thực tế khi môi trường của bạn có sẵn trình đọc mã QR.
- Tùy chọn kiểu dáng mã QR gồm: 8 hình dạng phần thân, 5 kiểu mắt góc, 5 kiểu tâm mắt góc,
  4 khung viền ngoài, màu thương hiệu, logo ở chính giữa và chú thích bên dưới.
- Chế độ xử lý hàng loạt: tải lên tệp CSV (hoặc tệp Excel, khi môi trường của bạn đọc được
  định dạng này) và nhận một mã QR cho mỗi dòng.

## Cách hoạt động

Chỉ cần một thông tin bắt buộc duy nhất: địa chỉ web (hoặc thông tin chi tiết cho loại mã
không phải đường dẫn mà bạn yêu cầu).

Nếu muốn tùy chỉnh mã QR, bạn sẽ nhận được một bảng hướng dẫn kiểu dáng nhỏ kèm các mẫu đánh
số sẵn, để bạn chỉ cần chọn mẫu mình thích thay vì phải tự mô tả.

## Dùng thử

- "Tạo mã QR cho contoso.com"
- "Mã QR có logo của chúng tôi, phần thân màu xanh hải quân và băng rôn 'Quét tôi'"
- "Mã QR Wi-Fi cho mạng dành cho khách"
- "Mã QR danh thiếp liên hệ cho tôi"
- "Mỗi dòng một mã QR từ tệp CSV này"

## Những điều kỹ năng này không làm

- Đọc hoặc giải mã mã QR có sẵn (kỹ năng này chỉ tạo mã QR).
- Các loại mã vạch khác như Code 128, EAN, Data Matrix hoặc PDF417.
- Thiết kế cả một tờ rơi, áp phích hay trang trình chiếu có gắn mã QR. Kỹ năng này tạo ra mã
  QR; sau đó bạn chỉ việc đưa nó vào tài liệu của mình.
- Đổi giao diện toàn bộ bài thuyết trình theo màu thương hiệu. "Màu thương hiệu" ở đây chỉ
  áp dụng cho màu của chính mã QR.

## Cấu trúc bên trong

Chạy bộ xử lý `scripts/make_qr.py` đi kèm. Yêu cầu có Pillow cùng một bộ mã hóa QR
(ReportLab, `qrcode` hoặc `segno`) trong môi trường máy chủ. Nếu có sẵn trình xác minh quét
mã (OpenCV, zxing-cpp hoặc pyzbar), kỹ năng cũng sẽ giải mã thử mã hoàn chỉnh và báo cáo
liệu mã có đọc rõ ràng hay không.
