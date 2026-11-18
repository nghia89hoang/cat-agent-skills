# Tạo tài liệu theo mẫu

Tạo tài liệu Word từ mẫu có sẵn của bạn và thông tin bạn cung cấp. Giữ nguyên cấu trúc mà nhóm đã thống nhất, đặt đúng nội dung vào đúng vị trí và nắm rõ những gì vẫn cần xem lại trước khi chia sẻ tài liệu.

Skill này dành cho các tài liệu lặp lại định kỳ như bản đề xuất (proposal), tuyên bố công việc (SOW), thư gửi khách hàng và báo cáo dự án. Skill hoạt động dựa trên một bản sao của tệp mẫu `.docx`, bảo toàn tệp gốc và giữ nguyên logo, kiểu định dạng (style), đầu trang, chân trang cùng các thành phần tài liệu khác không bị chỉnh sửa.

## Những gì bạn có thể tạo

Sử dụng cùng một mẫu cho nhiều khách hàng, dự án hoặc kỳ báo cáo khác nhau. Tùy thuộc vào mẫu và dữ liệu được cung cấp, skill có thể:

- Thay thế các placeholder và điền dữ liệu vào các điều khiển nội dung (content control) được Word hỗ trợ.
- Định dạng nhất quán ngày tháng, số tiền, số lượng và các giá trị có/không.
- Lặp lại một hàng trong bảng cho từng mục trong danh sách, chẳng hạn như dịch vụ hoặc sản phẩm bàn giao, và chỉ hiển thị cột phân nhóm (như Giai đoạn) ở hàng đầu tiên của mỗi nhóm.
- Xóa bỏ các hướng dẫn soạn thảo và những mục tùy chọn khi không áp dụng.
- Thêm các đoạn văn bản tại một vị trí xác định cho những câu trả lời dài hoặc phần tóm tắt.
- Cập nhật các trường dữ liệu trong phần thân tài liệu, đầu trang, chân trang và chú thích cuối trang (footnote).

Kết quả thu được là một tài liệu Word có thể chỉnh sửa, đi kèm bản tóm tắt các thay đổi và mọi mục cần rà soát.

## Trước khi bắt đầu

Cung cấp **mẫu Word**, **dữ liệu cần đưa vào** và mọi **quy tắc cho tài liệu này**. Ví dụ: chỉ định một mục tùy chọn cần xóa bỏ, định dạng ngày tháng cần dùng hoặc cách diễn đạt cần chèn khi một giá trị chưa có sẵn.

Dữ liệu có cấu trúc cho hiệu quả tốt nhất: các trường được đặt tên rõ ràng cho thông tin chi tiết của khách hàng, danh sách các hạng mục chi tiết và giá trị rõ ràng cho ngày tháng cũng như số tiền. Mẫu phải là một tệp `.docx` thực sự; ảnh chụp màn hình hoặc mô tả bằng văn bản về bố cục của mẫu là không đủ.

## Yêu cầu mẫu

**Tạo bản đề xuất cho khách hàng**

> Hãy sử dụng Tạo tài liệu theo mẫu để tạo bản đề xuất từ mẫu Word đính kèm và
> dữ liệu khách hàng. Thêm một hàng bảng cho mỗi dịch vụ, sử dụng các mức giá
> đã cung cấp và xóa bỏ mục hỗ trợ tùy chọn nếu dịch vụ hỗ trợ không được bao gồm.
> Trả về tài liệu Word hoàn chỉnh và gắn cờ bất kỳ thông tin nào còn thiếu.

**Chuẩn bị báo cáo dự án**

> Hãy tạo báo cáo dự án tháng này bằng mẫu đính kèm và dữ liệu trạng thái
> bên dưới. Sử dụng các cột mốc và mốc ngày đã cung cấp, tóm tắt các ghi chú
> tiến độ vào phần tóm tắt điều hành và liệt kê mọi thông tin cần xác nhận.

**Tạo thư khi thông tin chưa đầy đủ**

> Hãy tạo một bức thư gửi khách hàng bằng mẫu này và các thông tin chi tiết đã cung cấp.
> Sử dụng "Chờ xác nhận" cho tên người liên hệ bị thiếu, nhưng hãy dừng lại nếu thiếu
> tên khách hàng hoặc số tham chiếu. Giữ nguyên phần tiêu đề thư và chân trang hiện có.

## Cách hoạt động

Trước tiên, agent kiểm tra mẫu để xác định các trường dữ liệu, bảng biểu, hướng dẫn và những nội dung không thể thay đổi một cách an toàn. Sau đó, agent ánh xạ thông tin được cung cấp vào các vị trí đó và xem trước các chỉnh sửa dự kiến trước khi tạo tài liệu.

