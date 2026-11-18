# Trình tạo Battlecard Cạnh tranh

Xây dựng ứng dụng so sánh tương tác từ những gì bạn biết về sản phẩm của mình và một hoặc nhiều đối tượng khác — có thể là một battlecard bán hàng ủng hộ sản phẩm của bạn trước các đối thủ cụ thể, hoặc một bảng so sánh thực sự trung lập không thiên vị bên nào. Hỗ trợ xuất ra PowerPoint theo yêu cầu.

## Lý do kỹ năng này ra đời

Hầu hết các công cụ tạo "battlecard" ngầm mặc định câu trả lời luôn là "chúng ta thắng". Điều đó thiếu thuyết phục và không thể đứng vững khi gặp một khách hàng tiềm năng sắc sảo đã tự nghiên cứu kỹ lưỡng. Kỹ năng này phân loại mọi nhận định thành hai trạng thái: hoặc đã được người dùng xác nhận, hoặc tìm thấy trên web và được gắn nhãn rõ ràng là chưa xác minh — và sẽ không đưa bất kỳ nhận định nào ra dưới dạng sự thật đã kiểm chứng cho đến khi có người thực sự rà soát.

Kỹ năng cũng không đánh đồng so sánh trung lập và battlecard bán hàng như hai phiên bản chỉ khác màu sắc của cùng một bài toán. Bản chất của battlecard là so sánh từng cặp: chúng ta đối đầu với từng đối thủ. Một bảng so sánh trung lập không có "chúng ta", mọi đối tượng đều ngang hàng nhau, được trình bày dưới dạng ma trận thực thụ. Kỹ năng xây dựng cấu trúc dữ liệu hoàn toàn khác nhau và hiển thị giao diện người dùng (UI) khác hẳn tùy theo chế độ bạn yêu cầu — thậm chí ở chế độ trung lập, từ "đối thủ cạnh tranh" (competitor) tuyệt đối không xuất hiện ở bất kỳ đâu.

## Điểm khác biệt so với việc chỉ bảo agent "so sánh X và Y"

- **Hai chế độ thực thụ, không phải một chế độ đổi nhãn trường dữ liệu.** Chế độ battlecard so sánh từng cặp; chế độ trung lập là một ma trận N chiều thực sự với mỗi đối tượng là một cột ngang hàng.
- **Theo dõi trạng thái đã xác minh và chưa xác minh cho từng nhận định.** Mọi thông tin lấy từ web đều phải đi qua bước rà soát rõ ràng của con người trước khi được coi là đáng tin cậy, và luôn được gắn cờ hiển thị rõ trong đầu ra nếu chưa được xác nhận.
- **Trung thực ngay từ thiết kế.** Chế độ battlecard yêu cầu nêu cả các điểm yếu thực tế chứ không chỉ điểm thắng thế. Chế độ trung lập cho phép kết quả "ngang nhau" (even) là một câu trả lời hợp lệ thay vì ép buộc phải chọn ra bên thắng ở mọi dòng.
- **Bảng điểm tóm tắt gọn gàng, không lặp lại bảng chi tiết.** Phần tóm tắt ở trên cùng hiển thị số liệu tổng hợp chứ không phải bản sao thứ hai của bảng so sánh chi tiết ngay bên dưới.
- **Có thể lọc, tìm kiếm và sao chép.** Lọc theo đối tượng hoặc danh mục, tìm kiếm trên mọi tiêu chí và sao chép bất kỳ dòng nào thành ý thuyết trình (talking point) dùng ngay.
- **Tương thích bộ nhận diện thương hiệu.** Chỉ cần cung cấp mẫu PowerPoint hoặc bảng màu thương hiệu của bạn, cả ứng dụng HTML lẫn bản xuất PowerPoint đều sẽ áp dụng theo, nhưng không bao giờ để bảng màu thương hiệu làm nhòa tín hiệu thắng/thua hay bên dẫn đầu đến mức khó đọc.

## Yêu cầu

Cả ứng dụng HTML lẫn tính năng xuất PowerPoint đều yêu cầu bật Code Interpreter trên agent Copilot Studio. Nếu không có tính năng này, kỹ năng sẽ chuyển sang trình bày bảng so sánh dưới dạng văn bản có định dạng ngay trong khung chat.

## Tác giả

Michael Heath ([Get Automating](https://getautomating.com))
