# Trình trực quan hóa Bản đồ Tuyến đường

Một skill của Copilot Studio giúp **trực quan hóa các tuyến đường đã được sắp thứ tự trước và các tập hợp vị trí** thành bản đồ được định dạng phong phú — ảnh PNG cho khung trò chuyện, HTML tương tác cho trình duyệt, cùng tùy chọn xuất GeoJSON/KML, liên kết sâu (deep link) và mã QR.

## Khi nào nên sử dụng skill này

Hãy sử dụng skill này **sau khi** một lệnh gọi connector phía trước trả về tọa độ, dữ liệu hình học đường đi hoặc chi tiết từng chặng:

- Một connector Azure Maps / Bing Maps / HERE / Mapbox đã trả về các điểm dừng theo thứ tự, khoảng cách và một đường đa tuyến (polyline) đường đi → truyền toàn bộ vào đây để trực quan hóa.
- Một truy vấn Dataverse / CRM / SharePoint đã trả về danh sách vị trí kèm tọa độ vĩ độ/kinh độ (lat/lon) → vẽ chúng lên bản đồ điểm đánh dấu (marker map).
- Agent đã tìm kiếm trên web một tập địa chỉ và phân giải được tọa độ của chúng → trực quan hóa kết quả.

> **Nguyên tắc thiết kế:** Skill này **không** thực hiện tối ưu hóa lộ trình.
> Nó tin tưởng bên gọi cung cấp đúng thứ tự điểm dừng và tùy chọn cung cấp
> dữ liệu hình học đường đi. Chế độ vẽ đường thẳng ngoại tuyến được giữ lại như một
> phương án dự phòng mang tính sơ đồ rõ ràng.

---

## Tính năng

| Tính năng | Mặc định | Kích hoạt |
| --- | --- | --- |
| Bản đồ PNG (luôn tạo) | ✅ | — |
| HTML tương tác (Leaflet + OSM) | tắt | `"html": true` |
| Xuất GeoJSON | tắt | `"geojson": true` |
| Xuất KML | tắt | `"kml": true` |
| Liên kết sâu (Google Maps / Apple Maps / Bing Maps) | tắt | `"map_links": true` |
| Mã QR cho liên kết sâu | tắt | `"qr_codes": true` |
| Danh sách điểm dừng CSV | tắt | `"csv": true` |

Dữ liệu hình học đường đi từ connector giúp PNG và HTML chính xác hơn. Nếu không có dữ liệu này, PNG sẽ sử dụng các đoạn thẳng (được gắn nhãn **schematic**) và HTML sẽ gọi OSRM ở phía trình duyệt.

---

## Cấu trúc Payload

### Tối thiểu — tuyến đường (các điểm dừng theo thứ tự đã cung cấp)

```json
{
  "kind": "route",
  "title": "Delivery run",
  "stops": [
    { "name": "Depot",  "lat": -33.8600, "lon": 151.2100 },
    { "name": "Stop A", "lat": -33.9021, "lon": 151.1814 },
    { "name": "Stop B", "lat": -33.8825, "lon": 151.1490 }
  ]
}
```

### Có dữ liệu đường đi từ connector

```json
{
  "kind": "route",
  "title": "Delivery run — Azure Maps",
  "stops": [
    { "name": "Depot",  "lat": -33.860, "lon": 151.210, "icon": "home" },
    { "name": "Stop A", "lat": -33.902, "lon": 151.181, "icon": "shop" },
    { "name": "Stop B", "lat": -33.882, "lon": 151.149, "icon": "shop" }
  ],
  "route_geometry": [
    { "lat": -33.860, "lon": 151.210 },
    { "lat": -33.864, "lon": 151.207 },
    { "lat": -33.872, "lon": 151.195 },
    { "lat": -33.882, "lon": 151.181 },
    { "lat": -33.902, "lon": 151.181 }
  ],
  "legs": [
    { "from": "Depot",  "to": "Stop A", "distance_m": 5200, "duration_s": 420, "summary": "via Parramatta Rd" },
    { "from": "Stop A", "to": "Stop B", "distance_m": 3100, "duration_s": 280, "summary": "via Church St" }
  ],
  "route_source": "azure_maps",
  "total_distance_m": 8300,
  "total_duration_s": 700,
  "profile": "driving",
  "html": true,
  "map_links": true
}
```

### Bản đồ điểm đánh dấu (thời tiết / dữ liệu CRM / danh sách địa điểm)

```json
{
  "kind": "map",
  "title": "Field site weather",
  "points": [
    { "name": "Sydney CBD",    "lat": -33.8688, "lon": 151.2093, "value": "28 C", "icon": "sunny" },
    { "name": "Parramatta",    "lat": -33.8150, "lon": 151.0020, "value": "31 C", "icon": "hot" },
    { "name": "Bondi Beach",   "lat": -33.8915, "lon": 151.2767, "value": "24 C", "icon": "partly-cloudy" },
    { "name": "Manly",         "lat": -33.7969, "lon": 151.2870, "value": "22 C", "icon": "cloudy" }
  ]
}
```

