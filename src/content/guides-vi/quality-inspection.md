# Kiểm tra chất lượng & Sự không phù hợp

Dành cho thanh tra viên hoặc kỹ sư chất lượng đang có trước mặt một lô hàng kiểm tra, tệp xuất kết quả đo lường, bản vẽ kỹ thuật, giấy chứng nhận hợp chuẩn — và một nhà cung cấp đang chờ quyết định thông qua lô hàng.

Plugin này đọc toàn bộ các tài liệu đó, đối chiếu từng giá trị đo thực tế với dung sai của nó, phân loại từng lỗi theo mức độ nghiêm trọng và hướng xử lý (disposition), rồi trả về một bản dự thảo báo cáo sự không phù hợp (NCR) trong đó mọi kết luận đều được trích dẫn tới đúng điều khoản hoặc ghi chú trên bản vẽ làm căn cứ.

## Thành phần bao gồm

1. Đọc thông số kỹ thuật chi tiết, bản vẽ kỹ thuật, kế hoạch kiểm tra, giấy chứng nhận hợp chuẩn (CoC) và các tệp xuất kết quả đo lường.
2. So sánh giá trị thực tế với dung sai, tính toán thống kê theo từng đặc tính, gắn cờ các kết quả vượt dung sai và kết quả *cận biên*, đồng thời đối chiếu chéo giấy chứng nhận với kết quả đo thực tế.
3. Phân hạng mức độ nghiêm trọng và đề xuất hướng xử lý — sử dụng nguyên trạng (use-as-is), gia công lại (rework), loại bỏ phế phẩm (scrap), trả lại nhà cung cấp (return-to-vendor), giữ lại để xem xét (hold-for-review).
4. Soạn thảo báo cáo NCR và tóm tắt kết quả kiểm tra, mọi quyết định đều có trích dẫn căn cứ.

Việc kiểm tra dung sai và phân hạng mức độ nghiêm trọng được thực hiện dựa trên quy tắc. Mô hình trích xuất dữ liệu nguồn và soạn thảo phần văn bản có trích dẫn; mức độ nghiêm trọng và hướng xử lý xuất phát từ các quy tắc đó.

## Trước khi bắt đầu

Thông số kỹ thuật chi tiết hoặc bản vẽ, kế hoạch kiểm tra, tệp xuất kết quả đo lường (CMM CSV hoặc định dạng tương tự) và giấy chứng nhận hợp chuẩn nếu có.

## Dùng thử

Mọi thứ đều hướng tới việc thông qua lô hàng. Tất cả kích thước đều đạt. Sai lệch độ nhám bề mặt trông có vẻ chỉ là lỗi thẩm mỹ. Giấy chứng nhận đã xác nhận rõ ràng quy trình hoàn thiện bề mặt. Nhà cung cấp đang gọi điện giục còn kỹ sư chất lượng lại vắng mặt.

Có ba cái bẫy đang nằm ngay trong bộ tài liệu:

- **Ghi chú bản vẽ NOTE 9** quy định độ hoàn thiện bề mặt là yếu tố *tới hạn về độ bền mỏi*. Chỉ số Ra 1,72 so với mức tối đa 1,6 không phải là lỗi thẩm mỹ — đây là trường hợp giữ hàng nghiêm trọng chờ thẩm quyền thiết kế xem xét.
- **Giấy chứng nhận mâu thuẫn với kết quả đo.** Kết quả đo là căn cứ quyết định. Đó là ứng viên cần yêu cầu nhà cung cấp thực hiện hành động khắc phục, chứ không phải lý do để thông qua lô hàng.
- **Độ phẳng ở mức 0,096 trên giới hạn 0,100** vẫn hợp lệ nhưng nằm ở ngưỡng cận biên — nó thuộc về danh sách theo dõi, không phải danh sách lỗi.

Một lượt rà soát hời hợt sẽ thông qua lô hàng dựa vào giấy chứng nhận. Bộ máy quy tắc sẽ giữ lô hàng lại.

## Giới hạn

Ưu tiên bản nháp trước: không có nội dung nào bị nộp, gửi đi hay ghi ngược lại vào hệ thống quản lý chất lượng. Plugin dừng lại ở bước tạo bản nháp NCR; việc phân tích nguyên nhân gốc rễ và hành động khắc phục vẫn do đội ngũ chất lượng của bạn đảm nhiệm.

## Người đóng góp

- Copilot Acceleration Team (CAT)
