# Cổng Kiểm soát Chất lượng Sản phẩm Bàn giao

Dành cho các quản lý hợp đồng, đối tác điều hành (partner) và người rà soát quản lý chất lượng và rủi ro (QRM) kiểm tra sản phẩm bàn giao cho khách hàng trước khi phát hành.

Công cụ ánh xạ từng nhận định trong bản nháp tới bộ tài liệu chứng minh (support pack), truy xuất các tiêu chí cổng chất lượng và ngôn từ bắt buộc, chạy các cổng kiểm soát phát hành, xếp hạng các phát hiện theo mức độ nghiêm trọng và soạn thảo hồ sơ rà soát cho đối tác điều hành (partner review packet) có trích dẫn đầy đủ từng phát hiện.

Nguyên tắc thiết kế cốt lõi là việc phát hiện một nhận định thiếu cơ sở ngay tại cổng kiểm soát sẽ ít tốn kém hơn nhiều so với sau khi khách hàng đã dựa vào nó: bất kỳ nội dung nào không được bằng chứng hậu thuẫn sẽ bị giữ lại, chứ không bị làm dịu hay lấp liếm đi.

## Thành phần bao gồm

1. **deliverable-ingest** cấu trúc hóa bản nháp sản phẩm bàn giao, danh sách người nhận, mục lục bằng chứng, các sổ đăng ký và ghi chú rà soát trước đó để đưa vào cổng kiểm soát.
2. **criteria-retrieve** nạp khung chất lượng áp dụng, tiêu chí cổng kiểm soát, ngôn từ bắt buộc, quy tắc thương hiệu và các phát hiện từ những lần rà soát trước.
3. **assertion-map** ánh xạ từng nhận định tới bộ tài liệu chứng minh và báo cáo xem nhận định đó có được hậu thuẫn hay không.
4. **gate-check** chạy các cổng kiểm soát phát hành, xếp hạng phát hiện theo mức độ nghiêm trọng và liệt kê mọi điểm chặn phát hành.
5. **review-packet** soạn thảo hồ sơ rà soát cho đối tác điều hành và QRM từ kết quả cổng kiểm soát, được đánh dấu là bản nháp để con người rà soát.

## Trước khi bắt đầu

Bản nháp sản phẩm bàn giao, danh sách người nhận dự kiến, bộ tài liệu chứng minh hoặc mục lục bằng chứng, mọi sổ đăng ký cung cấp dữ liệu cho cổng kiểm soát và các ghi chú rà soát trước đó. Không yêu cầu connector nào; hãy cung cấp trực tiếp các tệp hoặc trỏ đến chúng trong SharePoint hoặc OneDrive.

Các tiêu chí cổng chất lượng và quy tắc mức độ nghiêm trọng đi kèm trong thư mục `references/` của mỗi skill chỉ là bản tóm tắt minh họa để dùng thử, không phải chuẩn mực thực tế của một doanh nghiệp cụ thể. Hãy thay thế chúng bằng bộ tiêu chí riêng của tổ chức bạn trước khi dựa vào kết quả đầu ra.

## Dùng thử

- **Bắt đầu rà soát:** "Hãy rà soát bản nháp sản phẩm bàn giao trong [folder] đối chiếu với bộ tài liệu chứng minh của nó và cho tôi biết những nhận định nào còn thiếu bằng chứng."
- **Kiểm tra mức độ sẵn sàng phát hành:** "Hãy chạy cổng kiểm soát chất lượng trên [deliverable] của [client] và liệt kê mọi vấn đề đang chặn việc phát hành cho khách hàng."
- **Soạn thảo hồ sơ rà soát:** "Hãy soạn thảo hồ sơ rà soát cho đối tác điều hành đối với [deliverable] kèm theo mọi phát hiện được xếp hạng và trích dẫn đầy đủ."

## Giới hạn

Các hồ sơ rà soát và phát hiện dạng bản nháp dành cho người rà soát. Công cụ không bao giờ ký duyệt, phê duyệt phát hành cho khách hàng, cho phép bên thứ ba tin cậy sử dụng hay gửi bất cứ nội dung nào.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán chuyên môn. Hãy sử dụng dữ liệu hợp đồng giả lập hoặc đã được ẩn danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
