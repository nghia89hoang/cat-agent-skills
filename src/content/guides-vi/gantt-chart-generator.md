# Trình tạo biểu đồ Gantt

Biến lịch trình dự án thành một biểu đồ Gantt sạch đẹp bằng matplotlib — phân nhóm
theo màu sắc, lớp phủ tiến độ hoàn thành và đường tham chiếu ngày hôm nay — chỉ với một lệnh gọi.

## Cách sử dụng

Trỏ agent tới một tệp CSV (hoặc bảng dữ liệu) có cột giai đoạn/tác vụ, ngày bắt đầu và
ngày kết thúc hoặc thời lượng tính theo ngày. Ví dụ:

> "Tạo biểu đồ Gantt từ assets/sample_schedule.csv, tô màu theo Project, hiển thị % hoàn thành
> và vẽ đường ngày hôm nay."

Hoặc gọi trực tiếp bộ công cụ:

```python
from gantt import gantt
gantt("schedule.csv", phase="Phase", start="Start", end="End",
      group="Project", completion="PctDone", today=True,
      title="Project Schedule", out="gantt.png")
```

## Kết quả nhận được

- Các thanh ngang sắp xếp theo đúng thứ tự trong dữ liệu của bạn
- Tùy chọn mã hóa màu theo nhóm và lớp phủ gạch chéo biểu thị mức độ hoàn thành
- Trục ngày tự động chia tỷ lệ (theo tuần / tháng / hai tháng)
- Đầu ra định dạng PNG mặc định ở độ phân giải 150 DPI

Xem `references/cheatsheet.md` để biết danh sách tham số đầy đủ và các ví dụ CLI.
Hãy thử với `assets/sample_schedule.csv` để xem ngay bản demo dựng sẵn.
