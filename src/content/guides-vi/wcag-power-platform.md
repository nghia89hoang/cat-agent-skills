# WCAG 2.1 cho ứng dụng Web và Power Platform

Một kỹ năng giúp mọi giao diện mà agent xây dựng hoặc rà soát đều tuân thủ **WCAG 2.1
Mức AA** — từ giao diện web tổng quát, trang HTML hoàn chỉnh và ứng dụng trang đơn (single-page app), tạo chủ đề hiện đại
(chế độ tối, độ tương phản cao, design token), cho đến bốn loại thành phần của Power Platform:
điều khiển **PCF**, ứng dụng/biểu mẫu **model-driven**, ứng dụng **canvas**,
và **Power Pages**.

Mức AA là mục tiêu mặc định vì đây là mức mà hầu hết các quy định pháp lý về khả năng tiếp cận
thực sự yêu cầu (ADA, Section 508, EN 301 549 và Quy định về khả năng tiếp cận của các cơ quan khu vực công Vương quốc Anh). Các tiêu chí mức AAA được gắn cờ là phần nâng cao tùy chọn.

## Kỹ năng này làm gì

Khi agent xây dựng, rà soát hoặc tái cấu trúc bất kỳ giao diện web hay Power Platform nào,
kỹ năng này sẽ tự động kích hoạt — ngay cả khi không nhắc đến "khả năng tiếp cận" (accessibility) — và thực hiện:

- Tích hợp sẵn các bước kiểm tra WCAG 2.1 AA vào mọi thành phần được tạo mới, thay vì chắp vá
  sau khi làm xong.
- Kiểm toán (audit) các thành phần hiện có theo từng tiêu chí thành công của WCAG 2.1, báo cáo rõ
  tiêu chí, mức độ, đạt/không đạt, vị trí và cách khắc phục.
- Áp dụng hướng dẫn đặc thù theo từng nền tảng để mỗi kiểm tra được đáp ứng đúng cách cho
  từng loại thành phần (ví dụ: `AccessibleLabel`/`TabIndex` trong canvas, Fluent UI +
  `aria-live` trong PCF, tên hiển thị cột trong model-driven, mã đánh dấu ngữ nghĩa (semantic markup) và
  liên kết bỏ qua (skip links) trong Power Pages).

## Bốn nguyên tắc (POUR)

| Nguyên tắc | Phạm vi bao quát |
|-----------|--------|
| **Có thể nhận biết (Perceivable)** | Văn bản thay thế, phụ đề, không chỉ dùng màu sắc để truyền đạt thông tin, độ tương phản 4.5:1 cho chữ / 3:1 cho giao diện, sắp xếp lại bố cục (reflow) về 320px, chữ có thể thay đổi kích thước, cấu trúc theo chương trình (programmatic structure) |
| **Có thể thao tác (Operable)** | Truy cập đầy đủ bằng bàn phím, không bẫy bàn phím, tiêu điểm (focus) hiển thị rõ, thứ tự focus hợp lý, đủ thời gian thao tác, không nhấp nháy gây co giật, kích thước vùng chạm, liên kết bỏ qua (skip links), liên kết có mô tả rõ ràng |
| **Có thể hiểu được (Understandable)** | Ngôn ngữ trang, nhãn và hướng dẫn, xác định lỗi rõ ràng + gợi ý sửa, điều hướng nhất quán, không thay đổi ngữ cảnh đột ngột |
| **Vững chắc (Robust)** | Mã đánh dấu hợp lệ, đúng tên/vai trò/giá trị (name/role/value) cho mọi điều khiển, thông báo trạng thái được đọc qua các vùng cập nhật trực tiếp (live regions) |

## Cấu trúc kỹ năng

```
wcag-power-platform/
├── SKILL.md                        # Quy trình, điều hướng, tổng quan POUR, 10 kiểm tra AA hàng đầu, xác minh
└── references/
    ├── wcag-checklist.md           # Mọi tiêu chí thành công WCAG 2.1 + bước kiểm tra thực tế + cách khắc phục
    ├── html-pages.md               # Trang HTML độc lập, trang web, ứng dụng trang đơn (SPA)
    ├── theming.md                  # Chủ đề hiện đại của Power Apps, chế độ tối, tương phản cao, forced-colors, token
    ├── pcf.md                      # Các điều khiển PowerApps Component Framework
    ├── web-resources.md            # Tài nguyên web HTML/JS trong ứng dụng model-driven
    ├── model-driven.md             # Ứng dụng model-driven, biểu mẫu, chế độ xem, bảng điều khiển (dashboard)
    ├── canvas.md                   # Ứng dụng canvas
    └── power-pages.md              # Power Pages (cổng thông tin / portals)
```

Kỹ năng sử dụng cơ chế hiển thị lũy tiến (progressive disclosure): các tệp tham chiếu theo nền tảng chỉ được
nạp khi thực sự liên quan, nhờ đó agent chỉ đọc danh sách kiểm tra cốt lõi cùng với một tệp duy nhất
tương ứng với loại thành phần đang xử lý.

## Xác minh mức độ tuân thủ

Các công cụ tự động chỉ phát hiện được khoảng 30–40% vấn đề; phần còn lại cần kiểm tra thủ công.
Kỹ năng chỉ dẫn agent xác minh bằng các bước sau:

- **Tự động**: axe-core / Accessibility Insights / Lighthouse / WAVE, cùng với
  **App Checker** tích hợp sẵn (cho model-driven & canvas) và công cụ
  **Accessibility checker** trong canvas studio.
- **Kiểm tra chỉ bằng bàn phím**: di chuyển đến và thao tác được mọi thành phần, tiêu điểm (focus) luôn hiển thị rõ,
  thứ tự hợp lý, không bị bẫy bàn phím.
- **Kiểm tra nhanh bằng trình đọc màn hình**: NVDA/JAWS (Windows) hoặc VoiceOver (Mac).
- **Thu phóng / sắp xếp lại bố cục (Zoom/reflow)** ở mức 400% (≈320px) và **thay đổi kích thước chữ** lên 200%.
- **Kiểm tra nhanh độ tương phản** và rà soát trường hợp **chỉ dựa vào màu sắc** (thang độ xám).

## Phiên bản tiêu chuẩn

Nhắm tới WCAG 2.1. Kỹ năng này cũng lưu ý những điểm mà **WCAG 2.2** mở rộng thêm — ví dụ: Tiêu điểm
không bị che khuất (Focus Not Obscured), Thao tác kéo (Dragging Movements), Kích thước vùng chạm tối thiểu (Target Size Minimum, 24×24px ở mức AA), Trợ giúp nhất quán (Consistent Help),
Nhập liệu lặp lại (Redundant Entry) và Xác thực dễ tiếp cận (Accessible Authentication) — để bạn có thể chủ động áp dụng 2.2
theo thực hành tốt nhất hiện nay.

## Nguồn tham khảo

Các tiêu chí thành công của WCAG 2.1 dựa trên tài liệu
[Hướng dẫn tiếp cận nội dung web (WCAG) 2.1 của W3C](https://www.w3.org/TR/WCAG21/).
