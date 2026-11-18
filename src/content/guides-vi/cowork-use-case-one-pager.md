# Tóm tắt một trang trường hợp sử dụng Cowork

Biến một việc bạn đã thực sự làm trong Cowork - một cuộc trò chuyện, một tác vụ theo lịch, một quy trình bạn
đã xây dựng - thành một trang HTML duy nhất có thể in ấn và chia sẻ nội bộ: kết quả tiêu đề nổi bật, một
đoạn mô tả ngắn gọn, các số liệu tác động, các bước quy trình và các đầu ra mà quy trình đó tạo ra.

Đó là bản viết tóm tắt đúng theo bố cục chuẩn nội bộ mà bình thường bạn sẽ mất nửa giờ để định dạng, nay hoàn thành chỉ trong khoảng
một phút.

## Trước khi bắt đầu

Không cần cài đặt gì và không cần kết nối tài khoản nào. Kỹ năng đi kèm mẫu trang riêng
(`assets/template.html`) và ghi ra một tệp HTML tự chứa hoàn toàn - không cần script ngoài, không phụ thuộc thư viện,
không cần truy cập internet.

Thứ kỹ năng *thực sự* cần là tài liệu nguồn. Kết quả tốt nhất đến từ việc chạy kỹ năng ở cuối
cuộc trò chuyện nơi công việc thực sự diễn ra, để nó có thể đọc trực tiếp quy trình làm việc. Nếu không có,
hãy đính kèm bản mô tả tác vụ, câu lệnh (prompt) hoặc một đầu ra trước đó - hoặc chỉ cần mô tả quy trình
bằng vài câu.

## Cách sử dụng

Yêu cầu bằng ngôn ngữ tự nhiên:

- "Viết nội dung này thành một trường hợp sử dụng Cowork"
- "Tạo bản tóm tắt một trang cho quy trình này"
- "Lập tài liệu mô tả tác vụ theo lịch này làm một ví dụ điển hình"
- "Biến những gì chúng ta vừa làm thành bản tóm tắt trường hợp sử dụng theo kiểu slide"

Điều gì diễn ra tiếp theo:

1. **Đọc quy trình làm việc** - điều gì kích hoạt nó, đầu vào gồm những gì, Cowork thực hiện từng bước ra sao,
   đầu ra là gì và ai là người nhận.
2. **Soạn thảo trang** - tiêu đề được diễn đạt theo kết quả đạt được, một đoạn mô tả trường hợp sử dụng ngắn, tối đa
   bốn thẻ thông tin nhanh (tần suất chạy, yếu tố kích hoạt, nguồn dữ liệu, đối tượng), 4–6
   bước quy trình và dải liệt kê các đầu ra.
3. **Ước tính tác động và trình bày rõ cách tính** - thời gian làm thủ công so với thời gian của Cowork, kèm
   một đến ba dòng chỉ số. Kỹ năng sẽ hiển thị cho bạn phép tính và đề nghị bạn xác nhận hoặc
   chỉnh sửa các con số.
4. **Lưu trang** vào thư mục tệp của bạn với tên
   `<use-case>_<your-name>_<YYYY-MM-DD-HHmm>.html`, ví dụ:
   `media-monitoring-reporting_tim-sparks_2026-08-05-1604.html`.

Mở tệp bằng trình duyệt để đọc hoặc chia sẻ; in ra PDF nếu bạn cần một bản sao cố định.

## Thông tin cần biết

- **Đây là một trang đơn, không phải bộ slide.** Nếu bạn muốn nhiều slide hãy yêu cầu PowerPoint, còn
  nếu muốn tài liệu có thể chỉnh sửa hãy yêu cầu Word hoặc Excel. Kỹ năng này chỉ tạo một trang HTML
  duy nhất có thể in được.
- **Các con số chỉ là ước tính cho đến khi bạn xác nhận khác.** Thời gian tiết kiệm và chi phí tiết kiệm được suy ra
  từ quy trình, được gắn nhãn là ước tính và hiển thị kèm phép tính. Các con số tiền tệ giữ nguyên
  dạng phần giữ chỗ `$000/month` trừ khi bạn cung cấp đơn giá. Hãy xác nhận lại các số liệu trước khi chia sẻ
  trang.
- **Không tự bịa đặt dữ kiện.** Nếu thông tin không có trong tài liệu nguồn hoặc chưa được bạn xác nhận,
  phần giữ chỗ sẽ được giữ nguyên thay vì điền một con số có vẻ hợp lý.
- **Được thiết kế để chia sẻ, nên hãy giữ nội dung sạch.** Tên khách hàng, dữ liệu cá nhân và
  tài liệu Hạn chế/Mật (Restricted/Confidential) đều được loại ra trừ khi bạn xác nhận chúng đã được phép chia sẻ cho
  đối tượng đọc. Hãy mô tả loại tài khoản ("sáu trong số các tài khoản khách hàng lớn nhất của tổ chức")
  thay vì nêu tên cụ thể, và bỏ hẳn tên của bạn để tạo phiên bản ẩn danh - khi đó tệp
  sẽ được đặt tên là `..._anonymous_...`.
- **Ảnh đại diện luôn là hình bóng (silhouette) chung**, với một trong bảy sắc thái màu. Không bao giờ dùng ảnh
  thật.
- **Kỹ năng chỉ luôn ghi ra tệp mới.** Không có gì trên ổ đĩa bị thay đổi hay xóa bỏ.

## Mẹo

- Hãy cung cấp một dòng mô tả vai trò cho thẻ cá nhân ("Theo dõi truyền thông & báo cáo khách hàng") nếu phần mô tả AD
  của bạn chưa phù hợp.
- Nếu quy trình chạy theo lịch, hãy nêu rõ điều đó và tần suất chạy. Tần suất chính là yếu tố giúp phép tính
  tác động trở nên đáng tin cậy.
- Chuẩn bị sẵn các số liệu về khối lượng - số lượng tài khoản, báo cáo, hộp thư đến hoặc tệp trong mỗi lần chạy.
  Chỉ riêng con số đó đã đảm nhiệm phần lớn sức thuyết phục ở cột tác động.
