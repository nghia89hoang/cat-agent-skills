# Đánh giá tác động RAI cho Agent

Một skill dành cho kiến trúc sư và người rà soát khi đánh giá cách một AI agent có thể tác động đến con người thông qua lời khuyên, quyền truy cập dữ liệu và các hành động của nó. Skill chuyển hóa một trường hợp sử dụng (use case) và bằng chứng thiết kế thành bản dự thảo đánh giá tác động Trí tuệ nhân tạo có trách nhiệm (Responsible AI) để con người có trách nhiệm xem xét.

## Sản phẩm đầu ra

- Một bản tóm tắt quyết định xác định những tác động trọng yếu nhất và các khoảng trống bằng chứng.
- Một góc nhìn các bên liên quan bao quát lợi ích, gánh nặng và những người không sử dụng nhưng vẫn bị ảnh hưởng.
- Một bản đồ thẩm quyền (authority map) cho thấy những gì agent có thể làm và nơi các biện pháp kiểm soát được thực thi.
- Các kịch bản gây hại cụ thể gắn liền với các biện pháp kiểm soát hiện có/đề xuất và mức độ không chắc chắn còn tồn đọng.
- Các cổng kiểm soát đánh giá (evaluation gate), trách nhiệm sở hữu biện pháp giảm thiểu rủi ro, cơ chế khắc phục khiếu nại (recourse) và các điều kiện kích hoạt đánh giá lại.

Skill hoạt động theo bốn chế độ: phân loại sơ bộ một trang khi mới có ít thông tin thiết kế, đánh giá đầy đủ, phản biện một bản đánh giá hiện có, và đánh giá lại khi có thay đổi. Đối với các agent được xây dựng trong Copilot Studio, một bản đồ bằng chứng đi kèm sẽ chỉ rõ cần yêu cầu những bằng chứng cấu hình, tri thức, công cụ, xác thực và phân tích nào cho từng góc nhìn rà soát.

Skill phân biệt rõ giữa một mối nguy được nhận diện với một sự cố đã quan sát thực tế, và giữa một biện pháp giảm thiểu được đề xuất với một biện pháp kiểm soát đã được kiểm thử. Nó không tự động chấm điểm tuân thủ hay phê duyệt phát hành.

## Các prompt ví dụ

> Đánh giá agent mua sắm này trước khi chạy thử nghiệm (pilot). Agent soạn thảo yêu cầu mua hàng và có thể gửi đi sau khi người mua phê duyệt. Hãy sử dụng hợp đồng công cụ (tool contract), thiết kế danh tính, luồng dữ liệu và kết quả đánh giá đính kèm. Tập trung vào đối tượng có thể bị tổn hại, thẩm quyền hành động, tính chất phê duyệt thực chất và khả năng khôi phục sau khi công cụ bị quá thời gian chờ (timeout).

> Rà soát bản đánh giá RAI của agent này. Chỉ ra các kết luận thiếu căn cứ, các bên bị ảnh hưởng mà chúng ta đã bỏ sót, và các biện pháp giảm thiểu chưa có cơ chế thực thi hoặc bằng chứng kiểm thử. Tách bạch các sự cố đã quan sát thực tế khỏi các kịch bản giả định.

> Đánh giá lại agent đính kèm sau khi bật bộ nhớ xuyên phiên (cross-session memory) và thêm công cụ cập nhật hồ sơ khách hàng. Chỉ ra những kết luận trước đây nào thay đổi và cần chạy những bài kiểm thử hồi quy nào.

## Đầu vào và năng lực của môi trường lưu trữ

Bắt đầu với trường hợp sử dụng, những người bị ảnh hưởng, nguồn tri thức/dữ liệu, hành động của công cụ, danh tính/quyền hạn, sự tham gia của con người và các bằng chứng hiện có. Sơ đồ đã che thông tin nhạy cảm, hợp đồng công cụ, trích đoạn chính sách và kết quả kiểm thử sẽ giúp cải thiện chất lượng đánh giá. Không cần kết nối trực tiếp tới tenant hay thông tin xác thực.

Môi trường lưu trữ (host) phải nạp được `SKILL.md` cùng các tài liệu tham chiếu Markdown đi kèm và chấp nhận văn bản hoặc tệp được cung cấp. Quyền truy cập web là tùy chọn; nếu không có, các nhận định bên ngoài tại thời điểm hiện tại sẽ vẫn ở trạng thái chưa được xác minh. Skill tạo ra văn bản/Markdown và không phụ thuộc vào script, trình kết nối (connector), thư viện tạo tài liệu hay một nhà cung cấp mô hình cụ thể nào.

## Khả năng tương thích và ghi nhận nguồn

Skill này được phát hành cho Copilot Studio. Nó là định dạng Markdown thuần túy, không có script, trình kết nối hay tính năng phụ thuộc mô hình cụ thể, và chỉ cần `SKILL.md` cùng thư mục `references/` đi kèm. Kết quả phụ thuộc vào chất lượng bằng chứng thiết kế mà bạn cung cấp.

Phương pháp này tham khảo các tài nguyên Microsoft Responsible AI được công bố rộng rãi: Hướng dẫn và Mẫu Đánh giá Tác động năm 2022 (2022 Impact Assessment Guide and Template), các yêu cầu chung của Tiêu chuẩn Trí tuệ nhân tạo có trách nhiệm phiên bản 2 (Responsible AI Standard v2), và tài liệu hướng dẫn trên Microsoft Learn cho agent và Copilot Studio. Bản đồ thẩm quyền, các prompt chuỗi gây hại, bước kiểm tra ràng buộc phê duyệt, trạng thái bằng chứng, phương pháp heuristic sắp xếp ưu tiên, các loại hệ quả và bản đồ bằng chứng Copilot Studio là các phần mở rộng hướng tới agent do tác giả xây dựng nguyên bản, không phải các biện pháp kiểm soát được Microsoft chứng thực. Các vai trò phê duyệt nội bộ của Microsoft không mang tính ràng buộc đối với các tổ chức khác; hãy sử dụng cơ chế quản trị của riêng bạn và xem mọi ánh xạ sang các khung chuẩn chỉ như một cách diễn giải. Không có tài liệu nào của Microsoft hay NIST được phân phối lại trong gói này. Đây là một đóng góp từ cộng đồng, không phải bản đánh giá chính thức, chứng nhận hay kết luận pháp lý của Microsoft.
