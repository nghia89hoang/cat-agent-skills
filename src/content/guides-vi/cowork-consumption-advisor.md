# Trình tư vấn mức tiêu thụ Cowork & Work IQ

**Lệnh:** `/analyze-cowork-consumption` · **Nền tảng:** Cowork

Copilot Cowork và Work IQ API được tính phí theo Copilot Credits. Trung tâm quản trị Microsoft 365 hiển thị những gì đã tiêu thụ — nhưng tách rời theo từng tab, ở dạng ảnh chụp nhanh (snapshot), và không có sự liên kết giữa *ai dùng*, *chính sách nào*, *nhóm nào*, *bao nhiêu tác vụ* và *chi phí là bao nhiêu*. Kỹ năng này tiếp nhận năm tệp xuất dữ liệu liên quan đến Cowork / Work IQ mà quản trị viên đã có sẵn và biến chúng thành một báo cáo tương tác duy nhất mà lãnh đạo có thể đọc hiểu trong hai phút.

## Lý do
Copilot Cowork và Work IQ API được tính phí theo Copilot Credits thông qua hình thức thanh toán dựa trên mức sử dụng. Trung tâm quản trị Microsoft 365 hiển thị các con số nhưng chỉ dưới dạng ảnh chụp nhanh, tách biệt theo từng tab, thiếu bối cảnh tổ chức. Kỹ năng này đọc các tệp xuất mà quản trị viên đã có sẵn, làm giàu dữ liệu người dùng tiêu thụ với phòng ban, chức danh, quốc gia và người quản lý từ Microsoft Graph, rồi tạo ra một báo cáo duy nhất mà lãnh đạo có thể đọc trong hai phút. Các tệp xuất theo nhóm, chính sách và người dùng là những bảng tổng hợp độc lập (trung tâm quản trị không xuất mối liên kết thành viên giữa người dùng và chính sách), nên chúng được hiển thị song song thay vì ghép nối.

## Kết quả nhận được
- **Các chỉ số KPI chính** - số credit đã dùng, tỷ trọng trả trước so với trả theo mức dùng (pay-as-you-go), chi phí ước tính, số người dùng hoạt động, số credit trên mỗi người dùng hoạt động, số credit trên mỗi tác vụ Cowork, dự báo cuối tháng hoặc quy đổi cả năm
- **Phân tích theo dịch vụ** - Cowork, các ứng dụng Cowork, Work IQ API; biểu đồ vòng so sánh trả trước và trả theo mức dùng
- **Phân tích giới hạn chi tiêu** - từng chính sách kèm hạn mức, tỷ lệ sử dụng, phương thức thanh toán; gắn cờ các chính sách không giới hạn, sắp chạm ngưỡng và không hoạt động
- **Phòng ban và người quản lý** - mọi người dùng có phát sinh tiêu thụ được làm giàu dữ liệu từ **Microsoft Graph** (phòng ban, chức danh, quốc gia, quản lý trực tiếp) giúp ban lãnh đạo thấy được mức chi tiêu theo phòng ban và góc nhìn trách nhiệm theo từng quản lý - số credit, tỷ trọng, số người dùng, trung bình mỗi người dùng, số credit trên mỗi tác vụ, số trường hợp sắp chạm ngưỡng, người dùng cao nhất
- **Nhóm và người dùng** - mức độ tập trung (top 10 / top 20 %), các bậc giới hạn, danh sách theo dõi vượt ngưỡng và sắp chạm ngưỡng, người dùng không hoạt động và chưa có giấy phép, cùng các bảng có thể sắp xếp và lọc
- **Khuyến nghị dựa trên bằng chứng** - mỗi khuyến nghị đều kèm số liệu chứng minh và một hành động cụ thể
- **Ghi chú chất lượng dữ liệu** - sự sai lệch giữa các bản chụp nhanh, các nhóm chồng chéo nhau, người dùng vượt quá 100 % của một hạn mức vừa được thay đổi

