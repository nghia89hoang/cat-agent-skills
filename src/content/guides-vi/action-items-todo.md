# Chuyển việc cần làm sang To Do

Những việc mọi người nhờ bạn làm thường đến rải rác qua Teams, các cuộc họp và email, và những việc hay bị bỏ quên hiếm khi là những việc khẩn cấp. Kỹ năng này theo dõi cả ba kênh đó, xác định tin nhắn nào chứa một yêu cầu thực sự hướng tới bạn, và lưu từng việc thành một tác vụ trên Microsoft To Do kèm ngày đến hạn, mức độ ưu tiên và liên kết quay lại nguồn gốc của nó.

Kỹ năng chạy theo lịch trình bạn chọn. Microsoft To Do là nơi duy nhất mà kỹ năng ghi tác vụ vào.

## Thiết lập

Gọi kỹ năng một lần và nó sẽ hỏi ba câu hỏi:

1. Danh sách Microsoft To Do nào sẽ nhận các mục được thu thập. Các danh sách hiện có của bạn sẽ được hiển thị, và nếu đặt một tên mới thì hệ thống sẽ tạo danh sách đó.
2. Tần suất quét: mỗi 15 phút, 30 phút, 1 giờ hoặc 2 giờ.
3. Thời điểm quét: liên tục cả ngày mỗi ngày, liên tục cả ngày vào các ngày làm việc trong tuần, trong giờ làm việc vào các ngày làm việc trong tuần, hoặc một lịch trình bạn tự mô tả bằng lời của mình.

Tùy chọn liên tục cả ngày tồn tại vì rất nhiều người làm việc xuyên múi giờ, nơi khung giờ quét từ 9 giờ sáng đến 5 giờ chiều sẽ bỏ sót nửa ngày làm việc.

Quá trình thiết lập sẽ ghi một tệp cấu hình, sau đó tạo tác vụ tự động hóa định kỳ cho bạn. Không có lượt quét nào chạy trước khi quá trình thiết lập hoàn tất.

## Những gì kỹ năng thu thập

Một đầu việc cần làm là bất kỳ nội dung nào yêu cầu bạn thực hiện, quyết định, phản hồi, rà soát, tham dự, chuẩn bị hoặc theo dõi tiếp. Các yêu cầu nhẹ nhàng hoặc hẹn thời gian tương lai vẫn được tính, vì vậy câu kiểu "khi nào rảnh, bạn xem qua cái này giúp mình được không?" sẽ được thu thập y như một hạn chót cứng. Mức độ khẩn cấp không phải là điều kiện bắt buộc.

Yêu cầu phải nhắm cụ thể vào bạn. Điều đó có nghĩa là bạn được nêu tên, được @mention, yêu cầu đến trong cuộc trò chuyện 1:1, hoặc ngữ cảnh hội thoại xung quanh đặt rõ trách nhiệm đó lên vai bạn. Các yêu cầu chung chung gửi cho cả nhóm, tin tham khảo (FYI), cập nhật tiến độ, bản tin (newsletter) và thông báo hệ thống sẽ được bỏ qua.

Có hai việc kỹ năng chủ đích không làm: nó sẽ không tự suy diễn một chủ đề thuộc mảng phụ trách của bạn thành nhiệm vụ được giao ngầm, và nó sẽ không thu thập các lời hứa do chính bạn đưa ra. Những cam kết bạn hứa với người khác có kiểu sai sót khác, và việc gộp cả hai loại vào một danh sách sẽ khiến cả hai đều khó theo dõi thực hiện hơn.

Tiêu đề tác vụ luôn được viết bằng tiếng Anh, ngay cả khi tin nhắn nguồn không phải tiếng Anh.

## Thông tin đi kèm mỗi tác vụ

- **Ngày đến hạn** lấy từ hạn chót được nêu rõ hoặc hàm ý rõ ràng, nếu không có thì mặc định là hôm nay.
- **Mức độ ưu tiên** dựa trên mức độ khẩn cấp phát hiện được. Cao (High) đối với các điểm nghẽn (blocker), leo thang xử lý, ngôn từ kiểu ASAP hoặc hạn chót trong vòng hai ngày. Thấp (Low) đối với các yêu cầu còn bỏ ngỏ hoặc xa trong tương lai. Bình thường (Normal) cho mọi trường hợp còn lại.
- **Gắn thẻ phụ trách** dưới dạng một dòng `Customer:` hoặc `Workstream:` duy nhất ở đầu phần nội dung tác vụ. Khi bằng chứng còn mỏng, dòng này sẽ được bỏ qua, bởi một tác vụ chưa gắn thẻ vẫn xuất hiện trong danh sách, trong khi một tác vụ gắn nhầm tài khoản khách hàng thì không.
- **Liên kết nguồn** dẫn thẳng về tin nhắn Teams, cuộc họp hoặc email gốc.

## Các lệnh

| Lệnh | Tác dụng |
|---|---|
| `setup` | Chạy lại trình hướng dẫn thiết lập và cập nhật tác vụ tự động hóa hiện có |
| `scan now` | Chạy ngay một lượt quét đơn lẻ và hiển thị những gì tìm thấy |
| `status` | Cấu hình hiện tại, thời điểm quét gần nhất, số mục đã thu thập trong 7 ngày qua |
| `pause` / `resume` | Tạm dừng hoặc kích hoạt lại tác vụ tự động hóa |

## Cấu hình tùy chọn

Hai trường trong `config.json` không nằm trong trình hướng dẫn thiết lập:

- `owners`: danh sách tên khách hàng và luồng công việc (workstream) đã biết. Khi thiết lập trường này, việc gắn thẻ sẽ chỉ sử dụng tên nằm trong danh sách của bạn — rất đáng dùng nếu bạn làm việc cố định với một nhóm tài khoản nhất định.
- `excludedChats`: tên cuộc trò chuyện hoặc kênh luôn bỏ qua. Các nhóm chat lưu lượng cao nơi mọi người hay hỏi bâng quơ thường là đối tượng phù hợp nhất.

## Lưu ý về thứ tự tin nhắn mới nhất trên Teams

Kỹ năng xếp hạng các cuộc trò chuyện theo dấu thời gian của tin nhắn gần nhất thay vì trường `lastUpdatedDateTime` của cuộc trò chuyện. Microsoft Graph thường xuyên không cập nhật `lastUpdatedDateTime` trên các cuộc trò chuyện 1:1, khiến một cuộc trò chuyện vừa có tin nhắn sáng nay có thể báo ngày cập nhật gần nhất từ hai năm trước và bị đẩy xuống cuối danh sách. Trong quá trình kiểm thử, vấn đề này đã ảnh hưởng đến nhiều cuộc trò chuyện chứa các yêu cầu thực sự chưa được trả lời.

## Quyền riêng tư

Tác vụ được lưu vào Microsoft To Do của chính bạn. Thông báo được gửi vào cuộc trò chuyện riêng với chính bạn trên Teams. Kỹ năng không bao giờ nhắn tin cho bất kỳ ai khác và không bao giờ chuyển tiếp nội dung của tin nhắn nguồn.

Cấu hình và trạng thái chống trùng lặp (dedupe) được lưu trong thư mục chính (home directory) của bạn, tại `.scout/action-items-todo/`. Xóa thư mục đó để đặt lại hoàn toàn kỹ năng.

## Yêu cầu

Scout, có quyền truy cập Microsoft 365 cho Teams, Outlook, lịch và To Do. Việc thu thập bản chép lời cuộc họp chỉ hoạt động đối với các cuộc họp đã có bản chép lời và chính sách tenant của bạn cho phép đọc.
