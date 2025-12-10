# Lịch sử Đảng Cộng sản Việt Nam - Web Application

Ứng dụng web hiển thị lịch sử với giao diện hiện đại, tương tác và responsive.

## 📁 Cấu trúc dự án

```
vnr202/
├── index.html          # File HTML chính
├── styles.css          # File CSS với animations và responsive design
├── script.js           # JavaScript cho interactions và modal
├── data.js             # Dữ liệu các sự kiện lịch sử
└── README.md           # File hướng dẫn này
```

## 🎨 Tính năng

### Màn hình 1 - Intro/Landing
- Background video (có placeholder nếu chưa có video)
- Bản đồ Việt Nam với các điểm đánh dấu (Hoàng Sa, Trường Sa)
- Hiệu ứng glow màu vàng chạy xung quanh
- Animation fade in khi load trang
- Scroll indicator để chuyển sang màn hình timeline

### Màn hình 2 - Timeline Gallery
- Background gradient với núi non mờ ảo
- Header với text "VIỆT NAM" màu đỏ nổi bật
- Grid layout 6 ảnh (responsive: 3 cột → 2 cột → 1 cột)
- Hover effects: scale up + shadow
- Click để mở modal chi tiết

### Modal - Chi tiết sự kiện
- Overlay full screen với background blur
- Chia 2 phần:
  - **Bên trái (40%)**: Ảnh lớn + thumbnails để chuyển đổi
  - **Bên phải (60%)**: Thông tin sự kiện + timeline events
- Scrollable content với nhiều milestone/events
- Button đóng (X) + click outside hoặc ESC để đóng
- Smooth animations

## 🎨 Color Scheme

- **Primary (Đỏ)**: `#CC0000`, `#8B0000`
- **Secondary (Vàng/Gold)**: `#FFD700`, `#FDB913`
- **Accent**: Xanh lục đậm `#2d5016`, xanh nước biển mờ
- **Text**: Trắng trên background tối, Đen/Xám đậm trên background sáng

## 📱 Responsive Design

- **Desktop**: 3 cột gallery, modal 2 cột
- **Tablet (≤1024px)**: 2 cột gallery, modal dọc
- **Mobile (≤768px)**: 1 cột gallery, modal tối ưu cho mobile
- **Small Mobile (≤480px)**: Tối ưu font size và spacing

## ♿ Accessibility

- Keyboard navigation (Tab, Enter, ESC)
- ARIA labels và roles
- Focus management
- Proper contrast ratios
- Skip links
- Reduced motion support

## 🚀 Cách sử dụng

1. **Mở file `index.html`** trong trình duyệt
2. **Thay thế assets**:
   - Thêm video background vào `assets/video-bg.mp4` (hoặc sửa đường dẫn trong HTML)
   - Thay thế placeholder images trong `data.js` bằng ảnh thật
3. **Tùy chỉnh dữ liệu**: Chỉnh sửa mảng `historicalEvents` trong `data.js`

## 📝 Dữ liệu mẫu

File `data.js` chứa 6 sự kiện lịch sử mẫu:
1. Cuộc xâm lược của Pháp (1858-1884)
2. Phong trào Cần Vương (1885-1896)
3. Phong trào Duy Tân (1905-1908)
4. Thành lập Đảng Cộng sản Việt Nam (1930)
5. Cách mạng Tháng Tám (1945)
6. Kháng chiến chống Pháp (1945-1954)

Mỗi sự kiện có:
- `id`: ID duy nhất
- `title`: Tiêu đề sự kiện
- `period`: Giai đoạn thời gian
- `description`: Mô tả chi tiết (heading + content)
- `images`: Mảng các ảnh (url, alt)
- `events`: Mảng các milestone (date, title, description, image)

## 🛠️ Technical Requirements

✅ Responsive design (desktop + mobile)  
✅ Smooth transitions và animations  
✅ Video autoplay, muted, loop cho background  
✅ Lazy load images  
✅ Close modal khi click outside hoặc ESC key  
✅ Accessibility: keyboard navigation, proper contrast ratios  

## 📦 Dependencies

- **Google Fonts**: Noto Serif (headers), Inter (body)
- **No framework required**: Pure HTML, CSS, JavaScript

## 🔧 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa CSS variables trong `styles.css`:
```css
:root {
    --color-primary: #CC0000;
    --color-gold: #FFD700;
    /* ... */
}
```

### Thêm sự kiện mới
Thêm object mới vào mảng `historicalEvents` trong `data.js`:
```javascript
{
    id: 7,
    title: "Tên sự kiện",
    period: "YYYY-YYYY",
    // ...
}
```

## 📄 License

Dự án này được tạo cho VNR202 - Group2.

## 👥 Credits

- **Design**: Theo yêu cầu trong `promt.md`
- **Development**: Tuân thủ guidelines trong `skills/frontend-design.md`




