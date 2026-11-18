# Kiểm thử Agent Copilot Studio

Kiểm thử một agent Microsoft Copilot Studio dựa trên bộ câu hỏi và câu trả lời của riêng bạn, và nhận về báo cáo chấm đạt/không đạt — mà không cần điều khiển trình duyệt.

Chỉ cần trỏ công cụ tới một tài liệu Word hoặc tệp CSV gồm các câu hỏi cùng câu trả lời kỳ vọng. Công cụ sẽ chuyển đổi chúng thành bộ kiểm thử, đặt từng câu hỏi cho agent trong một **cuộc hội thoại mới hoàn toàn**, sau đó đối chiếu từng câu trả lời nhận được với câu trả lời kỳ vọng và xuất ra báo cáo kèm tỷ lệ đạt, bảng chi tiết theo từng câu hỏi và lý do đằng sau mỗi trường hợp không đạt.

Được xây dựng cho tình huống khách hàng đưa cho bạn một xấp tài liệu Hỏi & Đáp (Q&A) và hỏi rằng *"agent của chúng tôi có thực sự đang trả lời đúng những câu này không?"*

## Tại sao không dùng luôn trình duyệt?

Điều khiển khung kiểm thử của Copilot Studio bằng tự động hóa trình duyệt tuy hoạt động được nhưng chậm và dễ lỗi: bạn phải chờ các hiệu ứng giao diện (UI) và đoán xem khi nào câu trả lời đã truyền phát (streaming) xong. Thay vào đó, kỹ năng này giao tiếp với agent thông qua **Microsoft 365 Agents SDK** (`CopilotStudio.Copilots.Invoke`), nhanh hơn khoảng mười lần và không bị hỏng khi giao diện thay đổi.

## Những gì kỹ năng làm — và chủ đích không làm

**Kỹ năng làm:** chuyển đổi các bảng Q&A trong Word thành bộ kiểm thử, chạy từng câu hỏi trong một cuộc hội thoại tách biệt, ghi lại câu trả lời và trích dẫn, phát hiện tình huống chuyển cấp (escalation) và lượt phản hồi trống, kiểm tra các chuỗi con bắt buộc tùy chọn, và tổng hợp báo cáo cuối cùng.

**Kỹ năng không** tự quyết định liệu một câu trả lời có *đúng* hay không. Bước chấm điểm đó do agent đang chạy kỹ năng (hoặc chính bạn) thực hiện bằng cách đọc và đối chiếu từng câu trả lời với câu trả lời kỳ vọng.

Đây là một quyết định thiết kế có chủ đích, không phải tính năng bị thiếu. Một điểm số tương đồng (similarity score) sẽ tạo ra các lỗi sai giả: trên thực tế, một câu trả lời đúng thường có cách diễn đạt khác với văn bản kỳ vọng, và đôi khi còn hay hơn. Vì vậy, công cụ chỉ thu thập bằng chứng, sự đánh giá của con người hoặc mô hình sẽ đưa ra phán quyết, và báo cáo lưu giữ những phán quyết thực tế đó thay vì một con số không ai tin tưởng.

## Thiết lập

**Điều kiện tiên quyết:** Node.js 22 trở lên.

Hãy yêu cầu trợ lý của bạn: **"thiết lập kỹ năng kiểm thử agent Copilot Studio"**. Trợ lý sẽ hỏi bạn bốn giá trị và tự cấu hình mọi thứ:

| Giá trị | Nơi tìm thấy |
|---|---|
| Application (client) ID | trong đăng ký ứng dụng (app registration) Entra của bạn → Overview |
| Directory (tenant) ID | cùng trang đó |
| Environment ID | mã GUID trong URL của Copilot Studio, nằm sau `/environments/` |
| Schema name | xem bên dưới — vị trí khác nhau giữa hai trải nghiệm Copilot Studio |

**Schema name** không phải là tên hiển thị (display name); nó có dạng như `cr1a3_myAgentName`.

- **Trải nghiệm biên tập mới** (các thẻ Build / Preview / Evaluate / Monitor):
  agent → **⋯ (More options)** → **Settings** → **Agent details** → **Identity** → **Schema name**
- **Agent cổ điển (Classic agents)**: agent → **Settings** → **Advanced** → **Metadata** → **Schema name**

