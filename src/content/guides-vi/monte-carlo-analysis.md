# Phân tích Monte Carlo

Biến các đầu vào bất định thành bức tranh xác suất rõ ràng. Hãy mô tả một rủi ro — thời gian
dự án, tỷ suất sinh lời danh mục, thời gian ngừng hoạt động, chi phí — bằng một khoảng giá trị hoặc trung bình/độ biến động,
và skill sẽ chạy hàng nghìn phép thử ngẫu nhiên để trả về các phân vị,
biểu đồ tần suất và dữ liệu có thể tải xuống.

## Lý do skill này ra đời

Các LLM hoạt động kém với mô phỏng Monte Carlo nếu không có công cụ hỗ trợ. Nếu bạn hỏi Copilot "P95 của
triangular(12, 18, 45) là bao nhiêu?", nó sẽ bịa ra một con số hoặc chỉ mô tả
công thức mà không tính toán thực sự. Ngay cả khi nó tự viết mã NumPy và chạy thử, mỗi
kết quả chỉ là một lần chạy đơn lẻ — mỗi lần một khác, không có biểu đồ, không có tệp CSV, không có
cách nào để bàn giao kết quả cho các bên liên quan.

Skill này giải quyết cả ba vấn đề trên: mã Python chạy nhất quán, biểu đồ luôn
theo cùng một phong cách, và trang HTML tương tác cho phép các bên liên quan không chuyên về kỹ thuật
tự khám phá các kịch bản "giả định (what-if)" mà không cần gọi lại agent.

## Các tình huống sử dụng thực tế

### Quản lý dự án — rủi ro trễ hạn

> "Sprint của chúng tôi hoàn thành trong khoảng từ 8 đến 22 ngày, khả năng cao nhất là 14 ngày. Rủi ro
> trễ hạn 3 tuần là bao nhiêu?"

Sử dụng phân phối tam giác (triangular). Công cụ tính ngưỡng P trả lời trực tiếp đúng câu
hỏi này: `P(outcome < 21) = 78%` — tức có 22% khả năng trễ
hạn. Các bên liên quan nhận được biểu đồ tần suất để trình bày với khách hàng, thay vì chỉ một
mốc ngày đơn lẻ.

### Tài chính — giá trị danh mục có rủi ro (VaR)

> "Chúng tôi đang đầu tư 2 triệu USD. Mô hình dự báo mức sinh lời trung bình 7% với độ biến động 18%.
> Điều tồi tệ nào có thể xảy ra trong năm nay?"

Sử dụng phân phối chuẩn (normal) với `base_modifier = 2_000_000`. Chỉ số P5 cho thấy
mức sàn giá trị có rủi ro (giá trị danh mục trong một năm xấu). Hữu ích cho bất kỳ ai
quản lý ngân sách, chứ không chỉ các chuyên gia định lượng.

### CNTT — thời hạn hợp đồng so với tiến độ di chuyển hệ thống

> "Quá trình di chuyển lên đám mây của chúng tôi có thể mất 3–8 tháng. Khả năng hoàn thành
> trước kỳ gia hạn hợp đồng vào tháng thứ 5 là bao nhiêu?"

Sử dụng phân phối tam giác (3, 5, 8). Trang HTML tương tác cho phép bạn kéo thanh
"trường hợp xấu nhất" từ 8 lên 10 để cho ban lãnh đạo thấy điều gì xảy ra nếu nhà cung cấp chậm trễ —
không cần chạy lại agent.

### Bảo hiểm / định phí — mức độ rủi ro bồi thường

> "Các yêu cầu bồi thường lớn tại cơ sở của chúng tôi tuân theo phân phối log-normal. Giá trị trung bình log là 10,5,
> sigma 1,2. Mức rủi ro tại phân vị thứ 95 là bao nhiêu?"

Log-normal là dạng phân phối phù hợp — tiền bồi thường không thể âm và có đuôi phải
kéo dài. P95 giúp xác định con số dự phòng. Phần tóm tắt ngắn tự động chỉ ra
khoảng chênh lệch giữa trung bình và trung vị, vốn là thông tin cốt lõi đối với dữ liệu log-normal.

### Chuỗi cung ứng — lập kế hoạch tồn kho dự phòng

