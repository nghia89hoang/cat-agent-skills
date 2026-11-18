# Tool Tracer

**Xem chính xác những gì agent Copilot Studio của bạn đã thực sự làm ở phía hậu trường — theo yêu cầu,
trong một tệp có cấu trúc duy nhất.**

Tool Tracer chạy một tương tác như bình thường, sau đó trả về một tệp
`tool_trace.json` duy nhất trình bày chi tiết những gì đã diễn ra *bên dưới* cuộc hội thoại:
những hành động và connector nào đã được gọi (và với các đầu vào nào), kết quả
trả về — bao gồm cả mã lỗi — lượt gọi nào đã được thử lại, nguồn tri thức
nào đã được truy vấn, các skill nào khác đã kích hoạt và lượt chạy đã kết thúc như thế nào.

Công cụ này chỉ chạy khi bạn yêu cầu rõ ràng, vì vậy đây là một **công cụ gỡ lỗi có chủ đích**,
không phải thứ luôn tự kích hoạt ở mọi lượt hội thoại.

---

## Khoảng trống khả năng quan sát được lấp đầy

Trong **ngăn kiểm thử**, bạn có thể thấy mọi thứ: quá trình suy luận của agent, "Tôi đang gọi
hành động này", các lần thử lại, những skill mà agent kích hoạt. Điều đó rất tuyệt khi bạn đang xây dựng.

Nhưng khi agent đã hoạt động trên một **kênh thực tế** — Teams, khung chat web, ứng dụng
tùy chỉnh — người dùng thông thường chỉ thấy tin nhắn của họ và câu trả lời của agent
(*"Chắc chắn rồi, để tôi kiểm tra việc đó…"*). Mọi thứ mà trình điều phối đã thực hiện để tạo ra
câu trả lời đó đều bị **ẩn đi**:

- Một hành động của connector có thể đã **thất bại với một mã lỗi** và agent đã âm thầm
  **thử lại** nó — điều này vô hình với người dùng, và với cả bạn.
- Một **nguồn tri thức** có thể đã được truy vấn (hoặc bị bỏ sót) theo cách làm định hình
  câu trả lời.
- **Một skill khác** có thể đã được kéo vào giữa tác vụ.

Khi một tương tác trên môi trường production gặp sự cố, câu trả lời thực tế cho thắc mắc *"tại sao agent lại làm
vậy?"* thường đòi hỏi quản trị viên phải **tái hiện lại toàn bộ sự việc trong ngăn
kiểm thử**. Tool Tracer loại bỏ bước đó: chỉ cần yêu cầu một bản truy vết và bạn sẽ nhận được bản tường thuật nhanh,
có cấu trúc về lượt chạy thực tế — **những gì đã thử thực hiện, những gì đã thất bại, những gì
đã được gọi và với các thuộc tính nào** — để bạn có thể phân loại và xử lý tình huống
trực tiếp.

## Những thông tin được ghi lại

- **Hành động / connector** — mỗi lượt gọi, các đầu vào (thuộc tính) được gửi đi và
  phản hồi nhận về, bao gồm trạng thái thất bại và **mã lỗi**.
- **Các lần thử lại** — một lượt gọi được thử lại sẽ xuất hiện như một bước riêng, giúp bạn thấy agent
  đã thử lại sau một lỗi.
- **Tra cứu tri thức** — ghi nhận việc một nguồn đã được truy vấn và kết quả trả về ở mức
  truy vết (trích dẫn / tóm tắt; xem phần giới hạn đối với nội dung đầy đủ).
- **Các skill khác** — được ghi nhận thành các bước (`skill:<name>`) khi lượt chạy kéo chúng vào.
- **Kết quả đầu ra** — một trạng thái tổng thể và một dòng tóm tắt về những gì đã được
  trả về cho người dùng.

---

## Kết quả trông như thế nào

Một tương tác thực tế — *"Tôi vẫn có thể trả lại đơn hàng 4471 không, và thời hạn hoàn tiền
của tôi là khi nào?"* — trông hoàn toàn bình thường đối với khách hàng, nhưng bên dưới lại không như vậy:

