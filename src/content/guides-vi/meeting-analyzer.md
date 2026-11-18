# Trình phân tích cuộc họp

Một kỹ năng biến nội dung cuộc họp thô thành một báo cáo phân tích chuyên sâu có cấu trúc: các kết quả
rõ ràng (quyết định, đầu việc cần làm, hạn chót), hồ sơ chân dung của những người tham gia, và
những thông tin ẩn sâu — các căng thẳng chưa nói thành lời, những thỏa thuận mong manh, rủi ro ngầm và các tín hiệu
chưa từng được nêu rõ trong cuộc họp nhưng lại vô cùng quan trọng đối với bối cảnh.

**Tác giả:** Michael Ferro Pereira · **Nền tảng:** Copilot Studio, Cowork

## Kỹ năng này làm gì

Tóm tắt không phải là mục tiêu — công cụ nào cũng có thể tóm tắt. Kỹ năng này đọc hiểu tầng nghĩa ẩn sau lời nói:
nó phát hiện điều người tham gia hàm ý nhưng không nói ra, quyết định nào còn mong manh, sự thiếu đồng thuận
đang ẩn giấu ở đâu, và điều gì sẽ gây ra vấn đề trong hai tuần tới nếu không ai xử lý.
Mỗi thông tin ẩn sâu đều được trình bày theo cấu trúc bằng chứng → diễn giải → mức độ tin cậy, nhờ vậy
diễn giải không bao giờ bị trình bày như sự thật hiển nhiên.

Báo cáo kết thúc bằng các hành động tiếp theo được khuyến nghị theo thứ tự ưu tiên gắn với các phát hiện, và
luôn được viết bằng ngôn ngữ của người dùng yêu cầu phân tích (các trích dẫn vẫn giữ nguyên ngôn ngữ
gốc của cuộc họp).

## Đầu vào được hỗ trợ

- **Văn bản dán trực tiếp** — bản chép lời (transcript), ghi chú cuộc họp hoặc dữ liệu xuất từ đoạn chat. Bản chép lời có nhãn
  tên người nói cho phép phân tích đầy đủ chân dung; văn bản không gắn nhãn người nói vẫn hỗ trợ tất cả các phần còn lại.
- **Âm thanh / video** — bản ghi được chép lời trước, sử dụng bất kỳ khả năng chuyển giọng nói thành văn bản
  nào sẵn có trong môi trường thực thi.

**Mẹo:** nếu nơi kỹ năng chạy không có sẵn khả năng chép lời, hãy dán
phụ đề/bản chép lời tự động tạo từ nền tảng họp của bạn — Microsoft Teams
(*Recap → Transcript*), Zoom (*Audio transcript* trong bản ghi) và Google Meet
(*Transcript* đính kèm vào sự kiện lịch) đều tự động tạo bản này khi
tính năng ghi hình/chép lời được bật.

## Câu lệnh mẫu

- "Phân tích bản chép lời cuộc họp này và cho tôi biết tôi đang bỏ sót điều gì." (dán bản chép lời)
- "Tóm tắt cuộc gọi này và lập hồ sơ những người tham gia." (đính kèm tệp âm thanh)
- "Chúng ta thực sự đã thống nhất những gì ở đây, và các thỏa thuận đó vững chắc đến mức nào?"

## Kết quả nhận được

1. **Tóm tắt điều hành** — điểm chính gói gọn trong 3–5 câu.
2. **Các kết quả rõ ràng** — các quyết định (kèm mức độ chắc chắn), các đầu việc cần làm (người phụ trách/hạn chót,
   có gắn cờ phần còn thiếu), các dữ kiện chính, các câu hỏi mở.
3. **Chân dung người tham gia** — vai trò, lợi ích liên quan, phong cách giao tiếp, mức độ ảnh hưởng và hình mẫu
   hành vi, mỗi mục đều dựa trên những gì người đó thực sự đã nói hoặc đã làm.
4. **Thông tin ẩn sâu** — lớp giá trị tạo nên sự khác biệt: các chủ đề bị né tránh, căng thẳng và ẩn ý,
   các thỏa thuận mong manh, sự lệch pha quan điểm, động lực quyền lực, các rủi ro chưa được gọi tên.
5. **Hành động tiếp theo được khuyến nghị** — 3–7 bước đi ưu tiên dựa trên các phát hiện.

## Cấu trúc thư mục

```
meeting-analyzer/
├── metadata.json                      # Siêu dữ liệu danh mục
├── SKILL.md                           # Hướng dẫn thực thi dành cho agent
├── README.md                          # Tệp này (tài liệu dành cho người đọc)
├── references/
│   ├── persona-framework.md           # Các chiều chân dung + hình mẫu hành vi
│   └── hidden-insights-guide.md       # Danh mục kỹ thuật cho lớp thông tin ẩn
└── assets/
    └── report-template.md             # Cấu trúc đầu ra cho báo cáo cuối cùng
```

## Lưu ý

- Kỹ năng chỉ phân tích nội dung được cung cấp; nó không tự động lấy bản ghi từ
  các nền tảng bên ngoài.
- Các thông tin ẩn sâu là những diễn giải dựa trên bằng chứng và cần được xác thực lại với
  những người tham gia cuộc họp trước khi hành động dựa trên các kết luận nhạy cảm.
