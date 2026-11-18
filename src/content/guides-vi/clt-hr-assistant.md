# Trợ lý CLT cho bộ phận Nhân sự

Skill dành cho Copilot Studio / Cowork / Scout giúp biến agent thành trợ lý về luật lao động Brazil (CLT) cho các đội ngũ Nhân sự (RH) và Quản lý nhân sự (Departamento Pessoal). Giải đáp các thắc mắc hằng ngày (nghỉ phép năm, lương tháng 13, thông báo chấm dứt hợp đồng trước, quỹ giờ làm bù, thời giờ làm việc, các hình thức chấm dứt hợp đồng) kèm trích dẫn căn cứ pháp lý, và tính toán các khoản thanh toán thôi việc với **bảng diễn giải tính toán** đầy đủ — bao gồm INSS, IRRF (cùng mức miễn thuế mới theo Luật 15.270/2025 lên đến R$ 5.000) và khoản phạt FGTS.

## Tính năng chính

- Giải đáp các thắc mắc về CLT kèm trích dẫn điều luật, đạo luật hoặc án lệ tổng hợp (súmula) làm cơ sở cho từng quy định.
- Tính toán thanh toán thôi việc cho 5 trường hợp phổ biến: sa thải không có lý do chính đáng, người lao động tự xin nghỉ, sa thải có lý do chính đáng, thỏa thuận chấm dứt đôi bên (Điều 484-A) và hết hạn hợp đồng xác định thời hạn.
- Tính tiền nghỉ phép năm, lương tháng 13 theo tỷ lệ và thời hạn báo trước (30 + 3 ngày/năm, tối đa 90 ngày).
- Áp dụng đúng quy định thuế: chỉ tính INSS và IRRF trên các khoản chịu thuế; tiền bồi thường thay thế báo trước (aviso indenizado), tiền phép năm chưa nghỉ được thanh toán + phụ cấp 1/3 và khoản phạt FGTS được miễn thuế; lương tháng 13 được tính thuế riêng.
- Luôn cập nhật các mức giá trị mới nhất: một script sẽ truy xuất trực tiếp mức lương tối thiểu chính thức từ API của Ngân hàng Trung ương Brazil và cảnh báo khi các bảng dữ liệu đóng gói sẵn bị lỗi thời.

## Cấu trúc thư mục

```
clt-hr-assistant/
├── metadata.json                  # siêu dữ liệu cho thư viện mẫu (gallery)
├── SKILL.md                       # hướng dẫn thực thi cho agent
├── README.md                      # tệp này (dành cho người đọc)
├── scripts/
│   ├── fetch_current_values.py    # lương tối thiểu trực tiếp (API BCB) + kiểm tra độ trễ cập nhật
│   └── severance_calculator.py    # các khoản thôi việc kèm bảng diễn giải tính toán
├── references/
│   └── clt_rules.md               # các quy định CLT kèm trích dẫn pháp lý
└── assets/
    └── tables_2026.json           # các bảng biểu chính thức năm 2026 (lương tối thiểu, INSS, IRRF, FGTS)
```

## Cơ chế hoạt động của chiến lược "giá trị hiện hành"

Brazil chỉ công bố các bảng INSS và IRRF dưới dạng trang web hoặc tệp PDF — không có API chính thức có cấu trúc. Vì vậy, skill này sử dụng hai lớp:

1. **Lớp dữ liệu trực tiếp** — `fetch_current_values.py` truy vấn API SGS của Ngân hàng Trung ương Brazil (chuỗi dữ liệu chính thức 1619) để lấy mức lương tối thiểu hiện hành. Vì bậc đầu tiên của bảng INSS luôn kết thúc đúng bằng mức lương tối thiểu, sự sai lệch so với các bảng đóng gói sẵn cho thấy dữ liệu đã lỗi thời và script sẽ cảnh báo (mã thoát 1).
2. **Lớp dữ liệu đóng gói sẵn** — `assets/tables_2026.json` chứa đầy đủ các bảng chính thức của năm 2026. Khi bước kiểm tra trực tiếp báo dữ liệu đã lỗi thời (thường vào tháng Giêng hằng năm), bạn chỉ cần cập nhật tệp duy nhất này theo các mức mới của nghị định/thông tư.

