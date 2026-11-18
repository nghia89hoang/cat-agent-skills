# Skill tạo tài liệu Power Automate

Chuyển đổi một gói giải pháp `.zip` chứa các quy trình Power Automate thành tài liệu tham chiếu Markdown dễ đọc: từng luồng (flow) làm gì, trình kích hoạt (trigger) của nó, các connector mà nó sử dụng, mọi vị trí nó đọc, ghi hoặc xóa dữ liệu và cách các luồng gọi lẫn nhau.

## Cần cung cấp gì
- Một hoặc nhiều tệp giải pháp `.zip`, theo cấu trúc giải pháp đã giải nén (bên trong có `solution.xml`, `customizations.xml`, `Workflows/*.json`).
- Hoạt động với các bản xuất Dataverse thực tế (từ `pac solution unpack` hoặc từ một môi trường đang chạy).
- Tải lên nhiều tệp zip cùng lúc nếu bạn muốn kiểm tra chéo các luồng trong giải pháp này gọi tới các luồng trong giải pháp khác.

## Kết quả nhận lại
- Một tệp Markdown cho mỗi tệp zip giải pháp.
- Với mỗi luồng: mô tả mục đích và hướng dẫn từng bước bằng ngôn ngữ dễ hiểu, trình kích hoạt (trigger), các tham chiếu kết nối (connection reference) được sử dụng, bảng thống kê thao tác đọc/ghi/xóa trên mọi hệ thống bên ngoài mà luồng chạm tới và những luồng mà nó gọi hoặc đang gọi nó.
- Mặc định là định dạng Markdown.
