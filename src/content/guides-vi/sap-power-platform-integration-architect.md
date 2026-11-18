# Kiến trúc sư tích hợp SAP–Power Platform

**Một kiến trúc sư SAP + Microsoft ngay trong tác nhân Copilot Studio của bạn.** Hãy mô tả hạ tầng
hệ thống của bạn hoặc tải lên tài liệu yêu cầu để nhận đề xuất rõ ràng, có dẫn nguồn cho ba câu hỏi
xuất hiện trong hầu hết mọi cuộc trao đổi về SAP + Microsoft:

| Câu hỏi | Kết quả bạn nhận được |
| --- | --- |
| **Làm thế nào để kết nối SAP với Power Platform hoặc Copilot Studio?** | Mô hình kết nối nên dùng (trình kết nối SAP ERP hoặc OData, on-premises data gateway, Azure API Management, SAP BTP với Cloud Connector, SAP MCP Gateway, Logic Apps hoặc RPA), chuỗi đăng nhập một lần (single sign-on), các điều kiện tiên quyết theo từng nhóm, rủi ro và các bước tiếp theo. |
| **Tại sao cần Copilot Studio khi chúng tôi đã có SAP Joule? Hai nền tảng này có thể phối hợp với nhau không?** | Định vị trung lập cho Joule, Microsoft 365 Copilot và Copilot Studio đối với người dùng và quy trình của bạn, cùng cách kết hợp chúng (tích hợp có sẵn Joule ↔ Copilot, chuyển giao giữa các tác nhân, giao tiếp agent-to-agent). |
| **Nên mở rộng bên trong SAP hay bên ngoài SAP?** | So sánh Fiori, khả năng mở rộng cho người dùng chính (key-user extensibility), ABAP Cloud và SAP Build với Power Apps, Power Automate, Power Pages và Copilot Studio, được đánh giá theo định hướng clean-core của SAP. |

## Những gì bạn nhận được

1. **Câu trả lời ngay lập tức.** Không bắt đầu bằng bảng câu hỏi dài dòng: tác nhân sử dụng nội dung
   bạn đã viết và tải lên, lấp đầy các khoảng trống thông tin bằng những giả định hợp lý, đồng thời
   nêu rõ giả định nào có thể làm thay đổi đề xuất.
2. **Một báo cáo kiến trúc định dạng HTML**, được đính kèm trong phản hồi: bao gồm tóm tắt, bảng
   định vị, sơ đồ luồng dữ liệu và luồng danh tính, dữ kiện và giả định, các phương án thay thế,
   điều kiện tiên quyết theo từng vai trò, các bước triển khai, rủi ro, câu hỏi mở và nguồn tham
   khảo. Báo cáo mở được trên mọi trình duyệt và có thể chia sẻ nguyên trạng.
3. **Mẫu "Tinh chỉnh câu trả lời này" ("Refine this answer")** ở cuối mỗi phản hồi, đã được điền
   sẵn các giá trị mà tác nhân đã sử dụng. Bạn chỉ cần sao chép, sửa lại những điểm chưa đúng (ghi
   "chưa rõ" cũng hoàn toàn ổn) rồi gửi lại để nhận phần tóm tắt *Những điểm đã thay đổi*, đề xuất
   cập nhật và phiên bản mới của báo cáo.

## Trước khi bắt đầu

- **Một tác nhân Copilot Studio chạy trên GitHub Copilot harness.** Tính năng kỹ năng (Skills) khả
  dụng trên harness này.
- **Khả năng thực thi mã và tải tệp lên** được bật cho tác nhân (khả năng thực thi mã được tích hợp
  sẵn trên GitHub Copilot harness). Báo cáo được tạo bởi một script Python nhỏ chỉ sử dụng thư viện
  chuẩn: không cần cài đặt thêm gì.
- **Khuyến nghị: trang bị công cụ tìm kiếm web hoặc máy chủ MCP Microsoft Learn.** Với công cụ này,
  tác nhân sẽ kiểm tra các trang tài liệu trên Microsoft Learn và SAP Architecture Center vốn thay
  đổi thường xuyên nhất trước khi trả lời. Nếu không có, tác nhân sẽ sử dụng mốc nền (baseline)
  tích hợp sẵn và ghi rõ điều đó trong báo cáo.
