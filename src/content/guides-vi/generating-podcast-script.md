# Trình tạo kịch bản Podcast

Biến một chủ đề — hoặc một loạt tài liệu nguồn như bản tin email, bản tổng hợp tin tức, hay
một tập hợp bài viết — thành một tập podcast hai người dẫn nghe tự nhiên như
hai người thực sự đang trò chuyện. Bạn sẽ nhận được bản chép lời dễ đọc, tài liệu SSML nhiều giọng đọc,
và tùy chọn tệp âm thanh `.wav` được đọc thành tiếng.

## Những gì bạn nhận được

- **Hai người dẫn xuyên suốt với cá tính riêng biệt.** *Nova* là người dẫn chính ấm áp, nhanh nhạy,
  luôn đặt ra đúng câu hỏi mà bạn đang nghĩ. *Miles* là nhà phân tích điềm tĩnh, chính xác,
  chuyên đưa ra các con số và điểm cần lưu ý. Họ trò chuyện với nhau chứ không
  nói vào micro — không có giọng người dẫn chuyện, không có câu mở đầu kiểu "chào mừng đến với podcast".
- **Khả năng biên tập thực sự trên tài liệu nguồn.** Đưa vào một bản tổng hợp tin tức và skill sẽ
  tách riêng từng mục, gộp các nội dung trùng lặp, loại bỏ phần chân trang và
  mẫu văn bản hủy đăng ký, xếp hạng phần còn lại theo mức độ đáng đưa tin, dành phần trình bày đầy đủ
  cho 4–6 mục hàng đầu, và gộp phần còn lại vào lượt điểm tin nhanh.
- **Đối thoại trò chuyện tự nhiên, không phải văn xuôi đọc thành tiếng.** Câu thoại ngắn gọn, dùng lối nói rút gọn tự nhiên,
  phản ứng chân thật, một phép ẩn dụ cụ thể cho mỗi ý tưởng phức tạp, và một câu hỏi làm rõ ngây thơ
  bất cứ khi nào cần giải thích thêm.
- **Đầu ra sẵn sàng cho TTS.** Số liệu và từ viết tắt được diễn giải thành chữ theo đúng cách
  bộ tổng hợp giọng nói cần, và SSML sử dụng một thẻ `<voice>` cho mỗi lượt thoại kèm ngữ điệu (prosody)
  theo từng dòng để giọng đọc không bao giờ bị đều đều, đơn điệu.

## Trước khi bắt đầu

- **Copilot Studio** — skill này hướng tới container Python/Linux của Copilot Studio
  và ghi tệp vào `/app/created/`.
- **Trình kết nối Azure Text-to-Speech** — bước tạo âm thanh gọi công cụ
  `ConverttexttospeechwithSSML`. Hãy thêm công cụ này vào agent của bạn (Actions → Add an
  action → Azure Text to Speech) trước khi yêu cầu tạo âm thanh. Nếu không có trình kết nối này, bạn vẫn
  nhận được bản chép lời và tệp SSML; chỉ bước đọc thành tiếng là được bỏ qua.
- **SSML nhiều giọng đọc** — dàn giọng đọc mặc định sử dụng `en-US-AvaMultilingualNeural` và
  `en-US-AndrewMultilingualNeural`. Tài nguyên Speech của bạn cần có quyền truy cập vào các
  giọng neural đó.

## Cách sử dụng

Dán nội dung hoặc trỏ tới tài liệu của bạn và yêu cầu:

> Đây là bản tin AI tuần này. Hãy chuyển thành một tập podcast dài sáu phút và gửi cho tôi tệp
> âm thanh.

> Chuyển năm bài viết này thành một tập của Nova và Miles, phiên bản ngắn.

Hoặc bỏ qua hoàn toàn tài liệu nguồn và chỉ cần đưa ra một chủ đề:

> Làm một tập dài mười hai phút về lịch sử tàu ngầm.

Agent sẽ phân tích và xếp hạng tài liệu, ghi bản chép lời vào
`/app/created/<slug>_Podcast_Script.txt` và SSML vào
`/app/created/<slug>_Podcast.ssml`, hiển thị cho bạn phần tóm tắt từng phân đoạn, sau đó
đề nghị đọc thành tiếng để xuất ra `/app/created/<slug>_Podcast.wav`.

## Thông tin hữu ích

- **Độ dài là mục tiêu thực tế, không chỉ là gợi ý.** Mọi nội dung được tính toán ở mức khoảng 150
  từ nói mỗi phút và agent đặt mục tiêu nằm trong biên độ 10%. Sáu
  phút tương đương khoảng 900 từ hội thoại.
- **Skill sẽ không tự bịa đặt quan điểm.** Phản ứng trước các sự kiện thực tế là hoàn toàn hợp lệ ("con số đó
  thật đáng kinh ngạc"); còn các nhận định bịa đặt về con người, công ty hoặc chính trị thì không. Những tuyên bố
  chưa được kiểm chứng sẽ được nêu rõ trực tiếp trên sóng.
- **Hai tệp, hai đối tượng sử dụng.** Tệp bản chép lời `.txt` có nhãn `NOVA:` / `MILES:`
  để bạn dễ theo dõi khi đọc. Tệp `.ssml` là tệp tạo phẩm dành cho máy — không chứa gì khác
  ngoài tài liệu SSML, sẵn sàng chuyển thẳng tới trình kết nối TTS.
- **Các tập dài và giới hạn 40 nghìn ký tự.** Tệp SSML được giữ dưới ngưỡng 40.000
  ký tự. Nếu một tập quá dài cho một lần tổng hợp giọng nói, agent sẽ tách
  tại ranh giới phân đoạn rồi ghép các đoạn âm thanh lại với nhau.
- **Tùy chỉnh dàn người dẫn.** Yêu cầu các giọng đọc khác, tên gọi khác, hoặc một
  người dẫn duy nhất và skill sẽ tự điều chỉnh — cặp Nova/Miles chỉ là thiết lập mặc định.
- **Tài liệu không phải tiếng Anh.** Tên riêng và cụm từ nước ngoài nằm trong một câu thoại tiếng Anh sẽ
  được bọc trong thẻ `<lang>` để phát âm chính xác. Đối với một tập podcast hoàn toàn
  không phải tiếng Anh, hãy nêu rõ yêu cầu đó và chỉ định các giọng neural phù hợp.
