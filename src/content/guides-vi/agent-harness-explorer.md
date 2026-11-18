# Agent Harness Explorer

Một **Agent Skill** có thể tái sử dụng cho thư viện CAT Agent Skills, giúp người tạo agent **khám phá, nắm bắt, lập tài liệu và theo dõi** các năng lực của một agent harness: môi trường thực thi (runtime), công cụ, kỹ năng, máy chủ MCP và các thư viện Python.

Kỹ năng này trả lời các câu hỏi như:

- Harness này có thể làm gì?
- Những thư viện Python nào đã được cài đặt, và tôi nên dùng thư viện nào cho một tác vụ cụ thể?
- Những công cụ và máy chủ MCP nào đang khả dụng?
- Có gì thay đổi kể từ snapshot / mốc cơ sở (baseline) gần nhất của tôi?

Kỹ năng này **ưu tiên quan sát trực tiếp tại thời điểm chạy hơn là suy đoán**, đồng thời phân biệt rõ ràng giữa những gì đã *quan sát được* với những gì nền tảng được *cho là* hỗ trợ.

---

## Cách sử dụng kỹ năng

Đây là một Agent Skill: agent sẽ nạp `SKILL.md` và làm theo quy trình công việc trong đó, chạy các script Python đi kèm để quan sát môi trường thực thi. Thông thường bạn kích hoạt kỹ năng bằng các yêu cầu ngôn ngữ tự nhiên. Bên dưới, kỹ năng chạy các script Python chỉ dùng thư viện chuẩn (nếu có PyYAML thì sẽ sử dụng, còn không thì bộ phân tích dự phòng tích hợp sẵn sẽ đọc danh mục), nên **không cần bước cài đặt nào**.

### Từng bước trong Copilot Studio - Tạo báo cáo harness

1. **Tạo một agent** trong trải nghiệm Copilot Studio mới, hoặc mở một agent sử dụng bộ điều phối nâng cao (enhanced-orchestrator) hiện có.
2. **Thêm kỹ năng này** - trong thẻ Build, nhấp vào nút "Skills +" và tải lên tệp zip chứa thư mục kỹ năng `agent-harness-explorer` cùng các tệp md và script bên trong.
3. **Kích hoạt báo cáo trong khung chat** — trong thẻ Preview, yêu cầu đánh giá và xuất báo cáo bằng cách nhập câu lệnh như *"Kiểm tra harness"* hoặc *"Harness này có thể làm gì?"*.

### Trao đổi với agent

Sau khi thêm thư mục kỹ năng `agent-harness-explorer` vào một agent, bạn có thể hỏi những câu như:

| Bạn nói | Kỹ năng thực hiện |
| --- | --- |
| "Harness này có thể làm gì?" / "Kiểm tra harness." | Chạy các phép thăm dò thụ động và tóm tắt môi trường thực thi + các năng lực. |
| "Những thư viện Python nào đã được cài đặt?" | Chụp một snapshot và hiển thị danh mục thư viện được phân nhóm theo danh mục. |
| "Tôi nên dùng gì để tạo tài liệu Word?" | Tra cứu danh mục tuyển chọn, xác nhận gói đã được cài đặt và dẫn liên kết tài liệu của gói đó. |
| "Chụp một snapshot." / "Ghi nhớ trạng thái này." | Chụp snapshot năng lực của harness, so sánh với snapshot gần nhất và lưu một bản gọn nhẹ vào bộ nhớ. |
| "Lưu bản này làm mốc cơ sở." | Chỉ định snapshot năng lực hiện tại làm mốc cơ sở (baseline). |
| "So sánh với mốc cơ sở." / "Có gì thay đổi kể từ tuần trước?" | Hiển thị những năng lực harness nào đã được thêm, gỡ bỏ hoặc thay đổi kể từ một mốc cơ sở (đối chiếu theo ID năng lực ổn định). |
| "Xuất snapshot mới nhất." | Xuất định dạng JSON + Markdown để lưu trữ lâu dài hoặc chia sẻ snapshot năng lực mới nhất. |

