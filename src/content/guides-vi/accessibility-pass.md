# Lượt kiểm tra Khả năng Tiếp cận

Hầu hết các kỹ năng trong thư viện này dùng để *tạo ra* bộ slide và tài liệu. Kỹ năng này kiểm tra phần đầu ra ở chặng cuối.

Hãy trỏ kỹ năng tới một tệp `.pptx`, `.docx`, `.html` hoặc `.md` và nó sẽ báo cáo mọi lỗi về khả năng tiếp cận tìm thấy — sử dụng đúng tên quy tắc như công cụ Accessibility Checker của Microsoft để các phát hiện khớp với những gì bạn thấy trên thanh ribbon của Office — sau đó tự động sửa lỗi khi được yêu cầu.

## Những gì kỹ năng kiểm tra

| | |
| --- | --- |
| **Lỗi (Errors)** | Thiếu văn bản thay thế (alt text), slide chưa có tiêu đề, bảng không có hàng tiêu đề, tài liệu bị hạn chế quyền truy cập |
| **Cảnh báo (Warnings)** | Độ tương phản dưới mức WCAG AA, bảng gộp ô/phức tạp, thứ tự đọc slide không hợp lý, nội dung đa phương tiện thiếu phụ đề, văn bản liên kết mơ hồ |
| **Mẹo (Tips)** | Tiêu đề slide trùng lặp, tài liệu không dùng kiểu tiêu đề (heading style), thiếu ngôn ngữ tài liệu |

## Cách hoạt động

Gồm hai lượt kiểm tra. Một script đi kèm (`scripts/a11y_check.py`) xử lý phần tính toán: nó tính tỷ lệ tương phản WCAG thực tế, đọc các thuộc tính văn bản thay thế trực tiếp từ tệp XML và so sánh thứ tự của trình đọc màn hình với bố cục trực quan. Sau đó, agent thực hiện phần việc mà script không thể làm: đánh giá xem văn bản thay thế có *hữu ích* không, thành phần được đánh dấu trang trí có thực sự chỉ mang tính trang trí không, và ý nghĩa có đang chỉ được truyền đạt bằng màu sắc hay không.

Script cần `python-pptx` cho tệp PowerPoint và `python-docx` cho tệp Word. HTML và Markdown chỉ dùng thư viện chuẩn của Python. Nếu không có môi trường Python, HTML và Markdown vẫn hoạt động: agent sẽ đọc tệp trực tiếp và áp dụng thủ công cùng bộ quy tắc đó, chỉ là kém chính xác hơn. Các tệp PowerPoint và Word không có phương án dự phòng này vì chúng là các tệp Office XML được nén zip, không thể đọc như văn bản thuần túy, nên khi thiếu Python, kỹ năng sẽ yêu cầu người dùng tự chạy Accessibility Checker có sẵn trong Office và chia sẻ kết quả tìm được.

## Giới hạn đã biết

Những điều cần lưu ý trước khi tin tưởng vào một kết quả "sạch lỗi":

- **Độ tương phản chỉ được kiểm tra khi màu sắc được chỉ định tường minh.** Màu theo chủ đề (theme colour), dải màu chuyển sắc (gradient) và chữ đặt trên ảnh sẽ được báo cáo là *chưa kiểm tra* chứ không phải đạt. Công cụ kiểm tra tích hợp sẵn của Office cũng có cùng điểm mù này.
- **Thứ tự đọc được suy đoán dựa trên hình học.** Các bố cục nhiều cột có chủ đích có thể bị gắn cờ nhầm; kỹ năng được chỉ dẫn phải xác nhận lại trước khi báo cáo.
- **Đây không phải là một cuộc kiểm toán tuân thủ chuẩn.** Không có công cụ tự động nào có thể chứng nhận đạt chuẩn WCAG hay EN 301 549. Một lượt kiểm tra sạch lỗi nghĩa là không có vấn đề nào *được phát hiện*, điều này không đồng nghĩa với việc tài liệu đã thực sự dễ tiếp cận.

## Tài liệu tham chiếu quy tắc

[Quy tắc cho Accessibility Checker](https://support.microsoft.com/office/rules-for-the-accessibility-checker-651e08f2-0fc3-4e10-aaca-74b4a67101c1)
· [Mức độ tương phản tối thiểu theo WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

Kỹ năng của Tim Karlsson (╯°□°)╯︵ ┻━┻ Hoạt động chuẩn 60% số lần, lần nào cũng thế.
