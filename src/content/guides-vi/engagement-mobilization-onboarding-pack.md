# Gói Huy động Hợp đồng Dịch vụ

Dành cho các quản lý hợp đồng (engagement manager) đang hướng dẫn hội nhập cho nhân sự mới tham gia một hợp đồng dịch vụ chuyên nghiệp.

Công cụ tổng hợp phạm vi SOW (tuyên bố công việc), tách bạch nhân sự đã được xác nhận khỏi nhân sự mới chỉ ở mức đề xuất, chỉ đối chiếu các tri thức tiền nhiệm đã được phép phát hành, áp dụng sổ đăng ký rào chắn đạo đức (ethical-wall register) và soạn thảo các yêu cầu cấp quyền truy cập theo nguyên tắc đặc quyền tối thiểu (least-privilege), bản tóm tắt thông tin cho nhân sự mới cùng kế hoạch tuần đầu tiên, trong đó mọi quyết định đều có trích dẫn nguồn rõ ràng.

Nguyên tắc thiết kế cốt lõi là nhân sự mới chỉ nên nhận được đúng những gì họ đã được cấp phép ngay từ ngày đầu tiên: không có gì nằm sau rào chắn thông tin, không có gì chưa được phát hành và không có quyền truy cập nào vượt quá nhu cầu của vai trò.

## Thành phần bao gồm

1. **engagement-retrieve** tổng hợp SOW, thư cam kết dịch vụ (engagement letter), hồ sơ theo đuổi cơ hội (pursuit record) và danh sách nhân sự đã xác nhận thành phạm vi hợp đồng.
2. **roster-pull** giải thích rõ ai đã được xác nhận, ai mới ở mức đề xuất, và ai bị loại trừ hoặc cần rà soát thêm.
3. **knowledge-match** đối chiếu tri thức tổng kết kết thúc hợp đồng (closeout knowledge) đã được phát hành với hợp đồng hiện tại và giải thích những nội dung nào đã bị loại trừ.
4. **wall-check** áp dụng sổ đăng ký rào chắn đạo đức và lập danh sách kiểm tra quyền truy cập theo nguyên tắc đặc quyền tối thiểu cho nhân sự mới.
5. **pack-draft** soạn thảo gói huy động, bản tóm tắt thông tin cho nhân sự mới và kế hoạch tuần đầu tiên dựa trên danh sách kiểm tra quyền truy cập đã được kiểm soát.

## Trước khi bắt đầu

SOW, thư cam kết dịch vụ, hồ sơ theo đuổi cơ hội, danh sách nhân sự đã xác nhận, sổ đăng ký rào chắn đạo đức và bảng kiểm kê không gian làm việc (workspace inventory) của hợp đồng. Không yêu cầu connector nào; hãy cung cấp trực tiếp các tệp hoặc trỏ đến chúng trong SharePoint hoặc OneDrive.

Plugin này hoạt động hiệu quả nhất khi kết hợp cùng hai plugin đồng hành:

- **Staffing & Bench Match** cung cấp danh sách nhân sự đề xuất, mà plugin này luôn tách biệt khỏi danh sách nhân sự đã xác nhận.
- **Closeout Knowledge Harvest** cung cấp tri thức tiền nhiệm đã được phát hành để plugin này đối chiếu với hợp đồng mới.

## Dùng thử

- **Huy động cho một hợp đồng:** "Hãy xây dựng gói hội nhập cho [joiner] tham gia hợp đồng [engagement] của khách hàng [client]. SOW và danh sách nhân sự nằm trong [folder]."
- **Kiểm tra rào chắn và quyền truy cập:** "[joiner] có bị hạn chế đối với [client] không? Hãy lập danh sách kiểm tra quyền truy cập cho vai trò của họ."
- **Tìm tri thức tiền nhiệm:** "Nhân sự mới có thể sử dụng những tri thức tiền nhiệm nào trong [engagement], và những tài sản tổng kết kết thúc hợp đồng nào đã bị loại trừ cùng lý do vì sao?"

## Giới hạn

Các gói huy động dạng bản nháp để con người rà soát. Công cụ không bao giờ tự động cấp quyền truy cập, chấp thuận ngoại lệ rào chắn đạo đức, phân công nhân sự, gửi tin nhắn hay phê duyệt bất cứ nội dung nào.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán chuyên môn. Hãy sử dụng dữ liệu hợp đồng giả lập hoặc đã được ẩn danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