### Tổng quan về an toàn

- **Các phép thăm dò thụ động chạy theo mặc định** (phiên bản, các gói đã cài đặt, siêu dữ liệu hệ điều hành/thư mục tạm).
- **Các phép thăm dò chủ động an toàn cần bật tường minh** (`--active-safe`): tạo rồi xóa một tệp tạm, chạy một lệnh vô hại và gửi một yêu cầu HTTPS duy nhất tới `pypi.org`.
- **Các hành động chủ động nhạy cảm không bao giờ chạy** trừ khi bạn chỉ thị rõ ràng (cài đặt gói, chạy shell/mạng tùy ý, đọc các tệp không liên quan).
- Bí mật và toàn bộ giá trị biến môi trường không bao giờ được ghi lại. Xem [`references/safety-boundaries.md`](references/safety-boundaries.md).

---

## Chạy trực tiếp các script

Bạn cũng có thể tự chạy quy trình từ thư mục `scripts/`. Yêu cầu Python 3.8+ (được phát triển trên 3.13); không cần thư viện bên thứ ba.

```bash
cd scripts

# 1. Capture a snapshot (passive by default)
python capture_snapshot.py \
  --catalog ../references/python-library-catalog.yaml \
  --out snapshot.json

# Optional: include opt-in active-safe probes and agent-observed tools/MCP
python capture_snapshot.py --active-safe --tools observations.json --out snapshot.json

# 2. Render the report (HTML is the default output)
python generate_html_report.py snapshot.json --out report.html

# Optional: Markdown outputs, only when you specifically want Markdown
python generate_markdown_report.py snapshot.json --out report.md
python generate_library_inventory.py snapshot.json --out inventory.md

# 3. Compare two snapshots (JSON or Markdown)
python compare_snapshots.py old_snapshot.json snapshot.json --markdown --out diff.md

# 4. Archive a timestamped capture (json + md + html + index.md)
python archive_snapshot.py --out-dir ./snapshot-archive
#    reuse an existing snapshot, or limit formats:
python archive_snapshot.py --snapshot snapshot.json --out-dir ./snapshot-archive
python archive_snapshot.py --out-dir ./snapshot-archive --formats json,md

# Inspect the fingerprint / canonical form of any snapshot
python canonicalize_snapshot.py snapshot.json
```

Các phép thăm dò riêng lẻ cũng có thể chạy độc lập:

```bash
python inspect_python.py               # runtime + installed packages
python inspect_runtime.py --active-safe # OS/filesystem/subprocess/network
python inspect_tools.py --input observations.json  # tools/skills/MCP
```

### Tệp quan sát công cụ / MCP

Một tiến trình Python thông thường không thể nhìn thấy các công cụ, kỹ năng hay máy chủ MCP của agent — chỉ bản thân agent mới thấy được. Để đưa chúng vào báo cáo, agent sẽ ghi một tệp `observations.json` và truyền vào qua tham số `--tools`:

```json
{
  "tools": ["view", "edit", "grep"],
  "skills": ["pdf", "xlsx"],
  "mcpServers": ["github-mcp-server", "playwright"],
  "mcpTools": [{ "server": "playwright", "tool": "browser_click" }]
}
```

Nếu không có tệp này, khả năng quan sát công cụ được ghi nhận là `not-visible` (không bao giờ ghi là `unsupported`), và phép so sánh sẽ coi mọi thành phần vắng mặt từ phép thăm dò bị bỏ qua là `unverified`.

---

## Thành phần của một snapshot

Một bản ghi chuẩn hóa, có thể đọc bằng máy về những gì quan sát được trên harness:

- Siêu dữ liệu snapshot (id, dấu thời gian, phiên bản skill/probe/catalog)
- Siêu dữ liệu môi trường thực thi Python
- Danh mục thư viện Python đã được làm giàu thông tin (tên, phiên bản, danh mục, mô tả, tài liệu)
- Các năng lực khác (hệ thống tệp, mạng, tiến trình con, công cụ, kỹ năng, MCP)
- Siêu dữ liệu phép thăm dò, cảnh báo, số lượng tổng hợp
- Một **dấu vân tay (fingerprint)** `sha256:` tính trên tập năng lực sau khi đã loại bỏ các trường biến động — dấu vân tay giống hệt nhau nghĩa là không có thay đổi nào quan sát được.

Lược đồ (Schema): [`assets/snapshot.schema.json`](assets/snapshot.schema.json).
Ví dụ hoàn chỉnh: [`assets/snapshot-example.json`](assets/snapshot-example.json).

---

## Cấu trúc thư mục

```
agent-harness-explorer/
├── SKILL.md            # hướng dẫn kích hoạt + quy trình của agent
├── metadata.json       # tệp siêu dữ liệu bổ trợ cho danh mục gallery
├── README.md           # tệp này
├── references/         # tài liệu agent đọc khi cần
│   ├── python-library-catalog.yaml   # danh mục tuyển chọn, độc lập phiên bản
│   ├── probe-catalog.md              # các phép thăm dò + quy ước capability-ID
│   ├── comparison-rules.md           # cách phân loại các điểm khác biệt
│   ├── safety-boundaries.md          # thụ động / chủ động-an-toàn / nhạy cảm
│   ├── memory-snapshot-protocol.md   # lưu trữ ưu tiên bộ nhớ
│   └── snapshot-history/             # các bản ghi mẫu có dấu thời gian + chỉ mục
├── scripts/            # Python chỉ dùng thư viện chuẩn
│   ├── inspect_python.py
│   ├── inspect_runtime.py
│   ├── inspect_tools.py
│   ├── capture_snapshot.py
│   ├── canonicalize_snapshot.py
│   ├── compare_snapshots.py
│   ├── generate_markdown_report.py
│   ├── generate_library_inventory.py
│   ├── generate_html_report.py
│   └── archive_snapshot.py
└── assets/
    ├── snapshot.schema.json
    ├── comparison.schema.json
    ├── snapshot-example.json
    └── report-template.md
```

---

## Snapshot và bộ nhớ

Bộ nhớ của agent là kho lưu trữ snapshot **mặc định, gắn với từng người dùng** — không cần thiết lập nhưng có thể không bền vững hoặc không chia sẻ được, vì vậy khuyến khích xuất ra JSON + Markdown cho bất kỳ dữ liệu nào bạn muốn giữ lại hoặc chia sẻ. Thời gian lưu giữ, cách xử lý mốc cơ sở và cấu trúc bản ghi gọn nhẹ được mô tả trong [`references/memory-snapshot-protocol.md`](references/memory-snapshot-protocol.md). Các kho lưu trữ bên ngoài tùy chọn (SharePoint, Dataverse, GitHub, Blob) chỉ được đề xuất khi thấy có công cụ lưu trữ tương thích, và không bao giờ là bắt buộc.

---

## Mở rộng kỹ năng

- **Thêm một thư viện Python** vào `references/python-library-catalog.yaml` (name, import_name, category, description, documentation_url, tags), đồng thời giữ các mục được sắp xếp theo tên.
- **Thêm một phép thăm dò** bằng cách tạo tệp `scripts/inspect_<thing>.py` cung cấp hàm `run(...) -> envelope`, kết nối nó vào `capture_snapshot.py`, và (nếu phép thăm dò bổ sung không gian tên capability-ID mới) ánh xạ không gian tên đó trong `compare_snapshots.py`. Xem [`references/probe-catalog.md`](references/probe-catalog.md).

Mọi đóng góp cho thư viện đều tuân theo tệp `CONTRIBUTING.md` của kho lưu trữ: chỉnh sửa các tệp trong thư mục `submissions/<slug>/` này rồi mở một PR — CI sẽ kiểm tra tính hợp lệ của siêu dữ liệu và tạo trang xuất bản cùng gói tải xuống.