Các script kiểm tra kết quả so với cả mẫu gốc và kế hoạch dự kiến. Mọi thay đổi nằm ngoài kế hoạch sẽ không vượt qua bước xác minh. Nếu một lần thử sau đó thất bại, tài liệu đã được xác minh thành công gần nhất vẫn được giữ lại.

Thông tin bị thiếu được xử lý một cách tường minh. Thiếu một giá trị bắt buộc sẽ làm dừng quá trình tạo tài liệu; một placeholder đã thống nhất hoặc trường để trống sẽ được ghi nhận để rà soát. Các giá trị do agent suy diễn hoặc tổng hợp từ dữ liệu đầu vào của bạn, chẳng hạn như phần tóm tắt hoặc tên ghép, cũng được gắn cờ. Những thông tin thực tế không có cơ sở từ dữ liệu đầu vào sẽ không bao giờ bị tự ý bịa đặt.

## Hiểu về kết quả

| Kết quả | Ý nghĩa |
| --- | --- |
| **OK** | Tài liệu đã vượt qua các bước kiểm tra cấu trúc và không có mục nào được báo cáo cần rà soát. |
| **Needs review** (Cần rà soát) | Tài liệu đã được tạo và vượt qua các bước kiểm tra cấu trúc, nhưng báo cáo chỉ ra những mục cần kiểm tra lại. |
| **Failed** (Thất bại) | Lần chạy này không tạo ra được tài liệu phù hợp để bàn giao. Báo cáo sẽ giải thích lý do. |

Các bước kiểm tra này xác minh các chỉnh sửa về mặt dữ liệu và cấu trúc, chứ không kiểm tra hình thức hiển thị của tài liệu trong Word. Hãy mở tệp hoàn chỉnh để kiểm tra ngắt trang, độ rộng bảng và tình trạng tràn chữ trước khi phát hành. Báo cáo thay đổi có chứa nội dung văn bản tài liệu và các giá trị đã cung cấp, vì vậy hãy bảo quản báo cáo cẩn thận như chính tài liệu đó.

## Môi trường hỗ trợ và giới hạn

Skill này hướng tới **Copilot Studio** và yêu cầu một môi trường chạy (runtime) có thể thực thi Python 3.10 trở lên cũng như đọc và ghi tệp cục bộ. Các script của skill chỉ sử dụng thư viện chuẩn Python và không gửi yêu cầu mạng.

Skill tạo tài liệu từ các mẫu Word có sẵn. Việc tạo bố cục từ đầu, xuất sang PDF, xử lý bảng tính và trích xuất dữ liệu từ các tài liệu nguồn đòi hỏi những công cụ khác.

Các mẫu có chữ ký số hoặc bật macro sẽ bị từ chối. Bộ chọn ngày (date picker), danh sách thả xuống (drop-down list), điều khiển ràng buộc dữ liệu (data-bound control), văn bản nằm trong phần theo dõi thay đổi (tracked changes) và kết quả trường Word (Word field result) không thể được điền bởi skill này; các trường không được hỗ trợ sẽ được báo cáo để rà soát.

## Dành cho người bảo trì

Từ thư mục skill đã giải nén, hãy chạy các lệnh kiểm tra sau với một đường dẫn tạm ngắn và có quyền ghi thay cho `<workdir>`:

```text
python scripts/run_job.py doctor --workdir <workdir>
python scripts/build_fixtures.py --check
python scripts/run_job.py selftest --workdir <workdir>
```

Trên Windows, `doctor` sẽ báo lỗi khi đường dẫn thư mục làm việc quá sâu để có thể ghi một job, đồng thời cho biết độ dài đường dẫn còn lại là bao nhiêu; hãy chuyển thư mục sang vị trí ngắn hơn thay vì thử chạy lại.

Các bài kiểm thử đi kèm sử dụng những tài liệu giả lập để kiểm tra việc điền dữ liệu, định dạng, bảo toàn tài liệu, các thao tác xóa không an toàn và cơ chế xử lý lỗi. Chúng cũng chạy kế hoạch mẫu trong `references/examples/`, nhờ đó ví dụ minh họa luôn đồng bộ với các script. Các tệp dữ liệu kiểm thử mẫu (fixture) không chứa bất kỳ dữ liệu khách hàng nào.

Xem [SKILL.md](SKILL.md) để nắm luồng làm việc của agent,
[đặc tả hợp đồng](references/contract.md) để biết định dạng kế hoạch và dữ liệu, và
[hướng dẫn xác minh](references/verification.md) để biết chi tiết về các bước kiểm tra và báo cáo.
