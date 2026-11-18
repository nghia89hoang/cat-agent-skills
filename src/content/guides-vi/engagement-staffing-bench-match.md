# Phân công Nhân sự & Ghép nguồn Dự bị

Dành cho quản lý nguồn lực và đối tác phụ trách hợp đồng (engagement partner) khi bố trí nhân sự cho một hợp đồng mới ký kết.

Công cụ trích xuất các vai trò từ SOW, nạp dữ liệu danh sách nhân sự dự bị (bench), mức độ sẵn sàng, đơn giá và sổ đăng ký xung đột lợi ích, chấm điểm mức độ phù hợp của từng ứng viên, từ chối các ứng viên có xung đột hoặc không sẵn sàng kèm trích dẫn quy tắc cụ thể, và soạn thảo đề xuất phân công nhân sự sẵn sàng trình đối tác duyệt.

Nguyên tắc thiết kế cốt lõi là sự phù hợp hoàn hảo trên giấy tờ sẽ trở nên vô nghĩa nếu người đó không thể phân công thực tế: tính độc lập, xung đột lợi ích và mức độ sẵn sàng được kiểm tra trước khi bất kỳ ai được đưa vào danh sách đề cử, và mọi trường hợp từ chối đều nêu rõ lý do.

## Thành phần bao gồm

1. **role-intake** đọc hợp đồng đã ký, bản trích xuất vai trò từ SOW hoặc yêu cầu nhân sự thành danh sách các vai trò cần bổ sung, mỗi trường thông tin đều có trích dẫn.
2. **bench-query** nạp dữ liệu nhân sự dự bị, mức độ sẵn sàng, đơn giá và sổ đăng ký xung đột lợi ích cho các vai trò đó.
3. **fit-score** chấm điểm mức độ phù hợp giữa ứng viên và vai trò, bổ sung bối cảnh hiệu suất sử dụng nguồn lực (utilisation) và lập bảng xếp hạng tạm thời.
4. **constraint-check** áp dụng các quy tắc về tính độc lập, xung đột lợi ích, vai trò trước đây, rào chắn thông tin (ethical wall) và mức độ sẵn sàng để loại các ứng viên không đủ điều kiện.
5. **slate-draft** soạn thảo bản đề xuất phân công nhân sự trình đối tác, bao gồm cả những ứng viên phù hợp nhất nhưng bị từ chối và các khoảng trống nhân sự còn thiếu.

## Trước khi bắt đầu

Tài liệu SOW hoặc yêu cầu bố trí nhân sự, danh sách nhân sự dự bị kèm kỹ năng và cấp bậc, dữ liệu mức độ sẵn sàng, đơn giá cùng sổ đăng ký xung đột lợi ích và tính độc lập. Không yêu cầu connector nào; bạn chỉ cần cung cấp tệp trực tiếp hoặc trỏ đến chúng trong SharePoint hoặc OneDrive.

Các quy tắc về tính độc lập và điều kiện đủ tiêu chuẩn được đóng gói trong thư mục `references/` của mỗi skill chỉ là bản tóm tắt minh họa, không phải chính sách thực tế của bất kỳ công ty nào. Hãy thay thế chúng bằng quy tắc riêng của tổ chức bạn trước khi dựa vào kết quả đầu ra.

Danh sách nhân sự đề xuất do plugin này tạo ra có thể dùng làm đầu vào cho plugin **Engagement Mobilization Pack**.

## Dùng thử

- **Bố trí nhân sự cho hợp đồng mới:** "Chúng tôi vừa ký hợp đồng [engagement] với [client]. Hãy trích xuất các vai trò từ SOW trong [folder] và lập danh sách nhân sự đề cử cho tôi."
- **Kiểm tra điều kiện hợp lệ:** "Có ai trong danh sách rút gọn cho [engagement] bị xung đột lợi ích với [client] không? Tại sao chúng ta không thể sử dụng ứng viên phù hợp nhất?"
- **Soạn thảo bản đề xuất:** "Hãy soạn thảo tờ trình phê duyệt gửi đối tác cho danh sách nhân sự đề cử của [engagement]."

## Giới hạn

Các đề xuất phân công nhân sự nháp dùng để đối tác rà soát. Công cụ không bao giờ tự phê duyệt, phân bổ hay gán nhân sự, thay đổi đơn giá hoặc ghi đè một quyết định về tính độc lập.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán chuyên môn. Hãy sử dụng dữ liệu nhân sự giả lập hoặc đã ẩn danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
