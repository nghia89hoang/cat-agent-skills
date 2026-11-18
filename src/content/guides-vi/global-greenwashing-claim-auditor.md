# Trình kiểm tra tuyên bố tẩy xanh toàn cầu

Một agent skill linh hoạt dùng để phân tích bước đầu các tuyên bố tiếp thị về môi trường.
Skill này phát hiện các tuyên bố có nguy cơ gây hiểu nhầm hoặc chưa đủ căn cứ chứng minh
và báo cáo tách biệt giữa các rủi ro chung về cách xây dựng tuyên bố với các phát hiện
đặc thù tại Canada, Liên minh Châu Âu và Vương quốc Anh.

Hãy dùng skill này để rà soát mô tả sản phẩm, nội dung quảng cáo, báo cáo phát triển
bền vững, bài thuyết trình, trang web, nội dung mạng xã hội, nội dung bao bì và các
tài liệu truyền thông công khai khác trước khi xuất bản hoặc gửi thẩm định pháp lý.

## Định dạng đầu vào được hỗ trợ

- Văn bản dán trực tiếp trong hội thoại hoặc tệp văn bản
- Tập dữ liệu CSV
- Tệp bảng tính XLSX
- Tài liệu DOCX
- Bài thuyết trình PPTX
- URL trang web công khai qua HTTP hoặc HTTPS

Các script đi kèm chỉ sử dụng thư viện chuẩn của Python. Nội dung từ XLSX, DOCX và PPTX
được trích xuất trực tiếp từ các tệp Open XML bên trong, do đó không cần cài thêm
bất kỳ gói Python nào.

## Thêm skill vào agent

1. Tải xuống và giải nén gói skill.
2. Thêm skill đã giải nén vào agent.
3. Đảm bảo skill được tải lên vẫn giữ nguyên `SKILL.md`, `scripts/` và
   thư mục `references/`.
4. Yêu cầu agent kiểm tra nội dung, nêu rõ thị trường mục tiêu và
   ngày dự kiến xuất bản nếu đã biết.

Các script sử dụng Python 3 và đường dẫn tương đối theo không gian làm việc nên có thể chạy trên mọi
môi trường agent được hỗ trợ.

## Yêu cầu mẫu

- "Hãy kiểm tra mô tả sản phẩm này để tìm rủi ro tẩy xanh (greenwashing) tại Canada, EU và
  Vương quốc Anh."
- "Hãy rà soát bảng tính các tuyên bố bền vững đính kèm và xếp thứ tự ưu tiên các
  dòng có rủi ro cao nhất."
- "Hãy quét bài thuyết trình này để tìm các tuyên bố môi trường cần bổ sung điều kiện giới hạn hoặc
  bằng chứng chứng minh."
- "Hãy kiểm tra trang sản phẩm công khai này để phát hiện các tuyên bố mơ hồ, tuyệt đối hóa, trung hòa carbon và
  khả năng tái chế."
- "Hãy đánh giá các tuyên bố này cho một chiến dịch tại EU dự kiến xuất bản vào ngày
  1 tháng 9 năm 2026."
- "Hãy viết lại các tuyên bố bị gắn cờ theo hướng thận trọng mà không bịa đặt thêm bằng chứng."

Nếu không cung cấp thị trường mục tiêu, skill sẽ đánh giá cả bốn phạm vi
sẵn có và đánh dấu mức độ áp dụng theo khu vực là chưa xác nhận:

- `ANY`: các rủi ro phổ quát về từ vựng và cách xây dựng tuyên bố
- `CA`: luật pháp và hướng dẫn của Canada
- `EU`: luật pháp và hướng dẫn của Liên minh Châu Âu
- `UK`: luật pháp và hướng dẫn của Vương quốc Anh

## Quy trình kiểm tra hoạt động như thế nào

1. Skill xác định loại đầu vào, các thị trường mục tiêu và ngày dự kiến
   xuất bản.
