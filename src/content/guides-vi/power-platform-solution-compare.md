# So sánh giải pháp Power Platform

So sánh hai phiên bản của một giải pháp Power Platform để nắm rõ những gì đã thay đổi, những gì có thể bị lỗi và những gì quá trình triển khai cần chuẩn bị. Công cụ đọc mọi tập hợp thành phần trong gói xuất: so sánh nội dung đối với schema Dataverse, biểu mẫu, dạng xem, bảo mật, quy trình, cloud flow, ứng dụng canvas (màn hình, điều khiển, công thức, nguồn dữ liệu, kết nối, được đọc từ tệp `.msapp` đóng gói), đăng ký plug-in, custom API, tham chiếu kết nối, biến môi trường, mẫu và agent Copilot Studio; đồng thời so sánh mã băm tệp đối với các tệp nhị phân như plug-in assembly, gói PCF, connector, báo cáo và tệp phương tiện của ứng dụng.

## Kết quả tạo ra

- Bảng tổng hợp các thành phần được thêm mới, bị xóa, đã chỉnh sửa và không thay đổi theo từng loại.
- Các mục cần lưu ý được xếp hạng theo mức độ nghiêm trọng: cột bị xóa, trường bị rút ngắn độ dài, giá trị lựa chọn bị xóa, quyền hạn bị thu hẹp, trình kích hoạt (trigger) và điều kiện chạy của luồng bị thay đổi, thành phần gốc thay đổi phạm vi, phần phụ thuộc mới bị thiếu và các trường hợp tương tự.
- Danh sách kiểm tra triển khai: các tham chiếu kết nối cần đáp ứng, biến môi trường cần thiết lập, assembly cần xác minh, các luồng sẽ được bật, tùy chỉnh cần phát hành và liệu có cần thực hiện Upgrade (hoặc Stage for upgrade) để xóa các thành phần hay không.
- Bản kiểm kê chi tiết theo từng loại thành phần cùng các giá trị thay đổi chính xác.
- Ghi chú phát hành bằng ngôn ngữ dễ hiểu khi bạn yêu cầu.

Kết quả so sánh được đọc trực tiếp từ chính các gói giải pháp. Không có gì được suy diễn từ tên giải pháp hay giả định về những gì một bản phát hành nên chứa.

## Trước khi bắt đầu

Hãy xuất cả hai phiên bản giải pháp dưới dạng tệp `.zip` (managed hoặc unmanaged, nhưng lý tưởng nhất là cả hai cùng loại). Các thư mục đã giải nén từ gói xuất cũng dùng được, bao gồm cả tệp zip được giải nén vào một thư mục bọc ngoài. Mã nguồn đã giải nén bằng `pac solution unpack` nên được đóng gói lại trước bằng `pac solution pack`, hoặc agent có thể so sánh trực tiếp từng tệp thành phần.

Script đi kèm `scripts/solution_diff.py` chỉ cần Python 3.8 trở lên và không cần gì khác: không cần cài thêm gói thư viện, không cần mạng, không cần kết nối Power Platform. Trên Cowork và Scout, agent sẽ tự chạy script này cho bạn. Nếu môi trường lưu trữ của bạn không thể chạy Python, hãy chạy script trên máy cục bộ rồi dán báo cáo Markdown vào, hoặc tải lên các tệp `solution.xml`, `customizations.xml` và `Workflows/*.json` đã giải nén để agent so sánh trực tiếp.

```bash
python3 scripts/solution_diff.py ContosoProjects_1_0_0_0.zip ContosoProjects_1_1_0_0.zip --md report.md --json report.json
python3 scripts/solution_diff.py old.zip new.zip --brief                              # pre-import check
python3 scripts/solution_diff.py old.zip new.zip --types "Security roles,Cloud flows"   # focused comparison (partial names such as "roles" work)
python3 scripts/solution_diff.py old.zip new.zip --max-changes 100                    # list more changed values per component (default 25)
```

Báo cáo cung cấp thông tin gói giải pháp và các cảnh báo, bảng tóm tắt theo loại thành phần, các mục cần lưu ý được đánh số kèm mức độ nghiêm trọng, mục đầu vào triển khai (phần phụ thuộc, kết nối, biến môi trường, tệp nhị phân, thay đổi trạng thái kích hoạt, thành phần bị xóa), các tham chiếu chéo cho biết những gì trong phiên bản mới vẫn đang sử dụng một cột đã bị xóa hoặc một web resource hay tham chiếu kết nối đã thay đổi, cùng bản kiểm kê theo từng loại với thông tin chi tiết của thành phần. Tệp JSON chứa nội dung tương tự cộng thêm đường dẫn thay đổi đầy đủ.

## Câu lệnh mẫu

> Hãy so sánh hai gói xuất này của giải pháp Contoso Projects và cho tôi biết những gì đã thay đổi giữa phiên bản 1.0.0.0 và 1.1.0.0.

> Tôi sắp nhập giải pháp managed này lên môi trường production đè lên phiên bản hiện tại đính kèm. Những gì có thể bị lỗi và tôi cần chuẩn bị gì trước?

