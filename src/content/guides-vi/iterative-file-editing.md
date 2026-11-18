# Chỉnh sửa tệp theo từng vòng lặp

Hiện nay trong Copilot Studio, việc chỉnh sửa một tệp đã được gửi cho bạn thường không đến được tay bạn. Bạn yêu cầu agent tinh chỉnh một tài liệu nó vừa gửi cách đó một lúc; agent thực hiện thay đổi và báo đã xong — nhưng không có tệp mới nào xuất hiện trong khung chat. Lý do là việc gửi lại một tệp dưới cái tên mà cuộc trò chuyện đã từng nhận không kích hoạt sự kiện gửi tệp của Copilot Studio, nên phiên bản đã cập nhật thực chất không bao giờ rời khỏi agent. Bạn vẫn chỉ thấy tệp đính kèm cũ, dù được thông báo là đã cập nhật.

Kỹ năng này khắc phục vấn đề đó. Nó khiến agent đặt cho mỗi phiên bản mới của tệp một tên tệp mới có số phiên bản tăng dần — `report_v1.docx`, `report_v2.docx`, `report_v3.docx` — để mỗi lượt chỉnh sửa đều mang một cái tên mà khung chat chưa từng thấy trước đó và thực sự được gửi đi. Bạn sẽ nhận được từng vòng chỉnh sửa dưới dạng tệp đính kèm riêng, đồng thời có sẵn luôn chuỗi lịch sử phiên bản.

## Vì sao điều này quan trọng

Nếu không có kỹ năng này, việc chỉnh sửa lặp lại trên một tệp trong Copilot Studio sẽ bị gián đoạn: agent liên tục "thực hiện thay đổi" nhưng bạn chẳng bao giờ nhận được, và bạn cũng không có dấu hiệu nào cho biết tệp chưa được gửi đi. Tên tệp đánh số phiên bản chính là thứ biến câu "Tôi đã cập nhật xong" thành một tệp bạn thực sự mở ra xem được — đó là sự khác biệt giữa một quá trình trao đổi qua lại thực thụ trên tài liệu với một bản xuất một lần không bao giờ tinh chỉnh lại được.

## Cách hoạt động

Mỗi khi agent có một phiên bản mới cần gửi cho bạn, nó sẽ tăng số phiên bản trong tên tệp trước khi gửi. Vì tên tệp mới hoàn toàn, Copilot Studio sẽ gửi nó dưới dạng một tệp đính kèm mới. Số lớn nhất luôn là tệp hiện tại của bạn, và mọi phiên bản trước đó đều còn nguyên trong khung chat để bạn cuộn lại xem.

## Cách sử dụng

Hãy yêu cầu tạo tệp như cách bạn vẫn làm bình thường — "soạn giúp tôi bản đề xuất", "tạo giúp tôi bảng tính", "viết đoạn script này" — rồi góp ý chỉnh sửa khi tệp được trả về. Hãy nói "sửa lại phần mở đầu" hoặc "thêm một cột" để tiếp tục tinh chỉnh. Mỗi câu trả lời sẽ mang theo một tệp đính kèm đánh số mới; tệp có số cao nhất là phiên bản mới nhất của bạn.

## Ví dụ minh họa nhanh

Dưới đây là một phiên làm việc ngắn — mỗi tệp đính kèm trả về đều có số phiên bản kế tiếp, và chính điều đó giúp mọi lượt chỉnh sửa đều xuất hiện trong khung chat:

> **Bạn:** tạo giúp tôi một tệp văn bản đơn giản chỉ ghi chữ "hi"
>
> **Agent:** Xong rồi! Đây là tệp văn bản của bạn — nội dung chỉ ghi "hi". Hãy cho tôi biết nếu bạn muốn chỉnh sửa gì thêm nhé!  📎 `hi_v1.txt`
>
> **Bạn:** bạn thêm một bài thơ vào đó được không?
>
> **Agent:** Chắc chắn rồi! Tôi đã thêm một bài thơ ngắn tự sáng tác ngay sau chữ "hi" của bạn. Bạn có muốn đổi phong cách hay chủ đề khác không?  📎 `hi_v2.txt`
>
> **Bạn:** thêm một bông hoa hồng ASCII nữa nhé?
>
> **Agent:** Hoàn tất — `hi_v3.txt` giờ đã có chữ "hi", bài thơ và một bông hoa hồng ASCII 🌹. Còn gì nữa không bạn?  📎 `hi_v3.txt`

Nếu không tăng số phiên bản, bước "thêm một bài thơ" trông có vẻ như đã chạy thành công, nhưng `hi.txt` sẽ không bao giờ xuất hiện lại trong khung chat của bạn — bạn sẽ bị kẹt mãi ở bản gốc. Con số tăng dần (`hi_v1.txt` → `hi_v2.txt` → `hi_v3.txt`) chính là yếu tố giúp từng bản cập nhật được gửi tới bạn, đồng thời đóng luôn vai trò lịch sử để bạn cuộn lại xem.

## Thông tin cần biết

- Áp dụng cho mọi loại tệp — tài liệu, bảng tính, bài thuyết trình, mã nguồn, tệp xuất dữ liệu.
- Việc số phiên bản tăng lên sau mỗi vòng không phải là sự rườm rà — đó chính là cơ chế giúp mọi bản cập nhật đến được tay bạn, đồng thời tự nhiên mang lại một lịch sử phiên bản gọn gàng.
- Kỹ năng này được xây dựng riêng cho container của Copilot Studio, vì nó dựa trên cách container đó gửi tệp cho bạn.
