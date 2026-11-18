# Video demo có thuyết minh bằng Clipchamp

Biến một ứng dụng web đang chạy trực tiếp hoặc một agent Copilot Studio thành video demo hoàn chỉnh có thuyết minh — ghi lại thao tác thực trên màn hình (con trỏ chuột, thao tác gõ, phản hồi trực tiếp) kèm giọng đọc AI — mà bạn không cần tự quay màn hình hay chỉnh sửa thủ công.

## Trước khi bắt đầu

- **Chỉ hỗ trợ Windows.** Kỹ năng này điều khiển PowerShell, các API cửa sổ Win32, `msedge.exe` và tính năng quay màn hình `gdigrab` của ffmpeg — hiện chưa có backend quay màn hình cho macOS/Linux.
- Nên cài đặt toàn cục **Node.js + Playwright** (`npm install -g playwright`), **ffmpeg/ffprobe** và **edge-tts** (`pip install edge-tts`) để mọi lần chạy sau này đều hoạt động ngay. Kỹ năng sẽ kiểm tra và cài đặt các công cụ này một lần nếu còn thiếu.
- Một **phiên trình duyệt đã đăng nhập** cho ứng dụng mà bạn muốn quay (Copilot Studio, ứng dụng nội bộ, v.v.) — kỹ năng sẽ điều khiển phiên thực tế đã xác thực của bạn để ghi lại đúng sản phẩm thật, không phải bản mô phỏng.
- Xác định trước agent/ứng dụng bạn muốn quay demo và phác thảo những nội dung cần trình bày (phần tổng quan, vài câu lệnh kiểm thử trực tiếp, v.v.) — càng cụ thể thì lời thuyết minh cuối cùng càng hay.

### Cài đặt toàn cục một lần

**Chỉ cần cài đặt các thành phần này MỘT LẦN ở phạm vi toàn cục để mọi lần chạy sau đều có sẵn mà không cần cài lại.** Hãy kiểm tra từng công cụ trước; chỉ cài đặt nếu bị thiếu. Sau khi thay đổi biến môi trường PATH, hãy làm mới shell *hiện tại* bằng lệnh `$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")` (các cửa sổ shell mở mới sẽ tự động nhận thay đổi).

| Thành phần cần thiết | Cài đặt toàn cục (lưu giữ qua các lần chạy) |
| ---- | -------------- |
| Node + Playwright (thư viện) | Kiểm tra: `node -e "require('playwright')"` thông qua thư mục gốc toàn cục, hoặc `npm ls -g playwright`. Nếu thiếu: **`npm install -g playwright`** (cài toàn cục, không cài vào thư mục tạm). Các script trong `scripts/` tự động phân giải thư viện này qua `npm root -g` (xem `scripts/require-playwright.js`) — bạn không cần tự đặt `NODE_PATH`. |
| ffmpeg + ffprobe | Kiểm tra: `ffmpeg -version`. Nếu thiếu: `winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements --disable-interactivity`, sau đó **sao chép `ffmpeg.exe`/`ffprobe.exe` vào `C:\Users\<user>\.copilot\bin` và thêm thư mục đó vào User PATH** (`[Environment]::SetEnvironmentVariable("Path", $userPath + ";C:\Users\<user>\.copilot\bin", "User")`). Thư mục cố định này vẫn giữ nguyên đường dẫn ngay cả khi nâng cấp phiên bản ffmpeg. |
| edge-tts (giọng đọc neural TTS Ava, luồng headless) | Kiểm tra: `python -c "import edge_tts"`. Nếu thiếu: **`pip install edge-tts`** (cài ở mức user là được — khi đó `python -m edge_tts` sẽ hoạt động ở mọi lần chạy). Để dùng trực tiếp lệnh CLI `edge-tts`, hãy thêm thư mục **Scripts** của Python (ví dụ `C:\Users\<user>\AppData\Roaming\Python\Python3XX\Scripts`) vào User PATH. Giọng đọc: `en-US-AvaNeural`. |
| Trình duyệt đã đăng nhập | Trình duyệt MCP Playwright lưu giữ phiên đăng nhập của bạn. Thư mục hồ sơ thường nằm tại `C:\Users\<user>\AppData\Local\ms-playwright\mcp-msedge`, còn Edge nằm tại `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`. Đối với một **tenant khác**, hãy **sao chép (clone)** hồ sơ Edge thật của bạn sang một thư mục gốc `User Data` không phải mặc định rồi khởi chạy kèm tham số `--profile-directory` tương ứng — Playwright không thể gắn vào thư mục dữ liệu mặc định của Edge. Xem mục "Pick the right profile / tenant" trong `SKILL.md` để biết các bước chi tiết. |

