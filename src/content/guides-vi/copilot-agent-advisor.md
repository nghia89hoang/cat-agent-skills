# Trình tư vấn Copilot Agent

Bạn chưa chắc một kịch bản cần một agent tùy chỉnh toàn diện, một agent tiêu chuẩn gọn nhẹ, hay chỉ cần sử dụng Microsoft 365 Copilot mặc định có sẵn? Kỹ năng này sẽ đưa ra quyết định đó giúp bạn.

Hãy mô tả kịch bản và kỹ năng sẽ đề xuất **một trong ba lựa chọn**:

| Lựa chọn | Mô tả |
|--------|-----------|
| **Dùng nguyên bản Microsoft 365 Copilot** | Trải nghiệm Copilot tích hợp sẵn trên dữ liệu Microsoft 365 của bạn — không cần xây dựng thêm. |
| **Agent tiêu chuẩn (declarative)** | Copilot được tinh chỉnh bằng chỉ dẫn, tri thức và hành động của riêng bạn, chạy trên bộ điều phối và các mô hình riêng của Copilot, ngay bên trong các ứng dụng Microsoft 365. |
| **Agent tùy chỉnh (custom engine)** | Một agent tùy biến hoàn toàn — bộ điều phối và các mô hình do bạn tự chọn, quy trình làm việc tùy chỉnh, hạ tầng lưu trữ riêng và khả năng mở rộng ra ngoài phạm vi Microsoft 365. |

Kỹ năng cũng tư vấn **nên xây dựng trên Copilot Studio harness nào** — GitHub Copilot harness (tác vụ nhiều bước, đòi hỏi suy luận chuyên sâu), standard harness (dựa trên quy tắc và dễ dự đoán trước), hoặc Copilot chat harness (mở rộng Microsoft 365 Copilot Chat) — đồng thời cảnh báo rằng các agent không thể chuyển đổi qua lại giữa GitHub Copilot harness và standard harness.

## Cách hoạt động

Kỹ năng cân nhắc các yếu tố thực sự quyết định hướng lựa chọn:

- **Tri thức/dữ liệu** nằm ở đâu (Microsoft 365 so với các hệ thống bên ngoài)
- Bạn có cần **mô hình riêng hoặc mô hình tinh chỉnh (fine-tuned)** hay không
- Bạn có cần **bộ điều phối tùy chỉnh** hoặc logic nghiệp vụ tất định hay không
- **Kênh triển khai** (chỉ bên trong Microsoft 365 hay cả bên ngoài)
- **Mức độ tự chủ** (do người dùng chủ động gọi hay chạy chủ động/theo kích hoạt sự kiện)
- **Đối tượng sử dụng** (cá nhân hay cộng tác theo nhóm)
- **Tuân thủ (Compliance)** (kế thừa cơ chế của Microsoft 365 hay tự chịu trách nhiệm quản lý)
- **Tốc độ & kỹ năng triển khai** (low-code nhanh nhất hay kiểm soát toàn diện bằng pro-code)

Sau đó, kỹ năng trả về một khuyến nghị rõ ràng kèm lập luận gắn với từng chi tiết cụ thể của bạn, một phương án á quân cùng yếu tố duy nhất có thể làm đảo ngược quyết định, cách thức xây dựng, và các đánh đổi đi kèm (chi phí, hạ tầng lưu trữ, trách nhiệm tuân thủ).

## Ví dụ

> **Bạn:** "Chúng tôi muốn một trợ lý bộ phận hỗ trợ CNTT trên Teams để trả lời dựa trên các chính sách CNTT lưu trên SharePoint. Tôi nên xây dựng loại agent nào?"
>
> **Kỹ năng khuyến nghị:** một agent tri thức tiêu chuẩn (declarative) trong Microsoft 365 Copilot Agent Builder — vì nguồn tri thức đã nằm sẵn trong Microsoft 365, chạy ngay trong Teams, do người dùng chủ động gọi và kế thừa tính tuân thủ của Microsoft 365. Phương án á quân (agent custom engine) chỉ cần thiết nếu sau này bạn bổ sung tính năng ghi ngược dữ liệu vào hệ thống bên ngoài, dùng mô hình riêng hoặc cần hành vi chủ động tự kích hoạt.

## Thông tin cần biết

- **Chỉ tư vấn — không trực tiếp xây dựng.** Kỹ năng đưa ra lựa chọn khuyến nghị; nó không cấp phát tài nguyên, cấu hình hay triển khai agent.
- **Luôn cập nhật thông tin mới.** Năng lực của agent và các tính năng bản xem trước (preview) thay đổi rất nhanh, nên kỹ năng luôn đối chiếu các chi tiết hay biến động với Microsoft Learn trước khi khẳng định.
- **Hoạt động ở mọi nơi.** Trung lập về nền tảng — cùng một logic tư vấn chạy được trên **Cowork**, **Copilot Studio** và **Scout**, không phụ thuộc vào công cụ đặc thù của riêng nền tảng nào.
- Dựa trên hướng dẫn lựa chọn giữa agent declarative và custom-engine của Microsoft Learn cùng tài liệu [tổng quan về các harness](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview) của Copilot Studio (GitHub Copilot harness, standard harness và Copilot chat harness).
