# Trợ lý Demo AI

Nhanh chóng dựng một bản **demo Microsoft 365 Copilot** trọn vẹn, có tính thuyết phục chỉ từ ba thông tin đầu vào: tên khách hàng, lĩnh vực kinh doanh và các vai trò người dùng (persona) bạn muốn gây ấn tượng. Kỹ năng này sẽ đề xuất các kịch bản demo, chờ bạn phê duyệt, sau đó tạo ra trọn bộ gói nội dung — gồm các tệp Office mẫu cùng kế hoạch triển khai và cấp phát dữ liệu bằng văn bản — để buổi demo Copilot trực tiếp thực sự *tạo ấn tượng* thay vì thất bại trên một tenant trống rỗng.

## Đối tượng sử dụng

Kiến trúc sư giải pháp đám mây (Cloud Solution Architects), kỹ sư bán hàng (sales engineers) và bất kỳ ai thường xuyên trình bày demo Copilot cho khách hàng nhưng đã ngán cảnh phải tự tay tạo email giả, bộ slide và bảng tính trước mỗi buổi giới thiệu.

## Những gì kỹ năng tạo ra

- **Đề xuất kịch bản** — 3–5 kịch bản "một ngày làm việc thực tế" có sức thuyết phục cao, gắn với từng vai trò người dùng bạn đã chỉ định, được trình bày để bạn phê duyệt trước khi tạo bất kỳ nội dung nào.
- **Các tệp Office mẫu** — tài liệu Word, bản trình bày PowerPoint và bảng tính Excel mang tính hư cấu rõ ràng nhưng có nội dung cụ thể, chân thực (các mục có tên rõ ràng, tiêu đề slide và các cột dữ liệu) để Copilot có dữ liệu thực tế mà tóm tắt và phân tích.
- **Kế hoạch triển khai Demo AI (AI Demo Delivery Plan)** — quy trình chuẩn bị để người trình bày nạp sẵn vào demo tenant: danh sách persona kèm ánh xạ tài khoản tenant, kịch bản email và tin nhắn trò chuyện Teams, một nhóm (team) tái sử dụng được cùng các kênh theo từng kịch bản, các cuộc họp trên lịch kèm chương trình họp, bản chép lời/kịch bản cuộc họp, **quy trình câu lệnh Copilot gắn nhãn ứng dụng** (mỗi câu lệnh đều ghi rõ ứng dụng Copilot cụ thể cần dùng để chạy, viết theo **khung CRAFT** — Context (Ngữ cảnh), Role (Vai trò), Action (Hành động), Format (Định dạng), Target audience (Đối tượng mục tiêu) — và nêu tên tệp dữ liệu nền *ngay trong dòng lệnh* để đính kèm đúng tài liệu khi trình diễn trực tiếp trên sân khấu), cùng **phụ lục nội dung tệp mẫu** mô tả chính xác những gì nằm bên trong từng tệp được tạo.
- **Danh sách kiểm tra nạp dữ liệu / bảng kê tệp** — bảng thống kê từng tệp mô tả chính xác nội dung mỗi tệp chứa đựng và vị trí cần nạp, giúp việc chuẩn bị dữ liệu cho tenant trở thành một danh sách kiểm tra rõ ràng chứ không phải việc mò mẫm.

## Những gì có thể và không thể nạp tự động

| Thành phần | Tự động nạp? | Cách thực hiện |
|-------|-----------|-----|
| Tệp Word / PowerPoint / Excel | **Có** | Tạo thư mục OneDrive đặt theo tên khách hàng và tải các tệp lên (tùy chọn, theo yêu cầu). |
| Tin nhắn trò chuyện Teams | **Tùy chọn, có ràng buộc** | Đăng trực tiếp qua Graph — gắn dấu thời gian *hiện tại*, và mỗi tài khoản chỉ tự đăng dưới danh nghĩa của chính mình. |
| Chuỗi email | Không | Được soạn sẵn dưới dạng kịch bản để dán/nạp thủ công. |
| Cuộc họp trên lịch | Không | Được soạn sẵn dưới dạng kịch bản kèm chương trình họp để tạo thủ công. |
| Bản ghi hình / bản chép lời cuộc họp | **Không có API hỗ trợ** | Tạo sẵn bản chép lời/kịch bản; bản ghi hình thực tế chỉ tồn tại sau khi một cuộc họp Teams trực tiếp được ghi hình. |

## Cách sử dụng

1. Yêu cầu Copilot **"thiết lập một bản demo Copilot"** (hoặc "xây dựng nội dung demo cho khách hàng", "tạo kế hoạch triển khai demo", v.v.) và cung cấp tên khách hàng, lĩnh vực kinh doanh cùng các vai trò người dùng.
2. Rà soát các kịch bản được đề xuất rồi phê duyệt, chỉnh sửa hoặc thay thế chúng.
3. Thu thập các tệp đã tạo và Kế hoạch triển khai (Delivery Plan) từ thư mục đầu ra của bạn.
4. Tùy chọn yêu cầu kỹ năng **nạp các tệp lên OneDrive** hoặc **đăng tin nhắn Teams** trực tiếp.
5. Nạp nội dung vào demo tenant **trước buổi demo từ 24–72 giờ** — Copilot trả lời dựa trên chỉ mục ngữ nghĩa Microsoft Graph, vốn cần thời gian để lập chỉ mục cho nội dung mới được nạp.

## An toàn và phạm vi

- **Toàn bộ nội dung đều là dữ liệu giả lập hư cấu** — tên người, tên công ty, số liệu và ngày tháng đều được bịa đặt. Tuyệt đối không dùng thông tin định danh cá nhân (PII) thật của khách hàng hay tenant vận hành thực tế (production).
- **Chỉ ghi trực tiếp trong phạm vi giới hạn** — các thao tác ghi trực tiếp duy nhất là tạo thư mục OneDrive + tải tệp lên, và (tùy chọn) đăng tin nhắn trò chuyện Teams; cả hai đều yêu cầu xác nhận rõ ràng trước khi chạy. Kỹ năng không bao giờ tự động gửi email, không bao giờ tự động đặt lịch họp, và không bao giờ ghi vào tenant vận hành thực tế.
- **Không sửa lùi ngày, không tạo bản ghi hình giả** — kỹ năng nêu rõ những gì Graph làm được và không làm được, tuyệt đối không tuyên bố sai sự thật.

---

*Được xây dựng cho Microsoft 365 Copilot Cowork. Chia sẻ theo giấy phép MIT của kho lưu trữ.*
