# Trình tạo biểu đồ

Biến một bảng tính hoặc bảng dữ liệu thành một biểu đồ gọn gàng, đẹp mắt — biểu đồ cột, đường, phân tán (scatter), tần suất (histogram) hoặc tròn — chỉ với một yêu cầu duy nhất.

## Tại sao nên dùng kỹ năng này?

Agent của bạn vốn đã có thể tạo biểu đồ mà không cần kỹ năng nào. Khi bạn yêu cầu tạo một biểu đồ, agent sẽ viết ngay tại chỗ một script vẽ biểu đồ dùng một lần rồi chạy nó. Cách đó vẫn hoạt động, nhưng vì mỗi lần đều bắt đầu lại từ đầu nên kết quả không đồng nhất. Yêu cầu "doanh thu theo khu vực" hai lần và bạn có thể nhận được hai bảng màu khác nhau, hai kích thước khác nhau, hoặc nhãn bị chồng chéo ở lần này nhưng lần khác lại không.

Trình tạo biểu đồ (Chart Builder) thay thế cách làm tự phát đó bằng một tập hợp các hàm vẽ biểu đồ cố định, có thể tái sử dụng. Thay vì viết mã vẽ biểu đồ mới cho mỗi yêu cầu, agent sẽ gọi một hàm đã được xây dựng sẵn: bạn chỉ cần chọn loại biểu đồ và dữ liệu, còn kỹ năng sẽ lo phần tạo kiểu và các chi tiết hiển thị.

Những lợi ích mang lại:

- **Thường nhanh hơn** — việc gọi một hàm làm sẵn giúp bỏ qua công đoạn viết và gỡ lỗi mã vẽ biểu đồ mới ở mỗi yêu cầu.
- **Nhất quán hơn** — các biểu đồ dùng chung một phong cách gọn gàng và bảng màu thân thiện với người mù màu, nhờ vậy cả bộ biểu đồ trông đồng bộ với nhau.
- **Ít lỗi vặt về trình bày hơn** — các hàm xử lý sẵn những chi tiết tỉ mỉ: bỏ qua các dòng trống, xoay nghiêng nhãn khi có nguy cơ chồng chéo, mở rộng chiều ngang biểu đồ khi có nhiều danh mục và giữ phần chú giải (legend) không che khuất dữ liệu.

Cách tốt nhất để đánh giá sự khác biệt là tự thử cả hai cách trên chính dữ liệu của bạn: hãy yêu cầu tạo một vài biểu đồ theo cách thông thường, sau đó thử lại với kỹ năng này, rồi so sánh tốc độ và kết quả.

## Những gì bạn nhận được

Sáu loại biểu đồ từ cùng một bộ công cụ:

| Biểu đồ | Phù hợp nhất cho |
| --- | --- |
| Cột (Bar) | so sánh một giá trị giữa các danh mục |
| Cột nhóm / cột chồng (Grouped / stacked bar) | so sánh giữa các danh mục **và** một nhóm phân loại thứ hai |
| Đường (Line) | một giá trị thay đổi theo thời gian hoặc trình tự |
| Phân tán (Scatter) | mối quan hệ giữa hai đại lượng số |
| Tần suất (Histogram) | sự phân bổ của một đại lượng số đơn lẻ |
| Tròn / vành khuyên (Pie / donut) | tỷ trọng các phần trong một tổng thể |

Chỉ cần cho agent biết bạn muốn vẽ gì, ví dụ:

> Hãy tạo một biểu đồ cột chồng thể hiện doanh thu theo khu vực và theo quý.

Một tập dữ liệu mẫu (`assets/sample_sales.csv`) được đi kèm sẵn để bạn có thể dùng thử bất kỳ loại biểu đồ nào ngay lập tức.

## Yêu cầu

Chạy trong môi trường Python tiêu chuẩn của Cowork, Copilot Studio và Scout với matplotlib và pandas — không cần cài đặt hay thiết lập gì thêm.
