# Soạn thảo Hồ sơ Pháp quy

Dành cho các nhóm pháp quy (regulatory) và biên soạn tài liệu y khoa khi soạn thảo báo cáo nghiên cứu lâm sàng hoặc hồ sơ trình duyệt 510(k).

Công cụ chuyển đổi đề cương nghiên cứu đã khóa (locked protocol), kế hoạch phân tích thống kê (SAP) cùng các bảng biểu, danh sách và hình minh họa (TLFs) thành bản nháp đầu tiên có trích dẫn nguồn. Công cụ lập kế hoạch các phần, soạn thảo từng phần từ các dữ kiện nguồn, đối chiếu từng con số và quần thể nghiên cứu với tài liệu nguồn, rồi ghép thành bản nháp hoàn chỉnh kèm các mục còn mở.

Nguyên tắc thiết kế cốt lõi là ưu tiên khả năng truy vết hơn câu chữ trau chuốt: mọi con số trong bản nháp đều trỏ ngược về một tài liệu nguồn đã khóa.

## Thành phần bao gồm

1. **source-ingest** xây dựng bản đồ dữ kiện có trích dẫn từ đề cương nghiên cứu, SAP, TLFs và các hồ sơ đã nộp trước đó.
2. **section-plan** lập kế hoạch các phần bắt buộc cho từng loại hồ sơ nộp và các dữ kiện mà mỗi phần cần có.
3. **section-draft** soạn thảo từng phần từ các dữ kiện nguồn có trích dẫn theo văn phong chuẩn của tổ chức bạn.
4. **consistency-check** kiểm tra đối chiếu từng con số, quần thể nghiên cứu và phần bắt buộc với các tài liệu nguồn.
5. **submission-assemble** lắp ghép bản nháp với các mục còn mở đặt lên đầu, và chỉ thực hiện sau khi bước kiểm tra tính nhất quán đã hoàn tất.

## Trước khi bắt đầu

Đề cương nghiên cứu đã khóa, kế hoạch phân tích thống kê, các bảng biểu, danh sách và hình minh họa, tài liệu hướng dẫn nghiên cứu viên (investigator brochure), các hồ sơ đã được phê duyệt trước đó và cẩm nang văn phong của bạn.

Các connector gợi ý: Box, Egnyte, Azure Databricks, Snowflake, Confluence, Adobe PDF Services, Smartsheet và Jira.

Mỗi skill đều có thư mục `config/` chứa các thiết lập được đánh dấu `[TO CONFIGURE]`. Hãy điền các giá trị này cho tổ chức của bạn; cho đến khi bạn hoàn tất, các skill sẽ báo cáo mục đó là chưa được định tuyến thay vì tự suy đoán.

- `submission-templates.json`: các phần bắt buộc cho từng loại hồ sơ nộp (hiện hỗ trợ CSR và 510(k)).
- `field-dictionary.json`: các khóa dữ kiện nguồn.
- `style-guide.json`: văn phong chuẩn của tổ chức bạn.

## Dùng thử

- **Nạp tài liệu nguồn của nghiên cứu:** "Đề cương nghiên cứu đã khóa, SAP và bộ TLF cho nghiên cứu [study id] nằm trong [folder]. Hãy xây dựng bản đồ dữ kiện có trích dẫn cho [CSR or 510(k)]."
- **Soạn thảo một phần:** "Hãy soạn thảo phần [section] cho nghiên cứu [study id] từ các bảng biểu đã khóa trong [folder]."
- **Kiểm tra số liệu rồi lắp ghép bản thảo:** "Các con số trong bản nháp [CSR or 510(k)] tại [file] có khớp với các bảng biểu không? Nếu có, hãy lắp ghép bản thảo với các mục còn mở đặt lên đầu."

## Giới hạn

Bản nháp có trích dẫn phục vụ việc rà soát pháp quy. Công cụ không bao giờ tự nộp hay gửi bất kỳ hồ sơ nào.

Các đầu ra là bản nháp nhằm hỗ trợ chứ không thay thế phán đoán lâm sàng và chuyên môn. Hãy sử dụng dữ liệu giả lập hoặc dữ liệu đã khử định danh khi dùng thử.

## Người đóng góp

- Copilot Acceleration Team (CAT)