Bạn cũng cần một đăng ký ứng dụng Entra đã bật **Allow public client flows** và được cấp quyền ủy quyền (delegated) **`CopilotStudio.Copilots.Invoke`** (lưu ý dạng số nhiều) có sự chấp thuận của quản trị viên (admin consent). Kỹ năng sẽ hướng dẫn bạn từng bước tạo mới nếu bạn chưa có.

**Không cần client secret** — việc đăng nhập sử dụng mã thiết bị (device code), vì vậy không có thông tin bí mật nào được lưu trữ. Cấu hình của bạn được lưu vào `~/.cs-agent-test/`, không bao giờ lưu vào thư mục kỹ năng.

## Cách sử dụng

Hãy hỏi: **"kiểm thử agent Copilot Studio của tôi với những câu hỏi này"** và cung cấp tệp của bạn.

Hoặc tự chạy trực tiếp:

```
node scripts/cs-agent-test.cjs convert  my-questions.docx testset.csv
node scripts/cs-agent-test.cjs test     testset.csv --out .\results
node scripts/cs-agent-test.cjs report   .\results\results-<ts>.json --template verdicts.csv
REM   ... fill in PASS / FAIL / EXCLUDED and a reason for each row ...
node scripts/cs-agent-test.cjs report   .\results\results-<ts>.json report.md --verdicts verdicts.csv
```

Trên macOS hoặc Linux, hãy dùng `sh scripts/cs-agent-test.sh`, hoặc dùng `node scripts/cs-agent-test.cjs` trên mọi nền tảng.

Thời gian dự kiến là **30–60 giây cho mỗi câu hỏi** — một bộ 60 câu hỏi mất khoảng 45 phút.

## Hai điều nếu không biết sẽ làm mất cả buổi chiều của bạn

**Công cụ kiểm thử agent ĐÃ XUẤT BẢN (PUBLISHED), không phải bản nháp.** Khung kiểm thử trong Copilot Studio kiểm thử bản nháp. Mọi thay đổi bạn vừa thực hiện trên vùng thiết kế (authoring canvas) sẽ không xuất hiện ở đây cho đến khi bạn xuất bản (publish).

**Các agent được xây dựng bằng trải nghiệm biên tập mới chạy trên một endpoint khác.** Nếu gọi qua endpoint cổ điển, chúng sẽ trả lời rằng *"Enhanced task completion preview has ended. Go to copilotstudio.microsoft.com and republish the agent"* — thông báo này trông giống như một câu trả lời thật và việc xuất bản lại cũng không khắc phục được. Kỹ năng sẽ tự phát hiện thông báo đó và âm thầm thử lại trên endpoint runtime dạng agent (agentic runtime endpoint), nên bạn không bao giờ phải bận tâm đến vấn đề này.

## Không có tệp thực thi đóng gói

Kỹ năng này **không đi kèm tệp nhị phân thực thi nào** — `scripts/cs-agent-test.cjs` là một tệp JavaScript độc lập duy nhất (~1,5 MB, không cần `npm install`), kèm theo các trình khởi chạy mỏng `.cmd` và `.sh`.

Một phiên bản trước đây từng đi kèm tệp `.exe` đóng gói nặng 57 MB. Việc thay thế là có chủ đích: một tệp thực thi không có chữ ký số hoàn toàn hợp lý để chính sách thiết bị đầu cuối (endpoint policy) chặn lại, việc ký mã (code signing) cũng không loại bỏ được cảnh báo SmartScreen (độ uy tín đến từ lịch sử tải xuống chứ không phải từ chứng chỉ), và 1,5 MB mã JavaScript có thể đọc được thực sự cho phép đội ngũ bảo mật rà soát. Thêm một điểm cộng nữa là JavaScript cũng chạy được trên cả macOS và Linux.

`references/THIRD-PARTY-NOTICES.md` liệt kê mọi gói mã nguồn mở có trong gói này.

## Giới hạn

- **Chỉ hỗ trợ xác thực ủy quyền (delegated auth).** Agents SDK không chấp nhận token của service principal, nên không thể chạy CI hoàn toàn không cần tương tác. Một lần đăng nhập bằng mã thiết bị được lưu vào bộ nhớ đệm (cache) và dùng cho toàn bộ một lượt chạy.
- **Windows, macOS và Linux**, bất cứ nơi nào chạy được Node.js 22+.
- Đôi khi các hộp thoại yêu cầu cấp quyền (consent prompt) hoặc sự cố treo tạm thời sẽ hiển thị dưới dạng lỗi ở từng dòng riêng lẻ; hãy chạy lại các dòng đó với `--ids`.
