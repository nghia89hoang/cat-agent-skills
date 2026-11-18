# Kiểm tra Diễn giải Thời gian & Chi phí

Dành cho nhân sự tính phí (fee earner) và điều phối viên thanh toán khi chuẩn bị các mục ghi nhận thời gian trước bước rà soát hóa đơn tạm tính (pre-bill).

Công cụ thu thập hoạt động lịch và tài liệu có trích dẫn nguồn cho một dự án/hợp đồng, soạn thảo diễn giải ghi nhận thời gian dựa trên dữ liệu thực tế, đề xuất mã giai đoạn và mã tác vụ, đối chiếu các mục nhập với quy định thanh toán của khách hàng, phát hiện thời gian bị bỏ sót và lập bộ hồ sơ ngoại lệ pre-bill nháp.

Nguyên tắc thiết kế cốt lõi là một dòng diễn giải bị khách hàng từ chối gây tốn kém hơn nhiều so với việc viết cẩn thận ngay từ đầu: mọi dòng đều bắt nguồn từ hoạt động thực tế, và không bao giờ tự suy diễn vai trò, người tham dự hay mục đích công việc.

## Thành phần bao gồm

1. **activity-pull** thu thập siêu dữ liệu lịch, hoạt động trên tài liệu trong phạm vi dự án và các dòng bảng chấm công thành một gói dữ liệu hoạt động có trích dẫn nguồn.
2. **narrative-draft** soạn thảo diễn giải cho những mục chưa có nội dung và đề xuất bản viết lại có trích dẫn bên cạnh các mục đã có sẵn.
3. **code-map** đề xuất mã giai đoạn và mã tác vụ của khách hàng, đồng thời gắn cờ các mã không khớp với mã đã gửi.
4. **guideline-check** kiểm tra các mục nhập về tình trạng gộp hạng mục (block billing), thuật ngữ bị cấm hoặc mơ hồ, mức độ chi tiết tối thiểu, công việc không tính phí, trùng lặp, đơn vị bước thời gian và thời gian chưa được ghi nhận.
5. **exception-report** lập bộ hồ sơ ngoại lệ pre-bill nháp gồm các mục bị từ chối, tạm giữ, loại trừ vì lý do quyền riêng tư và thời gian bị thiếu.

## Trước khi bắt đầu

Thông tin dự án/hợp đồng hoặc vụ việc, kỳ thanh toán, các dòng bảng chấm công hiện có, quy định thanh toán của khách hàng cùng cấu trúc mã giai đoạn và mã tác vụ. Không cần connector nào; bạn có thể cung cấp tệp trực tiếp hoặc trỏ đến tệp trong SharePoint hoặc OneDrive.

`skills/activity-pull/config/signal-sources.json` kiểm soát các nguồn hoạt động mà plugin được phép đọc. Hoạt động lịch và tài liệu trong không gian làm việc của dự án được bật theo mặc định; siêu dữ liệu và nội dung hộp thư bị tắt cho đến khi công ty bạn phê duyệt.

Các quy định thanh toán và mã tác vụ đi kèm trong thư mục `references/` của mỗi kỹ năng chỉ là bản tóm tắt minh họa. Hãy thay thế bằng quy định và bộ mã thực tế của khách hàng trước khi dựa vào kết quả đầu ra.

## Dùng thử

- **Soạn ghi nhận thời gian:** "Hãy thu thập hoạt động của tôi cho [matter] trong tuần [date] và soạn thảo các mục ghi nhận thời gian giúp tôi."
- **Kiểm tra tuân thủ:** "Các dòng diễn giải này có bị từ chối theo quy định thanh toán của [client] không? Hãy tìm thêm xem có khoảng thời gian nào bị thiếu không."
- **Chuẩn bị pre-bill:** "Hãy cho tôi xem các mục ngoại lệ pre-bill cho [matter] trong kỳ [period]."

## Giới hạn

Công cụ chỉ tạo bản nháp diễn giải và bộ hồ sơ ngoại lệ pre-bill để con người rà soát. Công cụ không bao giờ tự gửi bảng chấm công, phê duyệt pre-bill, xóa giảm giờ công hay gửi bất kỳ thứ gì khi chưa có xác nhận rõ ràng.

Chỉ áp dụng cho mục ghi nhận thời gian: báo cáo chi phí và hóa đơn chứng từ nằm ngoài phạm vi hỗ trợ.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán chuyên môn. Hãy sử dụng dữ liệu dự án giả lập hoặc dữ liệu đã ẩn danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
