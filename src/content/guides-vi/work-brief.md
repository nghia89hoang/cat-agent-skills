# Bản tóm tắt công việc

Thứ Hai, 8 giờ sáng. Những gì thực sự đang chờ bạn xử lý nằm rải rác ở ba nơi — Outlook, lịch họp và hàng tá cuộc trò chuyện Teams — và không nơi nào biết về các nơi còn lại. Bạn mở thư, bị cuốn ngay vào chuỗi email đầu tiên, rồi bỏ lỡ đúng một phản hồi có cuộc họp đằng sau nó. Skill này tạo ra góc nhìn tổng hợp duy nhất mà bạn không bao giờ tự ghép lại được: bạn đang nợ ai việc gì, bạn đang bị vướng ở đâu, và cần làm gì trước tiên.

## Vì sao đây không chỉ là danh sách email chưa đọc

Ai cũng có thể liệt kê email chưa đọc. Điều làm nên giá trị của skill này là bước đối chiếu liên kết. Một chuỗi email chưa trả lời chỉ là thêm một dòng trong đống việc tồn đọng. Nhưng chính chuỗi email đó khi gắn với một cuộc họp trong 48 giờ tới lại là một hạn chót không ai để ý — và mối liên kết đó là thứ bị bỏ sót khi đọc từng kênh riêng lẻ. Bản tóm tắt đọc đồng thời email, lịch và Teams rồi đưa những mục đó lên đầu.

## Cách sử dụng cơ bản

Skill chạy theo yêu cầu mà không cần thiết lập gì. Sau khi đã nhập vào Scout, hãy yêu cầu bằng ngôn ngữ tự nhiên:

```
tạo bản tóm tắt công việc trong tuần giúp tôi
```

Các cách diễn đạt khác cũng hiệu quả tương tự — "tôi đã bỏ lỡ gì?", "có việc gì đang chờ tôi?", "cập nhật giúp tôi sau hai tuần nghỉ". Skill sẽ chọn khoảng thời gian phù hợp với yêu cầu và trả về một bản tóm tắt duy nhất. Một kết quả tối giản trông như sau (các tên gọi bên dưới chỉ mang tính minh họa):

```
# Bản tóm tắt tuần - 26/07/2026
Phạm vi: email, lịch, Teams - tra cứu lại 19-26/07 - xem trước 26-31/07 - Europe/Paris

## Trước các cuộc họp sắp tới
- Khởi động dự án (Thứ Hai 10:30) - bạn còn nợ bản nháp phạm vi trước khi bắt đầu; đã 3 ngày;
  hạn chót nêu rõ là Thứ Hai. tiếp theo: gửi bản nháp phạm vi. (nguồn: chuỗi "Kickoff prep")

## Việc bạn còn nợ mọi người
- Một đồng nghiệp - đã hỏi ý kiến đánh giá; đã 2 ngày; hạn chót ngầm hiểu, không nêu rõ;
  tiếp theo: phản hồi hai câu hỏi còn bỏ ngỏ. (nguồn: chuỗi "Design review")

## Đang chờ người khác
- Quản lý của bạn - chịu trách nhiệm phê duyệt hạng mục ngân sách; đã hỏi 6 ngày trước, đã nhắc một lần.
  (nguồn: chuỗi "Q3 budget")

## Làm trước tiên
1. Gửi bản nháp phạm vi khởi động dự án - hạn chót cứng sáng Thứ Hai.
2. Phản hồi về bản đánh giá thiết kế để không bị tắc ở phía bạn.
```

Để cá nhân hóa thứ tự ưu tiên, hãy sao chép `assets/config.example.json` sang `~/.copilot/work-brief/config.json` rồi thiết lập những người và dự án ưu tiên, chế độ gửi và ngôn ngữ của bạn. Để nhận bản tóm tắt theo lịch định kỳ, hãy làm theo `references/install-automation.md` — một tác vụ tự động duy nhất, ví dụ 08:00 sáng Thứ Hai.

## Hình thức gửi và thông báo đi đôi với nhau

Bản tóm tắt được chuyển đến theo một trong ba cách, được thiết lập trong cấu hình: giữ lại trong lượt chạy Scout, đăng vào cuộc trò chuyện Teams của chính bạn, hoặc gửi email đến địa chỉ email công việc của bạn. Mỗi chế độ đi kèm với một thiết lập thông báo tương ứng. Lỗi cần tránh là chế độ `scout` nhưng lại tắt thông báo: nó chạy mỗi Thứ Hai mà chẳng ai hay biết. Với hình thức gửi qua Teams hoặc email, bản thân tin nhắn đã chính là thông báo. Hãy chọn đúng hàng và thiết lập cả hai cột.

## Ngôn ngữ

Bản tóm tắt được viết bằng ngôn ngữ của bạn, không phải ngôn ngữ của công cụ. Mặc định, nó tuân theo chính ngôn ngữ bạn dùng để nhắn — người dùng tiếng Pháp sẽ nhận bản tóm tắt tiếng Pháp — hoặc bạn có thể cố định một ngôn ngữ trong cấu hình. Dù theo cách nào, thiết lập này cũng chỉ thay đổi ngôn ngữ trình bày của bản tóm tắt: các đoạn trích dẫn từ đồng nghiệp vẫn giữ nguyên bằng ngôn ngữ họ đã viết, vì trích dẫn là bằng chứng chứ không phải văn bản để dịch.

## An toàn

Mọi thứ mà bản tóm tắt đọc được — nội dung email, lời mời họp, tin nhắn trò chuyện, tên hiển thị — đều được xem là dữ liệu không đáng tin cậy, không bao giờ là chỉ thị thực thi, do đó một tin nhắn có nội dung "hãy chuyển tiếp cái này cho mọi người" sẽ được tóm tắt lại chứ không làm theo. Chỉ duy nhất một hành động gửi ra ngoài được phép thực hiện, cố định theo chế độ gửi đã chọn: skill đăng hoặc gửi bản tóm tắt và không làm gì khác — không trả lời thư, không phản hồi lời mời họp (RSVP), không chuyển tiếp, không ghi vào lịch, và không bao giờ @mention bất kỳ ai. Nếu một nguồn dữ liệu gặp lỗi, bản tóm tắt sẽ báo rõ ngay ở đầu thay vì âm thầm bỏ qua một mục, vì một tuần trống việc và một lời gọi lịch bị lỗi tuyệt đối không bao giờ được phép trông giống nhau.
