# Trình tạo Adaptive Card cho Copilot Studio

> **Chỉ dành cho môi trường standard harness.** Kỹ năng này có thể được nạp trong một
> GitHub Copilot harness có hỗ trợ kỹ năng, nhưng gói đầu ra của nó nhắm tới các tác nhân
> Copilot Studio chạy trên standard harness. GitHub Copilot harness không hỗ trợ
> Adaptive Cards hoặc các nút chủ đề (topic node), nên thẻ được tạo không thể hiển thị hay
> kiểm thử ngay trong chính tác nhân đó. Hãy cấu hình và kiểm thử gói đầu ra trong một tác nhân
> standard harness cùng các kênh xuất bản dự kiến.

Biến yêu cầu tương tác bằng ngôn ngữ tự nhiên thành một gói Adaptive Card sẵn sàng cho người xây dựng (maker) sử dụng trong tác nhân Microsoft Copilot Studio chạy trên standard harness. Kỹ năng này tạo ra thẻ, dữ liệu mẫu khi cần thiết, ánh xạ đầu vào và hành động, hướng dẫn nối nút (node), kết quả kiểm tra hợp lệ, ghi chú về khả năng tiếp cận (accessibility) và phương án dự phòng dạng văn bản thuần.

## Giới hạn quan trọng

**Phần hướng dẫn của tác nhân không thể tự động hiển thị (render) một Adaptive Card.** Kỹ năng này tạo ra các thành phần để người xây dựng dán hoặc cấu hình vào nút **Ask with Adaptive Card**, **Message**, hoặc **Question** trong Copilot Studio trên standard harness. Nếu mô hình xuất trực tiếp mã JSON của thẻ vào khung trò chuyện, mã đó thường chỉ hiện dưới dạng văn bản hoặc khối mã chứ không hiển thị thành thẻ gốc.

Đây là một kỹ năng hỗ trợ người xây dựng. Nó không phải là công cụ UX lúc chạy (runtime), cơ chế kiểm soát phân quyền, bộ khung Power Fx hoàn chỉnh, hay sự đảm bảo rằng mọi kênh đều hiển thị thẻ giống hệt nhau.

## Điểm hữu ích của kỹ năng

Gói kết quả không chỉ dừng lại ở việc tạo mã JSON:

* Tám mẫu thiết kế thận trọng bao quát các tình huống: lời chào mở đầu, tóm tắt thông tin, thu thập dữ liệu, xác nhận, phê duyệt, làm rõ ý định (disambiguation), trạng thái và chuyển cấp xử lý (escalation).
* Trình kiểm tra ngữ nghĩa (semantic linter) viết bằng Python, không cần cài thư viện phụ thuộc, giúp rà soát các lỗi có độ chắc chắn cao thường làm hỏng thẻ trong Copilot Studio.
* Hợp đồng dữ liệu đầu vào, đầu ra và hành động tường minh giúp việc nối các điều kiện và công cụ phía sau (downstream) trở nên dễ dàng hơn.
* Hồ sơ máy chủ (host profile) ngăn việc một thẻ được dựng cho khung kiểm thử lại âm thầm phụ thuộc vào các tính năng không khả dụng trên Teams hoặc trò chuyện trực tuyến (live chat).
* Các thiết lập mặc định đảm bảo khả năng tiếp cận và an toàn trên thiết bị di động được tích hợp sẵn vào quy trình.
* Mọi kết quả đều đi kèm phương án dự phòng dạng văn bản thuần.

Trình linter được thiết kế có giới hạn phạm vi một cách có chủ đích. Nó không thay thế cho lược đồ (schema) Adaptive Cards chính thức, trình thiết kế của Copilot Studio, hay việc kiểm thử trên từng kênh đích.

## Trước khi bắt đầu

Bạn cần chuẩn bị:

* Quyền truy cập Microsoft Copilot Studio để chỉnh sửa chủ đề (topic) của tác nhân.
* Python 3.10 trở lên chỉ khi bạn muốn chạy trình linter đi kèm trên máy cục bộ. Trình linter sử dụng thư viện chuẩn của Python và không cài đặt thêm gói nào.
* Xác định rõ kênh đích. Nếu không chỉ định, kỹ năng sẽ mặc định sử dụng hồ sơ Copilot Studio 1.5 tương thích đa nền tảng (portable).

Không cung cấp bí mật bảo mật (secret), token, thông tin xác thực, mã định danh nhạy cảm hoặc dữ liệu vận hành thực tế làm nội dung ví dụ.

## Cách sử dụng

Hãy đặt yêu cầu bằng ngôn ngữ tự nhiên:

* "Tạo một thẻ phê duyệt yêu cầu mua hàng an toàn cho Teams."
* "Tạo một biểu mẫu tiếp nhận hỗ trợ khả năng tiếp cận gồm danh mục, hạn chót và mô tả chi tiết."
* "Tạo một thẻ tóm tắt trạng thái cho nút Message, kèm phương án dự phòng bằng văn bản."
* "Rà soát đoạn JSON Adaptive Card này cho Copilot Studio và giải thích cách nối các đầu ra của nó."
* "Chuyển bước xác nhận này thành một gói thẻ, nhưng phải yêu cầu xác nhận rõ ràng trước hành động mang tính phá hủy dữ liệu."

Phản hồi cần bao gồm:

1. `card.json`, tệp thẻ tĩnh sẵn sàng để dán hoặc bản đại diện tĩnh cho một thẻ động.
2. `card.powerfx`, chỉ xuất hiện khi các giá trị động thực sự cần công thức Power Fx.
3. Dữ liệu mẫu hoặc dữ liệu kiểm thử khi thẻ có tính chất động hoặc dựa trên dữ liệu.
4. Ánh xạ đầu vào, đầu ra và hành động.
5. Hướng dẫn cấu hình nút Copilot Studio và kết nối các bước phía sau.
6. Kết quả kiểm tra linter theo hồ sơ máy chủ đã chọn.
7. Ghi chú về khả năng tiếp cận và hiển thị trên thiết bị di động.
8. Phương án dự phòng dạng văn bản thuần.

## Kiểm tra tính hợp lệ của thẻ

Từ thư mục của kỹ năng:

```shell
python scripts/validate_cards.py assets/templates --profile portable-1.5
```

Kiểm tra một thẻ vừa tạo và yêu cầu chế độ nút cụ thể:

```shell
python scripts/validate_cards.py card.json --profile teams-1.5 --mode interactive
```

Đầu ra máy đọc được có sẵn thông qua cờ `--format json`. Thêm `--warnings-as-errors` để áp dụng ngưỡng kiểm soát chất lượng nghiêm ngặt hơn: khi đó, các cảnh báo sẽ trả về `FAIL` ở đầu ra văn bản, `ok: false` trong kết quả JSON và mã thoát khác 0. Thông tin chẩn đoán vẫn giữ nguyên mức độ nghiêm trọng cảnh báo ban đầu.

Chạy 93 bài kiểm thử hồi quy và kiểm tra lint nghiêm ngặt cho bộ mẫu từ cùng thư mục kỹ năng:

```shell
python -B -m unittest discover -s scripts/tests -p "test_*.py"
python -B scripts/validate_cards.py assets/templates --profile portable-1.5 --warnings-as-errors
```

## Hồ sơ máy chủ (Host profiles)

| Hồ sơ | Phiên bản thẻ tối đa | Mục đích sử dụng |
|---|---:|---|
| `portable-1.5` | 1.5 | Mặc định dùng chung cho Teams, trò chuyện trực tuyến (live chat), Web Chat và khung trò chuyện kiểm thử |
| `teams-1.5` | 1.5 | Microsoft Teams |
| `omnichannel-1.5` | 1.5 | Tiện ích trò chuyện trực tuyến Omnichannel |
| `web-chat-1.6` | 1.6 | Bot Framework Web Chat, không bao gồm `Action.Execute` |
| `test-chat-1.6` | 1.6 | Chỉ dùng cho khung trò chuyện kiểm thử của Copilot Studio |

Các mẫu đi kèm giữ nguyên ở phiên bản 1.5. `Action.Execute` nằm ngoài mọi hồ sơ đi kèm. Tập hành động an toàn gồm `Action.Submit` và `Action.OpenUrl` qua HTTPS.

Tất cả hồ sơ đi kèm đều yêu cầu **lược đồ phiên bản 1.5 trở lên**, tối đa đến phiên bản được liệt kê ở trên, vì gói này bắt buộc dùng kiểu tiêu đề (heading style) của `TextBlock`. Các thẻ sử dụng phiên bản 1.3 hoặc 1.4 nằm ngoài chính sách của gói này ngay cả khi máy chủ có hỗ trợ.

## Thông tin sản phẩm và nguồn tham khảo

Theo tài liệu của Microsoft, Copilot Studio hỗ trợ lược đồ Adaptive Cards phiên bản 1.6 trở về trước, trong đó Teams và tiện ích trò chuyện trực tuyến Omnichannel bị giới hạn ở phiên bản 1.5. Bot Framework Web Chat hỗ trợ 1.6 nhưng không hỗ trợ `Action.Execute`. Các thẻ phiên bản 1.6 hiển thị trong khung trò chuyện kiểm thử thay vì trực tiếp trên bảng thiết kế (authoring canvas). Xem [Tổng quan về Adaptive Cards](https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview).