```json
{
  "trace_metadata": {
    "task_description": "Check return eligibility for order 4471 and the refund-by date.",
    "agent_name": "Contoso Support Assistant",
    "timestamp_utc": "2026-07-22T18:31:04Z",
    "total_tool_calls": 4,
    "mode": "redacted",
    "status": "success"
  },
  "tool_calls": [
    {
      "step": 1,
      "tool_name": "search_knowledge",
      "purpose": "Find the return-eligibility policy to answer the customer.",
      "input": { "query": "return eligibility window policy" },
      "output_summary": "3 passages retrieved from KB 'Returns Policy' (article R-14: 30-day window).",
      "output_raw": "citations: [R-14 'Returns & Exchanges', R-09 'Final Sale Items']",
      "status": "success",
      "error_message": null
    },
    {
      "step": 2,
      "tool_name": "GetOrderStatus",
      "purpose": "Retrieve the current status of order 4471.",
      "input": { "orderId": "4471" },
      "output_summary": "Connector returned HTTP 500 - upstream order service timed out.",
      "output_raw": "{\"error\":\"UpstreamTimeout\",\"code\":500,\"message\":\"order-svc did not respond in 30s\"}",
      "status": "error",
      "error_message": "GetOrderStatus failed with HTTP 500 (UpstreamTimeout)"
    },
    {
      "step": 3,
      "tool_name": "GetOrderStatus",
      "purpose": "Retry the order lookup after the step 2 timeout.",
      "input": { "orderId": "4471" },
      "output_summary": "Order 4471 delivered 2026-07-19; return-eligible; no replacement created.",
      "output_raw": "{\"orderId\":\"4471\",\"status\":\"delivered\",\"deliveredDate\":\"2026-07-19\",\"returnEligible\":true}",
      "status": "success",
      "error_message": null
    },
    {
      "step": 4,
      "tool_name": "skill:date-calculator",
      "purpose": "Compute the return-by date (delivery + 30 days).",
      "input": { "start": "2026-07-19", "add_days": 30 },
      "output_summary": "Return-by date: 2026-08-18.",
      "output_raw": "2026-08-18",
      "status": "success",
      "error_message": null
    }
  ],
  "final_answer_summary": "Told the customer order 4471 is return-eligible until Aug 18. Note: the order lookup timed out once (HTTP 500) and succeeded on retry."
}
```

**Hãy đọc bản truy vết, đừng chỉ đọc bản ghi hội thoại.** Khách hàng đã nhận được một câu trả lời gọn gàng — nhưng bản
truy vết cho thấy dịch vụ đơn hàng đã **gặp lỗi 500 và được thử lại** (bước 2-3), cho bạn biết
chính xác **connector và các đầu vào** liên quan, đồng thời hiển thị **bài viết tri thức**
và **skill** đã định hình nên câu trả lời. Trên kênh giao tiếp, không có chi tiết nào trong số đó hiển thị.
Giờ đây bạn có thể phân tích lỗi quá thời gian (timeout) xảy ra gián đoạn mà không cần tái hiện lại bất cứ thứ gì.

---

## Chỉ chạy khi có lệnh rõ ràng

Tool Tracer **chỉ** kích hoạt khi tin nhắn chứa chính xác lệnh gỡ lỗi sau:

```
/special-debug tool-trace
```

theo sau là tác vụ bạn muốn truy vết. Công cụ cố ý **không** phản hồi các cách diễn đạt
thông thường như *"truy vết đoạn này"* hay *"gỡ lỗi cái này"* — việc yêu cầu đúng
lệnh giúp hoạt động truy vết luôn là một hành động có chủ đích, nhờ vậy người dùng bình thường trên kênh thực tế không thể
vô tình kích hoạt và các tương tác hằng ngày vẫn giữ nguyên.

Mặc định, bản truy vết sẽ **ẩn bớt (redact)** các giá trị nhạy cảm — bí mật (secret), token, thông tin xác thực
và dữ liệu PII/PHI đều được che đi để có thể chia sẻ an toàn khi phân loại sự cố. Quản trị viên được ủy quyền có thể
thêm **`--full`** để giữ nguyên văn các giá trị đó phục vụ gỡ lỗi chuyên sâu; hãy giới hạn đối tượng
được phép dùng `--full` (và agent) khi bạn triển khai, đồng thời tránh công khai tính năng này trên
các kênh người dùng cuối không đáng tin cậy.

