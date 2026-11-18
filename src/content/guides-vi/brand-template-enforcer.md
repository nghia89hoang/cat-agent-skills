# Trình thực thi mẫu thương hiệu

Trình thực thi mẫu thương hiệu là một skill của Microsoft Copilot Studio giúp đảm bảo
các bản trình bày PowerPoint và tài liệu Word mới được tạo từ các mẫu thương hiệu đã được phê duyệt
thay vì từ tệp trống.

Skill này hỗ trợ:

- Bản trình bày và mẫu PowerPoint: `.pptx`
- Tài liệu và mẫu Word: `.docx` và `.dotx`

> **Yêu cầu về định dạng PowerPoint:** Các tệp mẫu `.potx` không hoạt động với
> quy trình này. Hãy mở tệp `.potx` trong PowerPoint và sử dụng **Save As** (Lưu dưới dạng) để tạo
> tệp `.pptx` trước khi thêm vào SharePoint hoặc `assets/`. Chỉ đổi tên phần mở rộng là
> không đủ.

Gói này hỗ trợ các mẫu được cung cấp thông qua tri thức SharePoint của agent hoặc
được đóng gói trực tiếp trong thư mục `assets/` của skill. Tệp ZIP tải về không
bao gồm sẵn mẫu PowerPoint hay Word nào, vì vậy hãy thêm một mẫu theo một trong hai cách được hỗ trợ.

## Bắt đầu nhanh

Nếu bạn không cần hướng dẫn thương hiệu dạng văn bản cụ thể hoặc định tuyến đa mẫu,
bạn không cần chỉnh sửa các tệp của skill hay tệp manifest:

1. Tải xuống `brand-template-enforcer.zip`.
2. Nhập gói này trong Copilot Studio từ **Build > Add skill > Upload a skill**.

Cách tiếp cận được khuyến nghị là cung cấp mẫu PowerPoint hoặc Word đã phê duyệt
thông qua tri thức SharePoint của agent. Skill sẽ tự động phát hiện
mẫu tương thích và sử dụng mẫu đó khi tạo tệp. Các mục manifest mẫu ban đầu
bị vô hiệu hóa và các placeholder chưa được thay thế sẽ không cản trở quá trình
tự động phát hiện này.

Việc đóng gói trực tiếp mẫu vào thư mục `assets/` của skill cũng được hỗ trợ.
Hãy sử dụng tùy chọn này khi gói độc lập hoặc khả năng chạy ngoại tuyến quan trọng hơn
việc quản lý mẫu tập trung. Bạn phải giải nén tệp ZIP, thêm mẫu vào và
đóng gói lại trước khi nhập; toàn bộ tệp ZIP của skill phải nằm trong
giới hạn 20 MB hiện tại.

Nếu bạn muốn kiểm soát chi tiết hơn, hãy giải nén tệp ZIP và hoàn thiện các
placeholder phù hợp:

- Điền các placeholder hướng dẫn thương hiệu trong `SKILL.md` để chỉ định giọng văn, phông chữ,
  màu sắc, thuật ngữ, hình ảnh, bố cục, nội dung pháp lý và các quy tắc thương hiệu khác.
- Cấu hình `assets/template-manifest.json` để hỗ trợ nhiều mẫu,
  giá trị mặc định rõ ràng, mức độ ưu tiên, nguồn SharePoint chính xác và định tuyến
  có thể dự đoán theo từng loại tài liệu đầu ra.
- Đóng gói lại `SKILL.md`, `assets/` và `references/` ở thư mục gốc của tệp ZIP trước khi
  nhập skill đã tùy chỉnh.

## Thiết lập khuyến nghị

**Lưu trữ các mẫu dùng cho môi trường thực tế trong SharePoint và thêm vị trí của chúng làm
tri thức của agent.** Đây là cách tiếp cận được ưu tiên vì đội ngũ thương hiệu có thể cập nhật
mẫu trên SharePoint mà không cần đóng gói lại và tải lên lại tệp ZIP của skill.
Khi chạy, agent sẽ phân giải tệp SharePoint đã cấu hình
và sử dụng phiên bản mới nhất hiện có tại vị trí đó.

Bạn có thể đóng gói trực tiếp các mẫu trong `assets/` khi tính di động ngoại tuyến hoặc một
gói tự chứa quan trọng hơn. Tuy nhiên, các skill Copilot Studio trong
trải nghiệm mới hiện bị giới hạn ở mức **tổng cộng 20 MB**, bao gồm toàn bộ tệp Markdown,
JSON, tài liệu tham khảo và tệp nhị phân của mẫu.

