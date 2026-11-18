# Ngân hàng Doanh nghiệp

Sáu kỹ năng Cowork dành cho đội ngũ tín dụng và quan hệ khách hàng trong lĩnh vực ngân hàng doanh nghiệp.

## Thành phần bao gồm

- **financial-statement-spread** — bảng phân tích báo cáo tài chính lịch sử của bên vay (spread) gồm các thẻ Input, Normalized và Ratios.
- **credit-memo-narrative** — các mục thuyết minh mô tả cho tờ trình tín dụng.
- **credit-annual-review-packet** — bộ hồ sơ theo dõi và rà soát tín dụng hằng năm.
- **covenant-compliance-check** — rà soát điều khoản ràng buộc (covenant) và cơ sở hạn mức vay bám sát hợp đồng điều chỉnh.
- **borrower-prospect-research** — nghiên cứu hồ sơ công khai về bên vay hiện hữu và khách hàng tiềm năng.
- **rm-call-prep-followup** — chuẩn bị cuộc gọi quan hệ khách hàng (RM) và soạn thảo biên bản ghi chú sau cuộc gọi.

## Giới hạn

Hoạt động dựa trên tài liệu được cung cấp, Microsoft 365, các cơ quan đăng ký công khai, SEC EDGAR và web công khai, không phụ thuộc vào dữ liệu trả phí. Mọi số liệu đều gắn kèm nguồn và số trang cụ thể. Các kỹ năng không bao giờ xếp hạng tín dụng, phê duyệt hay từ chối cấp tín dụng, định giá khoản vay, soạn lý do từ chối bất lợi (adverse-action) hay đánh giá mức độ tín nhiệm.

## Cách thức kiểm thử

Plugin này đã trải qua quá trình đánh giá bởi cả con người và AI, đạt điểm đạt yêu cầu về chất lượng tổng thể và bản dựng.

## Mở rộng bằng các connector

Mỗi kỹ năng ưu tiên sử dụng connector đã được cấu hình trước. Nếu chưa có sẵn, kỹ năng sẽ chuyển sang sử dụng tài liệu được cung cấp và Microsoft 365, rồi đến các nguồn công khai, đồng thời gắn cờ mọi khoảng trống dữ liệu còn lại. Tên nhà cung cấp là các ví dụ mà kỹ năng nhận diện; bất kỳ connector nào mang dữ liệu tương đương đều hoạt động được.

| Kỹ năng | Các connector giúp nâng cao chất lượng | Phương án dự phòng khi không có connector |
|---|---|---|
| financial-statement-spread | Trích xuất tài liệu (Ocrolus, Hyperscience); chuẩn so sánh ngành (RMA, Moody's Analytics, S&P Capital IQ); hệ thống LOS/core (nCino, GL) | Báo cáo tài chính và tờ khai thuế đã tải lên, sau đó là SEC EDGAR đối với doanh nghiệp đại chúng |
| credit-memo-narrative | LOS (nCino); CRM (Salesforce, DealCloud); dữ liệu doanh nghiệp (S&P Capital IQ, Moody's, D&B) | Bản tóm tắt điều khoản (term sheet), bảng spread và email giao dịch từ tệp tải lên/M365, sau đó là cơ quan đăng ký công khai và EDGAR |
| credit-annual-review-packet | LOS/quản lý khoản vay (nCino); hệ thống core/GL; thông tin tín dụng doanh nghiệp (D&B, Experian) | Hồ sơ rà soát kỳ trước và báo cáo tài chính hiện tại từ tệp tải lên/M365, sau đó là hồ sơ công khai |
| covenant-compliance-check | Hệ thống theo dõi điều khoản ràng buộc hoặc LOS (nCino); core/GL | Hợp đồng tín dụng và các giấy xác nhận đã tải lên, sau đó là phụ lục công bố trên EDGAR |
| borrower-prospect-research | Thông tin tín dụng doanh nghiệp (D&B, Experian, Equifax); dữ liệu doanh nghiệp (S&P Capital IQ, PitchBook); CRM (Salesforce, DealCloud) | Cơ quan đăng ký công khai và EDGAR qua web hoặc trình duyệt, sau đó là tệp tải lên/M365 |
| rm-call-prep-followup | CRM (Dynamics 365, Salesforce); hệ thống core/nguồn vốn (treasury) | Email Microsoft 365, Teams và các cuộc họp, sau đó là trang web doanh nghiệp, cơ quan đăng ký công khai và EDGAR |

## Người đóng góp

- Copilot Acceleration Team (CAT)
