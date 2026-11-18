# Gom tệp của tôi

**Thu thập mọi tệp do agent Copilot Studio của bạn tạo ra trong một phiên vào một tệp zip có thể tải xuống — theo yêu cầu, chỉ trong một bước.**

Gom tệp của tôi tập hợp mọi tệp mà agent đã tạo trong suốt một phiên, đóng gói chúng vào một tệp `.zip` có gắn dấu thời gian và trả lại dưới dạng tệp tải xuống. Đây là một tiện ích được thiết kế nhẹ gọn có chủ đích: không có script đóng gói kèm theo, không cần nối kết hay cấu hình gì — chỉ cần nhập tệp `SKILL.md` là sử dụng được ngay.

---

## Khoảng trống mà kỹ năng lấp đầy

Copilot Studio hiện đại thực sự là một **công cụ tạo tệp** rất mạnh. Chỉ trong một phiên làm việc, một agent có thể điền nội dung cho tài liệu Word, tạo nhanh tệp PDF, dựng bảng tính Excel, xuất báo cáo HTML tương tác và nhiều định dạng khác — và một phiên làm việc nhiều tác vụ thường sinh ra khá nhiều tệp trong quá trình xử lý.

Khi được trả về ngay trong dòng trò chuyện lúc vừa tạo xong, các tệp đó rất dễ dùng ngay tại thời điểm đó. Nhưng xuyên suốt một **phiên làm việc dài**, việc tìm lại chúng khó hơn tưởng tượng: các bản chỉnh sửa liên tiếp xuất hiện, nhiều nhóm nội dung mới được tạo thêm, và các tệp thì chỉ nằm rải rác trong lịch sử trò chuyện. Tấm infographic mà agent tạo ra từ đầu phiên rất dễ bị thất lạc sau mười tác vụ tiếp theo — bạn biết chắc nó tồn tại, chỉ là không thể tìm ra nó nằm ở đoạn nào.

Skill này giúp bạn không còn phải lục tìm nữa. Ở bất kỳ thời điểm nào, bạn chỉ cần yêu cầu lấy toàn bộ những gì agent đã tạo và nhận về **một tệp zip duy nhất** — mọi tệp đã xuất ra nằm gọn trong một đầu ra, không cần cuộn ngược lại cuộc hội thoại để gom nhặt từng tệp một.

## Skill này làm gì

- **Đọc từ `/app/created/`** — thư mục sandbox nơi Copilot Studio ghi các tệp được tạo ra — **theo cơ chế đệ quy**, nhờ đó các đầu ra nằm trong thư mục con (ví dụ: `charts/adoption.png`) cũng được đưa vào, chứ không chỉ các tệp ở cấp cao nhất.
- **Lọc bỏ tệp rác** — mọi bản xuất trước đó (`all_files_produced_*.zip`) cùng các tệp ẩn / tệp rác hệ thống (`.DS_Store`, `Thumbs.db`, `*.tmp`, tệp bắt đầu bằng dấu chấm) đều được bỏ qua.
- **Đóng gói thành một tệp lưu trữ** có tên `all_files_produced_<YYYYMMDD_HHMMSS>.zip` (dấu thời gian UTC có thể sắp xếp theo thứ tự), giữ nguyên cấu trúc thư mục của phiên làm việc ở bên trong.
- **Dọn dẹp an toàn** — tệp lưu trữ mới được tạo *trước*, sau đó các bản xuất cũ hơn mới được xóa bớt, nên một lần chạy lỗi sẽ không bao giờ làm mất gói tệp trước đó của bạn.
- **Hỗ trợ lọc theo tập con** — chỉ cần yêu cầu "chỉ lấy các tệp PDF" và skill sẽ chỉ nén đúng những tệp khớp yêu cầu.
- **Bàn giao tệp hoàn chỉnh** — trả về tệp `.zip` thành phẩm dưới dạng tệp tải xuống, chứ không chỉ gửi một tin nhắn "đã xong". Nếu không có tệp nào phù hợp, skill sẽ thông báo rõ ràng thay vì trả về một tệp zip rỗng.

