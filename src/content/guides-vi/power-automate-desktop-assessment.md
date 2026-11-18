# Đánh giá Power Automate Desktop

Rà soát các giải pháp Power Automate đã xuất và các dự án tự động hóa kết hợp đám mây/máy tính để bàn (cloud/desktop) bằng quy trình đánh giá dựa trên bằng chứng, bám sát hướng dẫn hiện hành của Microsoft.

## Phạm vi đánh giá

- Khả năng bảo trì, kiến trúc và tái sử dụng
- Độ tin cậy, xử lý lỗi và mức độ sẵn sàng khắc phục sự cố
- Bảo mật, thông tin xác thực, chính sách DLP và kiểm soát truy cập
- Hiệu năng, xử lý đồng thời, chiến lược máy chạy (machine) và khả năng mở rộng
- Kiểm thử, quản lý vòng đời ứng dụng (ALM), quản trị và hỗ trợ vận hành

Kỹ năng này kiểm kê các thành phần (artifact) của giải pháp, tạo các chỉ số tĩnh và đưa ra các phát hiện theo thứ tự ưu tiên kèm bằng chứng, mức độ tác động, hướng khắc phục, khối lượng công việc và đơn vị phụ trách đề xuất. Kỹ năng xem phân tích gói giải pháp là một nguồn bằng chứng và chỉ rõ những chỗ vẫn cần bổ sung lịch sử chạy, nhật ký, bộ chọn (selector), cấu hình máy hoặc hồ sơ quản trị.

## Quy trình tương thích đa nền tảng

Các script đi kèm chạy với Python 3.10+ và thư viện chuẩn trong môi trường thực thi kiểu Linux được Cowork và Copilot Studio sử dụng. Đầu ra mặc định là một báo cáo đánh giá định dạng Markdown và một tệp chỉ số JSON. Các định dạng phong phú hơn là tùy chọn và chỉ được dùng khi môi trường lưu trữ (host) có sẵn khả năng tạo tài liệu được hỗ trợ.

Quy trình giải nén xác thực các thành phần trong tệp ZIP trước khi ghi và từ chối lỗi duyệt đường dẫn (path traversal), giải nén phình kích thước quá mức và tái sử dụng tệp đầu ra không an toàn. Quy trình không in ra giá trị bí mật hay chỉnh sửa gói tự động hóa được cung cấp.

## Dữ liệu đầu vào điển hình

- Tệp ZIP giải pháp Power Platform đã xuất
- Định nghĩa desktop flow và cloud flow
- Lịch sử chạy và nhật ký hành động
- Cấu hình bộ chọn (selector), máy chạy, kết nối, DLP và hàng đợi công việc (work queue)
- Bằng chứng kiểm thử và tài liệu vận hành

Báo cáo kết quả bao gồm tóm tắt điều hành, điểm mạnh, các rủi ro được xếp hạng ưu tiên, khuyến nghị chi tiết, lộ trình khắc phục, các câu hỏi mở, cùng danh mục kiểm kê các thành phần đã rà soát và tài liệu tham khảo.
