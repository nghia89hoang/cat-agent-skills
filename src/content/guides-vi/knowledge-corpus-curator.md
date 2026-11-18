# Trình kiểm duyệt kho tri thức

Rà soát các tệp được một nguồn tri thức AI sử dụng để phát hiện tình trạng trùng lặp, dư thừa,
lỗi thời, chồng chéo và các hướng dẫn có khả năng mâu thuẫn nhau. Một kho tri thức sạch sẽ hơn
và được quản trị tốt hơn có thể cải thiện chất lượng phản hồi có căn cứ (grounded response), giảm
nhiễu truy xuất và độ trễ phản hồi, đồng thời giúp nội dung dễ bảo trì hơn.

Skill này phân tích các bản sao được tải lên mà không làm thay đổi tệp nguồn. Công cụ
gộp tất cả các lô đã tải lên thành một kho dữ liệu duy nhất và trả về danh sách tồn đọng rà soát dạng Excel,
bản tóm tắt HTML, kết quả JSON và tệp kê khai các lô.

Danh sách tồn đọng Excel và báo cáo HTML đều kèm dấu thời gian tạo theo giờ UTC dùng chung
trong tên tệp, chẳng hạn như
`knowledge-corpus-curation-backlog-2026-07-22-142530Z.xlsx`, để các lần chạy lặp lại
không ghi đè lên các báo cáo trước đó.

Tệp danh sách tồn đọng Excel luôn gồm bốn trang tính: `Review Backlog`, `Summary`,
`Document Inventory` và `Curation Settings`.

## Trước khi bắt đầu

- Tải xuống thư viện hoặc các thư mục SharePoint bạn muốn rà soát.
- Chỉ đưa vào những tệp mà bạn được phép xử lý.
- Tùy chọn thêm site hoặc thư viện SharePoint tương ứng làm nguồn tri thức của agent
  để hỗ trợ xác thực các phát hiện có rủi ro cao.

Nguồn tri thức của agent là tùy chọn. Các tệp đã tải lên vẫn là kho dữ liệu phân tích
có thẩm quyền chính thức. Quy trình này không yêu cầu các hành động của connector SharePoint hay
máy chủ SharePoint MCP.

## Nguồn tri thức SharePoint hỗ trợ được gì

Việc thêm site, thư viện hoặc vị trí tài liệu SharePoint tương ứng làm một
nguồn tri thức cho agent sẽ cung cấp cho skill thêm một lớp xác thực bên cạnh
các tệp đã tải lên. Lớp này có thể:

- Kiểm tra xem các đoạn nội dung SharePoint hiện tại có củng cố hay làm rõ các phát hiện
  trùng lặp và mâu thuẫn có rủi ro cao hay không.
- Xác định các khác biệt về đối tượng độc giả, khu vực, ngày hiệu lực hoặc phạm vi có thể
  giải thích cho một mâu thuẫn bề ngoài.
- Tìm các tài liệu liên quan hoặc có khả năng là nguồn chính thức nhưng chưa được đưa vào
  kho dữ liệu đã tải lên.
- Gắn cờ các tài liệu SharePoint liên quan là `Not included in uploaded corpus` cho một
  đợt rà soát trong tương lai.

Nguồn tri thức SharePoint không thay thế các tệp nguồn đã tải lên. Các đoạn tri thức được
truy xuất chỉ là những mảnh nội dung cục bộ, vì vậy chúng không thể chứng minh sự trùng lặp
toàn bộ tài liệu, sự mâu thuẫn xuyên suốt cả tài liệu hay mức độ bao phủ toàn bộ thư viện. Chúng
cũng không cung cấp đáng tin cậy chủ sở hữu gốc, URL, trạng thái phê duyệt hoặc ngày
chỉnh sửa; hãy cung cấp tệp kê khai siêu dữ liệu tùy chọn khi các trường thông tin này quan trọng.

## Chuẩn bị tệp

Đóng gói dữ liệu xuất thành một hoặc nhiều tệp ZIP độc lập, đồng thời giữ nguyên
cấu trúc thư mục SharePoint bất cứ khi nào có thể.

- Mỗi tệp ZIP tải lên có dung lượng tối đa **50 MB**.
- Tổng dung lượng của tất cả các tệp được tải lên trong một phiên trò chuyện có thể lên tới
  **200 MB**.
- Nên đặt mục tiêu **từ 45 MB trở xuống cho mỗi tệp ZIP** để chừa khoảng dự phòng thực tế.
- Chia theo các lô hợp lý như mảng nghiệp vụ, nhóm chính sách, loại tài liệu hoặc
  thư mục SharePoint cấp cao nhất.
- Chỉ giữ mỗi tài liệu trong duy nhất một lô.
- Không sử dụng các tệp nén tách phần như `.zip.001`; mọi tệp ZIP phải mở được độc lập.

Nếu kho dữ liệu dự kiến vượt quá 200 MB, hãy thu hẹp phạm vi hoặc phân tích các kho dữ liệu
riêng biệt trong các phiên trò chuyện khác nhau. Kết quả từ các phiên riêng biệt không được
tự động gộp lại, do đó phạm vi phát hiện trùng lặp, tương đồng và mâu thuẫn liên phiên sẽ không đầy đủ.

