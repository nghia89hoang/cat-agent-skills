# Trình thiết kế Đánh giá Agent

Hầu hết hoạt động "kiểm thử" agent thất bại vì cùng một lý do: không ai định nghĩa thế nào là *tốt* trước khi chạy kiểm thử, rồi sau đó lại chấm các câu trả lời dài, giàu sắc thái bằng những quy tắc khớp chính xác cứng nhắc và tuyên bố thắng lợi dựa trên số lượng hoạt động thay vì kết quả thực chất. Kỹ năng này khắc phục điều đó.

**Trình thiết kế Đánh giá Agent** biến một agent thành người đồng hành đánh giá bài bản. Kỹ năng hướng dẫn bạn đi qua năm giai đoạn:

1. **Định nghĩa thế nào là "tốt"** — quyết định mà quá trình đánh giá phục vụ, các kịch bản quan trọng, và một ngưỡng đạt gói gọn trong một dòng cho từng khía cạnh chất lượng.
2. **Chọn phương pháp chấm điểm theo từng kịch bản** — một bảng quyết định định hướng bạn chọn phương pháp tiết kiệm chi phí nhất mà vẫn đo lường đúng điều bạn quan tâm (và tránh đối khớp chính xác/nguyên văn đối với các câu trả lời tạo sinh dài).
3. **Xây dựng bộ kiểm thử** — ưu tiên độ bao phủ hơn số lượng, câu trả lời tham chiếu ngắn gọn theo dạng tiêu chí chấm điểm (rubric), bao gồm các trường hợp biên và cách diễn đạt lại (paraphrase), không nhúng sẵn thông tin bí mật.
4. **Chạy và diễn giải kết quả** — đọc kết quả tổng hợp *lẫn* kết quả từng tình huống, gom nhóm lỗi theo nguyên nhân gốc rễ, và nhận biết khi nào cần sửa bài kiểm thử thay vì sửa agent.
5. **Quyết định triển khai / chưa triển khai (go / no-go)** — một bản tóm tắt mức độ sẵn sàng ngắn gọn, có cơ sở bảo vệ mà bạn có thể tự tin chịu trách nhiệm.

## Xây dựng cho Copilot Studio

Kỹ năng này nhắm tới **Microsoft Copilot Studio**, nền tảng có sẵn tính năng đánh giá agent tích hợp với đúng các phương pháp chấm điểm, bộ kiểm thử và hạn mức này. Kỹ năng nạp tệp `references/copilot-studio-evaluation.md`, trong đó xác định rõ tên các phương pháp kiểm thử gốc cùng các giới hạn trường và hạn mức thực tế (giới hạn ~1.000 ký tự cho phản hồi kỳ vọng, 100 tình huống mỗi bộ, mỗi lần chỉ chạy một lượt, giới hạn tần suất ~20 lượt chạy mỗi 24 giờ và thời gian lưu giữ 89 ngày) để thiết kế kiểm thử của bạn phù hợp với những gì sản phẩm thực sự áp dụng. Phương pháp luận năm giai đoạn cốt lõi đủ tổng quát để hướng dẫn đánh giá bất kỳ agent nào, nhưng tên phương pháp và các giới hạn cụ thể là của Copilot Studio.

## Khi nào kỹ năng được kích hoạt

Agent sẽ gọi kỹ năng này bất cứ khi nào bạn muốn đánh giá, kiểm thử hoặc xác thực một agent, quyết định xem agent đã sẵn sàng phát hành hay đưa vào vận hành chính thức (go live) hay chưa, chọn cách chấm điểm câu trả lời của agent, thiết kế một bộ kiểm thử, hoặc diễn giải kết quả đánh giá thành quyết định.

## Lưu ý về phạm vi

Hoạt động đánh giá ở đây đo lường **tính đúng đắn và chất lượng**. Nó không thay thế cho việc rà soát AI có trách nhiệm (responsible AI), an toàn hoặc chính sách nội dung — hãy coi những hạng mục đó là một cổng kiểm duyệt riêng biệt. Kỹ năng sẽ nhắc bạn về điều này khi cần thiết.
