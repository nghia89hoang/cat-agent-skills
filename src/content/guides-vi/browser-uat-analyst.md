# Chuyên viên phân tích UAT trên trình duyệt

Hoạt động kiểm thử do agent thực hiện thường mắc một kiểu lỗi cố hữu: đọc tài liệu, nhấp thử vài thao tác,
rồi kết luận rằng tính năng hoạt động tốt. Kỹ năng này ra đời để chấm dứt tình trạng đó. Nó biến agent
thành một chuyên viên phân tích kiểm thử hoài nghi — tuyệt đối không khẳng định bất kỳ điều gì hoạt động cho đến khi có
ảnh chụp màn hình làm bằng chứng, đồng thời chỉ rõ *loại lỗi* mà nó phát hiện được.

Bạn có thể trỏ kỹ năng này tới bất kỳ thứ gì có thể thao tác trên trình duyệt — một agent Copilot Studio, một
ứng dụng model-driven hoặc canvas, lịch sử chạy của một luồng Power Automate, một biểu mẫu Dataverse,
một phân hệ Dynamics 365, ứng dụng web Teams, trung tâm quản trị Microsoft 365, hoặc ứng dụng web
của riêng bạn.

## Kỹ năng này làm gì

1. Viết trước một **bản hiến chương kiểm thử (test charter)** — nêu rõ mục tiêu, môi trường, dữ liệu kiểm thử, các giả thuyết,
   tiêu chí thành công và những gì nằm ngoài phạm vi.
2. Xác minh mức độ sẵn sàng của môi trường trước khi tác động vào bất kỳ thành phần nào.
3. Phân rã yêu cầu thành các kịch bản hiển thị với người dùng, sau đó bổ sung thêm một lượt kiểm tra đối nghịch (adversarial pass)
   cho những tình huống thường gây hỏng trong thực tế triển khai.
4. Thực thi bằng Playwright, chụp ảnh màn hình **trước và sau** mỗi thao tác quan trọng.
5. Duy trì sổ ghi chép bằng chứng (evidence ledger) xuyên suốt quá trình chạy.
6. Tổng hợp các phát hiện thành bản tóm tắt, ma trận kết quả và khuyến nghị hành động.

## Điểm khác biệt

**Phân loại lỗi thay vì chỉ báo cáo đơn thuần.** Mọi lỗi đều được gắn nhãn
là giới hạn sản phẩm, lỗi sản phẩm, giới hạn của harness kiểm thử, sự cố tenant hoặc
cấu hình, sự cố xác thực, hoặc hiện tượng trôi mô hình (model drift). Chính thói quen này tạo nên
sự khác biệt giữa một báo cáo được tiếp nhận xử lý và một báo cáo bị gạt bỏ —
bởi việc báo cáo nhầm một lỗi cấu hình tenant thành lỗi sản phẩm sẽ làm mất độ tin cậy
của toàn bộ phần còn lại trong tài liệu.

**"Bị chặn (Blocked)" là một kết quả hợp lệ.** Nếu agent không thể đi tới trạng thái cần kiểm tra, nó sẽ ghi nhận đúng như vậy.
Nó không bao giờ nâng khống một hành vi chưa quan sát được thành đạt (pass).

**Sổ ghi chép bằng chứng có cột "điều chứng minh được".** Nếu không thể điền nội dung cho cột đó,
thì ảnh chụp màn hình chỉ mang tính trang trí và kịch bản coi như chưa được kiểm thử. Đây là kỷ luật
giúp chấm dứt tình trạng làm bằng chứng hình thức.

**Các hướng tiếp cận thất bại có slide riêng.** Nội dung "chúng tôi đã thử cách này và nó không hoạt động"
thường là đầu ra giá trị nhất nhưng lại là thứ đầu tiên hay bị cắt bỏ.
Kỹ năng này bắt buộc phải giữ lại phần đó.