- **Khuyến nghị: bật xác thực Microsoft Entra ID** cho tác nhân.

## Thiết lập

1. Tải xuống gói tệp (`.zip`) từ trang này.
2. Trong Copilot Studio, mở tác nhân của bạn → **Build** → **Skills** → **Add skill** → **Upload a skill**,
   và tải lên nguyên vẹn tệp `.zip` (không giải nén).
3. Tùy chọn: trong mục **Tools**, thêm công cụ tìm kiếm web hoặc máy chủ MCP Microsoft Learn.
4. Tùy chọn: thêm các dòng sau vào phần hướng dẫn (instructions) của tác nhân:

   ```text
   Bạn là cố vấn kiến trúc cho các tổ chức đang vận hành các công nghệ của SAP và Microsoft.
   Đối với các câu hỏi về SAP kết hợp với Power Platform, Copilot Studio, Microsoft 365 Copilot,
   SAP Joule, SAP BTP, Fiori hoặc khả năng mở rộng, hãy sử dụng kỹ năng sap-power-platform-integration-architect.
   Hãy nêu rõ các giả định thay vì hỏi lại trước. Trả lời bằng ngôn ngữ của người dùng.
   ```

5. Tùy chọn: thêm các câu lệnh gợi ý, ví dụ *"Nên dùng Joule hay Copilot Studio?"*,
   *"Làm thế nào để kết nối SAP với một tác nhân Copilot Studio?"*, *"Ứng dụng này nên dùng Fiori hay Power Apps?"*.
6. Kiểm thử trong khung xem trước với một trong các câu lệnh gợi ý bên dưới.

## Dùng thử

- *"Chúng tôi đang vận hành S/4HANA trên RISE tại Azure và muốn có một tác nhân Copilot Studio trong
  Teams để phê duyệt đơn đặt hàng theo quyền SAP của từng người dùng. Cách tốt nhất là gì?"*
- *"Chúng tôi đã có Joule. Tại sao lại cần thêm Copilot Studio, và hai công cụ này có thể hoạt động
  cùng nhau không?"*
- *"Nên dùng Fiori hay Power Apps cho ứng dụng nhập kho trên thiết bị di động dành cho nhân viên kho?"*
- *"Hệ thống ECC của chúng tôi chỉ có các Z-BAPI tùy chỉnh. Một canvas app cần tạo thông
  báo bảo trì."*
- Tải lên tệp `sap-landscape.docx` và hỏi: *"Hãy đề xuất kiến trúc tích hợp cho các trường hợp sử
  dụng này."*

## Ví dụ về câu trả lời

> **Khuyến nghị:** Trình kết nối SAP OData qua Azure API Management (độ tin cậy: trung bình)
> **Lý do:** SAP chạy trên RISE tại Azure, nên API Management kết nối tới được qua kết nối ngang hàng
> mạng ảo (virtual network peering) mà không cần proxy bổ sung · quy trình phê duyệt phải tuân thủ
> quyền hạn SAP của từng người dùng · đội ngũ của bạn đã quen vận hành Azure.
> **Luồng xử lý:** Tác nhân Copilot Studio trong Teams → trình kết nối SAP OData → Azure API Management → S/4HANA
> **Danh tính:** Người dùng Entra ID → API Management trao đổi token lấy SAML → người dùng định danh SAP (SAP named user)
> **Phương án thay thế:** SAP BTP với Cloud Connector, nếu BTP trở thành cổng API chính của bạn
> **Trước khi xây dựng:** kích hoạt dịch vụ OData đơn đặt hàng (SAP Basis) · thiết lập tin cậy SAML
> (SAP Basis) · đăng ký ứng dụng (quản trị viên Entra) · triển khai API Management trong mạng đã
> peering (quản trị viên Azure) · thiết lập chính sách ngăn ngừa mất dữ liệu (data loss prevention)
> cho trình kết nối SAP (quản trị viên Power Platform)
> **Giả định:** đã có các API OData được phát hành chính thức (giả định) — nếu chỉ có các BAPI,
> khuyến nghị sẽ chuyển sang trình kết nối SAP ERP qua on-premises data gateway.
> **Báo cáo:** đính kèm `po-approvals-in-teams-v1.html` · mốc nền 2026-10-21
>
> **Tinh chỉnh câu trả lời này** — các dòng được đánh dấu `(giả định)` là những suy đoán chính của
> tôi; hãy sửa lại bất kỳ dòng nào và gửi lại cho tôi:
>
> ```text
> Hệ thống SAP: S/4HANA trên RISE (đã cung cấp)                  [ECC | S/4HANA tại chỗ | RISE/đám mây riêng | S/4HANA Cloud công cộng]
> Giao diện khả dụng: API OData đã phát hành (giả định)          [BAPI/RFC chuẩn | Z-RFC tùy chỉnh | OData | SOAP | chỉ có SAP GUI | chưa rõ]
> Hạ tầng đã có sẵn: chưa có (giả định)                          [data gateway | Azure API Mgmt | BTP + Cloud Connector | Integration Suite | chưa có]
> Entra ID ↔ SAP Cloud Identity Services: chưa rõ (giả định)     [đã thiết lập tin cậy | chưa | đang lên kế hoạch | chưa rõ]
> Thông tin khác:
> ```