Trên các nền tảng không hỗ trợ chạy mã (Copilot Studio), agent sẽ dùng trực tiếp các bảng đóng gói sẵn và nêu rõ năm tham chiếu trong câu trả lời.

## Ví dụ sử dụng

Bạn có thể hỏi agent những câu như:

- "Một nhân viên có 6 năm làm việc tại công ty được hưởng bao nhiêu ngày báo trước?"
- "Hãy tính khoản thanh toán thôi việc: mức lương R$ 3.500, ngày vào làm 01/03/2022, bị sa thải không có lý do chính đáng vào ngày 24/07/2026, bồi thường thay thế báo trước (aviso indenizado), 1 người phụ thuộc."
- "Tôi có thể chia kỳ nghỉ phép năm thành 3 đợt không? Các giới hạn quy định là gì?"
- "Mức phạt là bao nhiêu nếu công ty chậm chi trả tiền thôi việc?"

Chạy trực tiếp công cụ tính toán:

```bash
python scripts/severance_calculator.py \
  --salary 3500 --hire-date 2022-03-01 --end-date 2026-07-24 \
  --type sem_justa_causa --notice indemnified --dependents 1
```

## Bảo trì hằng năm

Vào tháng Giêng hằng năm, sau khi có nghị định mới (về lương tối thiểu), thông tư mới (về INSS) và công bố của Cơ quan Thuế Liên bang Receita Federal (về IRRF):

1. Cập nhật `assets/tables_2026.json` (và các trường năm tham chiếu).
2. Chạy `python scripts/fetch_current_values.py` — kết quả phải báo `OK`.

## Các nguồn chính thức được sử dụng (giá trị năm 2026 — tất cả từ chính phủ)

- Mức lương tối thiểu R$ 1.621,00 — [Nghị định số 12.797/2025 (Planalto)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm) và [Ngân hàng Trung ương Brazil, chuỗi SGS 1619](https://api.bcb.gov.br/dados/serie/bcdata.sgs.1619/dados/ultimos/1?formato=json)
- Bảng và mức trần đóng INSS (R$ 8.475,55) — Thông tư liên bộ MPS/MF số 13, ngày 09/01/2026; [bảng chính thức tại gov.br/INSS](https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal)
- Bảng lũy tiến hằng tháng của IRRF — [Luật số 15.191/2025 (Hạ viện Brazil - Câmara dos Deputados)](https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html)
- Khoản giảm trừ thuế thu nhập (IR) năm 2026 (miễn thuế đến R$ 5.000) — [Luật số 15.270/2025 (Hạ viện Brazil - Câmara dos Deputados)](https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html) và [hướng dẫn tính toán của Receita Federal](https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2025/dezembro/receita-federal-orienta-fontes-pagadoras-e-contribuintes-a-calcular-a-reducao-do-imposto-de-renda-a-partir-de-1o-de-janeiro-de-2026)
- Mức giảm trừ theo người phụ thuộc (R$ 189,59/tháng) — Luật số 9.250/1995, Điều 4, Khoản III (sửa đổi theo Luật số 13.149/2015)

## Tuyên bố miễn trừ trách nhiệm pháp lý

Skill này cung cấp các ước tính và hướng dẫn chung dựa trên bộ luật CLT và các bảng biểu công khai chính thức. Nội dung không cấu thành tư vấn pháp lý. Thỏa ước lao động tập thể (CCT/ACT), các trường hợp được bảo hộ việc làm (estabilidade) và phán quyết của tòa án có thể làm thay đổi kết quả — hãy luôn xác nhận lại với kế toán hoặc luật sư lao động của doanh nghiệp.

---
Tác giả: Michael Ferro Pereira
