# Thiết kế lại quy trình theo hướng AI-first

## Tổng quan

Một đối tác dẫn dắt từng bước giúp bạn tái hình dung một quy trình làm việc hiện có theo hướng **AI-first**.
Thay vì chỉ gắn thêm một agent lên trên các bước hiện tại, skill xây dựng lại quy trình từ đầu và
quyết định qua từng bước xem phần nào **AI nên đảm nhận**, phần nào nên là **mô hình kết hợp giữa con người + AI**, và phần nào
cần giữ ở mức **do con người dẫn dắt**. Bạn sẽ hoàn tất với một bức tranh trước-và-sau rõ ràng cùng một kế hoạch ngắn gọn, thực tế
có thể bắt đầu ngay trong sprint tiếp theo.

**Lưu ý quan trọng:** skill này thiết kế lại *quy trình* và chỉ ra *những điểm* mà AI có thể hỗ trợ — trải rộng qua
các thay đổi quy trình, công cụ, skill có thể tái sử dụng, agent và connected agent. Bản thân nó **không** trực tiếp thiết kế hay
xây dựng bất kỳ thành phần nào trong số đó. Hãy xem đây là bước "tư duy lại cách làm việc" diễn ra *trước* mọi
hoạt động xây dựng agent hay skill.

Sau khi kết thúc, bạn sẽ có:

- Một **bản tóm tắt một trang** — đầu ra kỳ vọng, các điểm nghẽn hiện tại, quy trình AI-first đề xuất và các lợi ích dự kiến.
- Một **sơ đồ trạng thái hiện tại** của các tác vụ ngày nay, làm nổi bật những điểm vướng mắc.
- Một **bản thiết kế trạng thái tương lai** thể hiện từng bước được gắn thẻ `AI-owned` / `Hybrid` / `Human-led`.
- Một **danh sách "những gì đã thay đổi"** — loại bỏ / tự động hóa / tăng cường (augmented) / giữ nguyên / bổ sung mới.
- Một **bảng tổng hợp** phân loại mọi hoạt động vào các nhóm **Đơn giản hóa / Tự động hóa / AI Agent / Con người / Loại bỏ**.
- Một **danh sách tồn đọng ngắn gọn về các cơ hội năng lực AI hàng đầu** — sự kết hợp hợp lý giữa thay đổi quy trình, công cụ, skill có thể tái sử dụng và agent — kèm theo ghi chú về mức độ áp dụng và quản trị.

## Trước khi bắt đầu

- **Nơi chạy:** Microsoft Copilot Studio, được thêm dưới dạng một skill trên agent. Ngoài ra, có thể cài đặt trong Copilot Cowork như một custom skill (kỹ năng tùy chỉnh).
- **Hiệu quả nhất khi đính kèm nguồn tri thức (tùy chọn nhưng khuyến nghị):** các nguyên tắc thiết kế AI-first của tổ chức bạn,
  tài liệu tham chiếu mô hình agent (agent-pattern) và các ví dụ thiết kế lại trước đây. Việc đính kèm các tài liệu này
  giúp khuyến nghị bám sát tổ chức của bạn thay vì mang tính chung chung. Nếu không có chúng, skill
  vẫn hoạt động — nó chỉ gắn nhãn mọi nội dung phải giả định để bạn xác nhận lại.
- **Không cần quyền đặc biệt nào để tiến hành hội thoại.** Bạn chỉ cần các connector và
  đăng nhập nếu chọn để skill tạo tài liệu hoặc đẩy danh sách tồn đọng vào Planner hoặc Azure
  DevOps — và skill luôn hỏi ý kiến bạn trước khi tạo bất cứ thứ gì.
- **Chuẩn bị sẵn trong đầu một quy trình thực tế** (ví dụ: phê duyệt hóa đơn, tiếp nhận khách hàng mới, báo cáo
  hằng tháng). Bạn không cần chuẩn bị trước tài liệu gì — skill sẽ chủ động đặt câu hỏi.

## Cách sử dụng

