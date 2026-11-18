# Kiến trúc sư Quy trình & SOP

Chuyển đổi ghi chú hội thảo (workshop), phỏng vấn, bản chép lời cuộc họp, tài liệu yêu cầu hoặc quy trình hiện có thành một bộ tài liệu quy trình hoàn chỉnh và có thể tái sử dụng.

Kiến trúc sư Quy trình & SOP giúp các đội ngũ chuyển từ tri thức quy trình rời rạc sang một mô hình vận hành đã được kiểm chứng. Skill tách bạch các dữ kiện đã xác nhận khỏi các giả định, đặt câu hỏi có trọng tâm khi thiếu chi tiết thiết yếu, và tạo ra các sản phẩm bàn giao có thể chỉnh sửa cho đội ngũ tuyến đầu, trưởng dự án, chuyên viên cải tiến quy trình, kiểm toán viên và ban lãnh đạo.

## Các sản phẩm đầu ra

Từ một bản đặc tả quy trình có cấu trúc, skill có thể tạo ra:

- Một tài liệu SOP định dạng Microsoft Word có thể chỉnh sửa
- Một sơ đồ quy trình định dạng SVG có thể mở trong trình duyệt hoặc chèn vào Office
- Một ma trận RACI và sổ đăng ký kiểm soát (control register) định dạng Excel
- Một danh sách tồn đọng cải tiến (improvement backlog) định dạng CSV
- Một bản tóm tắt điều hành và nhật ký câu hỏi chưa giải quyết định dạng Markdown
- Một bản trình bày điều hành PowerPoint chỉn chu và có thể chỉnh sửa

Bản trình bày PowerPoint bao gồm tổng quan điều hành (executive snapshot), luồng quy trình, vai trò và bàn giao, các biện pháp kiểm soát và rủi ro, lộ trình cải tiến, chỉ số trực quan và các bước tiếp theo.

## Trước khi bắt đầu

Cung cấp tài liệu nguồn mô tả quy trình, chẳng hạn như:

- Ghi chú hội thảo hoặc phỏng vấn
- Bản chép lời cuộc họp
- Một SOP hoặc chính sách hiện có
- Các yêu cầu của quy trình
- Danh sách các hoạt động, hệ thống, vai trò, biện pháp kiểm soát và vấn đề đã biết

Để đạt kết quả tốt nhất, hãy nêu rõ bạn muốn lập tài liệu cho **trạng thái hiện tại**, **trạng thái tương lai**, hay **cả hai**.

Các bộ sinh tệp đóng gói sẵn sử dụng các thư viện Python sau:

- `python-docx`
- `openpyxl`
- `python-pptx`

Trong sandbox của Copilot Studio, các thư viện này đã được cài sẵn nên không cần cài đặt thêm. Bạn chỉ cần cài đặt trước khi chạy các script **bên ngoài** Copilot Studio (ví dụ: khi kiểm thử trên máy cục bộ):

```bash
pip install python-docx openpyxl python-pptx
```

## Cách sử dụng

Đính kèm hoặc dán tài liệu nguồn của bạn và yêu cầu agent sử dụng Kiến trúc sư Quy trình & SOP.

### Ví dụ: lập tài liệu cho một quy trình ở trạng thái hiện tại

> Hãy sử dụng Kiến trúc sư Quy trình & SOP để lập tài liệu cho quy trình tiếp nhận nhà cung cấp (vendor onboarding) ở trạng thái hiện tại từ bản chép lời hội thảo đính kèm. Hỏi từng câu một cho những thông tin thiết yếu còn thiếu. Tạo tài liệu SOP, sơ đồ quy trình, bảng tính RACI và kiểm soát, danh sách tồn đọng cải tiến, bản tóm tắt điều hành và bài trình bày PowerPoint. Không tự bịa ra người phụ trách, biện pháp kiểm soát, chính sách hay mức cam kết dịch vụ (SLA).

