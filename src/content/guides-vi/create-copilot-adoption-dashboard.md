# Bảng điều khiển mức độ áp dụng Copilot

Biến bốn tệp xuất dữ liệu hoạt động Copilot từ trung tâm quản trị Microsoft (Microsoft admin center) thành một bảng điều khiển mức độ áp dụng dưới dạng tệp HTML đơn mang dấu ấn thương hiệu — bao gồm các chỉ số KPI, phân khúc người dùng, mức độ sử dụng trên các ứng dụng và agent, phễu chuyển đổi (conversion pipeline) cùng các bước tiếp theo được đề xuất.

## Trước khi bắt đầu

Không cần cài đặt gì thêm — skill chạy trên phiên bản Python đi kèm sẵn với Cowork và
chỉ sử dụng thư viện chuẩn. Không cần tài khoản kết nối, không cần quyền đặc biệt
và không cần truy cập mạng tại thời điểm tạo bảng điều khiển.

Thứ bạn cần là **bốn tệp xuất CSV** từ trung tâm quản trị Microsoft 365
(**Reports → Usage → Microsoft 365 Copilot**, sau đó chọn *Export*). Việc trích xuất
báo cáo tại đây yêu cầu vai trò quản trị viên có quyền đọc dữ liệu sử dụng Copilot —
thường là Reports Reader, Usage Summary Reports Reader hoặc Global/Copilot admin.
Nếu bạn có thể mở báo cáo sử dụng Copilot trong trung tâm quản trị, bạn hoàn toàn
có thể xuất những gì skill này cần:

| # | Báo cáo | Nội dung chứa bên trong |
|---|---|---|
| 1 | **Copilot usage** (Mức sử dụng Copilot) | Một hàng cho mỗi người dùng được cấp phép — số lượt prompt, số ngày hoạt động, mức độ hoạt động theo từng ứng dụng |
| 2 | **Agents — per user** (Agent theo người dùng) | Các agent đã sử dụng và số phản hồi nhận được theo từng người dùng |
| 3 | **Agents — per agent** (Agent theo từng agent) | Một hàng cho mỗi agent — số người dùng hoạt động, số phản hồi đã gửi |
| 4 | **Copilot Chat** | Hoạt động trò chuyện, **bao gồm cả những người dùng chưa có giấy phép trả phí** |

Hãy cung cấp cả bốn tệp để có bức tranh toàn cảnh đầy đủ. Ít hơn vẫn dùng được —
bảng điều khiển sẽ hiển thị những phần có thể tính toán và đánh dấu phần còn lại
là đang chờ (pending) thay vì tự đoán.

Tùy chọn: một tệp **logo** (PNG, JPG, GIF hoặc WebP). Tệp này được nhúng trực tiếp
vào HTML, nên bảng điều khiển hoàn chỉnh vẫn giữ nguyên là một tệp duy nhất dễ chia sẻ.

## Cách sử dụng

Chạy lệnh sau, hoặc chỉ cần yêu cầu bằng ngôn ngữ tự nhiên:

```
/create-copilot-adoption-dashboard
```

> "Tạo bảng điều khiển mức độ áp dụng Copilot cho Contoso"
> "Chuyển các tệp xuất MAC này thành một bảng điều khiển mức độ áp dụng"
> "Xây dựng bảng điều khiển mức độ sử dụng Copilot cho tôi — tên công ty là Fabrikam, đã đính kèm logo"

Skill sẽ giải thích quy trình, hỏi **tên công ty** của bạn (bắt buộc) và
**logo** (tùy chọn), rồi tiếp nhận các tệp CSV bạn đã đính kèm. Skill tự nhận diện
từng tệp bằng cách đọc tiêu đề cột, nên bạn không cần đặt tên tệp theo
quy tắc đặc biệt nào.

Sau đó, skill tính toán các số liệu thực tế và trả về một tệp HTML duy nhất —
`<Company>_Copilot_Adoption_Dashboard.html` — có thể mở trên mọi trình duyệt:

- **Bốn ô KPI** — tỷ lệ kích hoạt giấy phép, tỷ lệ người dùng thường xuyên, mức độ áp dụng agent và số người dùng tiềm năng sẵn sàng chuyển đổi.
- **Người dùng theo phân khúc** — Tiên phong (Champion), Thường xuyên (Habitual), Thỉnh thoảng (Casual), Ngừng hoạt động (Dormant), Chưa từng kích hoạt (Never activated).
- **Các ứng dụng hàng đầu** — mười ứng dụng nơi Copilot thực sự đang được sử dụng.
- **Thị phần sử dụng agent** — mười agent có phạm vi tiếp cận rộng nhất.
- **Phễu chuyển đổi** — các người dùng Chat chưa có giấy phép được xếp hạng thành nhóm tiềm năng Ấm (Warm) và Nóng (Hot).
- **Các bước tiếp theo được đề xuất** — các phương án thúc đẩy áp dụng phù hợp với *chính các con số của bạn*.