## Phạm vi nội dung

- **Chín mô hình kết nối:**
  - Trình kết nối SAP ERP qua on-premises data gateway
  - Trình kết nối SAP OData qua gateway
  - Trình kết nối SAP OData qua Azure API Management
  - SAP BTP với Cloud Connector
  - SAP MCP Gateway trên SAP Integration Suite
  - trình kết nối tùy chỉnh (custom connector) qua API Management
  - Azure Logic Apps (IDocs, sự kiện, lưu lượng lớn)
  - Power Automate desktop với SAP GUI (như giải pháp cầu nối)
  - các trình kết nối phân tích dữ liệu (analytics connectors)
- **Các chuỗi đăng nhập một lần (single sign-on):** Kerberos và chứng chỉ số cho trình kết nối SAP ERP,
  Entra ID → API Management → SAML, và liên kết định danh Entra ID với SAP Cloud Identity Services
  kèm truyền ngữ cảnh danh tính người dùng (principal propagation).
- **Các trợ lý AI:** tích hợp có sẵn Joule ↔ Microsoft Copilot, tác nhân Copilot Studio gọi vào SAP,
  ủy quyền cho tác nhân Joule (agent-to-agent), chuyển giao từ tác nhân Employee Self-Service của
  Microsoft, Joule Studio, và tác nhân Copilot Studio nhúng trong Fiori launchpad hoặc SAP Build Work Zone.
- **Nơi thực hiện mở rộng:** khả năng mở rộng cho người dùng chính (key-user extensibility), ABAP Cloud,
  SAP Build và SAP BTP, Power Platform, RPA, và định hướng clean-core của SAP (API được phát hành
  chính thức so với API truyền thống).
- **Các bộ tăng tốc triển khai (Accelerators)** khi phù hợp, chẳng hạn như mẫu SAP Procurement cho Power Platform.

## Giữ thông tin luôn cập nhật

Nội dung hướng dẫn được neo vào các nguồn tài liệu có ghi ngày của Microsoft Learn, SAP Help và
SAP Architecture Center (mốc nền **2026-10-21**). Các trang thường xuyên thay đổi — tùy chọn xác
thực, trạng thái Preview/GA, phạm vi tích hợp Joule, tính khả dụng của agent-to-agent — đều được
gắn cờ, và tác nhân sẽ kiểm tra lại các trang đó khi chạy nếu có công cụ tìm kiếm web hoặc máy chủ
MCP Microsoft Learn. Mọi báo cáo đều nêu rõ thông tin đã được kiểm tra trực tiếp hay sử dụng mốc nền.

## Những điều kỹ năng này không làm

- **Không tư vấn về cấp phép, giá cả hay pháp lý.** Các câu hỏi về chính sách API của SAP, truy cập
  gián tiếp (indirect access), hoặc so sánh giấy phép SAP và Microsoft sẽ được chuyển tới đội ngũ
  phụ trách tài khoản SAP và Microsoft của bạn.
- **Không kết nối tới hệ thống của bạn.** Kỹ năng không truy cập hay kiểm thử SAP, Azure hoặc
  Power Platform; mọi bước đều phải được quản trị viên SAP Basis, bảo mật và Power Platform của bạn
  xác thực.