Hãy mô tả quy trình bạn muốn tư duy lại bằng ngôn ngữ thông thường. Ví dụ:

- "Giúp chúng tôi tái thiết kế quy trình tiếp nhận nhà cung cấp theo hướng AI-first."
- "Tư duy lại cách chúng tôi lập báo cáo hội đồng quản trị hằng tháng."
- "Những phần nào trong quy trình xử lý yêu cầu bồi thường của chúng tôi nên do AI đảm nhận?"

Sau đó, skill dẫn dắt bạn qua các giai đoạn ngắn: định khung mục tiêu, mở rộng các khả năng, ghi nhận
cách công việc đang diễn ra hiện nay, rà soát các ràng buộc, và xây dựng lại quy trình theo hướng AI-first —
kết thúc bằng bộ sản phẩm đầu ra đã mô tả ở trên.

**Hai cách chạy:**

- **Dẫn dắt từng bước (mặc định):** skill hỏi dần về các tác vụ, trình kích hoạt (trigger), điểm nghẽn và khối lượng công việc của bạn trong quá trình trao đổi.
  Bạn chia sẻ càng nhiều, bản thiết kế lại càng sắc bén và đáng tin cậy.
- **Nhanh:** nếu bạn không có nhiều thời gian hoặc chỉ muốn có phần phân tích tư duy, hãy nói kiểu như *"chỉ cần tư duy lại
  dựa trên những gì tôi vừa chia sẻ."* Skill sẽ tạo ra bản thiết kế lại từ mức độ hiểu ban đầu và gắn nhãn
  rõ ràng mọi giả định để bạn kiểm tra lại sau.

Bạn có thể điều hướng quá trình này ở bất kỳ lúc nào — yêu cầu đi sâu hơn vào một giai đoạn, tập trung vào một điểm nghẽn cụ thể,
hoặc nhảy thẳng đến phần tóm tắt.

## Điều cần biết

- **Skill tái định hình công việc; nó không xây dựng agent hay skill.** Danh sách tồn đọng mà nó tạo ra là
  danh sách các *cơ hội* được sắp xếp theo thứ tự ưu tiên — mỗi cơ hội kèm theo khối cấu thành được khuyến nghị (một thay đổi
  quy trình, một công cụ, một skill có thể tái sử dụng, một agent, hoặc một connected agent) — để bàn giao sang một bước xây dựng
  riêng biệt. Không có phần viết prompt hay cấu hình connector.
- **Skill đặt ngược lại câu hỏi "chúng ta có thực sự cần đến agent không?"** Thường thì một thay đổi quy trình đơn giản hơn, một công cụ hoặc một
  skill có thể tái sử dụng đã đủ mang lại giá trị — skill cân nhắc các phương án đó song song với agent thay vì mặc định chọn
  agent. Hãy sẵn sàng đón nhận những phản biện mang tính xây dựng trước khi skill đề xuất dùng agent.
- **Các giả định đều được gắn nhãn, không che giấu.** Bất kỳ hệ thống, tích hợp hay con số nào mà skill chưa chắc chắn đều được
  gắn cờ để bạn xác thực — nó sẽ không trình bày suy đoán như sự thật.
- **Đảm bảo an toàn bảo mật thông tin.** Không dán dữ liệu cá nhân, bí mật khách hàng hoặc thông tin xác thực. Nếu
  xuất hiện chi tiết nhạy cảm, skill sẽ đề xuất loại bỏ và tiếp tục trao đổi ở mức độ khái quát.
- **Đây là một cuộc hội thoại, không phải một biểu mẫu.** Skill phát huy hiệu quả nhất qua một vài lượt trao đổi, vừa làm vừa tóm tắt.
  Bạn có thể tạm dừng và quay lại sau.
- **Xử lý từng quy trình một** sẽ cho kết quả tốt nhất. Nếu bạn có nhiều quy trình, skill sẽ kết thúc bằng câu hỏi nên xử lý
  quy trình nào trước — quy trình có khối lượng lớn nhất, gây nhiều vướng mắc nhất, hay mang lại giá trị nhanh nhất.
