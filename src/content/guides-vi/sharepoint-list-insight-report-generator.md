# Trình tạo báo cáo phân tích chuyên sâu danh sách SharePoint

Skill Copilot Studio này biến bất kỳ danh sách SharePoint nào đã được xác thực thành một báo cáo phân tích thông minh (business intelligence) tương tác với khả năng tự động khám phá lược đồ (schema), phân tích dữ liệu, trích xuất thông tin chuyên sâu trực quan và tạo báo cáo HTML có thể tải xuống.

## Điều kiện tiên quyết

Ngoài nguồn tri thức SharePoint đã cấu hình, agent cần có các hành động của trình kết nối SharePoint, luồng agent hoặc các công cụ tương đương để khám phá danh sách được phê duyệt và truy xuất lược đồ, truy xuất mục dữ liệu theo trang và hành động **Create file** (Tạo tệp). Hãy cấu hình **Create file** để chỉ xuất bản đến đích lưu trữ có phạm vi người xem không rộng hơn danh sách nguồn và các mục dữ liệu nguồn.

## Đối tượng sử dụng

Người dùng Microsoft 365 cần nhanh chóng có được các thông tin chuyên sâu từ dữ liệu danh sách SharePoint mà không cần xây dựng báo cáo Power BI hay thực hiện phân tích thủ công.

## Skill này làm gì

Skill tự động:

* Xác thực rằng danh sách SharePoint được yêu cầu có tồn tại trong nguồn tri thức đã chọn trước khi bắt đầu bất kỳ xử lý nào.
* Khám phá cấu trúc danh sách, siêu dữ liệu (metadata), kiểu trường dữ liệu và chi tiết lược đồ.
* Phân tích toàn bộ các bản ghi trong danh sách có thể truy cập.
* Nhận diện các xu hướng kinh doanh, vấn đề chất lượng dữ liệu, mô hình phân bổ quyền sở hữu và các điểm bất thường.
* Tạo ra các nhận định kinh doanh và khuyến nghị có tính hành động cao.
* Tạo một báo cáo HTML tương tác hoàn chỉnh có thể lưu trữ trên SharePoint và chia sẻ với các bên liên quan.

## Các tính năng chính

### Khám phá danh sách thông minh

Skill thực hiện:

* Liệt kê toàn bộ các danh sách SharePoint hiện có trong nguồn tri thức đã chọn.
* Thực hiện đối khớp không phân biệt chữ hoa chữ thường.
* Xác thực sự tồn tại của danh sách trước khi phân tích.
* Ngăn ngừa việc chọn nhầm danh sách do suy đoán theo ngữ nghĩa.
* Gợi ý các danh sách hiện có và các kết quả khớp gần nhất khi không tìm thấy danh sách được yêu cầu.

### Phân tích dữ liệu

Skill đánh giá:

#### Thống kê tổng quan

* Tổng số bản ghi
* Các giá trị riêng biệt
* Các giá trị bị thiếu
* Điểm đánh giá mức độ đầy đủ dữ liệu

#### Phân tích xu hướng

* Xu hướng theo tháng
* Xu hướng theo năm
* Mô hình tăng trưởng

#### Phân tích danh mục

* Các danh mục phổ biến nhất
* Phân bố tần suất
* Bảng xếp hạng

#### Phân tích quyền sở hữu

* Số bản ghi theo người đóng góp
* Những người đóng góp hàng đầu
* Phân bổ quyền sở hữu

#### Phân tích chất lượng dữ liệu

* Thông tin bị thiếu
* Bản ghi trùng lặp
* Dữ liệu nghi ngờ bất thường
* Các vấn đề về tính nhất quán dữ liệu

### Nhận định kinh doanh chuyên sâu

Báo cáo làm nổi bật:

* Các xu hướng có giá trị cao
* Các danh mục được sử dụng thường xuyên
* Các lĩnh vực tăng trưởng nhanh
* Các điểm nghẽn tiềm ẩn trong quy trình
* Các vấn đề đáng lo ngại về chất lượng dữ liệu
* Các hành động khắc phục được khuyến nghị

Các nhận định được sắp xếp thứ tự ưu tiên dựa trên mức độ liên quan đến hoạt động kinh doanh và khả năng triển khai thực tế.

## Báo cáo HTML tương tác

Báo cáo được tạo là một tệp HTML5 duy nhất với CSS và JavaScript nhúng nội tuyến; Chart.js (phiên bản 4) có thể được tải từ một URL CDN có phiên bản chính xác kèm siêu dữ liệu toàn vẹn SRI khớp và thuộc tính `crossorigin="anonymous"` như là thành phần phụ thuộc bên ngoài duy nhất được phép:

* Chart.js

### Bảng điều khiển tổng quan

Hiển thị:

* Tên danh sách
* Số lượng bản ghi
* Số lượng cột
* Ngày cập nhật gần nhất
* Các nhận định nổi bật hàng đầu
* Các chỉ số hiệu suất chính (KPI)

### Bộ lọc động

Hỗ trợ lọc theo:

* Trường văn bản
* Trường lựa chọn
* Trường tra cứu
* Trường người dùng
* Trường ngày tháng

Tất cả bộ lọc tự động cập nhật biểu đồ, KPI và bảng dữ liệu.

### Biểu đồ tương tác

Tự động tạo các trực quan hóa phù hợp nhất:

* Biểu đồ cột
* Biểu đồ tròn
* Biểu đồ vành khuyên (Doughnut)
* Biểu đồ đường

Các tính năng bao gồm:

* Chú giải công cụ khi di chuột
* Chú thích tương tác
* Lọc động

### Bảng dữ liệu nâng cao

Cung cấp:

* Sắp xếp trên mọi cột
* Sắp xếp tăng dần và giảm dần
* Tìm kiếm toàn bảng
* Phân trang
* Điều khiển ẩn/hiện cột
* Các tùy chọn xuất dữ liệu

Các định dạng xuất:

* CSV (tương thích với Excel)
* Sao chép vào khay nhớ tạm

### Chế độ xem chi tiết bản ghi

Khi chọn một hàng, hộp thoại chi tiết tương thích đa thiết bị sẽ mở ra và hiển thị:

* Tất cả tên hiển thị của trường
* Tên nội bộ của trường
* Giá trị hiện tại
* Chi tiết đầy đủ của bản ghi

## Kết quả báo cáo đầu ra

Các báo cáo được tạo tuân theo quy ước đặt tên:

```text
Report_<ListName>_<yyyyMMdd_HHmmss>.html
```

## Hướng dẫn sử dụng

* Tạo một agent Copilot Studio mới bằng giao diện Copilot Studio.
* Thêm skill và nguồn tri thức vào agent của bạn.

<img width="522" height="709" alt="image" src="https://github.com/user-attachments/assets/e083b4fc-11b5-4b74-8376-5d38996a2c94" />

* Sử dụng các câu lệnh hướng dẫn đơn giản như

```text
Sử dụng sharepoint-list-insight-report-generator, hãy tạo một báo cáo HTML dựa trên nguồn tri thức SharePoint đã chọn.
```
