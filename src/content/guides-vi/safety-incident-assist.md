# Trợ lý Sự cố An toàn

Biến các ghi chú sự cố thành bản nháp rõ ràng, có dẫn nguồn để đội ngũ an toàn của bạn rà soát. Trợ lý Sự cố An toàn (Safety Incident Assist) giúp sắp xếp lại chuyện gì đã xảy ra, thông tin đến từ đâu, những gì vẫn chưa rõ và ai có thể rà soát tiếp theo.

Dành cho điều phối viên an toàn, giám sát ca làm việc và người rà soát về môi trường, sức khỏe và an toàn (EHS) khi chuẩn bị bàn giao sự cố trong Copilot Cowork.

## Hãy hình dung tình huống này

Bạn có một báo cáo sự cố và lời kể của hai nhân chứng. Một nhân chứng đề cập có dây cáp lỏng lẻo trên lối đi; người kia lại nói lối đi hoàn toàn thông thoáng. Bạn cần một bản bàn giao cân bằng, cung cấp cho người rà soát đầy đủ cả hai góc nhìn.

Plugin này được thiết kế để giữ cả hai lời kể gắn với nguồn gốc của chúng, đánh dấu điểm bất đồng và hiển thị rõ các câu hỏi chưa có lời giải. Cả hai lời kể đều được giữ nguyên để người rà soát đánh giá.

## Những gì bạn nhận được

Một bản nháp báo cáo sự cố ở định dạng Markdown — định dạng văn bản thuần có các tiêu đề và danh sách — được chuẩn bị từ quy trình đã hoàn tất. Bản nháp tổng hợp:

- **Tường thuật sự cố:** các sự kiện đã cung cấp kèm tham chiếu ngược về nguồn gốc của chúng.
- **Khoảng trống thông tin và bất đồng:** các chi tiết chưa rõ và những lời kể mâu thuẫn nhau để rà soát.
- **Đánh giá nháp:** mức độ nghiêm trọng và phân loại ghi nhận sự cố được đề xuất, hoặc để là "undetermined" (chưa xác định) khi bằng chứng chưa đủ để kết luận.
- **Định tuyến đề xuất:** người điều tra và danh sách người nhận được gợi ý. Đội ngũ của bạn sẽ rà soát người điều tra và danh sách người nhận được đề xuất trước khi hành động.
- **Phiếu điều tra:** một mẫu phân tích nguyên nhân gốc rễ còn trống, sẵn sàng để người rà soát tìm hiểu các yếu tố góp phần gây ra sự cố.

Mức độ nghiêm trọng (severity) là đánh giá nháp về mức độ nghiêm trọng của sự cố. *Khả năng ghi sổ (Recordability)* là thuật ngữ của plugin chỉ việc các sự kiện được cung cấp có đủ cơ sở để ghi nhận sự cố vào sổ nhật ký an toàn hay không.

## Lần chạy đầu tiên của bạn

1. **Cài đặt plugin.** Tải tệp ZIP từ thư viện này và thêm dưới dạng plugin trong Copilot Cowork. Giữ nguyên tệp kê khai (manifest), biểu tượng, năm thư mục kỹ năng và các thành phần phụ thuộc lồng bên trong cùng với nhau.
2. **Chuẩn bị tệp của bạn.** Bắt đầu với một báo cáo sự cố dễ đọc, email đã xuất hoặc bản chép lời ghi chú giọng nói có xác định rõ sự cố cùng khu vực hoặc tài sản liên quan. Đính kèm các lời kể nhân chứng, chính sách liên quan, phân tích mối nguy công việc (tài liệu mô tả các mối nguy của tác vụ) và nhật ký sự cố trước đây nếu có.
3. **Bắt đầu với câu lệnh (prompt) bên dưới.** Hãy dùng thông tin hư cấu cho bản chạy thử đầu tiên. Với các sự cố thực tế, chỉ sử dụng các tệp được cấp phép trong môi trường đã được tổ chức phê duyệt. Thay thế các tên và thông tin định danh không cần thiết bằng bí danh trước khi đưa vào.
4. **Rà soát bản nháp cùng người đánh giá EHS có chuyên môn.** Kiểm tra các tham chiếu nguồn, các câu hỏi chưa có lời giải và các bước tiếp theo được đề xuất trước khi sử dụng trong quy trình của tổ chức bạn.

