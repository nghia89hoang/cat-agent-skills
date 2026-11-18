# Trình lưu trữ Tri thức Tổ chức

Khi một lãnh đạo gắn bó lâu năm rời đi, tổ chức hiếm khi mất đi phần *cái gì* — bảng theo dõi dự án
và tài liệu vẫn còn đó. Thứ bị mất đi là phần ***tại sao***: cơ sở lý luận đằng sau quyết định,
các phương án từng bị bác bỏ, lịch sử làm việc với các bên liên quan, và những quy tắc bất thành văn
chỉ tồn tại trong đầu người đó.

Skill này chuyển đổi các **tín hiệu Microsoft 365** của một lãnh đạo cấp cao sắp rời vị trí — email,
tin nhắn Teams, cuộc họp và các đóng góp trên SharePoint/OneDrive — thành một
**kho lưu trữ tri thức tổ chức** có cấu trúc, liên kết chéo nhau để người kế nhiệm (hoặc một
trợ lý AI) có thể đọc ngay từ ngày đầu tiên và dựa vào đó làm căn cứ trong nhiều năm sau.

Skill vận hành như một **sprint nhiều phiên có hướng dẫn** thay vì đổ toàn bộ dữ liệu trong một lần duy nhất. Bạn
biên tập chọn lọc và trả lời các câu hỏi làm rõ; agent sẽ đảm nhận toàn bộ phần viết.

## Trước khi bắt đầu

- **Một tài khoản Microsoft 365 đã kết nối** của vị lãnh đạo đó (hoặc người được ủy quyền làm việc
  thay mặt). Skill đọc thư, trò chuyện Teams, lịch/cuộc họp và
  các tệp gần đây thông qua các công cụ `m365_*` của agent.
- **Thời gian**: dự trù một sprint khoảng ~1 tuần gồm **5–6 phiên, mỗi phiên 60–90 phút**.
  Phiên 1 thực hiện khám phá tổng quan; các phiên sau đi sâu trích xuất rồi tổng hợp hoàn chỉnh.
- Tùy chọn: cài đặt thêm một skill xử lý tài liệu nếu bạn muốn xuất kho lưu trữ cuối cùng
  sang `.docx`/`.pdf`.

Không có dữ liệu nào rời khỏi ranh giới tin cậy của M365 — kho lưu trữ được ghi ngay vào thư mục
`Documents/` của chính người dùng. Các nội dung về nhân sự (HR), lương thưởng, đánh giá hiệu suất và sức khỏe
tự động nằm ngoài phạm vi xử lý.

## Cách sử dụng

Kích hoạt skill bằng ngôn ngữ thông thường, ví dụ:

- *"Giúp tôi xây dựng kho lưu trữ tri thức tổ chức cho Phó chủ tịch sắp nghỉ việc của chúng tôi."*
- *"Lưu lại lịch sử các quyết định của Doug trước khi ông ấy nghỉ hưu vào tháng tới."*
- *"Khởi chạy skill institutional-knowledge."*

Sau đó, skill sẽ dẫn dắt bạn qua **năm giai đoạn có chốt kiểm soát**, luôn xác nhận với bạn
trước khi chuyển sang giai đoạn tiếp theo:

1. **Khám phá tổng quan** — bảng kiểm kê đầy đủ các dự án, sáng kiến,
   diễn đàn định kỳ và luồng công việc của lãnh đạo trong suốt nhiệm kỳ. Bạn sẽ xác thực mức độ
   quan trọng được đánh giá.
2. **Trích xuất chuyên sâu** — đối với từng dự án có mức độ quan trọng cao: *khảo cổ quyết định*
   (quyết định nào đã được đưa ra, khi nào, bởi ai, tại sao, phương án nào đã bị bác bỏ, khả năng đảo ngược ra sao),
   ánh xạ vấn đề→giải pháp→bài học kinh nghiệm, các mối quan hệ then chốt và hướng dẫn cho người kế nhiệm.