## Tệp manifest là tùy chọn

**Skill hoạt động mà không cần chỉnh sửa `assets/template-manifest.json`.** Nếu
agent có một mẫu được nhận diện rõ ràng cho định dạng được yêu cầu trong
`assets/` hoặc trong nguồn tri thức SharePoint đã cấu hình, skill sẽ tự động phát hiện và sử dụng
mẫu đó. Các mục mẫu ban đầu bị vô hiệu hóa và các placeholder chưa được thay thế trong manifest
sẽ bị bỏ qua; chúng không chặn quá trình tự động phát hiện.

Hãy cấu hình tệp manifest khi nó mang lại lợi ích thiết thực:

| Tình huống | Lợi ích khi cấu hình manifest |
| --- | --- |
| Nhiều mẫu PowerPoint hoặc Word | Định tuyến bản tóm tắt điều hành, phân tích chuyên sâu, bộ slide tiếp thị, tuyên bố công việc (SOW), thư trang trọng và các tài liệu đầu ra khác đến các mẫu tương ứng |
| Có một mẫu dự phòng ưu tiên | Xác định rõ ràng mẫu mặc định cho PowerPoint hoặc Word |
| Mục đích sử dụng các mẫu bị chồng chéo | Dùng `priority` để quyết định mẫu phù hợp nào được chọn |
| Người dùng mô tả tài liệu đầu ra theo nhiều cách khác nhau | Dùng các cụm từ `useWhen` như `executive briefing`, `marketing deck` hoặc `formal letter` để lựa chọn một cách nhất quán |
| Tên tệp giống nhau hoặc mẫu nằm ở nhiều vị trí tri thức | Xác định chính xác URL SharePoint, tên tệp và nguồn tri thức |
| Mẫu PowerPoint nhiều hình ảnh hoặc chỉ có slide master | Lưu trữ `brandRules` tường minh và bật chế độ kiểm tra `master-layout-only` |

Đối với thiết lập đơn giản chỉ có một mẫu, phương án khuyến nghị là giữ nguyên skill
và thêm mẫu thông qua tri thức SharePoint của agent. Ngoài ra,
hãy đặt trực tiếp mẫu vào `assets/` và đóng gói lại skill. Đối với
thiết lập nhiều mẫu, hãy cấu hình và bật một mục manifest riêng cho từng mẫu.

## Thiết lập từng bước

### Bước 1: Giải nén skill

Giải nén `brand-template-enforcer.zip`. Xác nhận rằng thư mục đã giải nén
chứa:

```text
SKILL.md
assets/template-manifest.json
references/PPTX-GENERATION.md
references/TEMPLATE-SELECTION.md
```

Giữ `SKILL.md` ở thư mục gốc của skill.

### Bước 2: Tải các mẫu đã phê duyệt lên SharePoint

Đối với mỗi mẫu PowerPoint hoặc Word:

1. Tải tệp `.pptx`, `.docx` hoặc `.dotx` đã được phê duyệt lên một vị trí ổn định
   trên SharePoint.
2. Sao chép URL đầy đủ của tệp cụ thể đó.
3. Ghi lại chính xác tên tệp, bao gồm cả phần mở rộng.
4. Ưu tiên thay thế hoặc cập nhật phiên bản tệp tại cùng vị trí đã cấu hình khi
   đội ngũ thương hiệu phát hành bản cập nhật.

### Bước 3: Thêm mẫu làm tri thức của agent trên SharePoint

Trong Copilot Studio:

1. Mở agent.
2. Mở tab **Build**.
3. Thêm site, thư viện, thư mục hoặc tệp SharePoint làm tri thức (knowledge).
4. Ghi lại tên nguồn tri thức đúng chính xác như cách hiển thị trong agent.
5. Xác nhận rằng danh tính của agent có quyền truy xuất mẫu.

Chỉ thêm URL vào manifest thôi là chưa đủ; vị trí SharePoint đó
cũng phải được cấu hình làm nguồn tri thức.

### Bước 4: Tùy chọn cấu hình tệp manifest mẫu

Bỏ qua bước này đối với thiết lập đơn giản chỉ có một mẫu. Hãy thực hiện bước này khi bạn cần
định tuyến đa mẫu, giá trị mặc định, mức độ ưu tiên, ánh xạ nguồn chính xác hoặc
hướng dẫn cho mẫu dạng hình ảnh như đã mô tả ở trên.