2. Trích xuất phần văn bản chứa tuyên bố đồng thời giữ nguyên thông tin vị trí như hàng và cột trong CSV,
   trang tính và ô trong bảng tính, đoạn văn trong tài liệu, hoặc trang chiếu
   và đối tượng hình khối trong bài thuyết trình.
3. Một script Python đi kèm thực hiện sàng lọc theo từ khóa và mẫu câu.
4. Agent đối chiếu từng kết quả khớp với bộ từ vựng, phân loại rủi ro,
   phương pháp phát hiện và tài liệu nghiên cứu theo khu vực được đóng gói sẵn.
5. Bổ sung các rủi ro theo ngữ cảnh mà việc khớp từ khóa có thể bỏ sót, bao gồm tuyên bố
   ngụ ý, hình ảnh minh họa, thông tin bị lược bỏ, phép so sánh, nhãn mác, phạm vi vòng đời sản phẩm và
   các cam kết trong tương lai.
6. Báo cáo riêng các phát hiện cho từng khu vực pháp lý áp dụng và lấy
   mức rủi ro áp dụng cao nhất làm xếp hạng tổng thể.

## Nội dung báo cáo bao gồm

Báo cáo kiểm tra thu được bao gồm:

- Phạm vi, nguồn dữ liệu, ngày dự kiến xuất bản và các khu vực pháp lý áp dụng
- Số lượng phát hiện theo mức độ rủi ro và khu vực pháp lý
- Tuyên bố nguyên văn và vị trí nguồn của nó
- Mã phát hiện, xếp hạng rủi ro, căn cứ pháp lý hoặc phương pháp luận, và lập luận giải thích
- Hướng khắc phục thực tế và phương án viết lại có giới hạn phù hợp khi cần
- Các điểm cần sửa có mức ưu tiên cao nhất
- Các giới hạn và vấn đề cần được rà soát về mặt pháp lý hoặc kỹ thuật

Skill không bịa đặt bằng chứng, số liệu phần trăm, chứng nhận, phương pháp hay
lợi ích môi trường. Một kết quả khớp từ khóa được xem là đầu mối cần rà soát, chứ không phải
bằng chứng kết luận hành vi tẩy xanh.

## Kiểm tra nhanh

Từ thư mục skill đã giải nén, hãy chạy:

```sh
python scripts/analyze_text.py --text "Our eco-friendly product is carbon neutral." --jurisdictions CA EU UK
```

Để kiểm tra một tệp và lưu kết quả dưới dạng Markdown:

```sh
python scripts/analyze_docx.py "document.docx" --jurisdictions CA EU UK --format markdown --out audit.md
```

Mỗi công cụ phân tích đều hỗ trợ đầu ra JSON theo mặc định và đầu ra Markdown với tùy chọn
`--format markdown`. Xem `SKILL.md` để biết tài liệu tham chiếu đầy đủ về các lệnh.

## Các giới hạn quan trọng

- Skill này cung cấp hỗ trợ sàng lọc tuân thủ, không phải tư vấn pháp lý hay xác nhận
  tuân thủ pháp luật.
- Quá trình trích xuất tự động có thể không nắm bắt hết tác động của hình ảnh, bố cục,
  chú thích cuối trang, bằng chứng liên kết hoặc các ngữ cảnh trực quan khác.
- Phân tích trang web công khai không vượt qua cơ chế xác thực, tường thu phí (paywall), quy tắc robots
  hay các hạn chế truy cập.
- Luật pháp và hướng dẫn quản lý có thể thay đổi. Các quy định phụ thuộc mốc thời gian cần được
  đánh giá dựa trên ngày dự kiến xuất bản của nội dung.
- Các phát hiện mức Vàng (Yellow) và Đỏ (Red) cần được rà soát cùng bằng chứng liên quan và
  chuyển lên cố vấn pháp lý có chuyên môn khi cần thiết.

Xem `SKILL.md` để biết hướng dẫn vận hành cho agent và `references/` để tham khảo
các nghiên cứu quy định, bộ từ vựng, hệ thống phân loại và phương pháp phát hiện áp dụng.
