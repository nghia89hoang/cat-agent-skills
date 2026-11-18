# Trình tạo thư viện khoảnh khắc cuộc họp cho Cowork

Biến các bản ghi cuộc họp Microsoft 365 được cấp quyền thành một thư viện video có thể tìm kiếm, lưu giữ
những khoảnh khắc đáng xem lại.

Cowork sẽ tìm các cuộc họp bạn chọn, tự động truy xuất bản chép lời (transcript) và tệp ghi hình tương ứng,
xác định các khoảnh khắc hữu ích, và yêu cầu bạn phê duyệt trước khi tạo:

- một thư viện video HTML có thể tìm kiếm;
- một tệp CSV sẵn sàng nhập vào Microsoft Lists hoặc hệ thống khác; và
- một tệp nguồn chuẩn (source of truth) định dạng JSON.

Mỗi mục được xuất bản sẽ liên kết thẳng đến bản ghi gốc tại đúng mốc thời gian đã xác minh. Không có video nào
bị sao chép, cắt ghép hay lưu trữ lại ở nơi khác.

## Tải xuống

**[Tải xuống Trình tạo thư viện khoảnh khắc cuộc họp cho Cowork v1.2.0](https://github.com/SandraBcna/meeting-moments-library-builder-cowork/releases/download/v1.2.0/meeting-moments-library-builder-cowork.zip)**

## Cài đặt trong Cowork

1. Mở **Cowork → Customize → Skills**.
2. Chọn **Add → Upload skill**.
3. Tải lên tệp `meeting-moments-library-builder-cowork.zip`.
4. Bắt đầu một tác vụ Cowork mới.

## Cách sử dụng

Hãy yêu cầu Cowork tìm kiếm trong một khoảng thời gian và chuỗi cuộc họp cụ thể:

> Xây dựng một thư viện video hướng dẫn từ các cuộc họp Architecture Office Hours trong 30 ngày
> gần nhất.

Bạn cũng có thể tạo:

- thư viện các quyết định quan trọng;
- điểm nhấn tiếng nói khách hàng;
- điểm nhấn bản demo;
- bài học kinh nghiệm;
- các khoảnh khắc hướng dẫn hội nhập (onboarding); hoặc
- một thư viện dựa trên các tiêu chí tùy chỉnh.

Cowork sẽ:

1. tìm các cuộc họp phù hợp trong khoảng thời gian bạn đã phê duyệt;
2. tự động truy xuất đúng bản chép lời và tệp ghi hình;
3. đối chiếu xác minh các khoảnh khắc ứng viên với mốc thời gian trên bản chép lời;
4. hiển thị bảng rà soát cho bạn;
5. chờ bạn phê duyệt; và
6. tạo các tệp HTML, CSV và JSON.

Nếu không thể truy cập bản chép lời, bạn có thể đính kèm tệp phụ đề `.vtt`, `.srt` hoặc `.txt`.
Các liên kết bản ghi hình vẫn được tự động truy xuất. Những cuộc họp không có bản ghi hình
truy cập được sẽ bị bỏ qua trước khi trích xuất các khoảnh khắc ứng viên.

## Yêu cầu

- Microsoft 365 Copilot Cowork đã bật tính năng kỹ năng tùy chỉnh (custom skills)
- Quyền truy cập các cuộc họp, bản chép lời và bản ghi hình đã chọn
- Phê duyệt của tổ chức để biên tập và chia sẻ nội dung đã chọn

Không cần máy chủ bên ngoài, môi trường Dataverse, máy chủ MCP, đường hầm (tunnel) hay bất kỳ agent nào
được triển khai riêng.

## Đầu ra

| Tệp | Mục đích |
|---|---|
| `meeting-moments-library.html` | Thư viện video có thể tìm kiếm và mở trực tiếp trên trình duyệt |
| `meeting-moments-library.csv` | Nhập vào Microsoft Lists hoặc kho dữ liệu khác |
| `meeting-moments-library.json` | Tệp nguồn chuẩn có cấu trúc cho các lần cập nhật sau |

Chỉ những khoảnh khắc đã được phê duyệt, đã xác minh qua bản chép lời và có liên kết bản ghi hình HTTPS hợp lệ mới
được xuất bản. Các ứng viên đang giữ lại, bị từ chối, bị chặn hoặc cần rà soát lại sẽ không xuất hiện trong bất kỳ
đầu ra nào có thể tải xuống.

## Danh sách kiểm tra nghiệm thu

- [ ] Kỹ năng xuất hiện trong một tác vụ Cowork mới
- [ ] Chuỗi cuộc họp dự kiến được phát hiện chính xác
- [ ] Đúng phiên họp và bản chép lời tương ứng được khớp nối
- [ ] Tệp ghi hình tương ứng được tự động truy xuất
- [ ] Các khoảnh khắc ứng viên có mốc thời gian đã xác minh
- [ ] Không tự đoán tên người trình bày hay liên kết bản ghi hình
- [ ] Bảng rà soát xuất hiện trước khi tạo tệp đầu ra
- [ ] Chỉ các mục đã được phê duyệt mới xuất hiện trong thư viện HTML
- [ ] Các tệp đầu ra HTML, CSV và JSON được tạo thành công

## Quyền riêng tư và phân quyền

- Quyền truy cập một bản ghi hình không tự động đồng nghĩa với quyền tái xuất bản bản ghi đó.
- Các liên kết bản ghi hình vẫn giữ nguyên quyền truy cập Microsoft 365 hiện có.
- Toàn văn bản chép lời không được đưa vào thư viện được tạo.
- Nội dung có khách hàng bên ngoài bị loại trừ trừ khi được phê duyệt rõ ràng.
- Việc xuất bản lên SharePoint hoặc OneDrive là tùy chọn và yêu cầu xác nhận.
- Các cuộc họp không tự động truy xuất được bản ghi hình sẽ bị bỏ qua.

## Phiên bản đã kiểm thử

Phiên bản 1.2.0 đã được kiểm thử trong Cowork cho các tính năng phát hiện cuộc họp, đối khớp phiên họp định kỳ,
phát hiện bản chép lời, tự động truy xuất tệp ghi hình, cổng phê duyệt (approval gating) và
tạo tệp HTML/CSV/JSON.

## Giấy phép và hỗ trợ

Kỹ năng cộng đồng này được cung cấp nguyên trạng theo [Giấy phép MIT](LICENSE). Đây không phải là
sản phẩm, chứng nhận hay cam kết hỗ trợ chính thức của Microsoft.

Đối với các lỗ hổng tiềm ẩn trong kỹ năng này, vui lòng sử dụng tính năng báo cáo lỗ hổng riêng tư của GitHub.
Đối với các lỗ hổng của sản phẩm hoặc dịch vụ Microsoft, hãy làm theo hướng dẫn trong
[SECURITY.md](SECURITY.md).
