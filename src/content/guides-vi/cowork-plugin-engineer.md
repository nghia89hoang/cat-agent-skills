# Kỹ sư Plugin Copilot Cowork

Xây dựng và bảo trì các plugin Microsoft Copilot Cowork với quy trình lặp lại được,
lấy kiểm chứng hợp lệ làm ưu tiên hàng đầu. Agent Skill này kết hợp hướng dẫn thực tiễn,
các mẫu có đánh phiên bản và công cụ tự động hóa Python 3.10+ để giảm thiểu sai sót trên
cấu trúc plugin, trình kết nối Model Context Protocol (MCP), OAuth, đóng gói,
thiết kế bộ đánh giá và nâng cấp manifest.

Bản đóng góp này là một **Agent Skill** dạng giải nén, không phải một gói plugin Cowork.
Hãy sử dụng nó để tạo và xác thực các gói plugin ngay trong không gian làm việc của riêng bạn.

## Khả năng hỗ trợ

- Khởi tạo khung dự án plugin Cowork theo bố cục gói ứng dụng Microsoft 365.
- Nhập và chuẩn hóa các plugin Claude Code hoặc Cursor hiện có.
- Hỗ trợ các thiết kế gói chỉ gồm kỹ năng, chỉ gồm trình kết nối (connector) hoặc kết hợp cả hai.
- Hướng dẫn đăng ký OAuth và từ chối các trình giữ chỗ xác thực chưa được giải quyết.
- Kiểm tra tính hợp lệ của tệp manifest, biểu tượng, kỹ năng, trình kết nối, mô tả công cụ MCP và
  các giới hạn của gói.
- Kiểm tra an toàn một tệp ZIP plugin hiện có mà không cần tin cậy sẵn hoặc giải nén thủ công
  nội dung bên trong.
- Đóng gói và kiểm chứng tính hợp lệ của plugin bằng Microsoft 365 Agents Toolkit.
- Tạo các bộ `evals.json` nháp để đánh giá khả năng định tuyến kỹ năng, tuân thủ chỉ dẫn,
  sử dụng công cụ MCP và mức độ an toàn; mở rộng các bản nháp này với các bài kiểm thử hồi quy theo lĩnh vực.
- Chẩn đoán lỗi tải lên, vòng lặp thử lại của trình kết nối, lỗi tra cứu OAuth và
  các sự cố bắt tay (handshake) hoặc thực thi công cụ MCP.
- Áp dụng quy trình nâng cấp có kiểm soát khi Microsoft phát hành phiên bản manifest
  Cowork mới.

## Trước khi bắt đầu

Phần hướng dẫn có thể sử dụng trong bất kỳ máy chủ Agent Skills nào. Để chạy các công cụ
tự động hóa đi kèm, máy chủ hoặc máy phát triển cần có:

- Python 3.10 trở lên (`python3` trên Linux/macOS; `py -3` trên Windows).
- Node.js và `npx`.
- Kết nối mạng khi có yêu cầu kiểm chứng qua Microsoft 365 Agents Toolkit.
- Một dự án plugin cục bộ hoặc tệp ZIP plugin để kiểm chứng.

Các lượt tải xuống của Toolkit mặc định dùng `https://registry.npmjs.org/` và bỏ qua
cấu hình npm ở cấp dự án, người dùng và toàn cục. Những môi trường yêu cầu sử dụng
máy chủ nhân bản (registry mirror) HTTPS được phê duyệt có thể thiết lập biến `COWORK_ATK_REGISTRY` trỏ tới URL đó.

Các trình kết nối MCP có xác thực cũng có thể yêu cầu một ứng dụng Microsoft Entra,
cấu hình OAuth trên Teams Developer Portal, sự chấp thuận của người dùng hoặc quản trị viên, và
cấu hình danh sách ứng dụng khách được phép (allowed-client) ở phía máy chủ.

## Yêu cầu mẫu

- "Tạo một plugin Cowork kết hợp kỹ năng và MCP từ plugin Claude hiện có này."
- "Kiểm tra tính hợp lệ của tệp ZIP plugin Cowork này và giải thích mọi lỗi gặp phải."
- "Tạo bộ đánh giá hành vi cho plugin này."
- "Sửa vòng lặp thử lại OAuth trong trình kết nối này."
- "Nâng cấp dự án kỹ thuật plugin này lên phiên bản manifest mới nhất được Cowork hỗ trợ
  bằng cách làm theo hướng dẫn nâng cấp đi kèm."

## Công cụ tự động hóa đi kèm

| Script | Mục đích |
|---|---|
| `new_cowork_plugin_project.py` | Khởi tạo khung dự án plugin mới. |
| `test_cowork_plugin.py` | Áp dụng các bước kiểm tra chuyên sâu cho dự án và gói. |
| `test_cowork_plugin_package.py` | Kiểm tra an toàn tính hợp lệ của tệp ZIP được cung cấp. |
| `set_cowork_oauth_reference.py` | Thiết lập ID đăng ký OAuth và tăng số phiên bản của gói. |
| `build_cowork_plugin.py` | Đóng gói và kiểm chứng tính hợp lệ với Agents Toolkit. |
| `new_cowork_plugin_evals.py` | Tạo bộ dữ liệu đánh giá nháp cho Microsoft 365 Copilot. |

## Lưu ý hữu ích

- Các tình huống đánh giá được tạo ra chỉ là bản nháp. Hãy thay thế mọi giá trị `[REPLACE: ...]`
  bằng câu lệnh (prompt) đã phê duyệt và phản hồi kỳ vọng trước khi chạy.
- Kỹ năng này tạo ra các bộ đánh giá nhưng không trực tiếp chạy đánh giá.
- Việc kiểm chứng gói không chứng minh được rằng sự chấp thuận OAuth, chính sách máy chủ hay hành vi MCP
  lúc chạy đang hoạt động. Đây vẫn là các cổng kiểm duyệt triển khai riêng biệt.
- Các mẫu hiện tại đều được đánh phiên bản. Hãy làm theo
  `assets/manifest-upgrade-instructions.md` thay vì thay đổi máy móc
  phiên bản manifest khi có lược đồ mới xuất hiện.
- Không bao giờ đưa client secret, access token, refresh token, cookie hoặc
  mã ủy quyền (authorization code) vào trong gói plugin hay tệp đánh giá.
