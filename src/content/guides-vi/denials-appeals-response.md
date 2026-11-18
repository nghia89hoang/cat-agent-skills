# Xử lý Từ chối Thanh toán & Kháng nghị

Dành cho đội ngũ quản lý chu trình doanh thu (revenue cycle) và xử lý từ chối thanh toán khi giải quyết một hồ sơ yêu cầu thanh toán (claim) bị từ chối từ bước bảng kê thanh toán đến bước kháng nghị.

Công cụ phân loại lý do từ chối cùng các mã lý do đi kèm, đính kèm chính sách áp dụng của bên chi trả và bằng chứng từ hồ sơ bệnh án, xếp hạng hàng đợi xử lý theo hạn chót rồi đến giá trị có thể thu hồi, và soạn thảo thư kháng nghị đúng cấp độ.

Nguyên tắc thiết kế cốt lõi là ưu tiên tính chính trực hơn tỷ lệ thu hồi: một hồ sơ kháng nghị chỉ vững chắc khi hồ sơ bệnh án đằng sau chứng minh được, và một khi đã quá hạn chót thì không thể kháng nghị được nữa.

## Thành phần bao gồm

1. **denial-classify** phân tích thư từ chối hoặc bảng kê thanh toán X12 835 thành loại từ chối, các mã CARC và RARC, số tiền và cấp độ kháng nghị, mỗi mục đều có trích dẫn.
2. **policy-retrieve** truy xuất điều khoản chính sách áp dụng của bên chi trả, điều khoản hợp đồng và hướng dẫn mã hóa, hoặc báo cáo rằng không tìm thấy.
3. **evidence-assemble** tổng hợp và trích dẫn các bằng chứng từ hồ sơ bệnh án trả lời trực tiếp cho lý do từ chối, đồng thời chỉ rõ các khoảng trống còn thiếu.
4. **deadline-track** tính toán hạn chót kháng nghị, gắn cờ các hồ sơ yêu cầu thanh toán khẩn cấp hoặc đã quá hạn và xếp hạng hàng đợi theo hạn chót rồi đến giá trị có thể thu hồi.
5. **appeal-draft** soạn thảo thư kháng nghị phù hợp với từng cấp độ dựa trên chính sách và bằng chứng đã trích dẫn.

## Trước khi bắt đầu

Thư từ chối hoặc bảng kê thanh toán X12 835, hồ sơ yêu cầu thanh toán gốc, hàng đợi xử lý từ chối, ghi chú bệnh án cùng thư viện chính sách và hợp đồng của bên chi trả.

Các connector gợi ý: X12, Salesforce, Oracle Database, Snowflake, SAP, ServiceNow, Box và Adobe PDF Services.

Mỗi skill đều có thư mục `config/` chứa các thiết lập được đánh dấu `[TO CONFIGURE]`. Hãy điền các giá trị này cho tổ chức của bạn; cho đến khi bạn hoàn tất, các skill sẽ báo cáo mục đó là chưa được định tuyến thay vì tự suy đoán.

- `payer-appeal-windows.json`: khung thời gian kháng nghị và các cấp độ kháng nghị cho từng bên chi trả.
- Thư viện chính sách của bên chi trả và nguồn hồ sơ lâm sàng được nêu trong các skill.

## Dùng thử

- **Phân loại trường hợp từ chối:** "Hãy phân loại lý do từ chối trên hồ sơ yêu cầu thanh toán [claim id]. Thông báo thanh toán và tệp xuất hàng đợi xử lý từ chối nằm trong [folder]."
- **Xếp hạng hàng đợi từ chối:** "Chúng ta nên xử lý những hồ sơ bị từ chối nào trước? Hãy xếp hạng các hồ sơ yêu cầu thanh toán trong [work queue export] theo hạn chót kháng nghị và giá trị có thể thu hồi."
- **Soạn thảo thư kháng nghị:** "Hãy soạn thảo hồ sơ kháng nghị cho hồ sơ yêu cầu thanh toán [claim id] đối chiếu với chính sách [policy id] của [payer] bằng các ghi chú bệnh án trong [folder]."

## Giới hạn

Các phân loại, hàng đợi đã xếp hạng và thư kháng nghị nháp dùng để con người rà soát. Công cụ không bao giờ tự mã hóa lại một hồ sơ yêu cầu thanh toán khi hồ sơ bệnh án không hỗ trợ và không bao giờ tự nộp hồ sơ kháng nghị.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán lâm sàng và chuyên môn. Hãy sử dụng dữ liệu giả lập hoặc dữ liệu đã khử định danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
