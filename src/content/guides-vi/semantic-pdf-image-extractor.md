# Trình trích xuất hình ảnh PDF theo ngữ nghĩa

Sử dụng kỹ năng này để xây dựng một danh mục trực quan có thể truy vết từ một hoặc nhiều tệp PDF. Khác với phương pháp trích xuất PDF ở cấp độ đối tượng (object-level), kỹ năng trước tiên phân tích các trang đã được kết xuất (rendered) rồi mới chọn lọc các vùng hình ảnh mạch lạc và có ý nghĩa. Cách tiếp cận này hỗ trợ các bản quét đã làm phẳng (flattened scan), sơ đồ vector, bố cục hỗn hợp, áp phích toàn trang và các tệp PDF có nhúng hình ảnh.

## Sản phẩm đầu ra

- Bằng chứng ảnh PNG toàn trang cho mọi trang đã xử lý
- Ảnh cắt tài nguyên sắc nét (asset crop) và ảnh cắt kèm ngữ cảnh tùy chọn (context crop)
- Phân loại ảnh chụp, sơ đồ, biểu đồ, bản đồ, ảnh chụp màn hình, hình minh họa, ảnh bảng biểu, ảnh ghép (composite) và các loại hình ảnh khác
- Chú thích ảnh, nhãn hiển thị, mô tả, từ khóa, mã kiểm tra (checksum), tọa độ nguồn và chỉ số chất lượng
- Đề xuất các mục trùng lặp hoàn toàn hoặc gần trùng lặp kèm theo dõi số lần xuất hiện
- Tệp kê khai (manifest) đã chuẩn hóa, bản tóm tắt rà soát, thông tin chẩn đoán và tệp lưu trữ ZIP đã được xác thực

Chế độ mặc định `meaningful` loại bỏ các nội dung mang tính trang trí. Các chế độ khác có thể tập trung vào ảnh chụp, sơ đồ, biểu đồ, toàn bộ hình ảnh không tầm thường (nontrivial) hoặc bộ lọc tùy chỉnh.

## Yêu cầu

Kỹ năng có thể sử dụng các năng lực xử lý PDF và hình ảnh gốc do môi trường thực thi (runtime) của agent cung cấp. Trình trợ giúp tùy chọn đi kèm yêu cầu Python 3.10 trở lên. Việc kết xuất (rendering) và cắt ảnh (cropping) yêu cầu `pypdfium2` và `Pillow`; việc xác thực tệp kê khai và đóng gói thì không yêu cầu.

Cài đặt các thư viện tùy chọn bằng lệnh:

```text
python -m pip install pypdfium2 Pillow
```

## Yêu cầu mẫu

- Trích xuất tất cả hình ảnh có ý nghĩa từ các tệp PDF này và giữ nguyên chú thích cũng như ngữ cảnh trang của chúng.
- Xây dựng một danh mục đã loại bỏ trùng lặp gồm các sơ đồ và biểu đồ từ bộ tài liệu này.
- Chỉ trích xuất ảnh chụp và đóng gói chúng kèm mô tả thực tế cùng tham chiếu nguồn.

## Quyền riêng tư

Tài liệu nguồn và hình ảnh đã trích xuất luôn nằm trong vùng lưu trữ được phê duyệt của môi trường thực thi. Kỹ năng hướng dẫn agent không phát hành tệp ra ngoài, không sử dụng dịch vụ bên ngoài chưa được phê duyệt, không làm lộ siêu dữ liệu (metadata) ẩn và không đưa vào dữ liệu cá nhân không liên quan.
