# Hỗ trợ dịch vụ khách hàng và đơn hàng

Dành cho nhân viên tổng đài và bộ phận chăm sóc khách hàng trên kênh số khi xử lý nhóm ý định (intent) nhỏ nhưng lặp lại thường xuyên, chiếm phần lớn lưu lượng yêu cầu dịch vụ bán lẻ — đơn hàng của tôi đang ở đâu, tôi có thể trả hàng không, sản phẩm còn hàng không, chính sách quy định thế nào.

Công cụ phân loại ý định theo hệ thống phân loại (taxonomy), tổng hợp ngữ cảnh về khách hàng, đơn hàng, khách hàng thân thiết (loyalty) và giao nhận đồng thời phát hiện mâu thuẫn giữa các nguồn dữ liệu, truy xuất câu trả lời đã được phê duyệt, rồi soạn thảo phương án giải quyết đúng kênh liên lạc và văn phong hoặc lập bộ hồ sơ bàn giao có cấu trúc.

Nguyên tắc thiết kế cốt lõi là ưu tiên độ tin cậy hơn phạm vi bao phủ: một câu trả lời sai đầy tự tin gây tốn kém hơn nhiều so với việc chuyển cấp xử lý.

## Thành phần bao gồm

1. Phân loại ý định theo hệ thống phân loại (tất định).
2. Hợp nhất ngữ cảnh về khách hàng, đơn hàng, khách hàng thân thiết và giao nhận; gắn cờ các điểm mâu thuẫn.
3. Truy xuất câu trả lời đã được phê duyệt kèm trích dẫn nguồn.
4. Soạn thảo phương án giải quyết theo đúng kênh và văn phong dành cho khách hàng.
5. Lập hồ sơ chuyển cấp xử lý có cấu trúc khi mức độ tin cậy thấp hơn ngưỡng quy định.

## Trước khi bắt đầu

Các bài viết tri thức, lịch sử hồ sơ CRM, trạng thái đơn hàng trên OMS, dữ liệu khách hàng thân thiết, trạng thái giao nhận và đơn vị vận chuyển, tài liệu sản phẩm, kịch bản phản hồi đã phê duyệt và chính sách dịch vụ.

## Dùng thử

Tình huống hệ thống báo đã giao nhưng chưa nhận được hàng, kèm áp lực đòi hoàn tiền ngay và dọa yêu cầu hoàn bồi (chargeback).

- Ý định được phân giải thành **đã giao nhưng chưa nhận được hàng** (delivered-not-received), được ưu tiên cao hơn một yêu cầu tra cứu trạng thái đơn hàng thông thường.
- **Dữ liệu quét của đơn vị vận chuyển mâu thuẫn với tường thuật của khách hàng** — mâu thuẫn này được ghi nhận kèm trích dẫn, và phản hồi tạm thời tuyệt đối không tranh luận trực diện với khách hàng.
- Điều kiện xử lý tức thì **không đạt** về hạng khách hàng hoặc giá trị đơn hàng, nên hồ sơ được điều hướng sang quy trình điều tra kèm thời hạn xử lý, và khoản hỗ trợ thiện chí (goodwill) được ghi nhận dưới dạng **đề xuất để nhân sự phê duyệt**.

Một nhân viên thiếu kinh nghiệm sẽ vội vàng hứa hoàn tiền ngay lập tức.

## Giới hạn

Chỉ cung cấp bản nháp phương án giải quyết và hồ sơ chuyển cấp xử lý. Công cụ không tự cấp khoản hỗ trợ thiện chí, không thay đổi thông tin thanh toán hay tự ý duyệt ngoại lệ chính sách không có căn cứ.

## Người đóng góp

- Copilot Acceleration Team (CAT)
