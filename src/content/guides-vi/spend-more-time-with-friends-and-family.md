# Dành nhiều thời gian hơn cho bạn bè & gia đình

Một trợ lý hỗ trợ vắng mặt (out-of-office) dành cho Scout: trong thời gian bạn đi vắng, nó lặng lẽ theo dõi một nhóm
trò chuyện và trả lời các câu hỏi **dựa trên tài liệu tri thức do bạn cung cấp** — tuyệt đối không
đoán mò — đồng thời ghi lại bất kỳ câu hỏi nào nó không trả lời được để không có việc gì bị bỏ sót.

## Tại sao nên dùng kỹ năng này?

Khi bạn tạm rời khỏi công việc, các câu hỏi trong một nhóm chat bận rộn vẫn không ngừng xuất hiện — mọi người vẫn hỏi một
tài liệu nằm ở đâu, trạng thái của một công việc thế nào, hay một quy trình vận hành ra sao. Hầu hết
những câu hỏi đó đều đã có câu trả lời rõ ràng; chỉ là bạn không có mặt ở đó để trả lời.

Quy trình tự động hóa này sẽ thay bạn đưa ra những câu trả lời đó, **chỉ** sử dụng tài liệu tri thức mà bạn
đã viết sẵn từ trước. Bạn đưa các thông tin mọi người thường hỏi vào một tệp —
trạng thái dự án, liên kết, ai phụ trách việc gì, các hướng dẫn phổ biến — và khi bạn đi vắng,
bot sẽ trả lời các câu hỏi khớp nội dung trực tiếp từ tệp đó. Mọi câu trả lời đều được
đánh dấu rõ là do AI tạo thay mặt bạn, để không ai nhầm tưởng đó là bạn trực tiếp nhắn.

Điều cốt lõi là nó **chỉ trả lời những gì tài liệu của bạn thực sự đề cập**. Nó sẽ không tự bịa
thông tin hay ứng biến. Bất cứ điều gì tài liệu không nhắc tới, bot tuyệt đối không đoán — nó
sẽ ghi lại câu hỏi đó để bạn xử lý khi quay trở lại.

## Cách hoạt động

Bạn viết một tài liệu tri thức, trỏ bot vào cuộc trò chuyện cần theo dõi rồi yên tâm nghỉ ngơi. Sau đó, cứ mỗi
15 phút, bot sẽ:

1. **Đọc các tin nhắn mới** trong nhóm chat và lọc ra các câu hỏi thực sự
   (bỏ qua lời chào hỏi, biểu cảm thả reaction và chuyện phiếm).
2. **Tìm câu trả lời trong tài liệu tri thức của bạn** — tài liệu của bạn là nguồn
   chính thống *duy nhất* mà bot được phép sử dụng.
3. **Trả lời ngay trong đoạn chat khi tài liệu có đề cập**, kèm theo ghi chú rõ ràng
   "🤖 AI-generated on the owner's behalf" (do AI tạo thay mặt chủ sở hữu) để không bao giờ bị nhầm là chính bạn.
4. **Ghi lại những câu hỏi tài liệu chưa bao phủ** vào tệp `unanswered.md` — ai đã hỏi, hỏi
   nội dung gì và vào lúc nào — để bạn xử lý tiếp sau đó. Bot không bao giờ đăng câu trả lời phỏng đoán.

Vì mọi câu trả lời chỉ đến từ tài liệu của bạn, chất lượng của bot thực chất chính là
chất lượng tài liệu bạn chuẩn bị: bạn viết càng đầy đủ, bot càng thay bạn xử lý được nhiều việc.

## Thiết lập

Trong lần chạy đầu tiên, kỹ năng sẽ khởi tạo thư mục `friends-family-bot/` chứa tệp
`config.json` trống và thư mục `knowledge/`, sau đó nhắn tin cho bạn trên Teams để hướng dẫn
chính xác những gì cần điền. Hãy thả ghi chú của bạn vào `knowledge/`, thiết lập nhóm chat cần
theo dõi, và bot sẽ đảm nhận phần còn lại từ đó. Nếu vẫn còn thiếu bất kỳ mục bắt buộc nào, bot
sẽ nhắn tin báo cho bạn thay vì đụng vào nhóm chat — nhờ vậy nó không bao giờ chạy trong trạng thái thiết lập dở dang.

| Mục bạn cấu hình | Ý nghĩa |
| --- | --- |
| `chatId` | Nhóm chat cần theo dõi |
| `knowledgeDocs` | (Các) thư mục ghi chú mà bot được phép dùng để trả lời |
| `ownerRelayEmail` | *(tùy chọn)* Nơi gửi thông báo cho bạn — mặc định là đoạn chat riêng với chính bạn trên Teams |
| `answerCaveat` | *(tùy chọn)* Nội dung chú thích miễn trừ trách nhiệm cho biết câu trả lời do AI tạo |

## Thông tin cần biết

- **Tài liệu của bạn là nguồn sự thật duy nhất** — bot sẽ không tự bịa ra câu trả lời.
- **Không quét ngược lịch sử cũ** — khi khởi chạy mới, bot chỉ xem tin nhắn trong một giờ gần nhất, không đọc
  toàn bộ lịch sử trò chuyện của bạn.
- **Bỏ qua tin nhắn của chính bạn**, nên bot sẽ không tự trả lời lại bạn.
- **Tính di động cao** — mọi đường dẫn được phân giải tương đối theo không gian làm việc Scout; không có thông tin
  cá nhân hay cấu hình gắn cứng với máy cụ thể nào.

## Yêu cầu

Được xây dựng cho **Scout**, sử dụng các công cụ Teams/WorkIQ của nền tảng này để đọc và trả lời trong đoạn chat cũng như
gửi lời nhắc thiết lập cho bạn.