Mỗi ô và bảng đều có nút **i** giải thích ý nghĩa của chỉ số, cách
tính và mục tiêu đối chiếu. Khi di chuột qua biểu đồ vòng (donut) hoặc bất kỳ
thanh nào, số lượng người thực tế sẽ hiển thị chứ không chỉ có tỷ lệ phần trăm.

Trước khi bàn giao, skill sẽ hiển thị bản tóm tắt các chỉ số KPI đã tính để bạn kiểm tra nhanh tính hợp lý. Bạn cũng có thể yêu cầu một khung thời gian báo cáo hoặc ngày báo cáo cụ thể, hoặc
chạy lại với tên công ty đã chỉnh sửa — chỉ cần nói rõ yêu cầu.

## Thông tin hữu ích cần biết

**Khung thời gian báo cáo được lấy trực tiếp từ dữ liệu của bạn.** Skill đọc cột *Report
Period* (mặc định của trung tâm quản trị là 28 ngày) và ghi rõ khung thời gian đó trên
bảng điều khiển. Nếu các tệp xuất có khung thời gian không khớp nhau, hoặc bị thiếu
cột này, skill sẽ cho bạn biết nó đã sử dụng khung thời gian nào và lý do. Chỉ ghi đè
khung thời gian này nếu bạn thực sự muốn dùng một chu kỳ khác.

**Các khuyến nghị được đưa ra có cơ sở, không phải lời khuyên chung chung.** Có hai loại xuất hiện.
Các thẻ *Kích hoạt bởi giá trị KPI của bạn* chỉ xuất hiện khi một con số chưa đạt mục tiêu của khung đánh giá,
và mỗi thẻ đều trích dẫn chính con số đã kích hoạt nó. *Khuyến nghị duy trì thường xuyên* — nên tập trung
đào tạo ở đâu (các ứng dụng và agent mạnh nhất của bạn) và nâng cao nhận thức ở đâu (những công cụ
ít được dùng) — luôn xuất hiện vì đây là lời khuyên ở trạng thái ổn định chứ không phải cảnh báo
vượt ngưỡng. Nếu mọi KPI đều đạt, bạn sẽ thấy thông điệp "Bạn đang làm rất tốt — hãy tiếp tục phát huy!" cùng các
thẻ khuyến nghị duy trì ở bên dưới.

**Thiếu một báo cáo vẫn an toàn.** Nếu bỏ trống một tệp báo cáo, bảng liên quan sẽ hiển thị ở trạng thái
*đang chờ (pending)* kèm ghi chú nêu rõ tệp còn thiếu. Không có con số nào bị ước lượng hay điền
bằng dữ liệu mẫu — nếu skill không thể tính được điều gì, nó sẽ nói thẳng điều đó.

**Các ứng dụng ở mức 0% được hiển thị có chủ đích.** Một ứng dụng đứng ở mức 0% không phải lỗi;
đó là một tính năng đã được cấp phép nhưng chưa có ai sử dụng, và đó chính là nơi các hoạt động
thúc đẩy áp dụng có mục tiêu mang lại hiệu quả cao nhất. Hãy yêu cầu nếu bạn muốn ẩn chúng đi.

**Đây là ảnh chụp nhanh tại một kỳ đơn lẻ.** Xu hướng tăng trưởng, duy trì sử dụng và ngừng hoạt động đòi hỏi phải có hai
tệp xuất để đối chiếu, nên những chỉ số này không được báo cáo.

**Tên cột khác thường vẫn được xử lý.** Tiêu đề cột được khớp theo từ khóa chứ không phải khớp
chính xác từng ký tự, nên sự khác biệt giữa các tenant thường được xử lý trơn tru. Nếu một cột thực sự
không thể khớp được, skill sẽ báo cáo tên cột đó để bạn chỉ định đúng tiêu đề —
nó không bao giờ âm thầm thay thế bằng một con số khác.

**Quyền riêng tư.** Bảng điều khiển chỉ hiển thị dữ liệu tổng hợp — số lượng theo phân khúc, tỷ lệ phần trăm và
tổng số. Không có hàng dữ liệu người dùng cá nhân, tên riêng hay bảng xếp hạng nào xuất hiện trong kết quả đầu ra, và
skill sẽ không đánh giá mức độ sử dụng của từng cá nhân cụ thể. Nhờ vậy, bạn cũng có thể sử dụng các tệp xuất báo cáo đã được ẩn danh.

**Chia sẻ kết quả.** Kết quả là một tệp tự chứa duy nhất đã nhúng sẵn logo và
không có phụ thuộc bên ngoài, nên rất thuận tiện để gửi qua email và lưu trữ. Đây là ảnh chụp nhanh tại một thời điểm,
không phải báo cáo trực tiếp theo thời gian thực — hãy chạy lại với các tệp xuất mới mỗi tháng.

**Khung phân tích mức độ áp dụng (Adoption Analytics Framework).** Là khung phân tích tùy chỉnh. Tất cả các chỉ số KPI được sử dụng đều được xây dựng riêng và không dùng bất kỳ khung công bố công khai nào như Microsoft Adoption toolkit hay M365 Copilot Adoption Guide. Toàn bộ khung phân tích được giải thích chi tiết trong references/adoption-framework.md.