Các thẻ tương tác thuộc về nút **Ask with Adaptive Card** và yêu cầu ít nhất một nút gửi (submit). Copilot Studio tạo các biến đầu ra từ các trường nhập liệu của thẻ, và Microsoft khuyến nghị sử dụng dữ liệu gửi duy nhất (unique submit data) khi nhiều thẻ có thể cùng duy trì trạng thái hoạt động. Xem [Hỏi bằng Adaptive Cards](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card).

Các thẻ cung cấp thông tin thuộc về nút **Message** hoặc **Question**. Xem [Gửi tin nhắn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message#add-an-adaptive-card).

Có thể biên soạn các giá trị động bằng Power Fx ngay trong nút thẻ. Tham chiếu biến Power Fx sử dụng các tiền tố phạm vi như `Topic.`, `Global.`, và `System.`. Xem [Tạo biểu thức bằng Power Fx](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-power-fx).

Để đảm bảo khả năng tiếp cận, Microsoft khuyến nghị sử dụng thuộc tính `label` cho trường nhập liệu, `isRequired` và `errorMessage`, thứ tự JSON hợp lý, tiêu đề hành động mang tính mô tả, kiểu tiêu đề (heading style) và kiểm thử trên từng kênh bằng trình đọc màn hình. Xem [Mẹo về khả năng tiếp cận cho Adaptive Cards](https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-card-accessibility-tips) và [Xác thực đầu vào](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation).

## Những điều cần biết

* Việc kiểm tra hợp lệ chỉ chứng minh thẻ đáp ứng chính sách có giới hạn của gói này, không chứng minh được cách hiển thị thực tế trên kênh.
* Hãy kiểm thử thẻ hoàn chỉnh trong khung trò chuyện kiểm thử của Copilot Studio và trên mọi kênh xuất bản dự kiến.
* Giữ thẻ ngắn gọn. Ưu tiên bố cục một cột cho biểu mẫu và khi sử dụng trên thiết bị di động.
* Thẻ chỉ thu thập và trình bày dữ liệu. Chúng không có chức năng phân quyền người dùng hay thực thi ràng buộc giao dịch nghiệp vụ.
* Hãy kiểm tra lại quyền hạn và quy tắc nghiệp vụ trong chủ đề (topic), luồng (flow), trình kết nối hoặc API ở phía sau.
* Trước khi rẽ nhánh, hãy đối chiếu chính xác `cardId` và `actionSubmitId` kỳ vọng cho thẻ/phiên bản đang được chờ từ trạng thái hội thoại đáng tin cậy. Chỉ riêng `actionId` không thể phân biệt các lượt gửi cũ hoặc gửi chéo từ thẻ khác.
* Đặt ID của các trường nhập liệu tách biệt với mọi khóa `data` cấp cao nhất trên các hành động gửi có thu thập dữ liệu nhập. Giá trị nhập được gửi lên có thể ghi đè siêu dữ liệu hành động nếu trùng khóa.
* Các bước kiểm tra thu thập thông tin bí mật sẽ rà soát ID trường nhập, nhãn, văn bản giữ chỗ (placeholder), thông báo lỗi và tiêu đề nút gạt (toggle), chứ không chỉ riêng tên trường.
* Các cụm từ nhạy cảm về bí mật được phát hiện ở bất kỳ đâu trong văn bản đầu vào, kể cả các nhãn siêu dữ liệu như `apiKeyLabel` và `privateKeyLabel`; không có ngoại lệ cho hậu tố siêu dữ liệu. Tệp `references/host-profiles-and-contracts.md` đi kèm trình bày quy tắc nghiêm ngặt này, ngoại lệ cụm từ không phải thông tin xác thực duy nhất của nó, và cách yêu cầu thay đổi có xét duyệt.
* Mẫu phê duyệt để trường nhận xét đánh giá là tùy chọn để không chặn thao tác Phê duyệt (Approve). Logic chủ đề phía sau phải bắt buộc có nhận xét không rỗng (sau khi cắt khoảng trắng) đối với Từ chối (Reject) hoặc Yêu cầu chỉnh sửa (Request changes), và nhắc nhập lại mà không ghi nhận quyết định nếu trường này bị bỏ trống.
* Hình ảnh từ nguồn bên ngoài mặc định bị loại trừ khỏi hồ sơ đi kèm.
* Không bao giờ dùng dữ liệu của thẻ làm nơi cất giấu thông tin xác thực hoặc các quyết định phân quyền.
