# Trợ lý Lệnh công việc

Mọi thông tin mà kỹ thuật viên hoặc người lập kế hoạch cần cho một lệnh công việc, được tập hợp tại một nơi duy nhất thay vì
nằm rải rác trên bốn hệ thống và một tủ hồ sơ.

Công cụ lấy thông tin lệnh công việc và ngữ cảnh thiết bị, truy xuất các quy trình vận hành chuẩn (SOP), tài liệu hướng dẫn OEM và ghi chú sửa chữa trước đây
thực sự áp dụng được, xếp hạng những công việc tương tự nhất trong quá khứ, kiểm tra mức độ sẵn sàng của phụ tùng đối chiếu với
kho vật tư và bảng thay thế phụ tùng (supersession table), đồng thời soạn thảo ghi chú rõ ràng cho kỹ thuật viên hoặc bản tóm tắt cho người lập kế hoạch
kèm hành động tiếp theo tối ưu nhất.

## Thành phần bao gồm

1. Đọc thông tin lệnh công việc và ngữ cảnh thiết bị.
2. Truy xuất các SOP, phần tài liệu hướng dẫn OEM và ghi chú sửa chữa trước đây có liên quan.
3. Xếp hạng các lệnh công việc tương tự nhất trong quá khứ (tất định).
4. Kiểm tra phụ tùng đối chiếu với kho vật tư và bảng thay thế phụ tùng (tất định).
5. Soạn thảo ghi chú cho kỹ thuật viên hoặc bản tóm tắt cho người lập kế hoạch, có trích dẫn nguồn.

## Trước khi bắt đầu

Lệnh công việc, sổ đăng ký thiết bị, lịch sử lệnh công việc, danh mục phụ tùng và dữ liệu sử dụng, cộng thêm
bất kỳ SOP và đoạn trích tài liệu hướng dẫn OEM nào bạn hiện có.

## Dùng thử

Máy nén khí điều khiển C-500 — hạng A, không có dự phòng — lại báo cùng một lỗi van nạp.
Kỹ thuật viên chuẩn bị làm đúng theo hướng dẫn trong SOP: lấy thêm một van nạp VK-100 nữa
và lắp vào.

Hai dữ kiện làm thay đổi câu trả lời:

- **Lịch sử:** cả *ba* lần thay van VK-100 gần nhất trên máy C-500 đều gặp sự cố trở lại. Lỗi tái diễn
  trong mọi lần.
- **Khuyến nghị thay đổi:** một ghi chú sửa chữa cảnh báo VK-100 dễ gặp lỗi này và khuyến nghị chuyển sang dùng
  mã thay thế VK-200.

SOP không sai, chỉ là đã lỗi thời. Làm theo SOP đó sẽ dẫn tới lần sửa chữa lặp lại thứ tư.

## Giới hạn

Ưu tiên tạo bản nháp trước (draft-first) và bám sát tài liệu gốc. Không tự động lập lịch và không có thao tác ghi ngược lại hệ thống CMMS — người lập kế hoạch vẫn là người
nắm quyền quyết định lịch trình.

## Người đóng góp

- Copilot Acceleration Team (CAT)
