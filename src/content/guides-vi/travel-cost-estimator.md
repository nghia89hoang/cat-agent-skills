# Trình ước tính chi phí công tác

"Chuyến công tác đó tốn khoảng bao nhiêu?" là câu hỏi thường được trả lời bằng một con số đoán chừng, và sự phỏng đoán đó sai đủ nhiều khiến mọi người không còn tin vào con số nữa. Kỹ năng này trả lời câu hỏi đó bằng **giá vé trực tiếp (live fares)** lấy từ công cụ đặt chỗ doanh nghiệp của bạn, đồng thời bổ sung các hạng mục mà công cụ đặt chỗ không bao phủ bằng cách đối chiếu với **các báo cáo chi phí đã được phê duyệt của chính bạn** — nhờ vậy con số hoàn toàn đứng vững khi quản lý của bạn chất vấn.

Kỹ năng tạo ra một bản ước tính có thể chuyển tiếp ngay: con số tổng quan, bảng chi phí, toàn bộ các phương án đã cân nhắc và các giả định được ghi rõ là giả định.

## Phần quan trọng nhất: kỹ năng không bao giờ đặt chỗ bất cứ thứ gì

Công cụ đặt chỗ doanh nghiệp của bạn là một hệ thống đặt chỗ thực tế. Tiền thật, vé thật, phí đổi vé thật. Việc thả lỏng một agent thao tác trong hệ thống đó là một ý tưởng cực kỳ tồi trừ khi ranh giới được đặt ra rõ ràng, vì vậy ranh giới là điều đầu tiên trong kỹ năng và mang tính tuyệt đối:

> **Chỉ tìm kiếm và lấy giá.** Không bao giờ nhấp vào `Continue` vượt quá bước chọn hạng vé, `Select hotel` để đi vào luồng đặt phòng, `Book`, `Reserve`, `Hold`, `Confirm`, hoặc bất kỳ thành phần nào trên trang thông tin hành khách hay trang thanh toán. Việc đọc giá từ trang kết quả là an toàn. Trang kết quả chính là điểm dừng.

Nếu một luồng thao tác vô tình đi tới trang thanh toán hoặc trang thông tin hành khách, kỹ năng sẽ dừng lại và báo cho bạn biết vị trí hiện tại thay vì tự bấm quay lại. Mọi bản ước tính được tạo ra đều ghi rõ **"Nothing booked."** (Chưa đặt bất kỳ dịch vụ nào.)

## Điểm khác biệt của kỹ năng

**Kỹ năng đối chiếu các khoản mục không đặt qua cổng với chi phí hoàn trả thực tế của bạn.** Di chuyển mặt đất, ăn uống và đỗ xe không có trong công cụ đặt chỗ, và đây chính xác là nơi các con số ước tính thường bị suy đoán tùy tiện. Kỹ năng lấy tổng chi phí từ các báo cáo chi phí đã được phê duyệt của chính bạn cho những chuyến đi tương tự rồi suy ra các con số từ đó — sau đó gắn nhãn "giả định" ("assumption") trong bảng thay vì ngụy trang chúng như giá đã báo.

**Kỹ năng luôn đưa ra một lựa chọn thay thế rẻ hơn đáng kể**, ngay cả khi lựa chọn đó phá vỡ hãng hàng không hoặc chuỗi khách sạn ưa thích mà bạn đã nêu. Bạn sẽ thấy rõ sự đánh đổi — chi phí so với khoảng cách gần điểm đến so với hạng thành viên thân thiết — và tự mình quyết định. Kỹ năng không âm thầm tối ưu theo giá, cũng không âm thầm tối ưu theo sở thích của bạn. Việc chỉ trình bày một phương án như thể đó là lựa chọn duy nhất chính là lỗi mà kỹ năng được xây dựng để tránh.

**Kỹ năng nắm rõ các mẹo xử lý DOM giúp các cổng đặt chỗ này hoạt động được.** Các công cụ đặt chỗ doanh nghiệp thường cũ kỹ, chậm chạp và gây khó khăn cho tự động hóa. Kỹ năng tích hợp sẵn các mẫu xử lý đặc thù:

