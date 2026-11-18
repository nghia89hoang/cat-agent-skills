# Bản thiết kế chủ đề cho Copilot Studio

Mô tả một agent trong một câu và nhận lại kế hoạch sẵn sàng để xây dựng. Kỹ năng này nhận vào
một tình huống sử dụng (use case) dài một hoặc hai dòng và trả về một bản thiết kế Microsoft Copilot Studio
có cấu trúc để bạn triển khai trực tiếp, bỏ qua giai đoạn loay hoay trước trang giấy trắng.

## Cách sử dụng

Cung cấp cho agent một tình huống sử dụng, ví dụ:

> "Một agent nhân sự dành cho nhân viên, trả lời các câu hỏi về chính sách từ sổ tay trên
> SharePoint của công ty và có thể tạo yêu cầu nghỉ phép trong hệ thống nhân sự."

Bạn sẽ nhận lại tám phần nội dung:

1. **Khuyến nghị (Recommendation)** - loại agent và chế độ điều phối (orchestration), kèm theo lý do.
2. **Chủ đề (Topics)** - từ 3 đến 7 chủ đề, mỗi chủ đề có mô tả tạo sinh "sử dụng khi nào" ("use when") và
   các nút (node) theo thứ tự.
3. **Công cụ và hành động (Tools and actions)** - các connector và flow kèm kiểu dữ liệu đầu vào, đầu ra và
   nhánh xử lý lỗi.
4. **Tri thức (Knowledge)** - những gì cần đính kèm và khi nào nguồn tri thức nên phản hồi.
5. **Biến (Variables)** - các biến toàn cục và kiểu dữ liệu của chúng.
6. **Trải nghiệm chào mừng (Welcome experience)** - mã JSON Adaptive Card sẵn sàng để dán kèm 3 câu lệnh gợi ý mở đầu.
7. **Bảo mật và chi phí (Security and cost)** - chế độ xác thực, ghi chú về DLP và các yếu tố tác động đến chi phí
   Copilot Credits.
8. **Kế hoạch kiểm thử đầu tiên (First test plan)** - 5 câu mẫu (utterance) cùng chủ đề hoặc công cụ mà mỗi câu cần kích hoạt.

## Những điều cần biết

- Kỹ năng chỉ thiết kế và đặc tả; nó không bao giờ tự tạo tài nguyên trong tenant của bạn.
- Mọi nội dung đều bám sát Microsoft Learn và không tự bịa ra tính năng sản phẩm,
  đường dẫn menu hay giới hạn hệ thống. Khi hành vi phụ thuộc vào cấu hình sản phẩm, kỹ năng sẽ dẫn bạn tới
  tài liệu hướng dẫn liên quan thay vì phỏng đoán.
- Kết hợp cùng kỹ năng **Copilot Studio Test Planner** sau khi agent của bạn đã được tạo,
  để chuyển bản thiết kế thành một bộ kiểm thử có thể chạy được.