## Minh họa thực tế

Tại bất kỳ thời điểm nào trong phiên, bạn có thể yêu cầu:

> **"Hãy nén toàn bộ những gì bạn đã tạo và gửi cho tôi."**

Agent sẽ đóng gói các đầu ra của phiên và trả lại một tệp tải xuống duy nhất:

```
all_files_produced_20260724_223104.zip
├── onboarding_overview.pdf
├── q3_headcount.xlsx
├── launch_brief.docx
└── charts/
    └── adoption_curve.png
```

> Tôi đã đóng gói **4 tệp** vào `all_files_produced_20260724_223104.zip`
> (`onboarding_overview.pdf`, `q3_headcount.xlsx`, `launch_brief.docx`,
> `charts/adoption_curve.png`). Tệp đã được đính kèm và sẵn sàng để tải xuống.

## Chạy khi bạn yêu cầu

Skill được kích hoạt bởi các cách diễn đạt tự nhiên mang ý "gửi lại các tệp của tôi", ví dụ:

- "Xuất toàn bộ các tệp bạn đã tạo trong phiên này"
- "Nén các tệp của tôi lại để tôi tải xuống"
- "Đóng gói mọi thứ bạn đã tạo thành một tệp tải xuống duy nhất"
- "Chỉ nén các tệp PDF bạn vừa tạo và gửi qua cho tôi"

Skill chủ đích **không** kích hoạt cho các yêu cầu gần giống nhưng khác bản chất — như tải xuống một tệp đơn lẻ được chỉ đích danh, tạo mới hoặc chuyển đổi định dạng tệp, hay lưu trữ lâu dài tệp lên SharePoint / OneDrive / Dataverse — để không cản trở các luồng xử lý đó.

## Trường hợp phù hợp

| Bạn muốn… | Gom tệp của tôi mang lại cho bạn… |
| --- | --- |
| **Lấy toàn bộ mọi thứ vào cuối phiên làm việc** | Một tệp zip chứa mọi tệp đã tạo, chỉ trong một bước. |
| **Tìm lại một tệp đã bị trôi khỏi khung nhìn** | Toàn bộ đầu ra được gom vào một chỗ — không cần lục tìm trong khung chat. |
| **Bàn giao các sản phẩm đầu ra của một phiên** | Một tệp lưu trữ duy nhất, đặt tên gọn gàng và giữ nguyên bố cục thư mục. |
| **Chỉ trích lấy một loại đầu ra cụ thể** | Một tệp zip đã lọc (ví dụ: chỉ gồm các tệp PDF). |

## Cách hoạt động

1. **Kiểm kê `/app/created/`** theo cơ chế đệ quy và chọn các tệp đã tạo, loại trừ các bản xuất trước đó và tệp rác hệ thống.
2. **Tạo tệp lưu trữ** — một tệp `.zip` có gắn dấu thời gian UTC và giữ nguyên cấu trúc thư mục tương đối — sau đó chỉ xóa bớt các bản xuất cũ khi tệp mới đã được ghi an toàn.
3. **Trả về `all_files_produced_<timestamp>.zip`** cho người dùng dưới dạng tệp có thể tải xuống.

## Giới hạn trung thực

Đây là một **tiện ích hỗ trợ tiện lợi, không phải hệ thống lưu trữ hay sao lưu.**

- Các tệp trong `/app/created/` mang tính **tạm thời** — sandbox của Copilot Studio sẽ bị xóa sạch khi phiên kết thúc. Tệp zip là cách để bạn mang theo các đầu ra của phiên làm việc, chứ không phải nơi lưu giữ lâu dài. Để lưu trữ bền vững, hãy điều hướng tệp sang SharePoint, OneDrive hoặc Dataverse bằng một flow.
- Skill giả định rằng các tệp được tạo đều nằm trong **`/app/created/`**.

## Tệp thành phần

- `SKILL.md` — hướng dẫn kích hoạt và đóng gói dành cho agent.
