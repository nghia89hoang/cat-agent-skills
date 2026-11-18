# Tổng quan

Hãy yêu cầu một mô hình viết truy vấn KQL và bạn sẽ nhận được ngay lập tức. Định dạng đẹp,
toán tử hợp lý, nhưng thỉnh thoảng lại có một cột chưa từng tồn tại trong bảng đó.

Mô hình không lưu sẵn lược đồ (schema) nào để đối chiếu. Nó viết ra một tên cột
chỉ vì cái tên đó thường đi kèm trong KQL, còn việc cột đó có thực sự tồn tại trong bảng hay không
thì không hề được tra cứu. Một cột có thật và một cột được bịa ra trông giống hệt nhau ở kết quả trả về, nên bạn
không thể phân biệt được mình đã nhận loại nào chỉ qua câu trả lời.

Các bảng bảo mật của Microsoft càng khiến vấn đề này tệ hơn hầu hết các trường hợp khác. Những tên cũ đã ngừng sử dụng nằm trong
dữ liệu huấn luyện nhiều hơn hẳn so với các tên thay thế chúng, bảng bị đổi tên giữa năm,
tài liệu cập nhật chậm hơn cổng thông tin, và một số bảng bản xem trước (preview) phát hành mà chưa có
tài liệu tham chiếu cột nào được công bố.

Skill này buộc mô hình phải kiểm tra xong rồi mới được phép trả lời.

## Trước khi bắt đầu

> ⚠️ **Dịch vụ bên ngoài, không thuộc Microsoft.** Thành phần tùy chọn KQL Search MCP (`kqlsearch.com`)
> là một dịch vụ do cộng đồng vận hành, không được xây dựng, quản lý hay chứng thực bởi Microsoft.
> Skill này không tự động kết nối đến dịch vụ đó; bạn tự cấu hình connector
> và chính sách của tổ chức bạn có thể chặn kết nối này. Các lượt tìm kiếm gửi tới đó sẽ rời khỏi
> môi trường Microsoft và được xử lý theo điều khoản riêng của dịch vụ đó, vì vậy bạn tự chịu rủi ro
> khi sử dụng. Hãy kiểm tra xem việc này có được phép hay không trước khi dùng với dữ liệu nhạy cảm
> hoặc liên quan đến sự cố.

Có một điều bắt buộc: agent phải có cách đọc trang web, dù là
công cụ fetch hay duyệt web tích hợp sẵn hoặc một máy chủ MCP. Skill được xây dựng xoay quanh việc đọc
tài liệu trên Microsoft Learn, và nếu môi trường chạy không cung cấp bất kỳ phương thức tra cứu nào, skill sẽ thông báo không thể
xác minh và dừng lại thay vì dựa vào trí nhớ của mô hình. Hai
kết nối sau giúp quá trình này hiệu quả hơn đáng kể:

| Kết nối | Giá trị bổ sung |
|---|---|
| **Microsoft Learn MCP** | Tra cứu tài liệu có căn cứ thay vì tải trang web thô. |
| **KQL Search MCP** (`kqlsearch.com`) — *bên ngoài, do cộng đồng vận hành; xem cảnh báo ở trên* | Kho truy vấn cộng đồng, có thể tìm kiếm theo bảng, từ khóa hoặc kỹ thuật. Đây là yếu tố giúp bước tham khảo truy vấn có sẵn (prior-art) hoạt động. |

Cả hai đều không chạy bên trong tenant của bạn, và bước tham khảo truy vấn có sẵn là bước gửi văn bản ra ngoài.
Cách skill xử lý việc này: nó chỉ tìm kiếm dựa trên tên bảng và từ khóa kỹ thuật
— tên tài khoản, tên máy chủ (hostname), địa chỉ IP, tên miền nội bộ, mã ticket và
bất kỳ nội dung nào bạn dán từ dữ liệu riêng của mình đều không được đưa vào chuỗi tìm kiếm. Bạn nên nắm rõ điều này
trước khi áp dụng skill cho một sự cố thực tế.

Nếu không có Learn MCP, việc xác minh lược đồ vẫn hoạt động thông qua tải trang thông thường.
Nếu không có khả năng tìm kiếm, bước tham khảo truy vấn có sẵn sẽ bị bỏ qua hoàn toàn và câu trả lời
sẽ nêu rõ điều đó — khi ấy truy vấn chỉ được xây dựng dựa trên các lược đồ đã xác minh.

## Cách sử dụng

Chỉ cần yêu cầu điều bạn cần. Skill tự kích hoạt với mọi yêu cầu mang dáng dấp KQL, kể cả
những câu không hề nhắc tới từ này:

