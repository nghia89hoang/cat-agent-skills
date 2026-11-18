# scrollytelling-data

Bạn có thể nhắn với Agent **"Run the Demo"** để bắt đầu bản demo, hoặc tải lên dữ liệu của riêng bạn.

- **Run the Demo** — xây dựng một câu chuyện hoàn chỉnh từ tệp bảng tính mẫu đi kèm (`assets/Basketball_Demo_Data.xlsx`, bộ dữ liệu nhiều trang tính về các cầu thủ và đội bóng rổ).
- **Tải lên dữ liệu của riêng bạn** — thả vào một tệp `.xlsx`, `.csv`, `.json` hoặc tệp PDF có chứa bảng biểu và Agent sẽ xây dựng câu chuyện từ dữ liệu đó.

## Kết quả nhận được

Một tệp `.html` độc lập duy nhất có thể mở trên mọi trình duyệt mà không cần cài đặt gì thêm, kể câu chuyện từ dữ liệu của bạn khi bạn cuộn trang:

- Các chương dẫn chuyện được tạo ra từ dữ liệu của bạn
- Các biểu đồ tương tác — bản đồ, biểu đồ cột, biểu đồ phân tán, biểu đồ đường, biểu đồ tròn/vành khuyên (pie/donut)
- Các thẻ thống kê có hiệu ứng đếm số tăng dần, hiệu ứng xuất hiện chuyển động, thanh tiến trình và dấu mốc chương

## Cách thức hoạt động

Agent sẽ đi qua năm giai đoạn — kiểm tra dữ liệu, tìm ra mạch chuyện, xử lý số liệu, dựng trang web và bàn giao tệp — đồng thời tường thuật tiến trình thân thiện xuyên suốt quá trình. Bạn không cần cấu hình gì cả; chỉ cần yêu cầu tạo một câu chuyện dữ liệu (hoặc nói "Run the Demo") rồi mở tệp kết quả.

Ở tầng xử lý bên dưới, công cụ nạp dữ liệu của bạn vào **SQLite** và thực hiện các phép gom nhóm (group-by), sắp xếp, tính tổng và các phép tổng hợp khác ngay trên đó — nhờ vậy mọi con số trong câu chuyện của bạn đều được tính toán bằng một công cụ truy vấn thực thụ và đảm bảo độ chính xác.

## Các tệp đi kèm

- `SKILL.md` — quy trình làm việc đầy đủ mà Agent tuân theo
- `assets/Basketball_Demo_Data.xlsx` — bộ dữ liệu demo đi kèm
- `scripts/build_story.py` — bản triển khai tham chiếu của trình tạo trang
- `references/` — các mẫu biểu đồ và ghi chú về chế độ demo
