# Trình chọn Harness cho Copilot Studio

Lựa chọn giữa các harness GitHub Copilot, standard và Copilot chat — hoặc một giải pháp thay thế của Microsoft phù hợp hơn — thông qua đánh giá kiến trúc dựa trên bằng chứng.

Kỹ năng này kiểm tra các ràng buộc cứng trước khi xét đến các tùy chọn ưu tiên. Nó phân biệt rõ harness với mô hình (model), kênh xuất bản và các thành phần giải pháp, sau đó đề xuất cả môi trường thực thi (runtime) lẫn hình thái xây dựng: agent, quy trình (workflow), quy trình có nút agent, hoặc agent gọi một quy trình.

## Phạm vi bao quát

- Chế độ đánh giá Quick (Nhanh) và Detailed (Chi tiết).
- Ranh giới người dùng nội bộ, bên ngoài, ẩn danh và liên tenant (cross-tenant).
- Kênh bắt buộc, xác thực, danh tính và phân quyền.
- Hội thoại có thể dự đoán trước so với tác vụ nhiều bước mang tính thích ứng.
- Các hình thái giải pháp lấy agent, quy trình hoặc ứng dụng làm trung tâm.
- Kiến trúc một harness so với kiến trúc đa agent hoặc đa harness.
- Quản trị, ALM, khả năng quan sát (observability), chính sách bản xem trước (preview) và quyền sở hữu vận hành.
- Các quyết định cải tiến, thiết kế lại và di chuyển từ classic agent hoặc standard agent.
- Lập kế hoạch Copilot Credit minh bạch với sự tách biệt rõ ràng giữa dữ kiện thực tế, giả định, phép tính và các trường hợp loại trừ.
- Các giải pháp thay thế của Microsoft khi Copilot Studio không thể đáp ứng một ràng buộc cứng.

## Trước khi bắt đầu

Bạn không cần kết nối với tenant để chạy đánh giá. Hãy chuẩn bị một bản mô tả đã loại bỏ dữ liệu nhạy cảm về kết quả kỳ vọng, người dùng, kênh, dữ liệu, hành động, mô hình danh tính, các ràng buộc vận hành và lưu lượng dự kiến.

Tính khả dụng của sản phẩm và chính sách cấp phép hiện hành có thể thay đổi. Kỹ năng ghi nhận ngày của bản chụp nhanh (snapshot) lập kế hoạch đi kèm và hướng dẫn agent xác minh mọi nhận định mang tính quyết định với tài liệu chính thức hiện hành của Microsoft.

Chỉ cần Python 3 khi sử dụng công cụ ước tính credit đi kèm.

## Mô hình Cowork được khuyến nghị

Đối với đánh giá **Detailed**, hãy chọn **GPT-5.6** và dùng mức độ suy luận **High** nếu tenant Cowork của bạn có hiển thị tùy chọn điều khiển này. Nếu GPT-5.6 chưa được triển khai tới tenant của bạn, hãy dùng **Claude Opus 5**. High là mức cân bằng được khuyến nghị cho kỹ năng này: việc so sánh kiến trúc được hưởng lợi từ khả năng suy luận sâu hơn, nhưng mức cao nhất có thể sẽ không xứng đáng với độ trễ tăng thêm cho mọi lượt chạy.

Đối với bản tóm tắt quyết định đặc biệt quan trọng, **Sonnet + Opus Advisor** là một lựa chọn thay thế tốt vì bổ sung thêm lượt rà soát thứ hai. Đối với chế độ **Quick**, hãy để bộ chọn ở mức **Auto**; chọn thủ công **Claude Sonnet 5** khi tốc độ phản hồi quan trọng hơn độ sâu.

Không đặt mặc định là **Claude Fable 5 (Preview)** vì mô hình này mặc định đang tắt và kéo theo các tác động bổ sung về lưu giữ dữ liệu. Tính khả dụng của mô hình do tenant kiểm soát và có thể thay đổi. Microsoft hiện mới ghi nhận trong tài liệu về bộ chọn mô hình Cowork chứ chưa phải bộ chọn mức độ suy luận phổ quát, vì vậy chỉ áp dụng khuyến nghị High khi cài đặt đó xuất hiện trong trải nghiệm của bạn. Xem [Chọn mô hình cho Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-models) và [thông báo triển khai GPT-5.6](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-openai%E2%80%99s-gpt-5-6-in-microsoft-365-copilot/4533152) của Microsoft.

## Cách sử dụng

Để đánh giá nhanh, hãy hỏi:

> Dùng chế độ Quick để đề xuất một harness Copilot Studio cho trợ lý chính sách nhân sự nội bộ trong Microsoft 365 Copilot Chat. Trợ lý này trả lời từ SharePoint, không có người dùng bên ngoài và có thể tạo phiếu yêu cầu nhân sự sau khi xác nhận.

Để ra quyết định kiến trúc, hãy hỏi:

> Dùng chế độ Detailed để đánh giá một agent chăm sóc khách hàng cho trang web công khai, WhatsApp và Teams. Agent này đọc hồ sơ khách hàng, tạo tài liệu hồ sơ vụ việc, yêu cầu phê duyệt khi thay đổi tài khoản và phải tuân thủ chính sách bản xem trước cho môi trường sản xuất của chúng tôi. Bao gồm cả các kịch bản cấp phép và Copilot Credit.

Kỹ năng chỉ hỏi thêm những thông tin còn thiếu có thể làm thay đổi quyết định. Sau đó, nó tạo ra Bản tóm tắt quyết định Harness (Harness Decision Brief) bao gồm đề xuất chính, mức độ tin cậy, phương án á quân, phân tích cổng ràng buộc cứng (hard-gate), kiến trúc mục tiêu, cách xử lý chi phí, rủi ro, các bước xác thực và những điều kiện sẽ làm đảo ngược quyết định.

## Thông tin cần biết

- Một đề xuất đa harness phải chỉ ra được ranh giới thực sự về kênh, danh tính, quản trị, vòng đời, môi trường thực thi (runtime) hoặc yếu tố kinh tế.
- Phần chỉ dẫn và xác nhận qua hội thoại không được coi là cơ chế kiểm soát phân quyền hoặc phê duyệt; các thao tác đặc quyền phải được thực thi bởi công cụ, quy trình, lớp danh tính hoặc hệ thống phía sau (downstream).
- Các con số credit đầu ra là ước tính phục vụ lập kế hoạch, không phải báo giá. Công cụ ước tính báo cáo tổng số credit gộp trước khi tính phần đã bao gồm trong gói giấy phép và giữ nguyên các khoảng giá mở của Microsoft.
- Kỹ năng không yêu cầu mật khẩu, token, chuỗi kết nối, hồ sơ vận hành thực tế hoặc nội dung tài liệu mật.