**Hiểu rõ các kiểu lỗi thực tế của giao diện trò chuyện phong phú (rich chat UI).** Việc kiểm thử định dạng của một agent hội thoại,
Adaptive Cards, hình ảnh lưu trữ ngoài (hosted images), hình ảnh được tạo động và
các hành động tương tác là năm bài kiểm thử riêng biệt với năm kiểu lỗi khác nhau — và
tất cả chúng đều hoạt động khác nhau giữa khung kiểm thử soạn thảo (authoring test pane) so với trong Teams. Việc JSON của Adaptive Card do mô hình sinh ra
bị hiển thị thành khối mã thay vì một thẻ hoàn chỉnh là ví dụ kinh điển mà
kỹ năng này được thiết kế để phát hiện.

## Cách sử dụng

Hãy nêu yêu cầu của bạn bằng ngôn ngữ tự nhiên:

- "Thực hiện UAT luồng chuyển cấp xử lý (escalation) của agent mới trước khi phát hành"
- "Kiểm tra xem biểu đồ có thực sự hiển thị trong Teams hay chỉ hiện trong khung kiểm thử"
- "So sánh cách thiết lập này hiển thị trong trung tâm quản trị Teams so với trung tâm quản trị M365"
- "Xác định xem lỗi đó là do cấu hình của chúng ta hay do lỗi sản phẩm"

Agent sẽ đề xuất bản hiến chương kiểm thử trước khi bắt đầu thực thi. Hãy chỉnh sửa phạm vi ngay tại bước đó
— làm vậy tiết kiệm hơn nhiều so với việc phải sửa lại cả báo cáo.

## Yêu cầu

Playwright hoặc công cụ tự động hóa trình duyệt tương đương, cùng với một phiên trình duyệt đã đăng nhập cho
hệ thống bạn cần kiểm thử. Ảnh chụp màn hình được ghi vào thư mục `output/<test-name>/`.

Đối với bước lập báo cáo, bạn có thể kết hợp với một kỹ năng PowerPoint nếu muốn xuất bộ slide thuyết trình; kỹ năng này
sẽ xuất các slide thành hình ảnh để kiểm tra lỗi tràn nội dung, chữ quá nhỏ
và cắt xén bố cục trước khi bàn giao.

## Mẹo sử dụng

- **Hãy để quá trình chạy chậm lại với các trung tâm quản trị.** Các phép khẳng định (assertion) quá vội vàng trên những SPA nặng nề
  sẽ tạo ra các lỗi giả, mà thời gian chứng minh đó là lỗi giả còn lâu hơn thời gian chờ ban đầu.
- Cung cấp dữ liệu kiểm thử mang tính tất định (deterministic). Để mô hình tự bịa dữ liệu rồi đi kiểm thử chính
  thứ nó bịa ra thì không chứng minh được điều gì.
- Chủ động yêu cầu kiểm thử các trường hợp phủ định (negative cases) — dữ liệu trống, sai quyền hạn, phiên làm việc hết hạn.
  Đó mới là nơi phát hiện ra các lỗi thực sự.
- Nếu một kết quả khiến bạn bất ngờ, hãy hỏi agent xem cần bằng chứng nào để làm rõ nguyên nhân gốc rễ. Kỹ năng này được
  xây dựng để trả lời câu hỏi đó thay vì cố bảo vệ giả thuyết đầu tiên của mình.

## Giới hạn đã biết

- Chỉ kiểm thử các hành vi quan sát được trên trình duyệt. Không dùng cho kiểm thử đơn vị (unit test), kiểm thử hợp đồng API (API contract test), hay
  kiểm thử chịu tải (load test).
- Không thể kiểm chứng các phản hồi AI không mang tính tất định theo cách kiểm thử giao diện tất định;
  kỹ năng này gắn cờ hiện tượng trôi mô hình (model drift) thành một danh mục riêng thay vì cố khẳng định như giao diện thông thường.
