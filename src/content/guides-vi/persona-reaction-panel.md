# Hội đồng phản ứng theo chân dung vai trò

Kiểm thử trước mọi tài liệu truyền thông nội bộ — email ra mắt, bộ slide toàn thể nhân viên, trang trung tâm học tập, thông báo thay đổi, kịch bản video — với một tập hợp các **chân dung theo vai trò (role-based personas)** đã được định nghĩa *trước khi phát hành*. Hội đồng giúp phát hiện sớm các điểm mù, khoảng trống về mức độ bao phủ theo lĩnh vực, và các rủi ro từ "người phản đối có sức ảnh hưởng" khi chi phí chỉnh sửa vẫn còn thấp, đồng thời khép lại bằng phán quyết **SHIP / REVISE / HOLD** (Phát hành / Chỉnh sửa / Tạm giữ).

## Lý do ra đời

Phần lớn việc kiểm định chất lượng truyền thông diễn ra sau khi sự việc đã xảy ra: một thông điệp gây phản ứng không tốt với một nhóm nào đó, và bạn chỉ phát hiện ra qua các phản hồi gửi về. Kỹ năng này chuyển quá trình phát hiện đó sang thời điểm *trước khi* gửi. Các kỹ năng hiện có trong thư viện giúp bạn **tạo ra** nội dung; còn kỹ năng này mô phỏng cách **đối tượng tiếp nhận** sẽ đón nhận nội dung đó.

## Một khung phương pháp, không phải bộ dữ liệu sẵn

Kỹ năng này đi kèm **không có sẵn bất kỳ chân dung nào**. Bạn tự cung cấp chân dung của riêng mình trong tệp chân dung — `references/personas.template.md` là mẫu khởi đầu để bạn điền các vai trò trong tổ chức của mình. Mọi phản ứng mà hội đồng đưa ra đều được neo vào một thuộc tính do chính *bạn* định nghĩa, giúp quá trình mô phỏng trung thực và ngăn không cho kết quả trôi dạt thành những nhận xét kiểu "AI chung chung". Các chân dung của bạn nằm hoàn toàn trong bản sao của riêng bạn; không có bất kỳ thông tin đặc thù nào của tổ chức được đóng gói sẵn hay chia sẻ ra ngoài.

## Khi nào nên sử dụng

- Trước khi phát hành bất kỳ tài liệu nào tới đông đảo nhân sự nội bộ hoặc nhiều nhóm/lĩnh vực khác nhau.
- Khi cần ưu tiên xem nên gửi bản nháp nào trước trong số nhiều bản nháp.
- Đối với tài liệu hướng dẫn năng lực theo vai trò hoặc tài liệu lộ trình học tập.

**Không** dùng cho trao đổi riêng tư 1:1, các vấn đề hiệu suất/nhân sự (HR), hoặc ngôn từ pháp lý/hợp đồng — và kỹ năng này chỉ phản hồi dựa trên bản nháp bạn cung cấp; nó sẽ không tự viết bản nháp thay bạn.

## Những gì bạn cần chuẩn bị trước

Một **tệp chân dung** mô tả các vai trò trong nhóm đối tượng tiếp nhận của bạn. Hãy định nghĩa số lượng chân dung tương ứng với số vai trò riêng biệt của đối tượng — **8–12 là khoảng hợp lý cho một doanh nghiệp** — và nhóm chúng theo các **lĩnh vực (domain)** (ví dụ: Khách hàng, Triển khai, Dữ liệu, Công nghệ, Khối nghiệp vụ chung) để hội đồng có thể phát hiện các khoảng trống về độ bao phủ.

Mỗi chân dung tối thiểu cần có:

- **Vai trò / công việc họ phụ trách**
- **Động lực**
- **Điểm nghẽn / khó khăn**
- **Công cụ hoặc thay đổi này giúp ích gì cho họ**
- **Điểm neo truyền thông** — điều gì khiến thông điệp thuyết phục họ so với điều gì khiến họ mất hứng thú
- **Mức độ tin cậy** — đã được định nghĩa đầy đủ hay vẫn đang ở dạng nháp (các chân dung nháp được xử lý với mức độ tin cậy thấp hơn và các khuyến nghị từ đó sẽ được chuyển sang cho con người xác thực)

### Điền vào mẫu

1. Mở tệp `references/personas.template.md` trong bản sao kỹ năng của bạn.
2. Liệt kê các vai trò riêng biệt trong đối tượng tiếp nhận tài liệu và nhóm chúng theo từng lĩnh vực.
3. Hoàn thành đầy đủ mọi trường cho từng chân dung. Hai ví dụ được gắn nhãn rõ là `REPLACE ME` sẽ minh họa mức độ chi tiết hiệu quả.
4. Căn cứ các trường thông tin vào định nghĩa vai trò thực tế hoặc kết quả nghiên cứu nếu có; đánh dấu bất kỳ nội dung nào bạn đang suy luận là **bản nháp — độ tin cậy thấp hơn** để hội đồng xem đó là giả thuyết.
5. Hãy cụ thể và trung thực — hội đồng neo mọi phản ứng vào những gì bạn viết tại đây, vì vậy chân dung mơ hồ sẽ tạo ra phản ứng mơ hồ.

## Cách chạy kỹ năng

1. Thêm kỹ năng vào agent của bạn (Cowork hoặc Copilot Studio) cùng với tệp chân dung đã hoàn thiện đặt đúng vị trí.
2. Đưa cho agent bản nháp tài liệu của bạn và yêu cầu *"chạy hội đồng chân dung"* hoặc *"kiểm thử áp lực tài liệu này với các chân dung của chúng ta."*
3. Kết quả bạn nhận được gồm: phản ứng theo từng chân dung (mỗi chân dung có sáu câu trả lời được neo rõ ràng), bản tổng hợp (độ bao phủ theo lĩnh vực, điểm mù, rủi ro, đề xuất chỉnh sửa, các khuyến nghị có thể duyệt và áp dụng ngay), cùng kết luận tổng thể SHIP / REVISE / HOLD.

## Thông tin cần biết

- Chân dung vai trò phản ánh ở cấp độ vai trò công việc, không phải tâm lý học cá nhân.
- Hội đồng sẽ không tự bịa ra chân dung giữa chừng khi đang chạy — nếu tài liệu của bạn hướng tới một nhóm đối tượng không có đại diện trong danh sách chân dung, hội đồng sẽ nêu rõ điều đó và đưa ra kết luận HOLD.
- Kỹ năng xác định các phản ứng, rủi ro và hướng điều chỉnh mang tính xây dựng; **quyền phê duyệt cuối cùng vẫn thuộc về con người**. Hãy xác thực các khuyến nghị có mức độ ảnh hưởng lớn với một người phụ trách cụ thể.
