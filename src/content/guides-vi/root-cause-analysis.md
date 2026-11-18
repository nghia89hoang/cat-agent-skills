# Phân tích nguyên nhân gốc rễ

Hãy sử dụng kỹ năng này khi bạn cần hiểu rõ vì sao một sự cố đã xảy ra — không chỉ là chuyện gì đã trục trặc, mà là nguyên nhân sâu xa để bạn có thể hành động xử lý.

## Kỹ năng này làm gì

Phân tích nguyên nhân gốc rễ (RCA) biến các triệu chứng sự cố thành chẩn đoán rõ ràng bằng các kỹ thuật có cấu trúc:

- **5 Whys (5 câu hỏi Tại sao)** — liên tục hỏi "tại sao" cho đến khi chạm tới gốc rễ có thể khắc phục được.
- **Biểu đồ xương cá (Fishbone diagram)** — lập bản đồ các nguyên nhân theo sáu nhóm: Con người (People), Quy trình (Process), Công nghệ (Technology), Dữ liệu (Data), Môi trường (Environment), Quản lý (Management).

Kỹ năng này phân biệt rõ giữa **nguyên nhân gốc rễ** (nguồn gốc cốt lõi) và **các yếu tố góp phần** (những thứ khiến vấn đề trở nên nghiêm trọng hơn). Sự phân biệt đó quyết định bạn cần sửa gì và liệu vấn đề có thực sự được giải quyết dứt điểm hay không.

## Khi nào nên sử dụng

- Một sự cố, lỗi hoặc tình trạng gián đoạn hệ thống đã xảy ra và bạn cần biết nguyên nhân.
- Bạn đang chuẩn bị báo cáo hậu kiểm (post-mortem) hoặc đánh giá sự cố.
- Một quy trình liên tục lỗi tại cùng một điểm và các biện pháp vá lỗi bề mặt không mang lại hiệu quả.
- Bạn muốn tách bạch "chuyện gì đã xảy ra" khỏi "điều gì thực sự gây ra sự việc đó".

## Kết quả nhận được

- Một phát biểu rõ ràng về nguyên nhân gốc rễ.
- Chuỗi bằng chứng đằng sau kết luận đó.
- Danh sách các yếu tố góp phần.
- Các hành động khuyến nghị, được sắp xếp theo tiêu chí liệu chúng giải quyết nguyên nhân gốc rễ hay chỉ xử lý các yếu tố góp phần.

## Những gì bạn cần chuẩn bị

- Một triệu chứng hoặc lỗi rõ ràng cần điều tra.
- Khả năng tiếp cận người hoặc hệ thống đã ghi nhận vấn đề.
- Mọi nhật ký (log), dòng thời gian hoặc ngữ cảnh hiện có cho thấy điều gì đã diễn ra.

## Mẹo sử dụng

- Bắt đầu bằng một phát biểu vấn đề chính xác. "Dịch vụ bị sập" mới chỉ là triệu chứng; "API thanh toán trả về mã lỗi 503 trong 12 phút vào đợt tăng đột biến lưu lượng lúc 9 giờ sáng" mới là một phát biểu vấn đề.
- Tiếp tục hỏi "tại sao" ít nhất ba tầng trước khi đề xuất các nguyên nhân.
- Các yếu tố góp phần vẫn rất hữu ích để ghi lại vào tài liệu — chúng giúp giảm nguy cơ tái diễn ngay cả khi không phải là nguyên nhân gốc rễ.