Mở `assets/template-manifest.json` và thay thế:

| Placeholder | Thay thế bằng |
| --- | --- |
| `{{POWERPOINT_TEMPLATE_SHAREPOINT_URL}}` | URL SharePoint đầy đủ của tệp PowerPoint đã được phê duyệt |
| `{{POWERPOINT_TEMPLATE_FILE_NAME}}` | Tên tệp PowerPoint chính xác, bao gồm cả `.pptx` |
| `{{SHAREPOINT_KNOWLEDGE_SOURCE_NAME}}` | Tên nguồn tri thức SharePoint chính xác được cấu hình trên agent |

Tệp manifest mẫu ban đầu cũng chứa các mục đang bị vô hiệu hóa cho các loại tài liệu đầu ra phổ biến:

| Loại mẫu | Placeholder URL | Placeholder tên tệp |
| --- | --- | --- |
| PowerPoint tóm tắt điều hành (Executive-summary) | `{{EXECUTIVE_SUMMARY_PPT_SHAREPOINT_URL}}` | `{{EXECUTIVE_SUMMARY_PPT_FILE_NAME}}` |
| PowerPoint phân tích chuyên sâu (Deep-dive) | `{{DEEP_DIVE_PPT_SHAREPOINT_URL}}` | `{{DEEP_DIVE_PPT_FILE_NAME}}` |
| PowerPoint tiếp thị (Marketing) | `{{MARKETING_PPT_SHAREPOINT_URL}}` | `{{MARKETING_PPT_FILE_NAME}}` |
| Tài liệu Word tuyên bố công việc (Statement-of-work) | `{{SOW_DOCX_SHAREPOINT_URL}}` | `{{SOW_DOCX_FILE_NAME}}` |
| Tài liệu Word thư trang trọng (Formal-letter) | `{{FORMAL_LETTER_DOCX_SHAREPOINT_URL}}` | `{{FORMAL_LETTER_DOCX_FILE_NAME}}` |

Đối với mỗi mẫu bạn muốn quản lý qua manifest:

1. Thay thế các placeholder URL và tên tệp của mẫu đó.
2. Xác nhận trường `knowledgeSourceName` của mẫu.
3. Đối với mẫu nhiều hình ảnh hoặc chỉ dùng slide master, hãy điền đầy đủ `brandRules` và đặt
   `inspectionMode` thành `master-layout-only`.
4. Đổi `enabled` từ `false` sang `true`.
5. Cập nhật `useWhen` bằng các cụm từ mà người dùng thực tế sẽ nói.
6. Xóa các mục mẫu ban đầu không sử dụng nếu muốn.

Sau đó kiểm tra lại:

- `id`: Đặt cho mỗi mẫu một mã định danh duy nhất viết thường, phân cách bằng dấu gạch nối.
- `enabled`: Chỉ bật các mẫu đã được cấu hình đầy đủ.
- `defaults`: Đặt ID mẫu mặc định cho PowerPoint và Word.
- `format`: Dùng `powerpoint` hoặc `word`.
- `inspectionMode`: Dùng `auto` trong trường hợp thông thường hoặc `master-layout-only` khi OCR không
  hữu ích.
- `brandRules`: Khai báo nhận diện thương hiệu, phông chữ, màu sắc và hướng dẫn cho từng mẫu
  mà không thể trích xuất được từ các mẫu nhiều hình ảnh.
- `priority`: Giá trị cao hơn sẽ được ưu tiên khi có nhiều mẫu cùng khớp.
- `useWhen`: Thêm các cụm từ thực tế mô tả khi nào mẫu được áp dụng.
- `sources`: Liệt kê các nguồn SharePoint và nguồn cục bộ tùy chọn theo thứ tự ưu tiên.

Thêm một mục manifest riêng biệt cho mỗi mẫu bổ sung.

### Bước 5: Hoàn thiện hướng dẫn thương hiệu trong `SKILL.md`

Mở `SKILL.md` và tìm kiếm `{{`. Thay thế mọi placeholder phù hợp trong
phần **Brand adherence guidance** (Hướng dẫn tuân thủ thương hiệu).

#### Nhận diện thương hiệu

