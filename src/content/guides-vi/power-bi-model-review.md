# Đánh giá mô hình Power BI

Dán vào một mô hình ngữ nghĩa (tệp xuất TMDL, định nghĩa mô hình `.bim`/JSON, hoặc chỉ cần một danh sách tự viết gồm các bảng, mối quan hệ và measure) và nhận lại đánh giá về mặt cấu trúc: thiết kế mối quan hệ, lựa chọn giữa cột tính toán (calculated column) và measure, thiết lập bảng ngày (date table), quy ước đặt tên, cấu trúc lược đồ hình sao (star schema) và các lỗi DAX phổ biến. Mã DAX đã sửa được cung cấp ở bất kỳ chỗ nào có thể khắc phục.

## Mục đích sử dụng

Phát hiện sớm những lỗi mô hình hóa vốn không lộ diện cho đến khi báo cáo chạy chậm hoặc một con số bị sai lệch một cách tinh vi: mối quan hệ hai chiều (bi-directional relationship) giữa hai bảng chiều (dimension table), cột tính toán làm thay công việc của measure, hàm xử lý thời gian (time intelligence) chạy trên một cột thực chất không phải kiểu ngày, hay các bộ lọc `CALCULATE` âm thầm ghi đè nhầm ngữ cảnh.

## Những gì công cụ không làm

Công cụ không thể kết nối tới workspace của bạn hoặc một mô hình đang chạy trực tiếp (live model). Mọi nhận định đều được suy luận từ định nghĩa bạn cung cấp. Công cụ không đo thời gian truy vấn thực tế, không biết số lượng dòng dữ liệu của bạn và sẽ không kết luận một báo cáo *đang* chậm, mà chỉ chỉ ra những điểm trong mô hình có khả năng làm báo cáo chậm. Hãy xem kết quả đầu ra như một ý kiến tham khảo thứ hai có cấu trúc, không phải hồ sơ đo lường hiệu năng.

## Cách lấy tệp xuất TMDL

Giao diện mô hình của Power BI Desktop (hoặc [Tabular Editor](https://tabulareditor.com/)) có thể tuần tự hóa (serialize) một mô hình thành các thư mục TMDL, hoặc bạn có thể dùng tính năng xuất [`Get-BimFile`/model.bim](https://learn.microsoft.com/analysis-services/tabular-models/tabular-model-programming-compatibility-level) từ một workspace hiện có. Việc dán trực tiếp danh sách các bảng/mối quan hệ/measure cũng hoạt động tốt nếu bạn chưa có sẵn tệp xuất đầy đủ. Mức độ kỹ lưỡng của đánh giá phụ thuộc hoàn toàn vào thông tin đầu vào được cung cấp.

## Tài liệu tham khảo

[Hướng dẫn lược đồ hình sao](https://learn.microsoft.com/power-bi/guidance/star-schema)
· [Hướng dẫn mối quan hệ hai chiều](https://learn.microsoft.com/power-bi/guidance/relationships-bidirectional-filtering)
· [Tối ưu hóa mô hình ngữ nghĩa cho Copilot](https://learn.microsoft.com/power-bi/create-reports/copilot-evaluate-data)

---

Kỹ năng của Tim Karlsson (╯°□°)╯︵ ┻━┻ Hoạt động hiệu quả 60% số lần, lần nào cũng vậy.
