# explainer-video — Kỹ năng Cowork

Tạo video giải thích 1080p (MP4) có thuyết minh và phụ đề nhằm hướng dẫn một khái niệm, công cụ, quy trình hoặc chính sách. Kỹ năng nghiên cứu chủ đề đối với các nội dung cần dữ kiện chính xác, tạo cảnh quay minh họa văn phòng (b-roll), đóng khung ảnh chụp màn hình do bạn cung cấp, ghi âm lời bình và cắt ghép phân cảnh khớp theo lời thoại.

## Thành phần trong kỹ năng

```
explainer-video/
├─ SKILL.md                  nội dung kỹ năng chính (hướng dẫn + rào chắn an toàn)
└─ scripts/
   ├─ compose_cards.py       tạo các thẻ khung hình 1920x1080 từ JSON kịch bản phân cảnh
   └─ render_video.py        căn chỉnh các cảnh theo lời thoại, thêm chuyển động, gắn cứng phụ đề
```

## Cài đặt

**Cách A — OneDrive (dễ nhất).** Tải xuống gói kỹ năng, giải nén và sao chép toàn bộ thư mục `explainer-video` vào thư mục Cowork trong OneDrive của bạn, bên dưới `skills/`, sao cho cấu trúc cuối cùng như sau:

```
Documents/Cowork/skills/explainer-video/SKILL.md
Documents/Cowork/skills/explainer-video/scripts/...
```

Kỹ năng sẽ khả dụng ngay trong phiên Cowork tiếp theo của bạn — không cần thiết lập nào khác.

**Cách B — nhờ Copilot.** Đính kèm gói tệp vừa tải vào một cuộc trò chuyện Cowork và nói "cài đặt kỹ năng này giúp tôi".

**Chia sẻ với đồng nghiệp:** gửi cho họ gói tệp đã tải về và họ chỉ cần làm theo Cách A trên OneDrive của riêng họ. Tên thư mục phải giữ nguyên là `explainer-video` — nó phải khớp với trường `name` bên trong SKILL.md.

## Cách sử dụng

Chỉ cần yêu cầu tạo video:

- "làm một video giải thích chính sách chi phí của chúng ta"
- "tạo một video giải thích về [chủ đề] cho nhân viên mới"
- "biến tài liệu này thành một video hướng dẫn dài hai phút" (đính kèm ảnh chụp màn hình)

Kỹ năng sẽ hỏi một lượt câu hỏi ngắn (đối tượng người xem, thời lượng, giao diện sáng hay tối, ảnh chụp màn hình), sau đó trình bày kịch bản lời thoại và danh sách phân cảnh để bạn phê duyệt trước khi kết xuất. Toàn bộ quá trình mất khoảng 20 phút từ đầu đến cuối; riêng phần kết xuất video chiếm khoảng 10-15 phút.

## Yêu cầu hệ thống

Chạy trực tiếp bên trong Cowork mà không cần cài đặt thêm gì: Python kèm Pillow, ffmpeg và các công cụ của Copilot để tạo hình ảnh, thu âm lời bình và nghiên cứu trên web. Các script đi kèm sẽ do kỹ năng tự động gọi — bạn không bao giờ cần tự chạy thủ công.

## Thông tin hữu ích

- Kịch bản lời bình luôn được bạn phê duyệt trước khi bắt đầu kết xuất.
- Các ảnh chụp màn hình bạn đính kèm được hiển thị nguyên bản như đã cung cấp — tuyệt đối không vẽ lại hay chỉnh sửa.
- Nhân vật xuất hiện trong cảnh quay minh họa (b-roll) được tạo tự động và mang tính khái quát; không sử dụng chân dung người thật, logo hay nhạc có bản quyền.
- Số liệu thống kê, ngày tháng và trích dẫn đều lấy từ quá trình nghiên cứu hoặc từ nội dung của chính bạn, không bao giờ tự bịa đặt.
- Bên cạnh tệp MP4, bạn còn nhận được tệp âm thanh thuyết minh MP3 và tệp văn bản kịch bản, giúp bạn có thể sửa lời và kết xuất lại mà không phải làm lại từ đầu.

Điểm chất lượng tại thời điểm đóng gói: 93/100 (Xuất sắc).
