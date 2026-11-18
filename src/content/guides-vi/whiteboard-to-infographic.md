# Chuyển bảng trắng thành Infographic

Biến ảnh chụp bảng trắng vẽ tay hoặc bản phác thảo quy trình/hệ thống thô từ một
buổi khảo sát hay phiên làm việc thành một bản infographic chỉn chu, sẵn sàng trình bày với khách hàng. Kỹ năng
này đảm nhận phần khó nhất - đọc đúng chữ viết tay và chọn đúng
cấu trúc - rồi dựng nên một bố cục một trang đồng nhất, mang dấu ấn thương hiệu để bạn có thể đưa
thẳng tới khách hàng.

## Kỹ năng này làm gì

Đưa cho agent ảnh chụp bảng trắng (hoặc sơ đồ phác thảo / ghi chú chụp lại từ phiên làm việc)
và yêu cầu "làm gọn lại", "trình bày cho đẹp mắt", hoặc "biến thành
infographic". Kỹ năng sẽ chép lại toàn bộ nội dung trên bảng, xác nhận phần đọc hiểu đó với
bạn *trước khi* vẽ bất cứ thứ gì, rồi xây dựng một trong hai dạng bố cục:

- **Thanh tiến trình (Process rail)** - luồng đánh số từ trái sang phải dành cho các bản phác thảo có trình tự
  rõ ràng (bước 1 -> bước 2 -> ...).
- **Bản đồ mạng lưới (Network map)** - cấu trúc tô-pô gồm các địa điểm, hệ thống hoặc tác nhân kết nối qua
  các luồng có gắn nhãn, dành cho các bản phác thảo không theo một thứ tự tuyến tính duy nhất.

Đầu ra là một bản infographic PowerPoint (`.pptx`) một slide hoàn chỉnh, được trả về
dưới dạng liên kết tải xuống.

## Điểm khác biệt

Trung thực theo thiết kế. Kỹ năng chỉ dựng lại đúng những gì có trên bảng - không bao giờ tự bịa thêm
bước, trường thông tin hay kết nối nào để làm bức vẽ trông có vẻ đầy đủ, đồng thời giữ nguyên
chính xác thuật ngữ và từ viết tắt của khách hàng. Bất cứ phần nào không đọc được sẽ được nêu ra dưới dạng
câu hỏi chứ không lặng lẽ bỏ qua. Đây không phải công cụ tạo biểu đồ: nó làm việc từ bản
phác thảo, không phải từ tập dữ liệu số.

## Cách sử dụng

1. Thêm kỹ năng vào agent Copilot Studio của bạn.
2. Tải lên ảnh chụp bảng trắng - cắt gọn khung hình; chữ viết tay rõ ràng sẽ giúp kết quả chính xác hơn.
3. Xem lại bản chép nội dung mà agent gửi lại và sửa bất kỳ chỗ nào đọc nhầm.
4. Cung cấp bảng màu, hoặc đề nghị kỹ năng gợi ý một bảng màu - bảng màu mang tính
   đặc thù cho từng khách hàng và không được gắn cứng sẵn trong kỹ năng.
5. Tải xuống tệp `.pptx` đã tạo và tinh chỉnh thêm nếu cần.

## Yêu cầu

Infographic được tạo trực tiếp bên trong container Python của agent
(`python-pptx`) và trả về dưới dạng tệp có thể tải xuống - không cần custom connector,
dịch vụ bên ngoài hay hạ tầng đặc thù nào của tenant.

## Hạn chế đã biết

Tính năng nhập hình ảnh và tải tệp xuống hiện không hoạt động trên **kênh Microsoft 365
Copilot**. Ảnh tải lên trông có vẻ đã gửi nhưng thực tế không đến được
agent, và agent cũng không thể trả về tệp để tải xuống. Microsoft đã ghi nhận vấn đề này
trong danh sách các sự cố đã biết của Microsoft 365 Copilot Extensibility đối với custom engine
agent; hiện chưa có thời gian khắc phục dự kiến được công bố.

Hãy sử dụng **khung kiểm thử Copilot Studio (test pane)** hoặc **kênh Teams**, nơi cả tính năng
tải ảnh lên lẫn tải tệp `.pptx` xuống đều hoạt động bình thường.

## Mẹo

- Hãy đưa cho kỹ năng bức ảnh lộn xộn nhất bạn có - nguyên tắc ưu tiên đọc hiểu trước
  chính là điểm phát huy giá trị rõ nhất của nó.
- Sử dụng các cờ nhấn "GAP" và "need details" để đánh dấu các mục phù hợp/thiếu hụt và các nội dung mở
  cần theo dõi tiếp; hãy giữ lại dòng chú giải một dòng mà kỹ năng tạo ra.
- Yêu cầu thêm phiên bản "tài liệu chi tiết đi kèm" (detailed companion) bên cạnh bản gọn cho lãnh đạo
  khi một phiên làm việc có rất nhiều ghi chú bên lề.

## Tác giả

Andy Zehr - [Andy Zehr | LinkedIn](https://www.linkedin.com/in/andyzehr)