- **Không tự bịa tên API.** Các dịch vụ SAP hoặc BAPI được gợi ý đều được gắn nhãn "cần xác minh
  trong SAP Business Accelerator Hub / với SAP Basis".
- **Không thiên vị nhà cung cấp.** Joule, SAP Build và Fiori đều được trình bày đúng thế mạnh của
  mình, và câu trả lời thường kết hợp cả các lựa chọn từ SAP lẫn Microsoft.

## Quyền riêng tư

- Không tải lên những tài liệu mà bạn không được phép chia sẻ với tác nhân.
- Nếu tài liệu được tải lên có chứa mật khẩu, khóa bảo mật hoặc chuỗi kết nối, tác nhân sẽ loại bỏ
  chúng khỏi câu trả lời cũng như báo cáo và thông báo cho bạn.
- Báo cáo là một tệp HTML độc lập duy nhất, không chứa script và không thực hiện lời gọi ra bên ngoài.

## Xử lý sự cố

| Hiện tượng | Cách kiểm tra |
| --- | --- |
| Tác nhân trả lời mà không dùng kỹ năng | Hãy nhắc rõ SAP trong câu hỏi ("SAP và Copilot Studio…"), hoặc thêm các dòng hướng dẫn từ mục **Thiết lập**, bước 4. |
| Không có báo cáo đính kèm | Đảm bảo tác nhân có thể chạy mã. Nếu không thể, tác nhân sẽ trả về báo cáo dưới dạng Markdown ngay trong khung trò chuyện. |
| Báo cáo ghi "baseline" (mốc nền) | Thêm công cụ tìm kiếm web hoặc máy chủ MCP Microsoft Learn để tác nhân có thể kiểm tra tài liệu trực tiếp. |
| Vẫn hiển thị báo cáo cũ sau khi có thay đổi | Mỗi lần chỉnh sửa sẽ tạo một tên tệp mới (`-v2.html`, `-v3.html`); hãy mở tệp mới nhất. |
| Câu trả lời quá chung chung | Hãy điền vào mẫu **Tinh chỉnh câu trả lời này**, hoặc tải lên tài liệu mô tả hệ thống hay tài liệu yêu cầu của bạn. |

## Cấu trúc bên trong

| Tệp | Mục đích |
| --- | --- |
| `SKILL.md` | Quy trình xử lý của tác nhân: phân loại câu hỏi, sử dụng dữ kiện và giả định, kiểm tra tài liệu, ra quyết định, trả lời, kết xuất báo cáo, tinh chỉnh. |
| `references/decision-guide.md` | Bảng dữ kiện, giao thức theo từng sản phẩm SAP, các mô hình kết nối, quy tắc quyết định, danh sách kiểm tra trước khi đưa vào vận hành, các vai trò. |
| `references/positioning-guide.md` | So sánh Joule, Microsoft 365 Copilot và Copilot Studio; mở rộng bên trong SAP so với Power Platform. |
| `references/refine-template.md` | Các mẫu "Tinh chỉnh câu trả lời này" và cách xử lý phản hồi. |
| `references/sources.md` | Các nguồn tài liệu có ghi ngày, kèm danh sách các nguồn cần kiểm tra lại khi chạy. |
| `references/report-spec.md` | Định dạng dữ liệu của báo cáo. |
| `scripts/render_report.py` | Kết xuất báo cáo HTML độc lập (chỉ sử dụng thư viện chuẩn Python). |

## Nguồn tham khảo chính

- [Copilot Studio với SAP](https://learn.microsoft.com/azure/sap/microsoft-ai/copilot-studio/copilot-with-sap-overview)
- [Giới thiệu về SAP với Microsoft AI](https://learn.microsoft.com/azure/sap/microsoft-ai/about-sap-with-microsoft-ai)
- [Tích hợp Joule và Microsoft Copilot](https://learn.microsoft.com/azure/sap/microsoft-ai/joule/joule-copilot-overview)
- [Các tùy chọn kết nối giữa Power Platform và SAP](https://learn.microsoft.com/power-platform/sap/connect/connect-power-platform-and-sap)
- [Quy trình kiến trúc SAP và Power Platform](https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/sap/sap-power-platform-architecture-workflow)
- [SAP Architecture Center](https://github.com/SAP/architecture-center)