### Sắp xếp dạng sơ đồ (tùy chọn dự phòng ngoại tuyến)

Thêm `"schematic_order": true` để cho phép script sắp xếp các điểm dừng bằng phương pháp heuristic láng giềng gần nhất + 2-opt (sử dụng khoảng cách đường chim bay — chỉ phù hợp khi không có sẵn connector định tuyến):

```json
{
  "kind": "route",
  "title": "Estimated visit order",
  "stops": [...],
  "schematic_order": true,
  "round_trip": true
}
```

---

## Tham chiếu trường Payload

### Cấp cao nhất

| Trường | Kiểu | Mặc định | Mô tả |
| --- | --- | --- | --- |
| `kind` | `"map"` \| `"route"` \| `"auto"` | `"auto"` | Loại bản đồ |
| `title` | chuỗi | `"Map"` / `"Route"` | Tiêu đề biểu đồ |
| `profile` | `"driving"` \| `"walking"` \| `"cycling"` | `"driving"` | Phương thức di chuyển |
| `round_trip` | bool | `false` | Thêm chặng quay về |
| `route_geometry` | `[{lat, lon}]` | — | Đường đa tuyến đường đi từ connector |
| `legs` | mảng | — | Chi tiết từng chặng từ connector |
| `route_source` | chuỗi | — | Ghi nhận nguồn (`"azure_maps"`, `"bing_maps"`, v.v.) |
| `total_distance_m` | số | — | Quãng đường theo mét |
| `total_duration_s` | số | — | Thời gian di chuyển theo giây |
| `schematic_order` | bool | `false` | Tùy chọn bật sắp xếp điểm dừng ngoại tuyến |
| `html` | bool | `false` | Xuất HTML tương tác |
| `geojson` | bool | `false` | Xuất GeoJSON |
| `kml` | bool | `false` | Xuất KML |
| `csv` | bool | `false` | Xuất CSV |
| `map_links` | bool | `false` | Tạo liên kết sâu |
| `qr_codes` | bool | `false` | Bảng mã QR cho liên kết sâu |

### Từng điểm dừng / điểm dữ liệu

| Trường | Kiểu | Ghi chú |
| --- | --- | --- |
| `name` | chuỗi | Nhãn hiển thị |
| `lat`, `lon` | số thực | Bắt buộc (hoặc khớp bí danh place_lookup) |
| `value` | chuỗi | Chỉ số — hiển thị trong popup + chú giải |
| `icon` | chuỗi | `pin`, `sunny`, `office`, `shop`, `truck`, … |
| `color` | chuỗi | Mã màu hex (có kiểm tra hợp lệ, mặc định = màu mặc định của biểu tượng) |
| `address` | chuỗi | Địa chỉ dạng đọc được (hiển thị ở thanh bên) |

---

## Khóa kết quả

| Khóa | Kiểu | Ghi chú |
| --- | --- | --- |
| `chart_path` | chuỗi | Đường dẫn tuyệt đối đến tệp PNG |
| `markdown` | chuỗi | Dán nội dung này vào phản hồi trò chuyện |
| `has_road_geometry` | bool | `true` khi đã sử dụng dữ liệu hình học từ connector |
| `route_source` | chuỗi | Ghi nhận nguồn từ payload |
| `distance_label` | chuỗi | ví dụ: `"8.3 km"` |
| `duration_label` | chuỗi | ví dụ: `"11 min"` |
| `html_path` | chuỗi | Nếu `html: true` |
| `geojson_path` | chuỗi | Nếu `geojson: true` |
| `kml_path` | chuỗi | Nếu `kml: true` |
| `csv_path` | chuỗi | Nếu `csv: true` |
| `map_links_path` | chuỗi | Nếu `map_links: true` |
| `qr_sheet_path` | chuỗi | Nếu `qr_codes: true` |
| `google_maps_url` | chuỗi | URL tuyến đường Google Maps trực tiếp |
| `apple_maps_url` | chuỗi | URL tuyến đường Apple Maps trực tiếp |
| `bing_maps_url` | chuỗi | URL tuyến đường Bing Maps trực tiếp |
| `generated_exports` | dict | Các cờ cho toàn bộ tệp đầu ra thực sự đã được tạo |

---

## Thư viện phụ thuộc

```
matplotlib>=3.8.0       # PNG map
Pillow>=10.0.0          # QR code rasterization
reportlab>=3.6.0        # QR encoder (qrencoder module)
```

---

## CLI (dùng để kiểm thử cục bộ)

```bash
cd submissions/route-map-visualizer
python scripts/map_generator.py --payload assets/sample_with_geometry.json
python scripts/map_generator.py --payload assets/sample_stops_coords.json --out-prefix out/test
```