## Cách sử dụng

1. Thêm skill này vào agent Copilot Studio của bạn.
2. Đính kèm một hoặc nhiều tệp ZIP. Có thể đính kèm nhiều tệp ZIP trong cùng một
   tin nhắn, và các lô bổ sung có thể gửi trong các tin nhắn sau thuộc cùng một
   cuộc hội thoại. Mỗi tệp ZIP có thể lớn tới 50 MB, miễn là tổng dung lượng tất cả
   các tệp đính kèm trong phiên trò chuyện vẫn dưới 200 MB.
3. Nếu agent hỏi liệu còn tệp nào sắp gửi tiếp không, hãy xác nhận rằng quá trình tải lên
   đã hoàn tất hoặc đính kèm thêm một lô nữa. Không bắt buộc phải dùng một cụm từ xác nhận cố định nào.
4. Agent sẽ tập hợp tất cả các lần tải lên đã xác nhận lại với nhau, phân tích từng tệp đã tải lên,
   xác thực các phát hiện có rủi ro cao nhất và trả về các tệp báo cáo.

Xác nhận lô cuối cùng là câu hỏi tiếp nhận bắt buộc duy nhất. Skill không
hỏi liệu nội dung tải lên là toàn bộ thư viện hay chỉ một phần, và cũng không lọc bỏ
bản nháp, bản lưu trữ hay các phiên bản cũ trong lịch sử. Mọi tệp trong phần tải lên đã xác nhận đều được
đưa vào phân tích. Tiêu chí lỗi thời sử dụng ngưỡng mặc định là 365 ngày trừ khi bạn đã
yêu cầu một giá trị khác từ trước.

## Những vấn đề công cụ phát hiện

- Bản sao trùng khớp chính xác và trùng khớp sau chuẩn hóa văn bản
- Các bản gần như trùng lặp có nguy cơ sai lệch dần theo thời gian
- Nội dung có liên quan hoặc chồng chéo
- Hướng dẫn có khả năng mâu thuẫn kèm cặp bằng chứng đối chiếu
- Các nội dung có dấu hiệu lỗi thời
- Các tệp không được hỗ trợ và khoảng trống trích xuất nội dung
- Các tệp nguồn tri thức liên quan bị thiếu khỏi kho dữ liệu đã tải lên

Các phát hiện mâu thuẫn tiềm ẩn và trùng lặp đều kèm theo tên tệp liên quan,
vị trí, đoạn trích và số trang PDF khi có sẵn. Các khuyến nghị chỉ mang tính
hành động rà soát; skill không bao giờ xóa, di chuyển, đổi tên, phát hành,
lưu trữ hay ghi đè nội dung nguồn.

Giá trị độ tin cậy (confidence) là điểm số phát hiện dạng số mang tính tất định khi có sẵn.
Ô độ tin cậy để trống nghĩa là bộ phân tích không tạo ra điểm số; điều đó tuyệt đối không có nghĩa là
phát hiện đã được con người xác thực.

Danh sách tồn đọng luôn được sắp xếp theo thứ tự ưu tiên: `Critical`, `High`, `Medium`, rồi đến
`Low`, nhờ đó các mục cần rà soát khẩn cấp nhất luôn xuất hiện đầu tiên ở mọi định dạng đầu ra.

Các cột được giữ nhất quán qua các lần chạy. Danh sách tồn đọng Excel giữ lại đường dẫn chính và
đường dẫn liên quan để phục vụ truy vết, trong khi báo cáo HTML ẩn các cột đường dẫn đó
để dễ đọc hơn. Tiêu đề báo cáo bao gồm ngày và giờ tạo theo chuẩn UTC, và
tên một hoặc nhiều tệp ZIP nguồn hiển thị ngay bên dưới tiêu đề.

## Điều cần biết

- Hãy tải lên tất cả các lô trong cùng một cuộc hội thoại để việc so sánh hoạt động xuyên suốt
  ranh giới giữa các lô.
- Không nên mặc định rằng các tệp từ một cuộc hội thoại trước đó vẫn còn khả dụng.
- Quá trình tải xuống từ SharePoint có thể làm thay đổi ngày chỉnh sửa gốc. Hãy cung cấp tệp
  siêu dữ liệu JSON tùy chọn theo mô tả của skill khi bạn cần thông tin chính xác về ngày cập nhật, chủ sở hữu,
  URL hoặc trạng thái phê duyệt.
- Các kho dữ liệu lớn có thể vượt quá ngưỡng so sánh từng cặp đã cấu hình. Việc phát hiện
  trùng lặp chính xác vẫn diễn ra trên toàn kho dữ liệu, nhưng các phép so sánh ngữ nghĩa có thể bị
  giới hạn và điều này sẽ được nêu rõ trong báo cáo.
- Nếu môi trường thực thi không có sẵn thư viện phụ thuộc Excel, skill vẫn trả về
  HTML và JSON, và tệp JSON sẽ chứa đầy đủ danh sách tồn đọng.
