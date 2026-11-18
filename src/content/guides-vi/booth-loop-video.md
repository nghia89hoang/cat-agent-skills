# Video phát lặp tại gian hàng

Bạn cần thứ gì đó trình chiếu trên màn hình phía sau gian hàng triển lãm của mình. Không phải một bản trình chiếu cứ tám giây lại chuyển slide một lần, cũng không phải một video cần đến người dựng phim, bản mô tả yêu cầu chi tiết và mất tới ba tuần thực hiện. Skill này kết xuất một tệp **MP4 không tiếng, phát lặp liên tục** — độ phân giải 1920x1080, 30 fps, dài từ một đến hai phút — chỉ từ phần mô tả những gì bạn muốn truyền tải.

Hãy mô tả thông điệp, đưa ra bảng màu thương hiệu của bạn, và agent sẽ viết một script kết xuất bằng Python, cho bạn xem một khung hình tĩnh của từng phân cảnh rồi mới tiến hành kết xuất video.

## Skill này làm gì

Agent tạo ra một script tự chứa duy nhất để vẽ **từng khung hình một** bằng Pillow và đẩy trực tiếp sang ffmpeg. Điều đó mang lại chuyển động thực thụ — hiệu ứng mờ dần mượt mà (eased fade), bộ đếm động, thanh tiến trình, hiệu ứng chữ gõ xuất hiện dần, các nút chuyển động theo quỹ đạo — chứ không phải tập hợp các slide tĩnh ghép hiệu ứng chuyển cảnh.

Vì toàn bộ quy trình là một script, việc tinh chỉnh diễn ra ngay qua hội thoại: những yêu cầu như "quay quỹ đạo chậm hơn", "làm tiêu đề lớn hơn", "đổi màu hồng cánh sen sang xanh lá" chỉ cần sửa vài hằng số rồi kết xuất lại.

## Vì sao vẽ từng khung hình thay vì xuất từ slide

Xuất một bộ slide ra video chỉ cho bạn một bộ slide phát ở tốc độ 0,1 fps. Cách này mang lại cho bạn một video đồ họa chuyển động (motion graphic) thực sự. Sự đánh đổi là bạn phải viết mã thay vì kéo thả các khung hộp — và đó chính xác là phần việc mà agent xử lý rất tốt giúp bạn.

## Điểm khác biệt

Phần lớn giá trị của skill này nằm ở danh sách tích lũy những lỗi thường gặp, được ghi lại rõ ràng để không bao giờ lặp lại nữa:

- **Quy tắc thứ tự lớp (z-order).** Pillow vẽ theo đúng thứ tự gọi hàm. Nếu bạn vẽ tâm kết nối trước rồi mới vẽ các đường nan nối ra ngoài, các đường nối sẽ cắt ngang qua tâm và đè lên nhãn chữ. Skill bắt buộc phải vẽ theo hai lượt — toàn bộ đường nối trước, sau đó mới đến toàn bộ các nút — cho mọi bố cục sơ đồ. Đây là lỗi phổ biến nhất và không thể phát hiện ra cho đến khi bạn nhìn trực tiếp vào khung hình.
- **Xem trước trước khi kết xuất.** Kết xuất toàn bộ video mất vài phút; tạo ảnh PNG xem trước chỉ mất vài giây. Agent sẽ kết xuất một ảnh tĩnh cho mỗi phân cảnh và hiển thị trực tiếp cho bạn xem *trước* khi quyết định kết xuất hoàn chỉnh.
- **`-pix_fmt yuv420p`.** Nếu thiếu tham số này, tệp MP4 sẽ phát bình thường trên VLC nhưng không chạy được trên bất kỳ trình phát nào khác — không chạy trên QuickTime, không chạy trong PowerPoint và cũng không chạy trên trình phát đa phương tiện của màn hình tại địa điểm sự kiện.
- **Dò tìm phông chữ đa nền tảng.** Một đường dẫn phông chữ gán cứng khi không tìm thấy sẽ âm thầm quay về phông chữ bitmap tí hon và tạo ra một video trông như bị lỗi. Skill dò tìm theo một danh sách phông chữ ứng viên cho từng độ đậm (weight) và báo cáo chính xác phông chữ nào đã được phân giải thành công.
- **Độ tương phản cho không gian triển lãm.** Thẻ tối đặt trên nền tối rất được ưa chuộng trên công cụ thiết kế, nhưng lại không thể đọc nổi trên một màn hình cân chỉnh kém dưới ánh đèn sáng gắt. Giao diện khung chat và trích dẫn được đặt trên thẻ nền trắng, đồng thời độ tương phản được kiểm tra trực tiếp trên một khung hình đã kết xuất.
- **Các khung hình được xuất vào thư mục tạm của hệ thống**, tuyệt đối không lưu vào thư mục làm việc — việc kết xuất hàng nghìn tệp PNG vào một thư mục đang đồng bộ OneDrive hoặc Dropbox sẽ làm nghẽn quá trình kết xuất và khiến trình đồng bộ hoạt động quá tải.

