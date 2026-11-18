# Tạo tệp SharePoint

Tạo tệp trong một phiên Copilot Studio và tải chúng lên SharePoint mà không cần truyền trực tiếp byte tệp thô qua mô hình. Hãy sử dụng quy trình này thay cho việc đọc nội dung tệp nhị phân vào mô hình, chuyển đổi tệp sang base64 hoặc truyền byte thô thông qua các tham số của trình kết nối (connector).

Kỹ năng này cung cấp cho agent một quy trình cố định, ưu tiên tính an toàn:

1. Tạo hoàn chỉnh tệp được yêu cầu trong thư mục `/app/created/` của Copilot Studio.
2. Đo kích thước tệp hoàn chỉnh bằng API hệ thống tệp và dừng trước khi tải lên nếu tệp rỗng hoặc có kích thước từ 4.000.000 byte trở lên.
3. Truyền trực tiếp đường dẫn tệp vào hành động **Create file** (Tạo tệp) của SharePoint đã cấu hình để trình kết nối xử lý tệp ở phía máy chủ.
4. Báo cáo đích lưu trữ trên SharePoint, kích thước đo được trước khi tải lên và kết quả tải lên.

## Tại sao quy tắc về đường dẫn và kích thước lại quan trọng

Quy trình này được xây dựng dựa trên kết quả kiểm thử trình kết nối trong Copilot Studio:

- `/app/created/<filename>` là cơ chế tham chiếu đường dẫn đã được xác nhận đối với hành động Create file. Việc truyền một đường dẫn nằm ngoài thư mục đó có thể khiến hệ thống tải lên chuỗi văn bản đường dẫn theo nghĩa đen thay vì các byte tệp dự kiến.
- Quá trình tải lên bắt đầu gặp lỗi ở quanh ngưỡng tải lên nội tuyến (inline-upload) 4 MiB của tầng công cụ. Kỹ năng sử dụng ngưỡng chặn thận trọng là 4.000.000 byte vì toàn bộ dải kích thước ngay sát dưới 4 MiB chưa được kiểm chứng hết.

Đây là các phát hiện thực nghiệm mang tính đặc thù của môi trường chứ không phải giới hạn được tài liệu hóa của SharePoint. Bản thân SharePoint hỗ trợ các tệp lớn hơn; kỹ năng này giải quyết hành vi hiện tại của trình kết nối/công cụ nội tuyến khả dụng cho agent.

## Trước khi thêm kỹ năng

Cấu hình một hành động **Create file** của SharePoint cho agent. Cố định site và thư mục trong hành động đó khi mọi lượt tải lên đều phải dùng cùng một đích đến, hoặc để chúng ở dạng đầu vào khả dụng khi đích đến cần thay đổi linh hoạt.

Rà soát Mục 0 trong `SKILL.md` và thay thế hoặc mở rộng các quy tắc lấy nguồn nội dung chung khi agent bắt buộc phải sử dụng một mẫu tài liệu, nguồn tri thức, cấu trúc báo cáo, lược đồ hoặc cẩm nang phong cách cụ thể. Các phần về tải lên và kiểm soát kích thước cần được giữ nguyên không thay đổi.

## Phạm vi giới hạn

- Kỹ năng không tự động cắt bớt hoặc chia nhỏ đầu ra vượt quá kích thước.
- Kỹ năng dừng lại khi gặp lỗi phân quyền, DLP, xác thực, kết quả mơ hồ, lỗi kích thước hoặc lỗi toàn vẹn dữ liệu thay vì âm thầm thử lại.
- Đường dẫn sandbox thô được giữ ở mức nội bộ trong quá trình sử dụng bình thường.