| Placeholder | Thông tin cần cung cấp |
| --- | --- |
| `{{BRAND_NAME}}` | Tên tổ chức hoặc thương hiệu |
| `{{BRAND_DESCRIPTION}}` | Mô tả ngắn về thương hiệu |
| `{{LOGO_USAGE_RULES}}` | Quy tắc vị trí, kích thước và các trường hợp loại trừ khi dùng logo đã phê duyệt |
| `{{TRADEMARK_TEXT}}` | Nội dung nhãn hiệu hoặc ghi nhận bản quyền bắt buộc |

#### Văn phong

| Placeholder | Thông tin cần cung cấp |
| --- | --- |
| `{{BRAND_VOICE_AND_TONE}}` | Giọng văn, sắc thái và cá tính thương hiệu đã được phê duyệt |
| `{{DEFAULT_AUDIENCE}}` | Đối tượng độc giả hoặc khán giả trình bày mặc định |
| `{{READING_LEVEL}}` | Mức độ đọc hiểu mục tiêu |
| `{{PREFERRED_TERMS}}` | Thuật ngữ bắt buộc về sản phẩm, dịch vụ và tổ chức |
| `{{PROHIBITED_TERMS}}` | Các từ hoặc cụm từ không được phép sử dụng |
| `{{CAPITALIZATION_RULES}}` | Quy tắc viết hoa cho tiêu đề, đầu mục và tên sản phẩm |
| `{{DATE_NUMBER_CURRENCY_RULES}}` | Quy ước về ngày tháng, số liệu, thời gian và tiền tệ |
| `{{REQUIRED_LEGAL_LANGUAGE}}` | Nội dung pháp lý, bảo mật hoặc tuân thủ bắt buộc |

#### Kiểu chữ

| Placeholder | Thông tin cần cung cấp |
| --- | --- |
| `{{POWERPOINT_TITLE_FONT}}` | Phông chữ tiêu đề PowerPoint đã phê duyệt |
| `{{POWERPOINT_BODY_FONT}}` | Phông chữ nội dung PowerPoint đã phê duyệt |
| `{{WORD_HEADING_FONT}}` | Phông chữ đề mục Word đã phê duyệt |
| `{{WORD_BODY_FONT}}` | Phông chữ nội dung Word đã phê duyệt |
| `{{FALLBACK_FONTS}}` | Các phông chữ dự phòng đã phê duyệt khi phông chính không khả dụng |
| `{{POWERPOINT_MIN_TITLE_SIZE_PT}}` | Cỡ chữ tiêu đề tối thiểu trong PowerPoint |
| `{{POWERPOINT_MIN_BODY_SIZE_PT}}` | Cỡ chữ nội dung tối thiểu trong PowerPoint |
| `{{WORD_BODY_SIZE_AND_SPACING}}` | Cỡ chữ nội dung, giãn dòng và giãn đoạn trong Word |

#### Màu sắc, bố cục và hình ảnh

| Placeholder | Thông tin cần cung cấp |
| --- | --- |
| `{{PRIMARY_COLOR_HEX}}` | Màu thương hiệu chính |
| `{{SECONDARY_COLOR_HEX}}` | Màu thương hiệu phụ |
| `{{ACCENT_COLOR_HEX}}` | Màu nhấn |
| `{{APPROVED_BACKGROUND_COLORS}}` | Bảng màu nền đã phê duyệt |
| `{{APPROVED_TEXT_COLORS}}` | Bảng màu chữ đã phê duyệt |
| `{{PROHIBITED_COLOR_COMBINATIONS}}` | Các cách kết hợp màu sắc không được phép sử dụng |
| `{{MINIMUM_CONTRAST_REQUIREMENT}}` | Yêu cầu độ tương phản cho khả năng tiếp cận (accessibility) |
| `{{IMAGERY_STYLE}}` | Phong cách nhiếp ảnh hoặc minh họa đã phê duyệt |
| `{{ICON_STYLE}}` | Phong cách biểu tượng (icon) đã phê duyệt |
| `{{CHART_STYLE}}` | Màu sắc, nhãn và định dạng biểu đồ đã phê duyệt |
| `{{CONTENT_DENSITY}}` | Lượng nội dung mong muốn trên mỗi trang hoặc slide |
| `{{MARGIN_AND_WHITESPACE_RULES}}` | Quy tắc bắt buộc về lề, khoảng cách và khoảng trắng |
| `{{FOOTER_RULES}}` | Quy tắc về chân trang, phân loại tài liệu, bảo mật và đánh số trang |

Xóa các dòng placeholder tùy chọn không áp dụng, hoặc thay thế chúng bằng
`Not specified; follow the selected template`. Không để lại các placeholder thô trong
skill dùng cho môi trường thực tế.

