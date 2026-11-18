# Thực thi tác vụ và khuyến mãi tại cửa hàng

Dành cho quản lý cửa hàng hoặc trưởng nhóm vận hành thực địa khi nhận bộ tài liệu chiến dịch từ trụ sở chính (HQ) được xây dựng cho hàng trăm cửa hàng và phải triển khai chính xác cho *riêng cửa hàng này* — trước ngày ra mắt, chứ không phải sau khi kệ hàng gắn sai giá đã bị chụp ảnh lại.

Công cụ tiếp nhận bộ tài liệu chiến dịch, tệp giá, sơ đồ trưng bày (planogram) và danh sách tác vụ, ánh xạ các yêu cầu theo mô hình (format) và cụm cửa hàng (cluster) của cửa hàng này, kiểm tra tính đầy đủ, gắn cờ các xung đột về giá và biển bảng quảng cáo theo quy tắc tất định, xếp hạng các ngoại lệ theo mức độ tác động đến doanh thu, đồng thời soạn thảo danh sách kiểm tra mức độ sẵn sàng, bản tóm tắt đầu ca và danh sách ngoại lệ.

## Thành phần bao gồm

1. Đọc bộ tài liệu chiến dịch, tệp giá, sơ đồ trưng bày và danh sách tác vụ.
2. Ánh xạ các yêu cầu theo mô hình và cụm cửa hàng của cửa hàng này.
3. Kiểm tra tính đầy đủ; gắn cờ các xung đột về giá và biển bảng quảng cáo (tất định).
4. Xếp hạng những vấn đề mà cửa hàng không thể tự xử lý theo giá trị doanh thu bị ảnh hưởng.
5. Soạn thảo danh sách kiểm tra mức độ sẵn sàng và bản tóm tắt đầu ca theo ngôn ngữ vận hành tại cửa hàng.

## Trước khi bắt đầu

Tóm tắt chương trình khuyến mãi và bộ tài liệu chiến dịch, tệp giá và tệp thay đổi giá, sơ đồ trưng bày và danh sách biển bảng quảng cáo, lịch ra mắt, danh sách tác vụ cửa hàng và dữ liệu tổng hợp cửa hàng (store master) kèm định nghĩa cụm cửa hàng.

## Dùng thử

*"Mọi thứ đã giao đủ, báo cáo SẴN SÀNG vào thứ Hai."* Lần kiểm tra sẽ phát hiện những rủi ro ẩn sau sự tự tin đó:

- Một yêu cầu trưng bày đầu kệ (end-cap) đòi hỏi loại giá kệ mà **mô hình cửa hàng nhỏ không có** — đây là xung đột mà cửa hàng không thể tự khắc phục tại chỗ, nên cần leo thang báo cáo về trụ sở chính (HQ).
- Một **xung đột về giá trên SKU chủ lực**: giá khuyến mãi lại *cao hơn* giá niêm yết hiện tại trên kệ, nên việc áp dụng thay đổi sẽ làm tăng giá bán trong suốt thời gian khuyến mãi. Mục này bị chặn và xếp hạng đầu tiên với khoảng 340 sản phẩm bán ra mỗi tuần bị ảnh hưởng.
- Hai bộ biển bảng quảng cáo chưa bao giờ được nhận tại cửa hàng trong khi tác vụ tương ứng vẫn đang ở trạng thái mở.

Việc xếp hạng theo doanh thu thay vì theo số lượng đầu việc chính là yếu tố đưa bẫy sai giá lên vị trí ưu tiên cao nhất.

## Giới hạn

Công cụ không tự động thay đổi giá trên hệ thống POS, sơ đồ trưng bày, lịch phân công nhân sự hay ngân sách chiến dịch. Công cụ tạo ra bộ tài liệu sẵn sàng triển khai và danh sách ngoại lệ; cửa hàng và trụ sở chính (HQ) sẽ trực tiếp hành động dựa trên đó.

## Người đóng góp

- Copilot Acceleration Team (CAT)
