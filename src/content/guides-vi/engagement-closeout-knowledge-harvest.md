# Thu thập Tri thức Đóng dự án

Dành cho quản lý dự án (engagement manager) và đội ngũ quản trị tri thức khi thực hiện đóng một dự án dịch vụ chuyên nghiệp.

Công cụ tổng hợp các sản phẩm bàn giao cuối cùng, nhật ký quyết định, ghi chú tổng kết (retrospective) và điều khoản bảo mật; chấm điểm các tài sản ứng viên có thể tái sử dụng; gom nhóm bài học kinh nghiệm; chạy cổng kiểm tra bảo mật (confidentiality gate) và soạn thảo bản ghi tri thức đã làm sạch (sanitised) để bộ phận chuyên môn rà soát.

Nguyên tắc thiết kế cốt lõi là tái sử dụng chỉ có giá trị khi đảm bảo an toàn: mọi tài sản và bài học đều bắt đầu ở trạng thái tạm giữ, và chỉ những nội dung vượt qua cổng kiểm tra bảo mật mới trở thành ứng viên phát hành để con người phê duyệt.

## Thành phần bao gồm

1. **artifact-assemble** tập hợp danh mục sản phẩm bàn giao, nhật ký quyết định, ghi chú tổng kết và điều khoản bảo mật thành một hồ sơ đóng dự án có trích dẫn nguồn.
2. **asset-identify** chấm điểm các tài sản ứng viên có thể tái sử dụng và kiểm tra xem gói sản phẩm bàn giao cuối cùng đã đầy đủ hay chưa.
3. **lesson-cluster** phân nhóm các quyết định có trích dẫn và ý kiến tổng kết thành các chủ đề bài học kinh nghiệm được xếp hạng.
4. **sanitize-check** sàng lọc mọi tài sản và bài học để tìm thông tin định danh khách hàng, dữ liệu cá nhân, số liệu thương mại, tài liệu có bản quyền cấp phép và rủi ro suy luận khi gộp dữ liệu (aggregation risk), đồng thời giữ lại bất kỳ mục nào không đạt.
5. **knowledge-record** soạn thảo bản ghi tri thức phục vụ bộ phận chuyên môn rà soát, các chủ đề bài học, bản tóm tắt quá trình làm sạch dữ liệu và thông tin bàn giao hồ sơ năng lực từ đầu ra đã được kiểm soát.

## Trước khi bắt đầu

Danh mục sản phẩm bàn giao, nhật ký quyết định, ghi chú tổng kết và điều khoản bảo mật của khách hàng cho dự án. Không cần connector nào; bạn có thể cung cấp tệp trực tiếp hoặc trỏ đến tệp trong SharePoint hoặc OneDrive.

Các quy tắc bảo mật và làm sạch dữ liệu đi kèm trong thư mục `references/` của mỗi kỹ năng chỉ là bản tóm tắt minh họa. Hãy thay thế bằng chính sách được kiểm soát của công ty bạn và điều khoản khách hàng trước khi dựa vào kết quả đầu ra.

Tri thức được phát hành từ plugin này có thể làm đầu vào cho plugin **Engagement Mobilization Pack** ở dự án tiếp theo.

## Dùng thử

- **Đóng một dự án:** "Hãy đóng dự án [engagement] của [client] bằng cách sử dụng các sản phẩm bàn giao, nhật ký quyết định và bản tổng kết trong [folder]."
- **Tìm tài sản có thể tái sử dụng:** "Chúng ta có thể tái sử dụng những gì từ dự án [engagement], và gói sản phẩm bàn giao cuối cùng đã đầy đủ chưa?"
- **Kiểm tra nội dung an toàn để chia sẻ:** "Hãy chạy cổng kiểm tra bảo mật cho các bài học và tài sản của dự án [engagement] và cho tôi biết mục nào đang bị giữ lại cùng lý do."

## Giới hạn

Công cụ chỉ tạo bản ghi tri thức nháp để bộ phận chuyên môn rà soát. Công cụ không bao giờ tự xuất bản lên kho tri thức, tự gỡ bỏ hạn chế bảo mật, phê duyệt sử dụng ra bên ngoài hay miễn trừ bất kỳ điều khoản nào của khách hàng.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán chuyên môn. Hãy sử dụng dữ liệu dự án giả lập hoặc dữ liệu đã ẩn danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