Các placeholder thương hiệu trong `SKILL.md` là phần hướng dẫn tường minh tùy chọn. Các placeholder
chưa được thay thế sẽ bị bỏ qua và không bao giờ được phép xuất hiện trong nội dung được tạo ra. Các placeholder
trong manifest chỉ cần được thay thế cho những mục mà bạn bật. Các placeholder nằm
trong các mục mẫu ban đầu đang bị vô hiệu hóa hoặc trong `references/` có thể giữ nguyên.

Không dựa vào khả năng suy luận từ mẫu đối với các bản trình bày chỉ gồm hình ảnh hoặc chỉ dùng slide master.
Nếu quá trình trích xuất văn bản không trả về nội dung hữu ích hoặc slide master sử dụng đồ họa mà
môi trường thực thi không thể kết xuất, hãy khai báo các phông chữ, màu sắc, bộ nhận diện và quy tắc
sử dụng đã biết trong `brandRules` của mục mẫu đó.

### Bước 6: Tùy chọn đóng gói mẫu cục bộ

Để sử dụng các mẫu cục bộ thay cho hoặc bổ sung thêm cho SharePoint:

1. Sao chép trực tiếp mẫu vào `assets/`.
2. Thêm một nguồn `asset` vào trước nguồn SharePoint:

```json
{
  "type": "asset",
  "path": "assets/organization-slide-master.pptx"
}
```

3. Giữ tổng dung lượng tệp ZIP từ 20 MB trở xuống.
4. Đóng gói lại và tải lên lại skill bất cứ khi nào mẫu cục bộ thay đổi.

### Bước 7: Đóng gói lại và tải lên

Trước khi đóng gói, hãy đảm bảo mọi mục manifest đã bật đều được cấu hình đầy đủ.
Các placeholder có thể vẫn còn trong `SKILL.md` và trong các mục mẫu ban đầu bị vô hiệu hóa; skill
sẽ bỏ qua chúng thay vì in ra hoặc để chúng cản trở quá trình phát hiện
mẫu.

Tạo một tệp ZIP chứa `SKILL.md`, `assets/` và `references/` ở thư mục gốc. Tải
tệp ZIP lên từ **Build > Add skill > Upload a skill** trong Copilot Studio.

### Bước 8: Kiểm thử trước khi đưa vào sử dụng chính thức

Kiểm thử tối thiểu các trường hợp sau:

1. Một yêu cầu PowerPoint sử dụng mẫu mặc định.
2. Một yêu cầu Word nếu đã cấu hình mẫu Word.
3. Một yêu cầu chọn một mẫu chuyên biệt.
4. Trường hợp mẫu bị thiếu hoặc không thể truy cập.
5. Một yêu cầu chỉ đọc không nên kích hoạt skill này.

Xác nhận rằng agent truy xuất đúng tệp nhị phân, sao chép tệp đó vào
`/app/workspace/`, gọi `analyzing-pptx` để kiểm tra PowerPoint, bảo toàn đúng
nhận diện thương hiệu và chỉ rõ nguồn mẫu đã được chọn.

## Các trường trong manifest

### `version`

Giữ trường này ở giá trị:

```json
"version": 1
```

### `defaults`

Chỉ định mẫu nào sẽ được sử dụng khi không có quy tắc `useWhen` nào khớp.

```json
"defaults": {
  "powerpoint": "executive-deck",
  "word": "standard-report"
}
```

Mỗi giá trị phải khớp với `id` của một mục trong `templates`.

Sử dụng `null` khi không có mẫu mặc định:

```json
"defaults": {
  "powerpoint": null,
  "word": null
}
```

### `id`

Mã định danh duy nhất cho mẫu.

```json
"id": "executive-deck"
```

Yêu cầu:

- Sử dụng chữ cái viết thường, chữ số và dấu gạch nối.
- Không dùng cùng một ID cho nhiều mẫu.
- ID không nhất thiết phải trùng với tên tệp, nhưng đặt tên khớp nhau sẽ dễ
  bảo trì hơn.

### `enabled`

Kiểm soát việc mẫu có tham gia vào quá trình lựa chọn hay không:

```json
"enabled": true
```

Giữ các mục mẫu ban đầu hoặc chưa hoàn chỉnh ở giá trị `false`. Chỉ bật một mục sau khi
các placeholder nguồn và quy tắc lựa chọn của nó đã được hoàn thiện.