## Cách sử dụng

1. Cho agent biết mục đích của video và đại ý nội dung cần truyền tải — thông điệp chính, ba điều bạn muốn người đi ngang qua ghi nhớ và lời kêu gọi hành động (call to action).
2. Cung cấp bảng màu thương hiệu của bạn, hoặc để agent dùng bộ màu xanh navy/xanh dương trung tính mặc định. Skill sẽ không tự bịa ra bộ nhận diện thương hiệu thay bạn.
3. Kiểm tra lại các ảnh tĩnh xem trước của từng phân cảnh mà agent gửi lại và chỉnh sửa bất cứ điểm nào chưa ổn. Đây là thời điểm ít tốn kém nhất để sửa bố cục.
4. Phê duyệt kết xuất. Tệp đầu ra sẽ được lưu tại `output/booth_loop.mp4`.
5. Tiếp tục tinh chỉnh bằng ngôn ngữ tự nhiên cho đến khi đạt đúng ý bạn.

## Yêu cầu hệ thống

Python cùng các thư viện `pillow`, `imageio`, `imageio-ffmpeg` và `numpy`. Agent sẽ tự cài đặt nếu thiếu. `imageio-ffmpeg` đã đóng gói sẵn tệp thực thi ffmpeg riêng, nên không cần cài đặt ffmpeg cho hệ thống và không cần thêm gì vào biến môi trường `PATH`.

## Lưu ý để video hiệu quả

- **Viết nội dung cho tám giây chú ý từ khoảng cách ba mét.** Nếu phân cảnh mở đầu tự nó không đủ thu hút, mọi phần phía sau cũng sẽ không giữ chân được người xem.
- Giữ lượng chữ hiển thị trên màn hình tại mọi thời điểm dưới ~25 từ.
- Thiết kế khung hình đầu tiên và khung hình cuối cùng giống hệt nhau để điểm nối vòng lặp biến mất hoàn toàn.
- Video được thiết kế không có âm thanh có chủ đích. Khu vực gian hàng triển lãm vốn rất ồn ào và hầu hết màn hình tại sự kiện đều bị tắt tiếng.
- Video đầu ra còn dùng tốt cho bài đăng LinkedIn hoặc nhúng vào slide thuyết trình, chứ không chỉ để phát lặp tại gian hàng.

## Giới hạn đã biết

- Không có rãnh âm thanh (audio track). Nếu cần, bạn có thể ghép thêm âm thanh sau bằng ffmpeg.
- Không sử dụng cảnh quay thực tế hay chỉnh sửa tệp video có sẵn — mọi thứ được tạo mới từ đầu.
- Các phân cảnh phức tạp ở tốc độ 30 fps mất vài phút để kết xuất. Ảnh tĩnh xem trước chính là giải pháp giúp tiết kiệm thời gian, chứ không phải ngồi chờ.