3. **Các chủ đề xuyên suốt** — nguyên tắc lãnh đạo, hướng dẫn điều hướng nội bộ tổ chức,
   chuyên môn nghiệp vụ và bối cảnh lịch sử được tổng hợp xuyên suốt các dự án.
4. **Bảng câu hỏi lấp khoảng trống** — những câu hỏi chỉ chính vị lãnh đạo đó mới trả lời được, được tạo ra
   từ mọi thứ mà các tín hiệu dữ liệu *không thể* cho thấy. Lãnh đạo sẽ điền phần này
   ngoại tuyến.
5. **Tổng hợp cuối cùng** — một tài liệu lưu trữ duy nhất đã được lãnh đạo phê duyệt.

Skill có tính chất **tiếp tục lại được và lũy đẳng (idempotent)**: mỗi phiên đều đọc tệp `manifest.md` và tiếp tục
ngay tại điểm phiên trước dừng lại, còn việc nạp lại cùng một nguồn dữ liệu sẽ hợp nhất thay
vì tạo bản trùng lặp.

## Điều cần biết

- **Bước mang lại giá trị cao nhất là vòng lặp câu hỏi làm rõ.** Sau mỗi lượt đi sâu vào một
  dự án, agent sẽ hỏi bạn 2–3 câu hỏi trọng tâm ("bạn và X đã trao đổi 40
  email về Y nhưng chưa bao giờ ghi lại quyết định — cuối cùng các bạn chốt phương án nào và
  vì sao?"). Đây chính là lúc tri thức ngầm (tacit knowledge) được nắm bắt — đừng bỏ qua bước này.
- **Ưu tiên độ phủ rộng trước khi trau chuốt.** Các lượt đầu thiên về thu thập tín hiệu thô; nếu
  bạn hết thời gian, một bản lưu trữ thô nhưng bao phủ rộng vẫn tốt hơn một bản lưu trữ trau chuốt dở dang mà phạm vi hẹp.
- **Trách nhiệm bảo mật riêng tư thuộc về bạn tại thời điểm chia sẻ.** Theo thiết kế, kho lưu trữ bao gồm tín hiệu từ các cuộc trò chuyện 1:1 và email
  riêng tư (vì đây là dữ liệu của chính vị lãnh đạo). Agent gắn cờ các phần nhạy cảm
  bằng `[Review Required]` / `[Confidential]`, nhưng lãnh đạo vẫn nên
  rà soát từng dòng các tệp `relationships.md`, `historical-context.md` và các mục "Hướng dẫn cho người
  kế nhiệm" trước khi chia sẻ cho bất kỳ ai.
- **Tên công cụ có thể khác nhau tùy môi trường lưu trữ.** Tài liệu hướng dẫn tham chiếu các tên công cụ
  `m365_*`; nếu môi trường Cowork/Scout của bạn cung cấp M365 dưới các tên gọi khác,
  quy trình làm việc vẫn giống hệt nhau — bạn chỉ cần ánh xạ lại tên công cụ.

## Kết quả bạn nhận được

```
institutional-knowledge/
├── phase-1-inventory.md   ← danh mục dự án & sáng kiến
├── projects/<slug>.md     ← một bản trích xuất chuyên sâu giàu thông tin quyết định cho mỗi dự án
├── decisions.md           ← khảo cổ quyết định xuyên suốt các dự án
├── relationships.md       ← danh sách các bên liên quan + cách làm việc với từng người
├── themes.md              ← nguyên tắc lãnh đạo & phong cách điều hành
├── domain-knowledge.md    ← tri thức kỹ thuật/ngành/quy định pháp lý
├── org-navigation.md      ← "cách thúc đẩy công việc tại đây"
├── historical-context.md  ← câu chuyện khởi nguồn, thất bại trong quá khứ, quy tắc bất thành văn
├── gap-questionnaire.md   ← những điều chỉ vị lãnh đạo đó mới trả lời được
├── final-archive.md       ← tài liệu tổng hợp cuối cùng đã được phê duyệt
└── raw/                   ← các bản trích xuất trung thực theo từng nguồn (nhật ký kiểm chứng)
```
