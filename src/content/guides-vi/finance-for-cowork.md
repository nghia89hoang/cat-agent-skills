# Tài chính

Một plugin Cowork do Microsoft xây dựng gồm mười ba kỹ năng phục vụ đóng sổ tài chính,
lập kế hoạch, chuẩn bị rà soát, thu thập bằng chứng và lập mô hình tài chính.

## Thành phần bao gồm

| Kỹ năng | Quy trình |
| --- | --- |
| Ba báo cáo tài chính (Three Statements) | Hoàn thiện các mẫu mô hình báo cáo kết quả kinh doanh, bảng cân đối kế toán và lưu chuyển tiền tệ hiện có |
| Gói bằng chứng kiểm toán (Audit Evidence Package) | Tổng hợp bằng chứng kiểm toán sẵn sàng cho việc rà soát |
| Hợp nhất ngân sách (Budget Consolidation) | Hợp nhất các dữ liệu đầu vào ngân sách |
| Tóm tắt trạng thái đóng sổ (Close Status Digest) | Tóm tắt trạng thái đóng sổ kế toán |
| Báo cáo phân tích tập dữ liệu (Dataset Analysis Report) | Phân tích một tập dữ liệu được cung cấp |
| Định giá DCF (DCF Valuation) | Lập mô hình dòng tiền chiết khấu |
| Bóc tách chi phí (Expense Itemization) | Bóc tách chi tiết và đối chiếu các khoản chi phí |
| Báo cáo cập nhật cấp điều hành (Executive Update) | Chuẩn bị các bản cập nhật tài chính cho ban điều hành |
| Chuẩn bị rà soát dự báo (Forecast Review Prep) | Chuẩn bị cho các buổi rà soát dự báo |
| Mô hình LBO (LBO Model) | Lập mô hình tỷ suất sinh lời mua lại có đòn bẩy |
| Kế hoạch lùi theo quý (Quarterly Workback) | Xây dựng kế hoạch làm việc lùi (work-back plan) theo quý |
| Chuẩn bị hỏi đáp các bên liên quan (Stakeholder Q&A Prep) | Chuẩn bị câu hỏi và trả lời cho các bên liên quan |
| Thuyết minh biến động (Variance Commentary) | Giải thích các biến động tài chính |

## Trước khi bắt đầu

Nêu rõ kỳ báo cáo, phạm vi tổ chức hoặc đơn vị kinh doanh và đối tượng người đọc
dự kiến. Cung cấp các tệp liên quan, mẫu mô hình hoặc các nguồn được cấp phép.
Đối với công việc định lượng, hãy nêu rõ đơn vị tính, loại tiền tệ, các kỳ và các giả định
bạn muốn sử dụng.

## Dùng thử

> Hãy lập bản tóm tắt trạng thái đóng sổ từ các thông tin cập nhật này, tách riêng
> phần việc đã hoàn thành, các điểm nghẽn và những bằng chứng còn thiếu.

> Hãy hoàn thiện mô hình ba báo cáo tài chính hiện có này bằng các dữ liệu đầu vào
> được cung cấp. Giải thích rõ các nguồn dữ liệu và giả định.

## Giới hạn

Các kỹ năng sẽ hiển thị nguồn dữ liệu và đánh dấu thông tin còn thiếu thay vì tự suy đoán.
Chúng không gửi email hay lời mời lịch họp nếu chưa có xác nhận của bạn.
Hãy rà soát lại các phép tính, giả định và mốc thời gian của nguồn dữ liệu trước khi sử dụng
đầu ra cho các quyết định tài chính.

## Cài đặt

1. Tải xuống tệp ZIP của plugin từ trang này.
2. Tải tệp lên thông qua **M365 admin center > Manage apps > Upload custom app**,
   hoặc cài đặt trực tiếp (sideload) để kiểm thử bằng Microsoft 365 Agents Toolkit CLI:
   `atk install --file-path <zip> --scope Personal`.
3. Mở **Cowork > Sources & Skills > Plugins** và bật plugin từ mục **Discover**.

Xem [Bắt đầu với Cowork](https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-cowork)
và [Xây dựng plugin cho Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-plugin-development).

## Người đóng góp

- Nhóm Copilot Cowork
- Microsoft Excel