> "Thời gian giao linh kiện mất 4–12 ngày, thường là 7 ngày. Chúng tôi đặt hàng 200 lần mỗi năm.
> Rủi ro đuôi (tail risk) là gì?"

Sử dụng phân phối tam giác. P95 cho bạn biết cần giữ tồn kho dự phòng trong bao nhiêu ngày để
tránh hết hàng trong 95% số lần.

## Cách sử dụng

Hãy đặt câu hỏi bằng ngôn ngữ tự nhiên, ví dụ:

> "Trường hợp tốt nhất 12 ngày, thông thường 18 ngày, xấu nhất 45 ngày. Hãy chạy 10.000 lần mô phỏng cho
> tiến độ di chuyển hệ thống để tôi thấy được rủi ro."

Hoặc:

> "Danh mục đầu tư 5 triệu USD, tỷ suất sinh lời trung bình hằng năm 0,06, độ lệch chuẩn 0,14 — hãy chạy Monte Carlo cho
> các kết quả và xuất cho tôi biểu đồ tương tác kèm tệp Excel."

Nếu bạn không cung cấp con số (ví dụ: "mô phỏng tình trạng chậm trễ chuỗi cung ứng của chúng tôi"), agent
sẽ hỏi dạng phân phối và các tham số — nó sẽ không tự bịa số liệu.

## Kết quả nhận được

1. **P5 / P50 / P95 / giá trị trung bình** theo đúng đơn vị nghiệp vụ của bạn
2. Một **tóm tắt ngắn** giải thích ý nghĩa của độ phân tán đối với việc lập kế hoạch
3. **Biểu đồ tần suất dạng PNG** có các đường đánh dấu P5 / P50 / P95
4. **Tệp CSV** lưu mọi lần lặp (mở được bằng Excel)
5. Tùy chọn **HTML tương tác** với các điều khiển trực tiếp — xem bên dưới
6. Tùy chọn **.xlsx** gồm trang tính Summary + Iterations

## HTML tương tác

Khi bạn yêu cầu biểu đồ tương tác, skill sẽ tạo một trang web độc lập
chạy trên trình duyệt. Không cần máy chủ — mọi thứ đều chạy bằng JavaScript:

- **Thanh trượt trực tiếp** cho từng tham số phân phối (Tối thiểu / Khả năng cao nhất / Tối đa
  cho phân phối tam giác; Trung bình + Độ lệch chuẩn cho phân phối chuẩn; v.v.)
- **Thanh trượt số lần mô phỏng** từ 500 đến 50.000 — kéo để quan sát đường cong dần ổn định
- Các thẻ thống kê (P5, P50, P95, Mean, Std dev, N) cập nhật tức thì theo từng thao tác kéo
- **Công cụ tính ngưỡng P** — nhập giá trị bất kỳ để nhận ngay `P(outcome < X) = …%`

Mở tệp `.html` bằng bất kỳ trình duyệt nào và gửi cho các bên liên quan để họ tự khám phá
các kịch bản "giả định (what-if)" mà không cần gọi lại agent.

## Các phân phối được hỗ trợ

| Khi bạn biết… | Phân phối |
| --- | --- |
| Giá trị nhỏ nhất, khả năng cao nhất, lớn nhất | Triangular (Tam giác) |
| Trung bình và độ lệch chuẩn | Normal (Chuẩn) |
| Khoảng phẳng nhỏ nhất–lớn nhất | Uniform (Đều) |
| Rủi ro lệch dương (trung bình log + sigma) | Log-normal |
| Số sự kiện kỳ vọng trong một khoảng thời gian (λ) | Poisson |
| Thời gian tới khi hỏng / độ tin cậy (tham số hình dạng k, tham số tỷ lệ λ) | Weibull |
| Một tỷ lệ hoặc mức độ hoàn thành (α, β) | Beta |
| Khoảng thời gian giữa các lần xuất hiện ngẫu nhiên (trung bình = tham số tỷ lệ) | Exponential (Hàm mũ) |

## Thư viện phụ thuộc

`numpy`, `pandas`, `matplotlib`. Tùy chọn: `openpyxl` để xuất tệp `.xlsx` gốc
(tệp CSV luôn mở được trong Excel).