> Hãy tạo ghi chú phát hành cho các bên liên quan từ hai phiên bản giải pháp này. Nhóm các thay đổi theo tính năng và bỏ qua các mã định danh kỹ thuật.

> Chỉ so sánh các vai trò bảo mật và các cloud flow giữa hai gói này.

## Điều cần biết

- Ứng dụng canvas được so sánh theo nội dung: script mở từng tệp `.msapp` và báo cáo các màn hình, thành phần và điều khiển được thêm, xóa hoặc đổi tên; các công thức thuộc tính và bố cục vùng chứa bị thay đổi kèm nội dung cũ và mới; định nghĩa thuộc tính tùy chỉnh của thành phần bị thay đổi; nguồn dữ liệu và kết nối được thêm hoặc xóa; cùng các công thức vẫn tham chiếu đến một cột Dataverse đã bị xóa ở nơi khác trong giải pháp. Hình ảnh và tệp phương tiện bên trong ứng dụng được so sánh theo mã băm. Cài đặt ứng dụng, giao diện (theme) và bản ghi Test Studio không được so sánh. Nếu không thể đọc được tệp `.msapp`, báo cáo sẽ nêu rõ điều đó, không hiển thị dòng nội dung và chỉ so sánh mã băm tệp.
- Các DLL và gói assembly của plug-in, gói PCF, tệp custom connector, định nghĩa báo cáo và định nghĩa desktop flow chỉ được so sánh theo mã băm. Báo cáo cho biết chúng đã thay đổi, chứ không cho biết chi tiết bên trong thay đổi những gì. Hãy sử dụng hệ thống quản lý mã nguồn của bạn để kiểm tra các nội dung bên trong đó.
- Các trường luôn thay đổi ở mỗi lần xuất (phiên bản giới thiệu, dấu thời gian, cờ managed) được bỏ qua theo mặc định để báo cáo chỉ hiển thị các thay đổi thực sự. Hãy truyền `--include-noise` nếu muốn giữ lại các trường này.
- Việc so sánh một gói xuất managed với một gói xuất unmanaged vẫn hoạt động nhưng sẽ tạo ra thêm các khác biệt do cách đóng gói; báo cáo sẽ cảnh báo về điều này. So sánh hai gói có cùng số phiên bản là hoàn toàn bình thường và rất phổ biến giữa các môi trường.
- Các cờ mức độ nghiêm trọng xuất phát từ quy tắc phỏng đoán trong script. Chúng chỉ ra những mục nên kiểm tra trước chứ không phải xếp hạng rủi ro của tổ chức.
- Các gói giải pháp không thể cho thấy trạng thái của môi trường đích: dữ liệu hiện có, các lớp của giải pháp khác, kết nối hoặc người dùng. Báo cáo sẽ liệt kê những mục này để bạn tự xác minh thay vì suy đoán.
- Các giải pháp lớn với hàng trăm thành phần sẽ tạo ra báo cáo dài. Hãy yêu cầu so sánh tập trung (`--types`) hoặc kiểm tra trước khi nhập (`--brief`) để giữ đầu ra ngắn gọn. Script giữ cả hai gói trong bộ nhớ. Qua đo đạc, mức sử dụng bộ nhớ đỉnh xấp xỉ gấp hai mươi lần kích thước tệp customizations.xml và một giải pháp có khoảng 14.000 thành phần được so sánh trong vài giây; các gói xuất rất lớn có thể cần tới vài gigabyte.
- Một giải pháp bản vá (`<name>_Patch_<hex>`) khi so sánh với giải pháp gốc chỉ báo cáo những thành phần mà nó mang theo; các thành phần vắng mặt không bị báo là đã xóa, vì một bản vá không xóa bỏ bất kỳ thành phần nào.
- Script chạy cục bộ và không gửi dữ liệu đi đâu cả, nhưng báo cáo mà nó tạo ra có thể chứa giá trị biến môi trường đã đóng gói, tên connector, tham số của flow và nội dung công thức. Hãy rà soát lại báo cáo trước khi dán vào cuộc trò chuyện dùng chung hoặc đính kèm vào yêu cầu hỗ trợ.
- Mã nguồn đã giải nén bằng `pac solution unpack` sẽ bị từ chối kèm một thông báo, vì các tệp tách rời của nó sẽ khiến kết quả so sánh trông như một giải pháp rỗng. Hãy đóng gói lại trước.

## Khả năng tương thích và ghi nhận nguồn

Skill này được phát hành cho Cowork và Scout, nơi agent có thể đọc cả hai gói giải pháp và chạy trực tiếp script. Skill bao gồm các hướng dẫn Markdown cùng một script Python chỉ dùng thư viện chuẩn. Công cụ đọc các định dạng gói giải pháp được Microsoft công bố công khai và không phụ thuộc vào bất kỳ công cụ nào của Microsoft tại thời điểm chạy. Đây là đóng góp từ cộng đồng, không phải sản phẩm của Microsoft, và không thay thế cho solution checker, công cụ so sánh môi trường hay quy trình phát hành của tổ chức bạn.