Đầu ra: tệp `consumption-report.html` tự chứa hoàn toàn (không dùng CDN, có thể in, an toàn khi gửi qua email), tệp `consumption-summary.md` dành cho khung chat hoặc Teams, và tệp `consumption-analysis.json` chứa đầy đủ mọi số liệu.

## Dữ liệu đầu vào
Các tệp xuất từ **Trung tâm quản trị Microsoft 365 > Copilot** (định dạng CSV, đặt tên bất kỳ — tự động nhận diện theo cột):

1. Cowork > Usage > **Cowork usage details** (Chi tiết sử dụng Cowork)
2. Cost Management > **Configuration** > Export (**Policies**) (Cấu hình > Xuất chính sách)
3. Cost Management > Consumption > **Users** (Người dùng)
4. Cost Management > Consumption > **Groups** (Nhóm)
5. Cost Management > Consumption > **Agents and services** (Agent và dịch vụ)

Chỉ bắt buộc phải có tệp Users *hoặc* Agents and services; mỗi tệp xuất bổ sung sẽ mở khóa thêm một phần tương ứng. Dữ liệu phòng ban và người quản lý được chính kỹ năng này thu thập qua Microsoft Graph (`/users?$expand=manager`, chỉ đọc). Tệp xuất người dùng từ Entra hoặc một tệp CSV sơ đồ tổ chức đơn giản cũng có thể dùng làm phương án dự phòng. Các tệp xuất mẫu tổng hợp đi kèm trong `assets/sample-exports/` (năm tệp CSV cùng một tệp JSON người dùng Graph kèm thông tin người quản lý) để bạn xem trước báo cáo trước khi chạm vào tenant thực tế.

## Cách sử dụng
Thả các tệp xuất vào cuộc trò chuyện và nói **"Tạo báo cáo mức tiêu thụ từ các tệp này"** (hoặc `/analyze-cowork-consumption`). Tùy chọn: đơn vị tiền tệ và đơn giá theo hợp đồng (`--currency EUR --rate 0.0092`), `--anonymize` để chia sẻ rộng rãi (ẩn danh hóa mọi đầu ra bằng bút danh), `--period ytd` nếu bạn đã xuất dữ liệu với bộ lọc từ đầu năm đến nay (mặc định là kỳ thanh toán tháng hiện tại).

Khởi chạy nhanh bên ngoài Cowork:
```
python scripts/analyze_consumption.py --input <exports folder> --org <graph json folder> --out ./report
```

## Thông tin cần biết
- **Chỉ tạo báo cáo.** Kỹ năng không bao giờ thay đổi chính sách chi tiêu, hạn mức hay phương thức thanh toán.
- **Microsoft Graph ở chế độ chỉ đọc.** Việc làm giàu dữ liệu danh mục chỉ sử dụng các lệnh GET với quyền `User.Read.All`; những người dùng không tra cứu được sẽ được ghi nhận là không xác định (unknown), tuyệt đối không đoán.
- **Tính toán thực tế, không suy đoán.** Toàn bộ số liệu đều được tính từ script Python đi kèm (chỉ sử dụng thư viện chuẩn).
- **Hóa đơn là nguồn chuẩn cuối cùng.** Chi phí hiển thị là ước tính theo bảng giá niêm yết; gói đăng ký Azure trong phương thức thanh toán mới là nơi ghi nhận hóa đơn thực tế.
- **Chú trọng quyền riêng tư.** Tham số `--anonymize` thay thế tên và UPN bằng bút danh có khóa bí mật (khóa ngẫu nhiên theo từng lần chạy nên không thể dịch ngược từ danh sách thư mục) và che đường dẫn đầu vào ở mọi đầu ra; các danh sách theo dõi phục vụ kiểm soát chi tiêu, không phải bảng xếp hạng hiệu suất.

Bổ trợ cho kỹ năng *Copilot Adoption Dashboard* (mức độ sử dụng giấy phép từ các báo cáo sử dụng MAC) và các mẫu Power BI *Consumption Central* / *Chargeback* của nhóm Copilot ROI trên Analytics Hub — dùng chung các tệp xuất nhưng không cần Power BI.
