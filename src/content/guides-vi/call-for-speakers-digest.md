# Bản tin tổng hợp Call for Speakers

Bản tin email HTML hằng tuần tổng hợp các cơ hội Call for Speakers (CFP) đang mở phù hợp với các chủ đề bạn quan tâm, được lấy nguồn từ các trang theo dõi CFP thực tế thay vì chỉ tìm kiếm chung chung. Hoạt động trong Copilot Studio, Cowork hoặc Scout.

## Lý do skill này ra đời

Tìm kiếm các CFP đang mở là một công việc rời rạc: không có một trang duy nhất nào chứa tất cả, hạn chót liên tục thay đổi, và rất dễ bỏ lỡ cơ hội hoặc cứ thấy lặp đi lặp lại cùng một sự kiện mỗi tuần mà không có tín hiệu gì mới. Skill này đảm nhận công việc lặp đi lặp lại đó, kiểm tra các trang tổng hợp CFP đã biết kết hợp tìm kiếm có mục tiêu, lọc bỏ mọi cơ hội đã đóng, và chỉ đưa lại một cơ hội bạn từng thấy nếu hạn chót của nó hiện thực sự khẩn cấp.

## Điều gì tạo nên sự khác biệt so với tìm kiếm chung chung kiểu "tìm cho tôi vài hội nghị"

- **Nguồn thực tế, không phỏng đoán.** Lấy dữ liệu từ danh sách CFP đang mở công khai của confs.tech và Papercall, kết hợp tìm kiếm có mục tiêu, thay vì cố suy đoán hạn chót từ trang tiếp thị chung của hội nghị.
- **Xác minh trạng thái còn mở.** Loại bỏ bất kỳ sự kiện nào có CFP đã đóng thay vì liệt kê chúng "để tham khảo".
- **Trung thực về thông tin chưa rõ.** Nếu một trang không nêu quyền lợi dành cho diễn giả, bản tin sẽ ghi là "không nêu rõ", không tự suy diễn rằng chi phí đi lại và khách sạn được tài trợ chỉ vì điều đó thường phổ biến.
- **Không lặp lại gây nhiễu.** Một CFP đã xuất hiện trong bản tin trước đó sẽ không hiện lại nữa trừ khi hạn chót hiện đã bước vào tuần cuối cùng — đó là trường hợp duy nhất đáng để nhắc lại lần thứ hai.
- **Ghi nhớ hồ sơ của bạn.** Thiết lập các chủ đề của bạn một lần; mỗi lần chạy sau đó chỉ cần xác nhận ngắn gọn thay vì phải thực hiện lại toàn bộ cuộc phỏng vấn.

## Yêu cầu

Cần có khả năng tìm kiếm web. Việc gửi bản tin dưới dạng email thực tế cần một công cụ email đã kết nối (Gmail hoặc Outlook); nếu không có công cụ này, skill vẫn tạo bản tin nhưng gửi ra dưới dạng tệp thay vì gửi email, và thông báo rõ điều đó.

Bản thân chu kỳ hằng tuần đến từ tính năng lập lịch tác vụ định kỳ của chính nền tảng nơi có hỗ trợ (Cowork và Scout đều hỗ trợ tính năng này), chứ không phải từ bất kỳ thứ gì bên trong skill. Nếu nền tảng bạn đang dùng không hỗ trợ tác vụ theo lịch, bạn sẽ cần kích hoạt thủ công mỗi tuần.

## Các điểm cần lưu ý, hãy đọc trước khi coi kết quả là đầy đủ hoàn toàn

Đây là một công cụ hỗ trợ, không phải sự bảo đảm tuyệt đối. Skill được xây dựng để thực sự kỹ lưỡng, nhưng vẫn có thể bỏ sót thông tin, và bạn nên hiểu rõ lý do để không âm thầm mặc định rằng phạm vi bao phủ đã trọn vẹn trong khi thực tế không phải vậy:

- **Độ phủ phụ thuộc vào khả năng được tìm thấy.** Một số trang chỉ có thể tìm kiếm chứ không thể duyệt trực tiếp (trang danh sách của chúng được kết xuất bằng JavaScript và không trả về dữ liệu thực khi truy xuất trực tiếp), vì vậy skill dựa vào việc lập chỉ mục của công cụ tìm kiếm để bắt được các trang sự kiện riêng lẻ. Nếu một công cụ tìm kiếm chưa lập chỉ mục nội dung nào đó, skill này cũng sẽ không tìm thấy.
- **Phạm vi tìm kiếm là một sự đánh đổi thực sự, không phải bài toán đã giải quyết triệt để.** Mở rộng sang cả một nền tảng hoặc hệ sinh thái (ví dụ Microsoft 365 thay vì chỉ Copilot Studio) giúp bắt được nhiều kết quả hơn đáng kể, nhưng "nhiều hơn đáng kể" không đồng nghĩa với "tất cả", và điều đó cũng kéo theo nhiều đánh giá chủ quan hơn về mức độ liên quan có thể nghiêng theo hướng này hoặc hướng khác. Giữ phạm vi hẹp sẽ chính xác hơn nhưng sẽ bỏ sót các sự kiện mang thương hiệu ở cấp độ bao trùm ngay cả khi nội dung thực tế của chúng phù hợp. Không có thiết lập phạm vi nào đảm bảo không bao giờ bỏ sót.
- **Các cộng đồng mới và rất ngách là khoảng trống dễ xảy ra nhất.** Một CFP từ chuỗi sự kiện hoàn toàn mới, hoặc từ một cộng đồng khu vực nhỏ không có hiện diện web nào ngoài một trang Meetup, chính là loại thông tin mà tìm kiếm tổng quát và các trang tổng hợp chậm nắm bắt nhất.
- **Hãy coi đây là điểm khởi đầu vững chắc, chứ không phải sự thay thế cho việc thỉnh thoảng tự kiểm tra**, đặc biệt đối với những hội nghị lớn hàng đầu mà bạn thực sự không muốn bỏ lỡ. Nếu một sự kiện đủ quan trọng đến mức bỏ lỡ sẽ rất đáng tiếc, bạn vẫn nên tự kiểm tra thủ công định kỳ chứ đừng chỉ dựa hoàn toàn vào bản tin hằng tuần.

## Tác giả

Michael Heath ([Get Automating](https://getautomating.com))