### `format`

Xác định ứng dụng Office có thể sử dụng mẫu này.

PowerPoint:

```json
"format": "powerpoint"
```

Word:

```json
"format": "word"
```

Không sử dụng phần mở rộng tệp làm giá trị cho format.

### `sources`

Danh sách có thứ tự các vị trí mà từ đó có thể truy xuất tệp mẫu Office thực tế.

```json
"sources": [
  {
    "type": "asset",
    "path": "assets/executive-deck.pptx"
  },
  {
    "type": "sharepointKnowledge",
    "url": "{{EXECUTIVE_DECK_SHAREPOINT_URL}}",
    "fileName": "executive-deck.pptx",
    "knowledgeSourceName": "{{SHAREPOINT_KNOWLEDGE_SOURCE_NAME}}"
  }
]
```

Yêu cầu:

- Liệt kê các nguồn theo thứ tự ưu tiên phân giải.
- Đối với `asset`, tệp phải tồn tại tại đường dẫn tương đối đã chỉ định.
- Đối với `sharepointKnowledge`, hãy cung cấp URL đầy đủ và tên tệp chính xác.
- Cấu hình vị trí SharePoint làm tri thức (knowledge) trên agent Copilot Studio.
- Không bao giờ bật một mục khi nguồn của nó vẫn chứa giá trị `{{PLACEHOLDER}}`.
- Luôn sử dụng dấu gạch chéo xuôi `/` cho đường dẫn tài nguyên (asset).
- Không sử dụng đường dẫn tuyệt đối cục bộ như `C:\Templates\template.pptx`.

### `priority`

Kiểm soát mẫu nào được chọn khi có nhiều quy tắc `useWhen` cùng khớp.

```json
"priority": 100
```

Số càng lớn thì mức độ ưu tiên càng cao. Một quy ước thực tế là:

| Mức ưu tiên | Mục đích sử dụng khuyến nghị |
| --- | --- |
| `100` | Mẫu chuyên biệt cần được ưu tiên chọn khi khớp |
| `50` | Mẫu dùng chung |
| `10` | Mẫu dự phòng |

Nếu hai mẫu khớp nhau có cùng mức ưu tiên, agent sẽ yêu cầu người dùng
lựa chọn.

### `useWhen`

Liệt kê các tình huống bằng ngôn ngữ tự nhiên mà mẫu sẽ được chọn.

```json
"useWhen": [
  "executive presentation",
  "leadership review",
  "steering committee"
]
```

Hãy sử dụng các thuật ngữ mà người dùng có khả năng đưa vào yêu cầu. Mô tả loại
tài liệu đầu ra, đối tượng tiếp nhận hoặc kịch bản thay vì các từ chung chung như
`document` hoặc `presentation`.

Các quy tắc tốt:

- `executive steering committee presentation`
- `customer proposal`
- `internal project status report`
- `sales pitch deck`
- `formal business letter`

Tránh các quy tắc bị chồng chéo trừ khi mức độ ưu tiên xác định rõ mẫu nào
sẽ được chọn.

## Cách thức lựa chọn mẫu

Skill lựa chọn mẫu theo thứ tự sau:

1. Mẫu do người dùng yêu cầu trực tiếp.
2. Bỏ qua các mục có `enabled` là `false`.
3. Mẫu tương thích có mức ưu tiên cao nhất với quy tắc `useWhen` khớp.
4. Mẫu mặc định tương thích đã được bật và khai báo trong manifest.
5. Mẫu tương thích duy nhất được phát hiện trong `assets/` hoặc trong tri thức của agent.
6. Mẫu được phát hiện có tên tệp và siêu dữ liệu (metadata) khớp nhất với yêu cầu.
7. Để người dùng tự chọn khi vẫn còn nhiều mẫu phù hợp ngang nhau.

Sau khi chọn được mẫu, skill sẽ phân giải các `sources` của mẫu theo thứ tự:

1. Sử dụng `asset` cục bộ nếu tệp tồn tại.
2. Nếu không, truy xuất đúng tệp nhị phân từ `sharepointKnowledge`.
3. Dừng lại nếu không có nguồn nào cung cấp được tệp Office thực tế.

Nếu không có mẫu tương thích nào tồn tại, skill sẽ dừng lại thay vì âm thầm tạo
một tệp không mang thương hiệu. Người dùng có thể phê duyệt tường minh một ngoại lệ không gắn thương hiệu.
