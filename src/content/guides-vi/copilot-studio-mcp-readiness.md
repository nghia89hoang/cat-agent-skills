# Đánh giá mức độ sẵn sàng MCP cho Copilot Studio

Dán các định nghĩa công cụ của một máy chủ MCP và biết trước Copilot Studio sẽ xử lý
chúng ra sao trước khi bạn tốn cả buổi chiều với trình hướng dẫn thiết lập (wizard). Các kiểm tra đều dựa trên tài liệu chính thức
của Microsoft chứ không phải truyền miệng, và mỗi phát hiện đều trích dẫn bài viết
nguồn tương ứng.

## Vấn đề cốt lõi mà kỹ năng giải quyết

Một công cụ có `$ref` ở bất kỳ đâu trong schema đầu vào hoặc đầu ra sẽ bị lọc bỏ khỏi
danh sách công cụ. Không có lỗi, không có cảnh báo, công cụ đó đơn giản là biến mất. Đây là
hành vi đã được ghi nhận trong tài liệu trên standard harness và rất khó đoán biết nếu chỉ nhìn từ
bên ngoài. Bốn dạng schema khác cũng có những hành vi bất ngờ riêng:

- `"type": ["string", "null"]` làm cắt cụt schema đầu vào.
- `exclusiveMinimum` ở dạng số nguyên sẽ phát sinh ngoại lệ `System.FormatException`.
- Đầu vào dạng `enum` được đọc như chuỗi văn bản thuần túy, nên ràng buộc giá trị không được thực thi.
- SSE đã bị ngừng hỗ trợ từ tháng 8 năm 2025, nên máy chủ chỉ hỗ trợ giao thức này sẽ không thể kết nối.

## Kết quả bạn nhận được

Một bảng gồm các cột Check (Kiểm tra), Harness, Verdict (Kết luận), Evidence (Bằng chứng) và Fix (Cách khắc phục), tiếp theo là phần riêng cho các mục chặn triển khai (blocker),
rồi đến danh sách có thứ tự các thay đổi cần thực hiện trên máy chủ. Các mức kết luận gồm BLOCKER,
FIX, WATCH, PASS hoặc UNKNOWN, và với UNKNOWN kỹ năng sẽ nêu rõ cần xem thêm thông tin gì.

Các bước kiểm tra bao phủ giao thức truyền tải, các thành phần nguyên thủy (primitive) được hỗ trợ, schema đầu vào của công cụ, mô tả
công cụ đóng vai trò tín hiệu định tuyến, mức độ phù hợp với điều phối (orchestration), xác thực,
mức chiếm dụng tài nguyên trên mỗi cuộc hội thoại và chính sách dữ liệu của connector.

## Phạm vi harness

Microsoft ghi nhận tài liệu MCP cho hai harness của Copilot Studio và các ràng buộc của chúng
khác nhau, vì vậy kỹ năng sẽ hỏi bạn đang dùng harness nào trước khi xuất báo cáo.

- **Standard harness**: MCP chạy qua các connector của Power Platform. Các vấn đề về schema công cụ
  và hành vi chính sách dữ liệu nằm ở đây.
- **GitHub Copilot harness** (preview): MCP được thêm từ hộp thoại Tools. Các giới hạn
  về mức chiếm dụng tài nguyên trên mỗi cuộc hội thoại nằm ở đây.

Copilot chat harness nằm ngoài phạm vi hỗ trợ, vì Microsoft không có tài liệu về
MCP trên harness này. Kỹ năng sẽ thông báo rõ điều đó thay vì tự suy đoán.

## Thông tin cần biết

- Kỹ năng rà soát đúng hiện vật bạn cung cấp. Một tệp README giới thiệu về máy chủ không phải là bằng chứng
  về các schema của nó, và kỹ năng sẽ yêu cầu bạn cung cấp tệp định nghĩa thực tế.
- Kỹ năng sẽ không đưa ra giới hạn nào mà Microsoft chưa công bố. Giới hạn số máy chủ
  đồng thời chưa có con số được công bố chính thức, nên bạn sẽ nhận được mô tả hành vi và trích dẫn thay
  vì một con số tự bịa.
- Kỹ năng không bao giờ kết nối tới máy chủ hay chạm vào tenant của bạn.
- Hãy kết hợp cùng **Copilot Studio Topic Blueprint** khi bạn đang thiết kế
  agent sẽ sử dụng máy chủ này.