## Khi nào nên sử dụng

| Bạn cần… | Tool Tracer mang lại cho bạn… |
| --- | --- |
| **Phân loại sự cố trên môi trường production** mà người dùng gặp phải trên một kênh | Bản tóm tắt những gì đã thực sự xảy ra — không cần tái hiện trong ngăn kiểm thử. |
| **Xem lý do câu trả lời bị sai hoặc chậm** | Các lượt gọi thất bại, mã lỗi và các lần thử lại bị ẩn sau câu trả lời. |
| **Kiểm tra connector nào đã chạy, với thuộc tính gì** | Đầu vào và đầu ra chính xác của từng hành động tại một nơi duy nhất. |
| **Xác nhận nguồn tri thức nào đã định hình câu trả lời** | Các truy vấn tri thức mà lượt chạy đã thực hiện, ở mức truy vết. |
| **Lập tài liệu hoặc bàn giao một quy trình làm việc** | Bản ghi có cấu trúc, có thể lặp lại về cách tác vụ đã được thực hiện. |

## Cách thức hoạt động

1. **Chạy tương tác nguyên vẹn** — việc truy vết không bao giờ làm thay đổi quá trình suy luận
   hay cách dùng công cụ của agent, nhờ vậy bạn thu được đúng lượt chạy thực tế.
2. **Tổng hợp bản truy vết** theo đúng thứ tự thực thi thực tế, kèm theo đầu vào,
   đầu ra, trạng thái và lỗi của từng bước.
3. **Ghi tệp `tool_trace.json`** và trả về dưới dạng tệp có thể tải xuống.

## Giới hạn trung thực

Đây là một **bản tóm tắt lượt chạy do agent tự báo cáo, không phải nhật ký hệ thống chống giả mạo.** Bản truy vết
được tổng hợp từ những gì agent có thể quan sát về lượt chạy của chính nó — hãy xem đây là một bản tường thuật trung thực,
có độ chính xác cao phục vụ phân loại sự cố và gỡ lỗi, chứ không phải dấu vết kiểm toán mật mã.
Các lượt tra cứu tri thức được ghi lại ở **mức truy vết** (rằng một nguồn đã được truy vấn,
kèm trích dẫn/tóm tắt) — toàn văn đoạn nội dung được truy xuất có thể không phải lúc nào cũng
khôi phục được. Khi một giá trị thực sự không thể khôi phục, skill sẽ ghi `null`
hoặc `"unavailable"` thay vì suy đoán.

> **Đây là công cụ quản trị / gỡ lỗi với hai chế độ.** Mặc định công cụ sẽ **ẩn bớt (redact)**
> các giá trị nhạy cảm — bí mật, token, thông tin xác thực và PII/PHI đều được che đi để bản
> truy vết có thể truyền tay an toàn khi phân loại sự cố mà vẫn thể hiện *những gì* đã chạy. Quản trị viên
> được ủy quyền có thể thêm **`--full`** để ghi lại nguyên văn mọi thứ phục vụ gỡ lỗi chuyên sâu;
> hãy xử lý tệp `tool_trace.json` chế độ `--full` cẩn trọng như dữ liệu hệ thống gốc
> và giữ tệp trong phạm vi tin cậy đó.
>
> **Ai có thể chạy `--full`?** Bản thân skill không thể thực thi quy định đó — việc kiểm soát quyền thuộc về
> phía nền tảng. Mô hình thực tế hiệu quả là: chỉ cài đặt tool-tracer trên một
> **agent phạm vi quản trị** được chia sẻ với các maker/quản trị viên của bạn (không cài trên agent
> hướng tới khách hàng), và có thể bổ sung lớp kiểm soát nhánh `--full` sau một topic yêu cầu xác thực
> có kiểm tra nhóm Entra của người dùng đang đăng nhập.

## Tệp liên quan

- `SKILL.md` — đặc tả dành cho agent: khi nào skill được kích hoạt, schema đầu ra đầy đủ
  và các quy tắc truy vết.
