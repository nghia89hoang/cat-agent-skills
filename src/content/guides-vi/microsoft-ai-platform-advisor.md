# Trình tư vấn Nền tảng Microsoft AI

Hướng dẫn khách hàng qua một cuộc phỏng vấn khảo sát có cấu trúc và đề xuất đúng nền tảng Microsoft AI cho dự án của họ — Microsoft 365 Copilot, Agent Builder, Copilot Studio, Microsoft Foundry, Foundry Agent Service, Windows AI Foundry, hoặc Agent 365 đóng vai trò lớp quản trị. Kỹ năng chấm điểm mức độ phức tạp kỹ thuật và rủi ro của giải pháp cần xây dựng, biểu diễn chúng trên biểu đồ góc phần tư 2×2 và trả về bản tóm tắt khuyến nghị kèm hướng dẫn lập kế hoạch và các bước tiếp theo.

## Tại sao nên dùng

Khách hàng doanh nghiệp thường hỏi sản phẩm Microsoft AI nào phù hợp với kịch bản của họ. Kỹ năng này mô phỏng lại quy trình khảo sát và đề xuất mà một kiến trúc sư giải pháp thực hiện thủ công, sử dụng các tài liệu hướng dẫn ra quyết định chính thức trên Microsoft Learn làm logic ánh xạ. Bên cạnh việc chọn nền tảng, công cụ còn quy đổi công sức triển khai thành các điểm số rõ ràng về mức độ phức tạp và rủi ro để khách hàng có thể lập kế hoạch xây dựng phù hợp.

## Khi nào nên dùng

- Một khách hàng hoặc nhóm đang lựa chọn giữa các nền tảng Microsoft AI cho một dự án mới.
- Bạn cần thu thập yêu cầu và xác định phạm vi cho một dự án xây dựng AI hoặc agent.
- Bạn muốn có đánh giá nhanh, có cơ sở giải trình về mức độ phức tạp/rủi ro để lập kế hoạch phân kỳ và quản trị.

Đây là công cụ khảo sát và đề xuất ở bước đầu tiên, không phải công cụ hỗ trợ thiết kế kỹ thuật chuyên sâu cho một nền tảng đã được lựa chọn sẵn.

## Thiết lập (Copilot Studio)

Kỹ năng tạo sẵn biểu đồ góc phần tư Mermaid nội tuyến mà không cần thiết lập. Tùy chọn xuất biểu đồ PNG kết xuất sẵn yêu cầu bật **code interpreter** của Copilot Studio:

- Bật code interpreter ở **cấp môi trường**: Power Platform admin center → Environments → Settings → Product → Features → Copilot Studio code interpreter → On.
- Trong agent, thêm một **prompt tool** (Tools → Add a tool → Prompt), sau đó trong phần Settings của prompt hãy bật **Enable code interpreter**. Đặt tên cho nó đại loại như `Generate Effort Chart`.
- Code interpreter được tính là **tin nhắn AI tạo sinh cao cấp (premium generative AI messages)** — hãy kiểm tra giấy phép của khách hàng trước khi dựa vào phương án này.

**Giới hạn hiển thị:** hình ảnh do code interpreter tạo ra sẽ **không** hiển thị trong các kênh Teams hoặc Microsoft 365 Copilot. Chúng hiển thị trong khung kiểm thử của Copilot Studio, trang web demo và các kênh web tùy chỉnh. Khi phân phối qua Teams hoặc Microsoft 365 Copilot, kỹ năng sẽ tự động chuyển sang dùng biểu đồ Mermaid.

## Thông tin cần biết

Các đề xuất đều dựa trên các hướng dẫn ra quyết định của Microsoft Learn được trích dẫn trong kỹ năng. Các sản phẩm Microsoft AI phát triển rất nhanh — hãy đối chiếu lại đề xuất cuối cùng với tài liệu Microsoft Learn hiện hành trước khi cam kết tư vấn một nền tảng cho khách hàng.
