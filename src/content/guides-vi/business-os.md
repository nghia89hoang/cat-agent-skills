# Business OS

Business OS là một hệ điều hành thực tiễn dành cho Copilot Studio. Nó mang lại cho các agent một cách tiếp cận nhất quán để xử lý công việc kinh doanh thực tế, bao gồm giải quyết vấn đề, ra quyết định, lập kế hoạch dự án, cải tiến quy trình, xử lý sự cố, quản trị, và biến những công việc lặp đi lặp lại thành các skill có thể tái sử dụng.

## Tại sao nên dùng Business OS thay vì trải nghiệm Copilot tiêu chuẩn?

Một trải nghiệm Copilot tiêu chuẩn có thể trả lời câu hỏi và hoàn thành tác vụ bằng prompt, hướng dẫn, tri thức và ngữ cảnh sẵn có. Business OS bổ sung thêm một phương pháp làm việc có cấu trúc lên trên nền tảng đó.

Nó giúp agent làm rõ kết quả đầu ra trước khi lao ngay vào trả lời, chọn mức độ cấu trúc phù hợp cho tác vụ, xử lý các vấn đề và quyết định một cách nhất quán, đồng thời tạo ra những đầu ra dễ hành động và dễ tái sử dụng hơn.

Điều này hữu ích khi bạn muốn các agent Copilot Studio làm được nhiều hơn việc chỉ tạo ra một câu trả lời đơn lẻ chất lượng. Business OS được thiết kế cho những công việc kinh doanh lặp lại, nơi chất lượng của phương pháp tiếp cận cũng quan trọng ngang với câu trả lời cuối cùng.

## Trước khi bắt đầu

Business OS được thiết kế cho Microsoft Copilot Studio Agent Skills. Mặc định nó không yêu cầu dịch vụ hay tài khoản bên ngoài.

Khi sử dụng theo đặc thù tổ chức, bạn có thể bổ sung chính sách, quy tắc phê duyệt, thuật ngữ, cấu trúc và cách làm việc riêng thông qua phương pháp Company DNA đi kèm trong skill. Skill được thiết kế để không tự bịa đặt những thông tin này khi chưa được cung cấp.

## Cách sử dụng

Hãy dùng Business OS cho những yêu cầu mà agent cần làm nhiều hơn việc đưa ra một câu trả lời sự kiện đơn giản hoặc viết lại một đoạn văn bản ngắn.

Ví dụ:

- "Chúng tôi có ba phương án để thay thế quy trình này. Hãy giúp tôi quyết định nên chọn phương án nào."
- "Dự án này liên tục bị trễ tiến độ. Hãy tìm hiểu xem điều gì đang trục trặc và chúng tôi nên làm gì tiếp theo."
- "Biến ý tưởng này thành một kế hoạch dự án thực tế."
- "Lập sơ đồ quy trình này và chỉ ra những chỗ có thể cải thiện."
- "Giúp tôi xử lý sự cố kinh doanh này và đảm bảo chúng tôi ghi nhận lại được bài học kinh nghiệm."
- "Chúng tôi cứ phải làm đi làm lại tác vụ này một cách thủ công. Hãy đánh giá xem nó có nên trở thành một Agent Skill hay không."

Trước tiên, skill sẽ xác định kết quả mong muốn, phân loại loại công việc và lựa chọn cách tiếp cận tương xứng. Công việc đơn giản giữ nguyên sự đơn giản. Những công việc phức tạp hoặc có rủi ro cao hơn có thể sử dụng các hướng dẫn đi kèm về ra quyết định, giải quyết vấn đề, quy trình, dự án, sự cố, truyền thông, quản trị và tạo skill.

## Thành phần đi kèm

Tệp `SKILL.md` chính đóng vai trò như một bộ định tuyến gọn nhẹ. Tài liệu hỗ trợ chỉ được sử dụng khi có liên quan đến tác vụ.

Gói bao gồm:

- Phân loại công việc và định cỡ phản hồi
- Hỗ trợ ra quyết định
- Giải quyết vấn đề và phân tích nguyên nhân gốc rễ
- Thiết kế và cải tiến quy trình
- Lập kế hoạch dự án
- Xử lý sự cố và rút kinh nghiệm
- Truyền thông doanh nghiệp và đầu ra cuộc họp
- Quản trị, bằng chứng, mức độ tin cậy và kiểm tra chất lượng
- Ngữ cảnh đặc thù của doanh nghiệp thông qua Company DNA
- Các mẫu có thể tái sử dụng cho những đầu ra kinh doanh phổ biến
- Một Skill Generator để đánh giá và soạn thảo các skill mới có thể tái sử dụng

## Thông tin hữu ích

Business OS có phạm vi rộng một cách có chủ đích, nhưng nó không nên ghi đè một skill chuyên biệt hơn đã được cài đặt vốn phù hợp hơn với tác vụ. Skill được thiết kế để điều hướng công việc hợp lý và chỉ nạp những hướng dẫn thực sự cần thiết.

Skill không mặc định rằng một hành động đã hoàn tất chỉ vì nó được đề xuất hoặc soạn thảo. Nó tách bạch dữ kiện khỏi giả định, tránh tự bịa ra các quy tắc đặc thù của tổ chức, và nêu rõ khi nào một nội dung vẫn cần con người phê duyệt hoặc xác minh.

Mọi chính sách, ngưỡng phê duyệt, hệ thống hoặc thuật ngữ đặc thù của tổ chức đều cần do chính tổ chức cung cấp.

## Tác giả

Được tạo bởi Matthew James Davis.

Thêm nhiều Agent Skills và tài nguyên khác: https://agentskillslibrary.ai
