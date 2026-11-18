# Rủi ro và Tuân thủ

Sáu kỹ năng Cowork giúp soạn thảo các tài liệu làm việc có trích dẫn nguồn cho đội ngũ tuân thủ, quản trị rủi ro và kiểm toán.

## Thành phần bao gồm

- **reg-change-triage** — phân loại mức độ ưu tiên cho các thay đổi quy định pháp lý.
- **policy-gap-analysis** — ánh xạ chính sách với quy định trong bảng phân tích khoảng trống.
- **exam-request-response** — theo dõi và soạn thảo phản hồi cho các yêu cầu thanh tra, kiểm tra.
- **enforcement-action-review** — rà soát đối chiếu chéo các biện pháp chế tài thực thi (read-across).
- **vendor-risk-review** — đánh giá báo cáo SOC 2 của nhà cung cấp.
- **kyc-research-pack** — lập hồ sơ nghiên cứu thẩm định khách hàng (KYC).

## Giới hạn

Các kỹ năng này không bao giờ đưa ra kết luận tuân thủ, xếp hạng rủi ro, phê duyệt nhà cung cấp hay
sàng lọc danh sách trừng phạt. Không có nội dung nào được tự động gửi đi hoặc nộp hồ sơ.

## Phương thức kiểm thử

Plugin này đã trải qua quá trình đánh giá bởi cả con người và AI, đạt điểm đạt yêu cầu về chất lượng
tổng thể và bản dựng.

## Mở rộng bằng các trình kết nối (connector)

Mỗi kỹ năng sẽ ưu tiên sử dụng trình kết nối đã cấu hình trước ở chế độ chỉ đọc để điền sẵn thông
tin và đối chiếu. Nếu không có trình kết nối nào khả dụng, kỹ năng sẽ chuyển sang các nguồn dữ liệu
gốc công khai qua tuyến truy cập trực tiếp hoặc trình duyệt, tiếp theo là các tài liệu được cung cấp
hoặc tài liệu Microsoft 365, và yêu cầu tải tệp lên khi không thể truy cập một nguồn nào đó.

| Kỹ năng | Các trình kết nối giúp nâng cao hiệu quả | Phương án dự phòng khi không có trình kết nối |
|---|---|---|
| reg-change-triage | Hệ thống thông tin quy định (Reg-intelligence); sổ đăng ký thay đổi GRC; kho chính sách/DMS; Planner hoặc nền tảng theo dõi vấn đề | Federal Register và eCFR, sau đó là các chính sách được tải lên hoặc trên M365 |
| policy-gap-analysis | Kho lưu trữ chính sách, DMS, GRC; Regulations.gov (khóa API miễn phí) | eCFR và Federal Register, sau đó là chính sách được cung cấp |
| exam-request-response | DMS, kiểm toán, quản lý vấn đề, GRC, Planner | Tìm kiếm trên SharePoint, OneDrive, Teams và Outlook, sau đó là các tệp tải lên |
| enforcement-action-review | Thư viện kiểm soát GRC, kho lưu trữ chính sách, DMS, hệ thống hồ sơ pháp lý | Trang thông tin của SEC, FinCEN, OCC, FRB và CFPB, sau đó là các lệnh xử phạt được tải lên và bộ kiểm soát trên M365 |
| vendor-risk-review | TPRM, GRC, DMS, hệ thống hợp đồng, nhà cung cấp dịch vụ sàng lọc | Báo cáo SOC và bảng câu hỏi thẩm định (DDQ) được cung cấp, kèm nghiên cứu từ nguồn công khai có gắn nhãn rõ ràng |
| kyc-research-pack | Nhà cung cấp dịch vụ sàng lọc hoặc tra cứu đăng ký (World-Check, Dow Jones, LexisNexis) | Cơ quan đăng ký công khai, tòa án, thông cáo của cơ quan quản lý và thông tin truyền thông bất lợi (adverse media), sau đó là hồ sơ tiếp nhận khách hàng (onboarding) được cung cấp |

## Người đóng góp

- Copilot Acceleration Team (CAT)
