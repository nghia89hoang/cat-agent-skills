# Bộ hồ sơ Chuyển tiếp Xuất viện

Dành cho bác sĩ nội trú bệnh viện, điều dưỡng và điều phối viên ca bệnh khi chuẩn bị cho bệnh nhân xuất viện về nhà.

Công cụ đối chiếu danh sách thuốc lúc nhập viện, trong thời gian nội trú và khi xuất viện; soạn thảo tóm tắt xuất viện cùng hướng dẫn cho bệnh nhân bằng ngôn ngữ dễ hiểu; và lập danh sách kiểm tra tái khám có ngày hẹn và người phụ trách cụ thể, mỗi mục đều được trích dẫn tới hồ sơ bệnh án.

Nguyên tắc thiết kế cốt lõi là ưu tiên an toàn hơn tốc độ: mọi sai lệch về thuốc hoặc lịch tái khám chưa có người phụ trách đều được làm rõ, tuyệt đối không bỏ qua hay làm mờ đi.

## Thành phần bao gồm

1. **admission-synthesise** tóm tắt quá trình điều trị nội trú từ ghi chú lâm sàng, thủ thuật, thuốc, xét nghiệm và chẩn đoán hình ảnh.
2. **med-reconcile** đối chiếu thuốc lúc nhập viện, trong thời gian nội trú và khi xuất viện, đồng thời gắn cờ mọi thay đổi chưa có giải trình.
3. **summary-draft** soạn thảo tóm tắt xuất viện với trích dẫn đầy đủ cho từng loại thuốc và từng thay đổi.
4. **patient-instructions** viết hướng dẫn dành cho bệnh nhân bằng ngôn ngữ dễ hiểu theo mức độ đọc hiểu đã cấu hình của bạn.
5. **followup-plan** xây dựng danh sách kiểm tra theo dõi sau xuất viện kèm người phụ trách và ngày hẹn cho mọi kết quả đang chờ và giấy chuyển tuyến.

## Trước khi bắt đầu

Ghi chú điều trị nội trú, báo cáo thủ thuật, hồ sơ thực hiện thuốc (medication administration record), kết quả xét nghiệm, chẩn đoán hình ảnh, danh sách vấn đề sức khỏe, y lệnh xuất viện, giấy chuyển tuyến và các kết quả đang chờ.

Các connector gợi ý: Salesforce, Oracle Database, Snowflake, Box, ServiceNow, Smartsheet và Adobe PDF Services.

Mỗi skill đều có thư mục `config/` chứa các thiết lập được đánh dấu `[TO CONFIGURE]`. Hãy điền các giá trị này cho tổ chức của bạn; cho đến khi bạn hoàn tất, các skill sẽ báo cáo mục đó là chưa được định tuyến thay vì tự suy đoán.

- `readability-rules.json`: mức độ đọc hiểu, độ dài câu, thuật ngữ chuyên môn bị cấm và các phần bắt buộc đối với hướng dẫn cho bệnh nhân.
- `followup-rules.json`: các trường bắt buộc, những người phụ trách được phép và số ngày tối đa đến lần tái khám đầu tiên.

## Dùng thử

- **Đối chiếu thuốc khi xuất viện:** "Hãy đối chiếu thuốc xuất viện cho bệnh nhân [patient id] với lịch sử nhập viện và các y lệnh nội trú trong [folder]."
- **Soạn thảo bộ hồ sơ xuất viện:** "Hãy soạn thảo tóm tắt xuất viện và hướng dẫn bằng ngôn ngữ dễ hiểu cho bệnh nhân [patient id]. Hồ sơ nằm trong [folder]."
- **Kiểm tra kế hoạch tái khám:** "Những mục theo dõi sau xuất viện nào của bệnh nhân [patient id] vẫn chưa có người phụ trách hoặc chưa có ngày hẹn? Danh sách kiểm tra, giấy chuyển tuyến và các kết quả đang chờ nằm trong [folder]."

## Giới hạn

Các bộ hồ sơ nháp dùng để bác sĩ lâm sàng rà soát. Công cụ không bao giờ âm thầm chuyển tiếp một loại thuốc đã bị gắn cờ và không bao giờ tự ký hay gửi bất cứ nội dung nào.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán lâm sàng và chuyên môn. Hãy sử dụng dữ liệu giả lập hoặc dữ liệu đã khử định danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
