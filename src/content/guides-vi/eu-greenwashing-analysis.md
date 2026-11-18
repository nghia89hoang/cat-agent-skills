# Phân tích tẩy xanh tại EU

Một kỹ năng giúp rà soát mô tả sản phẩm, nội dung tiếp thị, nội dung bao bì và mục danh mục sản phẩm để phát hiện hành vi **tẩy xanh (greenwashing)** — các tuyên bố về môi trường gây hiểu nhầm hoặc thiếu căn cứ chứng minh — và tạo báo cáo phát hiện có cấu trúc phù hợp với các quy định hiện hành của EU:

- **Chỉ thị EU 2024/825** (sửa đổi Chỉ thị về Hành vi Thương mại Không lành mạnh 2005/29/EC — Unfair Commercial Practices Directive) — cấm các tuyên bố chung chung về môi trường không thể chứng minh được.
- **Chỉ thị Tuyên bố Xanh (Green Claims Directive)** (đề xuất COM/2023/166) — các yêu cầu về chứng minh căn cứ và truyền đạt thông tin đối với các tuyên bố môi trường tường minh.

## Kỹ năng này làm gì

Đối với bất kỳ văn bản nào được gửi vào, kỹ năng sẽ:

1. Trích xuất mọi tuyên bố liên quan đến môi trường / tính bền vững.
2. Đánh giá từng tuyên bố dựa trên bảy tiêu chí tẩy xanh (tính mơ hồ, phạm vi vòng đời sản phẩm, khả năng kiểm chứng, phép so sánh gây hiểu nhầm, sự phụ thuộc vào bù trừ phát thải, nhãn mác không có cơ sở, cách diễn đạt hướng tới tương lai).
3. Gán mức độ rủi ro cho từng tuyên bố (🔴 Cao (High) / 🟡 Trung bình (Medium) / 🟢 Thấp (Low)).
4. Xuất ra một khối phát hiện chuẩn hóa cho từng tuyên bố bị gắn cờ kèm trích dẫn nguyên văn, tham chiếu quy định, vấn đề gặp phải và phương án chỉnh sửa khuyến nghị.
5. Kết thúc bằng bảng tổng hợp số lượng, đánh giá tổng thể về trạng thái tuân thủ và hành động ưu tiên hàng đầu.

Nếu không tìm thấy tuyên bố môi trường nào, kỹ năng sẽ trả về `"No environmental claims detected — Out of Scope."` và dừng xử lý.

## Khi nào nên sử dụng

Kích hoạt kỹ năng này khi người dùng yêu cầu:

- Rà soát mô tả sản phẩm, mục danh mục hoặc trang đích (landing page) để phát hiện dấu hiệu tẩy xanh.
- Kiểm tra nội dung tiếp thị về mức độ tuân thủ quy định tuyên bố môi trường của EU.
- Kiểm toán ngôn từ về tính bền vững trước khi xuất bản.
- Viết lại một tuyên bố để tuân thủ Chỉ thị Tuyên bố Xanh (Green Claims Directive).

## Khi nào *không* nên sử dụng

- Các đợt rà soát tuân thủ không liên quan đến môi trường (khả năng tiếp cận, GDPR, tuyên bố y tế).
- Quy định môi trường riêng theo từng quốc gia ngoài EU (Hướng dẫn Xanh của FTC Hoa Kỳ — US FTC Green Guides, Bộ quy tắc Tuyên bố Xanh của CMA Vương quốc Anh — UK CMA Green Claims Code, v.v.). Kỹ năng này chỉ bao phủ phạm vi của EU.

## Định dạng đầu ra

Cho từng tuyên bố bị gắn cờ:

```
Product Claim: <quote>
Risk Level: 🔴 High / 🟡 Medium / 🟢 Low
Regulation Reference: <directive + article>
Issue: <what's wrong>
Recommended Correction: <compliant rewrite or action>
```

Kèm theo một bản tóm tắt cuối cùng gồm tổng số lượng theo từng mức rủi ro, trạng thái tuân thủ tổng thể và bước khắc phục khẩn cấp nhất duy nhất cần thực hiện.