### Ví dụ: thiết kế quy trình ở trạng thái tương lai

> Hãy phân tích các ghi chú này và xây dựng quy trình tiếp nhận nhân viên mới (employee onboarding) ở trạng thái tương lai. Tách bạch rõ ràng các điểm nghẽn hiện tại với các cải tiến đề xuất. Bao gồm các nhánh quyết định, ngoại lệ, biện pháp kiểm soát, bàn giao giữa các vai trò, rủi ro áp dụng và bài trình bày PowerPoint cho ban lãnh đạo.

### Ví dụ: cải tiến một SOP hiện có

> Hãy rà soát tài liệu SOP đính kèm bằng Kiến trúc sư Quy trình & SOP. Xác định các điểm chưa rõ về quyền sở hữu, các biện pháp kiểm soát còn thiếu, quy trình xử lý ngoại lệ chưa hoàn chỉnh và các khoảng trống quy trình. Tạo một bản SOP cải tiến cùng bài trình bày cho ban lãnh đạo giải thích các thay đổi được khuyến nghị.

## Cách hoạt động

Skill thực hiện:

1. Rà soát tài liệu nguồn được cung cấp.
2. Xác định ranh giới quy trình, trình kích hoạt (trigger), đầu ra kỳ vọng, vai trò, hệ thống, quyết định, ngoại lệ, biện pháp kiểm soát và chỉ số đo lường.
3. Đánh dấu các thông tin chưa giải quyết là `TBD` thay vì tự bịa chi tiết.
4. Tạo bản đặc tả quy trình có cấu trúc.
5. Xác thực quyền sở hữu, nhánh quyết định, tài liệu tham chiếu và bằng chứng kiểm soát.
6. Tạo trọn bộ tài liệu quy trình.
7. Rà soát các đầu ra về khả năng truy vết, tính dễ sử dụng và các nhận định thiếu căn cứ.

## Tùy chỉnh bài trình bày PowerPoint

Bộ sinh bài trình bày sử dụng:

```text
assets/presentation_theme.json
```

Hãy cập nhật tệp này để áp dụng màu sắc, phông chữ và phong cách trình bày mong muốn của bạn. Các trang chiếu được tạo ra vẫn có thể chỉnh sửa hoàn toàn trong Microsoft PowerPoint.

## Điều cần biết

- Chất lượng đầu ra phụ thuộc vào mức độ đầy đủ và chính xác của tài liệu nguồn.
- Các thông tin bị thiếu về người phụ trách, mốc thời gian, biện pháp kiểm soát và chính sách được gắn nhãn là chưa giải quyết thay vì tự suy đoán.
- Các khuyến nghị được tách riêng khỏi các dữ kiện trạng thái hiện tại đã được xác nhận.
- Các quy trình phức tạp có thể dễ lập tài liệu hơn nếu chia thành nhiều quy trình con liên kết với nhau.
- Sơ đồ quy trình SVG được thiết kế để truyền đạt quy trình nghiệp vụ một cách rõ ràng; nó không nhằm thay thế cho một ứng dụng mô hình hóa BPMN đầy đủ.
- Các tài liệu được tạo ra cần được chủ sở hữu quy trình phù hợp, đội ngũ tuân thủ hoặc chuyên gia nghiệp vụ rà soát trước khi phê duyệt hoặc ban hành chính thức.
- Skill không tự đưa vào các chính sách thiếu căn cứ, cách diễn giải quy định pháp lý hay cam kết của tổ chức.

## Đầu ra mẫu

Một gói tài liệu quy trình điển hình bao gồm các tệp tương tự như:

```text
vendor_onboarding_sop.docx
vendor_onboarding_process_map.svg
vendor_onboarding_raci_and_controls.xlsx
vendor_onboarding_improvement_backlog.csv
vendor_onboarding_summary.md
vendor_onboarding_executive_process_briefing.pptx
```