## Cách sử dụng

Hãy yêu cầu tạo video demo tự nhiên như khi bạn nhờ một người khác: *"Quay một video demo cho agent Copilot Studio của tôi"*, *"tạo video hướng dẫn có thuyết minh cho ứng dụng này"*, *"biến quy trình này thành một video demo sản phẩm"*. Kỹ năng sẽ:

1. Hỏi bạn chọn phương thức dựng video: **(A) chạy nền không giao diện (headless)** (ffmpeg + giọng đọc neural TTS Ava — nhanh, nhất quán, trả về tệp MP4 hoàn chỉnh) hoặc **(B) giao diện web Clipchamp** (chậm hơn, nhưng để lại một dự án Clipchamp có thể chỉnh sửa thủ công về sau).
2. Điều khiển trình duyệt thật bằng phiên đã đăng nhập của bạn, ghi lại luồng thao tác thực tế trên màn hình và cắt bỏ thời gian chết (màn hình xác thực, thời gian chờ gọi công cụ kéo dài) để bản dựng cuối cùng chỉ hiển thị các nhịp nội dung quan trọng.
3. Tạo phần lồng tiếng tự nhiên (giọng neural Ava) thuyết minh cho những gì đang hiển thị trên màn hình, căn khớp thời gian với các nhịp thao tác trực quan — không phải một đoạn đọc dài đều đều.
4. Trả lại cho bạn tệp MP4 hoàn chỉnh (theo hướng headless) hoặc dự án Clipchamp sẵn sàng tinh chỉnh (theo hướng giao diện UI), được đặt tên theo agent/sản phẩm của bạn.

## Thông tin hữu ích cần biết

- Khung hình được ghi lại là **bộ đệm khung nhìn nội bộ của trình duyệt (viewport buffer)**, không phải màn hình đang hiển thị — vì vậy bạn vẫn có thể tiếp tục dùng máy tính xách tay trong lúc quay (theo hướng headless). Ngoại lệ duy nhất là chế độ quay kép (ghi đồng thời thao tác của bạn *và* ứng dụng đặt cạnh nhau), chế độ này đòi hỏi màn hình nền không bị che bởi cửa sổ hoặc thông báo khác.
- Bộ chuyển đổi Build/Preview/Evaluate/Monitor của Copilot Studio là một danh sách thả xuống (dropdown), không phải các thẻ (tab) — kỹ năng đã được thiết kế để đi thẳng tới URL `/preview` thay vì nhấp qua các menu.
- Nếu video quay được chỉ hiển thị nội dung ứng dụng ở một góc nhỏ với nhiều khoảng đệm màu xám xung quanh, nguyên nhân là cửa sổ trình duyệt chưa phủ kín màn hình — kỹ năng sẽ tự động cắt (crop) và thay đổi tỷ lệ (rescale) phần này trong bước hậu kỳ, nhưng bạn vẫn nên tự kiểm tra nhanh trên một khung hình mẫu trước khi lồng tiếng.
- Một video demo đầy các thẻ báo lỗi màu đỏ từ backend đang ngủ còn tệ hơn là không có demo — kỹ năng sẽ chạy thử một câu lệnh thực tế trước khi quay toàn bộ chính thức để phát hiện sớm tình trạng này.
