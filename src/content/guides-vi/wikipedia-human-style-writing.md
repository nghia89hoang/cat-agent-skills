# Viết văn phong tự nhiên kiểu Wikipedia

Một kỹ năng giúp agent viết và biên tập lại văn bản sao cho không mang cảm giác
do AI tạo ra.

## Nguồn gốc ra đời

Các biên tập viên Wikipedia, khi phải đối mặt với làn sóng các chỉnh sửa do AI tạo
ra nhưng không công khai, đã viết một cẩm nang cộng đồng —
[**Dấu hiệu của văn bản do AI viết**](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) —
nhằm hệ thống hóa những khuôn mẫu dễ nhận biết trong văn phong của LLM: lối tô vẽ
tầm quan trọng sáo rỗng, lời lẽ quảng bá phóng đại, cách trích dẫn nguồn mập mờ
kiểu lấp liếm, nhóm "từ vựng AI" đặc trưng theo giai đoạn (*delve*, *tapestry*,
*underscore*), danh sách theo quy tắc bộ ba (rule of three), lạm dụng dấu gạch
ngang dài (em-dash), cùng nhiều dấu hiệu khác.

Hướng dẫn đó được viết ra để *phát hiện* văn bản AI. Kỹ năng này đảo ngược góc nhìn
để *tránh* viết theo kiểu đó ngay từ đầu — và để rà soát các bản nháp tìm đúng
những dấu hiệu tương tự. Các khuôn mẫu này được chắt lọc vào tệp
`references/ai-writing-tells.md`, là tài liệu mà kỹ năng tham chiếu trong quá
trình biên tập.

## Những gì kỹ năng thực hiện

- Quét toàn bộ bản nháp để tìm các **cụm** dấu hiệu văn phong AI (mật độ xuất hiện
  quan trọng hơn bất kỳ một từ đơn lẻ nào).
- Sửa tận gốc nguyên nhân — khôi phục các dữ kiện cụ thể, cắt bỏ những câu khẳng
  định tầm quan trọng sáo rỗng, nêu rõ nguồn thực tế — thay vì chỉ tráo đổi từ ngữ
  bề mặt.
- Giữ nguyên ý nghĩa, dữ kiện và giọng văn của tác giả; giúp văn bản tự nhiên như
  người viết mà không làm mất sắc thái riêng.

Xem cẩm nang như tài liệu **mô tả chứ không phải quy tắc cứng nhắc**: những từ ngữ
và cấu trúc câu này bị lạm dụng chứ không phải bị cấm tuyệt đối, vì vậy sự cân nhắc
ngữ cảnh luôn hiệu quả hơn thao tác tìm-và-thay-thế máy móc.
