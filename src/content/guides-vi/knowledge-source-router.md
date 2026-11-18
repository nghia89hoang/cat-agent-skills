# Bộ định tuyến Nguồn Tri thức

Giữ cho các câu trả lời theo từng quốc gia luôn bám sát đúng những tài liệu thực sự áp dụng.
Kỹ năng này sử dụng siêu dữ liệu `Country` của thư viện SharePoint để chọn ra toàn bộ
tập tài liệu phù hợp trước khi tìm kiếm trong nội dung của chúng.

## Tại sao nên sử dụng?

Chính sách, phúc lợi, bảng giá, yêu cầu pháp lý và tính khả dụng của sản phẩm có thể
khác nhau tùy theo từng quốc gia. Một lượt tìm kiếm nội dung thông thường có thể trộn lẫn
tài liệu từ nhiều quốc gia vì tên quốc gia thường được lưu trong siêu dữ liệu thay vì
được ghi trực tiếp trong văn bản tài liệu.

Bộ định tuyến đảo ngược trình tự đó:

1. Khám phá cột `Country` của thư viện và các giá trị đã được ghi nhận.
2. Chọn mọi tài liệu được gán cho quốc gia được yêu cầu.
3. Chỉ tìm kiếm trong phạm vi các URL tài liệu đó.
4. Đọc toàn bộ tập tài liệu đã khoanh vùng và trích dẫn các nguồn đã sử dụng.

Kỹ năng cũng báo cáo các tệp chưa được gán giá trị và các tài liệu liên quan đã bị
bộ lọc quốc gia loại trừ, giúp ranh giới của câu trả lời trở nên rõ ràng.

## Một ví dụ chặt chẽ có chủ đích

Một agent có năng lực cao có thể không cần những chỉ dẫn chi tiết đến mức này để sử dụng
đúng tính năng lọc siêu dữ liệu và tìm kiếm tri thức. Kỹ năng này cố ý minh họa
một luồng xử lý chặt chẽ hơn để trình tự thực hiện trở nên tường minh, có thể lặp lại và dễ kiểm tra.

Hãy sử dụng kỹ năng này như một mẫu định tuyến hoạt động thực tế lẫn một ví dụ về cách hai công cụ
bổ trợ cho nhau: `sharepoint_metadata_filter` xác định những tài liệu nào
áp dụng, còn `knowledge_search_sharepoint` tìm kiếm nội dung của chúng thông qua
`scopeUrls`. Hãy điều chỉnh mức độ chi tiết của chỉ dẫn cho phù hợp với từng agent và kịch bản thay vì
mặc định rằng mọi triển khai đều cần toàn bộ các cơ chế kiểm soát (guardrail) trong kỹ năng này.

## Yêu cầu

Sử dụng kỹ năng này với một agent Copilot Studio có:

- Một thư viện tài liệu SharePoint có cột siêu dữ liệu `Country` đã được điền dữ liệu.
- Công cụ `sharepoint_metadata_filter` có khả năng khám phá các cột, nhóm các giá trị,
  lọc hàng dữ liệu và trả về URL tài liệu.
- Công cụ `knowledge_search_sharepoint` hỗ trợ tham số `scopeUrls`.
- Các kỹ năng xử lý định dạng tệp cần thiết để mở và tiền xử lý tài liệu trong thư viện.

Các giá trị quốc gia cần nhất quán và có ý nghĩa với người dùng. Kỹ năng tuân theo đúng
các giá trị được ghi nhận trong thư viện và không tự suy diễn gán quốc gia cho các tệp
bị bỏ trống.

## Những thay đổi ở phiên bản 2

Phiên bản 2 thay thế các nhóm nguồn cố định (fixed source buckets) bằng cơ chế định tuyến ưu tiên siêu dữ liệu. Hiện tại, kỹ năng
suy xuất tập tài liệu có thể tìm kiếm từ cột `Country` của thư viện,
ngăn chặn các lượt tìm kiếm không giới hạn phạm vi, bao quát mọi tệp khớp điều kiện, đồng thời báo cáo mức độ phủ
siêu dữ liệu và các mục bị loại trừ.