- "Tìm các AI agent cục bộ được Defender phát hiện, kèm theo các máy chủ MCP của chúng"
- "Tại sao truy vấn này không trả về kết quả nào?" (dán truy vấn vào)
- "Viết quy tắc phát hiện Sentinel cho các agent xác thực từ một quốc gia mới"

Kết quả trả về là một truy vấn, bằng chứng đằng sau từng mã định danh trong truy vấn đó, và các
giả định đang được đặt ra: bảng tùy chỉnh, phạm vi thu thập của connector, giới hạn giấy phép, độ trễ nạp dữ liệu.
Bằng chứng nghĩa là liên kết tài liệu đối với bảng đã công bố và lược đồ do chính bạn
cung cấp đối với bảng riêng của bạn, được ghi nhận đúng bản chất chứ không đánh đồng với nhau.
Khi một mã định danh không thể xác minh, bạn sẽ được thông báo rõ thay vì nhận về
một truy vấn dựng trên đó.

## Điều cần biết

**Tốc độ sẽ chậm hơn.** Mọi bảng mà truy vấn cần đều được tải về và mọi cột đều được kiểm tra, nên
một kết quả vốn có thể hiện ra ngay lập tức nay sẽ cần nhiều lượt gọi công cụ. Với việc thăm dò
nhanh, đây là sự đánh đổi kém hiệu quả. Nhưng với bất kỳ nội dung nào đưa vào workbook, quy tắc phát hiện
hay báo cáo khách hàng, đây chính là phiên bản đáng tin cậy.

**Mã 404 không phải là kết luận cuối cùng.** Learn trả về 404 cho một đường dẫn slug mà nó không nhận ra cũng dễ dàng
như đối với một bảng không tồn tại, vì vậy bản thân lỗi 404 — giống như lỗi hết thời gian chờ (timeout) hoặc 403 — có nghĩa là
tra cứu thất bại, và skill sẽ nói rõ điều đó. Thứ giúp chốt lại vấn đề là trang chỉ mục: một trang chỉ mục lược đồ
không liệt kê bảng của bạn chính là bằng chứng, đồng nghĩa tên bảng bị sai, là bảng
tùy chỉnh, hoặc đang ở giai đoạn bản xem trước (preview) chưa công bố tài liệu. Skill sẽ nêu rõ bằng chứng
ủng hộ khả năng nào và hỏi lại bạn, thay vì tự ý chọn một cái tên na ná.

**Các bảng ảnh chụp nhanh (snapshot table) dễ khiến người dùng mắc bẫy.** `AgentsInfo` lưu trữ các bản chụp lặp lại theo thời gian, nên
`summarize arg_max(Timestamp, *)` mà thiếu `by AgentId` sẽ chỉ trả về một dòng duy nhất — cả một
đội máy bị rút gọn còn một dòng, trong một truy vấn chạy hoàn toàn không báo lỗi. Việc đối chiếu có căn cứ (grounding) giúp ích ở đây vì
các truy vấn mẫu do chính Microsoft công bố dùng đúng cú pháp, và bước tham khảo truy vấn có sẵn
sẽ tìm ra chúng.

**Bảng bản xem trước (preview) là giới hạn cứng.** Khi chưa có tài liệu tham chiếu cột nào được công bố,
không gì có thể được xác minh. Skill sẽ đề nghị bạn cung cấp lược đồ — từ thẻ schema trên cổng thông tin
hoặc kết quả chạy `getschema` — và dừng lại nếu bạn không có. Nếu yêu cầu, bạn có thể nhận một
phiên bản dùng `column_ifexists()`, nhưng đó chỉ là công cụ chẩn đoán chứ không phải truy vấn để dùng lâu dài: một cột
không tồn tại sẽ âm thầm trả về giá trị mặc định cho mọi dòng, khiến bộ lọc trên cột đó
không khớp gì cả hoặc khớp tất cả, còn `summarize` thì gom hết vào một nhóm duy nhất. Truy vấn vẫn chạy,
nhưng thứ trả về lại là một kết quả âm tính giả đội lốt một kết quả thật.

**Tài liệu không đồng nghĩa với dữ liệu trong tenant của bạn.** Việc xác nhận một bảng có tồn tại không nói lên
liệu bảng đó có dữ liệu trong môi trường của bạn hay không. Đó là vấn đề về giấy phép và connector, và
skill sẽ chỉ rõ điều này thay vì ngầm khẳng định bạn đã có dữ liệu.
