# Trợ lý Xử lý Gián đoạn Nhà cung cấp

Dành cho chuyên viên mua hàng hoặc người lập kế hoạch chuỗi cung ứng vừa nhận thông báo
một lô hàng bị trễ, và cần biết mức thiệt hại thực tế trước khi quyết định mức độ gây
áp lực xử lý.

Công cụ tiếp nhận đơn đặt hàng (PO) bị trễ, thông tin chậm giao hàng, thiếu hụt vật tư
hoặc thông báo từ nhà cung cấp, ánh xạ phần thiếu hụt qua cây cấu trúc nơi sử dụng trong
định mức nguyên vật liệu (BOM where-used) tới các sản phẩm, dây chuyền sản xuất, đơn hàng
đang mở cũng như ngày và số lượng có nguy cơ bị ảnh hưởng, đề xuất phương án giảm thiểu
rủi ro, tính toán cấp độ chuyển cấp xử lý (escalation tier) và soạn thảo cả thư đôn đốc
nhà cung cấp lẫn bản tóm tắt chuyển cấp nội bộ.

## Thành phần bao gồm

1. Đọc thông báo của nhà cung cấp, hồ sơ PO và dữ liệu giao nhận.
2. Truy xuất dữ liệu danh mục gốc nhà cung cấp (supplier master), lịch sử giao hàng đúng hạn và tiêu chuẩn tìm nguồn cung ứng.
3. Ánh xạ phần thiếu hụt qua BOM where-used tới các sản phẩm, dây chuyền, đơn hàng và mốc thời gian (tất định).
4. Đề xuất đẩy nhanh tiến độ (expedite) / thay thế linh kiện (substitute) / dời lịch (reschedule) và tính toán cấp độ chuyển cấp xử lý (tất định).
5. Soạn thảo thư đôn đốc nhà cung cấp và bản tóm tắt chuyển cấp xử lý nội bộ.

## Trước khi bắt đầu

Thông báo hoặc email của nhà cung cấp, hồ sơ PO, các đơn hàng đang mở, tình trạng tồn kho,
BOM where-used, danh mục gốc nhà cung cấp và lịch sử giao hàng đúng hạn. Các tệp CSV xuất
từ ERP/MRP đều dùng được.

## Dùng thử

Một nhà cung cấp gửi email trấn an chuyên viên mua hàng về 30 bộ truyền động servo chính xác:
*chỉ là một điều chỉnh nhỏ về lịch trình… chắc khoảng một tuần gì đó… không có gì nghiêm trọng.*
Nếu chỉ nghe theo lời email, đây trông như một sự chậm trễ thông thường có thể bỏ qua.

Hai yếu tố làm thay đổi câu trả lời:

- **Cổng thông tin nhà cung cấp (supplier portal)** hiển thị ngày điều chỉnh đã được xác
  nhận trên hệ thống — trễ **14 ngày**, chứ không phải "khoảng một tuần". Ngày trên cổng
  thông tin có giá trị ưu tiên hơn nội dung email.
- **Bối cảnh:** linh kiện này thuộc diện trọng yếu nguồn cung đơn (single-source) gần như
  không có tồn kho đệm (tồn kho hiện có 2, tồn kho an toàn 4, thời gian chờ 42 ngày), phục
  vụ một sản phẩm chủ lực có sản lượng cao, và một đơn đặt hàng bán cho khách hàng đang nằm
  trong vùng ảnh hưởng trực tiếp.

Email và dữ liệu kể hai câu chuyện khác nhau. Plugin đọc cả hai và tin vào dữ liệu.

## Giới hạn

Ưu tiên tạo bản nháp trước (draft-first): không có nội dung nào được tự động gửi đi, và
không có bản ghi PO hay ERP nào bị ghi đè. Công cụ hoạt động dựa trên các hồ sơ PO, lô hàng
và trao đổi với nhà cung cấp do bạn cung cấp.

## Người đóng góp

- Copilot Acceleration Team (CAT)
