# Quản lý Tài sản

Sáu kỹ năng Cowork dành cho các công ty quản lý tài sản tổ chức: đội ngũ RFP và DDQ, chuyên viên biên soạn nội dung đầu tư, chuyên viên phân tích nghiên cứu, chuyên gia sản phẩm, dịch vụ khách hàng và quan hệ đơn vị tư vấn.

## Thành phần bao gồm

- **rfp-ddq-response-draft** — bản nháp đầu tiên cho các câu trả lời RFP và DDQ từ thư viện đã được phê duyệt của bạn, có trích dẫn nguồn cho từng câu trả lời.
- **investment-commentary-draft** — bản bình luận về quỹ, danh mục đầu tư hoặc chiến lược từ các nguồn nội dung thuyết minh và hiệu suất đã được phê duyệt.
- **security-research-brief** — so sánh các yếu tố rủi ro, phần thảo luận và phân tích của ban điều hành (MD&A) và dự báo triển vọng (guidance) giữa hai hồ sơ công bố thông tin của tổ chức phát hành.
- **peer-product-intelligence** — so sánh các quỹ dựa trên bản cáo bạch tóm tắt công khai.
- **institutional-client-review-prep** — chuẩn bị rà soát ủy thác đầu tư kèm tuyên bố chính sách đầu tư (IPS)/hướng dẫn và các cam kết quan hệ khách hàng.
- **consultant-database-refresh** — cập nhật bảng câu hỏi dành cho đơn vị tư vấn kèm bản đánh dấu thay đổi (redline).

## Giới hạn

Hoạt động dựa trên nội dung Microsoft 365, tài liệu được cung cấp, SEC EDGAR và web công khai, không phụ thuộc vào dữ liệu trả phí. Hiệu suất hiện tại của công ty, tổng tài sản quản lý (AUM), phân bổ đóng góp hiệu suất (attribution) và biểu phí được lấy nguyên văn từ hệ thống lưu trữ chính thức hoặc tệp trích xuất đã tải lên. Đầu ra trích dẫn nguồn cho mọi nhận định và gắn nhãn tài liệu tiếp thị để phục vụ việc rà soát tuân thủ.

## Cách thức kiểm thử

Plugin này đã trải qua quá trình đánh giá bởi cả con người và AI, đạt điểm đạt yêu cầu về chất lượng tổng thể và bản dựng.

## Mở rộng bằng các connector

Mỗi kỹ năng ưu tiên sử dụng connector đã được cấu hình trước. Nếu chưa có sẵn, kỹ năng sẽ chuyển sang sử dụng tệp tải lên, thư viện SharePoint của công ty, rồi đến các nguồn công khai, đồng thời gắn cờ mọi khoảng trống dữ liệu còn lại. Tên nhà cung cấp là các ví dụ mà kỹ năng nhận diện; bất kỳ connector nào mang dữ liệu tương đương đều hoạt động được.

| Kỹ năng | Các connector giúp nâng cao chất lượng | Phương án dự phòng khi không có connector |
|---|---|---|
| rfp-ddq-response-draft | Nền tảng RFP (Loopio, Responsive, Qvidian); CRM (Salesforce, Dynamics); hệ thống hiệu suất | Các câu trả lời trước đây và mẫu đơn ADV đã tải lên, sau đó là thư viện câu trả lời trên SharePoint |
| investment-commentary-draft | Hệ thống hiệu suất/phân bổ đóng góp; FactSet hoặc Morningstar để lấy bối cảnh thị trường | Tệp trích xuất hiệu suất đã tải lên, kho lưu trữ SharePoint, sau đó là FRED, BLS, BEA và Treasury |
| security-research-brief | Bloomberg, FactSet hoặc Refinitiv (ước tính đồng thuận); thư viện nghiên cứu nội bộ | Hồ sơ công bố hoặc bản ghi cuộc họp đã tải lên, sau đó là SEC EDGAR và các trang quan hệ nhà đầu tư (IR) qua trình duyệt |
| peer-product-intelligence | Morningstar Direct hoặc eVestment (phân vị, xếp hạng, dòng vốn, danh mục nắm giữ); danh mục sản phẩm gốc nội bộ | Tài liệu giới thiệu quỹ (fact sheet) đã tải lên, sau đó là bản cáo bạch tóm tắt công khai (497K) |
| institutional-client-review-prep | CRM (Salesforce, Dynamics); hệ thống hiệu suất/phân bổ đóng góp | Bộ slide trình bày hoặc IPS đã tải lên, sau đó là email Microsoft 365, Teams và SharePoint |
| consultant-database-refresh | eVestment hoặc cơ sở dữ liệu đơn vị tư vấn (chỉ đọc); hệ thống hiệu suất; hệ thống nhân sự/sơ đồ tổ chức | Bảng câu hỏi và hồ sơ đã nộp trước đây được tải lên, sau đó là SharePoint |

## Người đóng góp

- Copilot Acceleration Team (CAT)
