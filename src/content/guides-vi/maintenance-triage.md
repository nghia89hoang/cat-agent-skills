# Phân loại sự cố bảo trì

Dành cho kỹ thuật viên bảo trì, kỹ sư độ tin cậy hoặc giám sát ca trực đang xử lý
một sự cố cần hành động tiếp theo ngay lập tức.

Công cụ đọc ghi chú lỗi, mã cảnh báo và lịch sử thiết bị, xếp hạng các dạng hư hỏng
có khả năng xảy ra cao nhất dựa trên tài liệu hướng dẫn của nhà sản xuất gốc (OEM)
và các lệnh công việc (work order) trước đây, sắp xếp mức độ ưu tiên theo mức độ trọng
yếu của thiết bị và chi phí dừng máy, đồng thời soạn thảo bản cập nhật lệnh công việc
kèm hành động khuyến nghị. Chỉ cần tài liệu là đủ — nguồn dữ liệu chuỗi thời gian
(historian feed) là tùy chọn.

## Thành phần bao gồm

1. Đọc ghi chú lỗi, nhật ký cảnh báo và sự kiện, cùng sổ đăng ký thiết bị.
2. Truy xuất các lệnh công việc trước đó, các hư hỏng tương tự và các phần liên quan trong tài liệu hướng dẫn OEM.
3. Xếp hạng các dạng hư hỏng khả dĩ dựa trên triệu chứng, tài liệu hướng dẫn và lịch sử (tất định).
4. Sắp xếp thứ tự ưu tiên theo mức độ trọng yếu của thiết bị × chi phí dừng máy (tất định).
5. Soạn thảo bản cập nhật lệnh công việc và hành động khuyến nghị, có trích dẫn nguồn.

Mức độ tin cậy, nguồn gốc dữ liệu và trích dẫn luôn được gắn kèm theo các phát hiện trong suốt quy trình làm việc.

## Trước khi bắt đầu

Ghi chú lỗi hoặc phiếu sự cố, nhật ký cảnh báo/sự kiện, sổ đăng ký thiết bị có phân
loại mức độ trọng yếu và lịch sử lệnh công việc. Các đoạn trích tài liệu hướng dẫn
OEM sẽ giúp ích thêm. Dữ liệu historian là tùy chọn.

## Dùng thử

Bơm nước cấp lò hơi P-201 — mức độ trọng yếu hạng A, $12,000/giờ, không có dự phòng —
"lại ngắt do quá tải." Kỹ thuật viên chuẩn bị làm theo cách đã xử lý được trong ba lần
gần nhất: đặt lại rơ-le quá tải rồi tiếp tục vận hành. Cảnh báo trước mắt và giải pháp
xử lý ít tốn kém trông có vẻ ăn khớp với nhau.

Hai dữ kiện làm thay đổi câu trả lời:

- **Lịch sử:** ba lần đặt lại rơ-le quá tải động cơ trong vòng 78 ngày.
- **Tín hiệu mới:** cảnh báo rung động xuất hiện lần đầu tiên trong sự cố lần này, và
  độ rung đã liên tục tăng suốt cả quý.

Việc lặp đi lặp lại một biện pháp xử lý triệu chứng chính là một dấu hiệu cảnh báo,
chứ không phải giải pháp. Hệ thống sẽ đẩy nguyên nhân xuống cấp vòng bi lên ưu tiên
cao hơn so với việc đặt lại mạch điện đơn giản và nâng mức ưu tiên lên P1.

## Giới hạn

Ưu tiên tạo bản nháp trước (draft-first): hành động được đề xuất chỉ là khuyến nghị
chờ người lập kế hoạch hoặc giám sát viên phê duyệt, và không có thao tác ghi ngược
lại hệ thống CMMS. Công cụ này phân loại sự cố đang xảy ra trước mắt — không dự báo
các hư hỏng trong tương lai hay tối ưu hóa chu kỳ bảo trì phòng ngừa (PM).

## Người đóng góp

- Copilot Acceleration Team (CAT)