Bạn có thể mô tả tác vụ bằng ngôn ngữ thông thường; các kỹ năng sẽ tạo ra các tệp làm việc có cấu trúc giữa các giai đoạn. Khi cần thêm thông tin, plugin sẽ làm nổi bật các câu hỏi và chỉ rõ cần cung cấp gì tiếp theo.

### Sao chép và dán

> Hãy chuẩn bị một bản nháp sự cố từ các tệp được cung cấp này để phục vụ việc rà soát EHS. Bắt đầu từ bước tiếp nhận sự cố, sau đó rà soát các chính sách và lịch sử đã cung cấp, chuẩn bị các đánh giá nháp, đề xuất định tuyến và tạo bản báo cáo hoàn chỉnh. Liên kết các sự kiện với nguồn của chúng, giữ nguyên các lời kể mâu thuẫn nhau và để các thông tin chưa rõ ở trạng thái chưa xác định. Nếu một giai đoạn thiếu thông tin cần thiết, hãy dừng lại và cho tôi biết cần bổ sung gì. Không gửi, nộp hồ sơ, giao việc hay đóng bất cứ nội dung nào.

## Cách năm kỹ năng phối hợp với nhau

| Bước | Kỹ năng | Chức năng thực hiện |
| --- | --- | --- |
| 1 | Tiếp nhận sự cố (Incident intake) | Sắp xếp các sự kiện sự cố đã cung cấp và bảo toàn các lời kể mâu thuẫn nhau. |
| 2 | Truy xuất tri thức EHS (EHS knowledge retrieval) | Sử dụng các chính sách và bằng chứng bạn cung cấp; tìm kiếm các sự cố liên quan trong nhật ký được cung cấp. |
| 3 | Mức độ nghiêm trọng và khả năng ghi sổ (Severity and recordability) | Chạy các quy tắc đi kèm để chuẩn bị đánh giá nháp, giữ nguyên trạng thái chưa xác định cho các kết luận thiếu cơ sở. |
| 4 | Định tuyến (Routing) | Đề xuất người điều tra và danh sách người nhận để đội ngũ của bạn rà soát. |
| 5 | Soạn báo cáo sự cố (Incident write-up) | Kiểm tra và tính toán lại các đầu ra trước đó, sau đó tạo bản nháp cùng phiếu điều tra còn trống. |

Quy trình này hoạt động dựa trên các tệp sự cố, chính sách và lịch sử do bạn cung cấp.

## Trách nhiệm thuộc về đội ngũ an toàn của bạn

Đội ngũ an toàn của bạn chịu trách nhiệm về các đánh giá cuối cùng, thời hạn báo cáo, quyết định liên quan đến thiết bị, thông báo, nộp hồ sơ, phê duyệt và đóng sự cố. Plugin chỉ chuẩn bị bản nháp hỗ trợ để họ rà soát.

Các tệp làm việc có thể còn lưu giữ thông tin định danh và chi tiết y tế từ dữ liệu đầu vào của bạn. Hãy rà soát và giảm thiểu các chi tiết này trước khi lưu trữ hoặc chia sẻ đầu ra.

## Chi tiết kỹ thuật

Mỗi kỹ năng bao gồm các đặc tả hợp đồng (contract), tài liệu tham chiếu và thành phần phụ thuộc thời gian chạy Python cần thiết. Các script trợ giúp đi kèm chạy cục bộ bằng thư viện chuẩn của Python.

## Người đóng góp

- Copilot Acceleration Team (CAT)
