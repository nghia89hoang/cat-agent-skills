# Làm giàu nội dung & danh mục sản phẩm

Dành cho nhân viên quản lý hàng hóa (merchandiser) và người quản trị PIM khi chuyển đổi bảng tính của nhà cung cấp, bảng thông số kỹ thuật và tài liệu hướng dẫn thành
các bản ghi sẵn sàng cho từng kênh bán hàng, đáp ứng đúng hệ thống phân loại (taxonomy), giọng điệu thương hiệu và ranh giới tuyên bố thuộc diện quản lý.

Công cụ tiếp nhận nguồn dữ liệu từ nhà cung cấp, chuẩn hóa các thuộc tính theo hệ thống phân loại kèm xác thực mã GTIN,
chấm điểm mức độ đầy đủ theo từng kênh, kiểm tra các tuyên bố và thuật ngữ thuộc diện quản lý dựa trên thư viện tuyên bố đã được phê duyệt,
rồi soạn thảo mô tả sản phẩm và bộ hồ sơ rà soát.

Đây là plugin duy nhất mà cả hai phía trong quan hệ thương mại đều sử dụng, từ hai đầu đối diện của
cùng một luồng dữ liệu.

## Thành phần bao gồm

1. Đọc bảng tính của nhà cung cấp, bảng thông số và tệp xuất từ cổng thông tin.
2. Chuẩn hóa theo hệ thống phân loại, xác thực chữ số kiểm tra (check digit) của mã GTIN (tất định).
3. Chấm điểm mức độ đầy đủ theo từng kênh và chỉ rõ các trường còn thiếu theo từng SKU.
4. Kiểm tra các tuyên bố dựa trên thư viện đã phê duyệt — bước Quản trị (Govern).
5. Soạn thảo nội dung mô tả, nội dung so sánh và bộ hồ sơ rà soát.

## Trước khi bắt đầu

Các bản ghi PIM và GDSN, bảng tính và dữ liệu cổng thông tin của nhà cung cấp, tài liệu hướng dẫn và thông số sản phẩm,
thư viện tuyên bố đã được phê duyệt của bạn, tài liệu hướng dẫn về thương hiệu và phân loại sản phẩm, mẫu dữ liệu theo từng kênh và
danh sách các thuật ngữ thuộc diện quản lý.

## Dùng thử

*"Dùng nguyên văn nội dung này đi, thứ Sáu ra mắt rồi, bên pháp chế của họ đã rà soát rồi."*

- Một mã GTIN **không đạt chữ số kiểm tra GS1** — bản ghi bị chặn lại trước khi bất kỳ bước nào khác chạy.
- *"Diệt 99,9%"*, *"kháng khuẩn"* và *"phân hủy sinh học"* là các thuật ngữ thuộc diện quản lý nhưng **không có
  tài liệu chứng minh trong thư viện tuyên bố** cho các sản phẩm này. Bản rà soát pháp lý riêng của nhà cung cấp
  không phải là căn cứ chứng minh của bạn.
- Bản nháp xuất ra chỉ chứa các thuộc tính đã được phê duyệt. Những tuyên bố bị chặn sẽ không bao giờ xuất hiện trong đầu ra.

## Giới hạn

Dừng lại ở bản ghi nháp sẵn sàng trình phê duyệt. Công cụ không tự đăng lên kênh bán hàng, không phê duyệt tuyên bố thuộc diện quản lý
và không thay đổi hệ thống phân loại.

## Người đóng góp

- Copilot Acceleration Team (CAT)