- **Các trường ngày tháng là ô nhập ẩn (hidden input) nằm sau tiện ích lịch.** Việc gán trực tiếp `.value` bị framework bỏ qua — bạn phải đi qua setter gốc của `HTMLInputElement.prototype` và tự kích hoạt các sự kiện `input`/`change`/`blur`. Điều khiển bộ chọn lịch hiển thị bên ngoài vừa thiếu ổn định vừa chậm.
- **Các điều khiển chọn địa điểm là widget kiểu select2** với thẻ `<select>` thực tế mang thuộc tính `aria-hidden` và không thể nhấp vào. Bạn cần điều khiển thẻ `span` đại diện (proxy) đang hiển thị.
- **Chọn mục sân bay, không chọn mục vùng đô thị/thành phố** — mục thành phố phân giải sang một tập danh sách chuyến/phòng khác và kém hữu ích hơn nhiều.
- **Kết quả mất khoảng ~20 giây để tải.** Hãy đọc văn bản trên trang thay vì chụp ảnh DOM (snapshot); bảng kết quả rất lớn và việc chụp snapshot chỉ làm tốn ngữ cảnh vô ích.
- **Thao tác nhấp tìm kiếm bị quá thời gian chờ (timeout) chuyển trang thường đã gửi yêu cầu thành công.** Việc thử lại sẽ dẫn đến gửi trùng hai lần.
- **Không tái sử dụng liên kết sâu (deep link) có chứa token phiên làm việc** — nó sẽ hết hạn và biểu hiện lỗi là một trang báo "Cookies are disabled" gây hiểu nhầm, chứ không phải lỗi phiên.

**Một bẫy kỹ thuật cực kỳ đáng lưu ý:** khi chuyển tiếp bản ước tính qua Teams, hãy phân giải người nhận theo **UPN**, đừng dùng bí danh SMTP dạng tên đẹp (vanity SMTP alias). `First.Last@company.com` hoạt động bình thường với email nhưng sẽ làm thao tác tạo chat Teams thất bại với lỗi `user_not_found`. Lỗi đó trông như thể "người này không tồn tại" nhưng thực ra không phải vậy.

## Cách sử dụng

1. Yêu cầu ước tính chi phí một chuyến đi — ví dụ: "tính giá cho chuyến thăm khách hàng ở Orlando hai ngày vào tuần ngày 26".
2. Xác nhận các tùy chọn công tác trong lần đầu tiên: sân bay xuất phát, hãng hàng không và chuỗi khách sạn ưa thích, hạng ghế được phép theo chính sách công ty. Kỹ năng sẽ tái sử dụng các thông tin này ở các lần sau nhưng luôn xác nhận lại ngày đi ở mỗi lượt chạy.
3. Theo dõi quá trình kỹ năng tra giá vé máy bay và khách sạn, hoặc không cần cũng được — kỹ năng sẽ ghi toàn bộ chi tiết tính toán ra một tệp.
4. Đọc con số tổng quan cùng một hoặc hai điểm cần cân nhắc mà kỹ năng gắn cờ.
5. Tùy chọn nhờ kỹ năng soạn sẵn tin nhắn gửi cho người phê duyệt. Kỹ năng sẽ hiển thị nguyên văn nội dung và người nhận để chờ bạn xác nhận trước khi gửi.

## Yêu cầu

- Công cụ tự động hóa trình duyệt (Playwright) với phiên đăng nhập một lần (SSO) sẵn có vào công cụ đặt chỗ doanh nghiệp của bạn. Kỹ năng không bao giờ hỏi thông tin đăng nhập — nếu SSO không hoạt động, kỹ năng sẽ dừng lại.
- Quyền đọc hộp thư của chính bạn, phục vụ bước đối chiếu báo cáo chi phí.
- Các bộ chọn DOM (DOM selector) được viết cho các cổng thuộc họ Cytric/Amadeus. Concur Travel, Egencia và các công cụ tương tự sử dụng tên trường khác — chỉ cần kiểm tra một lần và thay thế. Các **kỹ thuật** (setter gốc, proxy select2, thời gian chờ dài) áp dụng nguyên vẹn sang các nền tảng khác.

## Mẹo sử dụng

- **Đừng bỏ qua bước xác nhận sân bay xuất phát.** Việc đoán sân bay từ tên thành phố sẽ âm thầm tạo ra một con số nghe có vẻ hợp lý nhưng vô dụng khi vùng đô thị của bạn có nhiều sân bay.
- Hãy hỏi kỹ năng một cách rõ ràng xem có khả năng cần thuê xe ô tô hay không. Đây là nguyên nhân phổ biến nhất khiến bản ước tính bị thấp hơn thực tế.
- Giá cả biến động hằng ngày. Một bản ước tính chỉ là ảnh chụp nhanh tại thời điểm tra cứu, và kỹ năng luôn nêu rõ điều này trong mọi kết quả đầu ra — hãy chạy lại nếu chuyến đi còn cách hơn vài tuần.
- Bản ước tính chứa ngày đi, điểm đến và tên khách hàng của bạn. Hãy xem đây là thông tin riêng tư cho đến khi bạn quyết định chia sẻ.

## Giới hạn đã biết

- Chỉ ước tính. Theo thiết kế, kỹ năng không thể và sẽ không đặt chỗ, giữ chỗ hay xác nhận bất cứ thứ gì.
- Giá vé không được giữ chỗ. Mức giá báo hôm nay không phải là mức giá bạn sẽ trả vào tuần tới.
- Các bộ chọn (selector) phụ thuộc vào từng cổng cụ thể và sẽ cần điều chỉnh khi dùng cho công cụ đặt chỗ khác.
