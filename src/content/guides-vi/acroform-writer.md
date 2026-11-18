# Trình điền biểu mẫu AcroForm

Biến một tệp PDF có thể điền sẵn có (đơn đăng ký, phiếu tiếp nhận thông tin, hợp đồng, biểu mẫu cơ quan nhà nước) thành một tài liệu đã hoàn tất bằng cách ghi trực tiếp các giá trị vào đúng các trường AcroForm thực tế của tệp — sau đó, tùy chọn khóa các trường ở chế độ chỉ đọc (read-only) để sẵn sàng gửi đi.

Khác với các phương pháp phủ lớp (overlay) dán văn bản vào các tọa độ cố định (và sẽ bị lệch ngay khi bố cục thay đổi nhẹ), kỹ năng này hoạt động dựa trên chính các định nghĩa trường biểu mẫu thực tế của PDF, nên luôn giữ được độ chính xác bất kể bố cục trang.


## Cách hoạt động
1. `scripts/fill_form.py list <input.pdf>` — kiểm tra mọi trường biểu mẫu thực tế (tên, loại, giá trị hiện tại, trạng thái hộp kiểm/danh sách thả xuống) để agent biết chính xác những gì có thể điền được.
2. `scripts/fill_form.py fill <input.pdf> <data.json> <output.pdf> --flatten` — ghi các giá trị vào tệp và, với tùy chọn `--flatten`, đánh dấu mọi trường là chỉ đọc để tài liệu hoạt động như không thể chỉnh sửa trong các trình xem PDF tiêu chuẩn. Đây là cơ chế khóa ở mức nỗ lực tối đa (thiết lập `/NeedAppearances` và cờ chỉ đọc của widget) thay vì làm phẳng thực sự (true flattening) — AcroForm và các định nghĩa trường vẫn nằm trong tệp.

Được xây dựng và kiểm thử dựa trên một tệp PDF mẫu có thể điền (`assets/sample_intake_form.pdf`) bao gồm các trường văn bản và một hộp kiểm, kể cả nhánh cảnh báo trường không khớp và nhánh báo lỗi "no AcroForm found" (không tìm thấy AcroForm) đối với các tệp PDF không hỗ trợ điền.

## Các tệp đi kèm
- `scripts/fill_form.py` — chỉ dùng `pypdf` thuần túy (đã có sẵn trong sandbox của agent), không dùng dịch vụ bên ngoài. Có hai chế độ:
  - `list <input.pdf>` — xuất toàn bộ các trường AcroForm dưới dạng JSON (tên, loại, giá trị hiện tại, trạng thái hộp kiểm/nút chọn radio, các tùy chọn danh sách thả xuống). Thoát với mã 1 cùng thông báo rõ ràng nếu tệp PDF hoàn toàn không có trường nào có thể điền.
  - `fill <input.pdf> <data.json> <output.pdf> [--flatten]` — ghi các giá trị được cung cấp vào các trường khớp tương ứng và, với `--flatten`, thiết lập `/NeedAppearances` đồng thời đánh dấu widget của mọi trường là chỉ đọc để kết quả hoạt động như không thể chỉnh sửa trong các trình xem tiêu chuẩn (khóa ở mức nỗ lực tối đa, không phải làm phẳng thực sự).
- `assets/sample_intake_form.pdf` — một mẫu biểu mẫu điền nhỏ (tên, email, hộp kiểm) để kiểm thử sơ bộ toàn bộ luồng đầu cuối (smoke-test end-to-end) trước khi áp dụng trên tài liệu thực tế.

## Yêu cầu
Chỉ cần `pypdf` — đã có sẵn trong môi trường sandbox Python của Copilot Studio. Không gọi mạng, không dùng dịch vụ bên ngoài.
