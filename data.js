/**
 * Dữ liệu các sự kiện lịch sử
 * Mỗi sự kiện có: id, title, period, description, images, events
 */


const historicalEvents = [
    {
        id: 1,
        title: "Bối cảnh lịch sử và xây dựng chính quyền cách mạng",
        period: "1945-1946",
        description: {
            heading: "I. Bối cảnh lịch sử và xây dựng chính quyền cách mạng (1945–1946)",
            content:
                "Sau Cách mạng Tháng Tám 1945, nước Việt Nam Dân chủ Cộng hòa ra đời trong bối cảnh cực kỳ khó khăn. " +
                "Thuận lợi: Nhà nước mới được thành lập, nhân dân làm chủ, khối đại đoàn kết dân tộc được củng cố. " +
                "Khó khăn: Thù trong giặc ngoài (Anh – Pháp – Tưởng), kinh tế kiệt quệ, nạn đói 1945, tài chính trống rỗng. " +
                "Đảng đề ra chủ trương 'Kháng chiến – Kiến quốc', tập trung: củng cố chính quyền, diệt giặc đói, diệt giặc dốt, " +
                "đối ngoại hòa hoãn để bảo vệ chính quyền non trẻ."
        },
        images: [
            {
                url: "assets/1.jpg",
                alt: "Bối cảnh lịch sử và xây dựng chính quyền cách mạng"
            }
        ],
        events: [
            {
                date: "1945",
                title: "Tình hình Việt Nam sau Cách mạng Tháng Tám",
                description:
                    "Thuận lợi: Nhà nước Việt Nam Dân chủ Cộng hòa ra đời; nhân dân trở thành chủ thể quyền lực; " +
                    "Đảng Cộng sản giữ vai trò lãnh đạo; khối đại đoàn kết dân tộc được hình thành. " +
                    "Khó khăn: Các thế lực Anh – Pháp – Tưởng kéo vào; phản cách mạng nổi dậy; " +
                    "kinh tế kiệt quệ; nạn đói hoành hành; tài chính cạn kiệt; chính quyền non trẻ bị đe dọa.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Tinh+hinh+1945"
            },
            {
                date: "1945-1946",
                title: "Chủ trương 'Kháng chiến – Kiến quốc'",
                description:
                    "Nhiệm vụ trọng tâm: Bảo vệ chính quyền, giữ vững an ninh; trấn áp phản cách mạng; " +
                    "diệt giặc đói (hũ gạo cứu đói, khai hoang, chống đầu cơ); " +
                    "diệt giặc dốt (phong trào Bình dân học vụ); " +
                    "đối ngoại mềm dẻo 'Hòa để tiến', nhân nhượng quân Tưởng để tập trung đối phó Pháp.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Khang+chien+Kien+quoc"
            }
        ]
    },

    {
        id: 2,
        title: "Đường lối kháng chiến toàn quốc",
        period: "1946-1950",
        description: {
            heading: "II. Đường lối kháng chiến toàn quốc (1946–1950)",
            content:
                "Sau khi Pháp bội ước và gửi tối hậu thư, Toàn quốc kháng chiến bùng nổ. " +
                "Đường lối kháng chiến được Đảng xác định là: Toàn dân – Toàn diện – Trường kỳ – Tự lực cánh sinh. " +
                "Các chiến dịch lớn: Việt Bắc 1947 phá chiến lược 'đánh nhanh thắng nhanh'; " +
                "Biên giới 1950 giúp ta giành thế chủ động chiến lược."
        },
        images: [
            {
                url: "assets/2.jpg",
                alt: "Đường lối kháng chiến toàn quốc"
            }
        ],
        events: [
            {
                date: "19/12/1946",
                title: "Bùng nổ Toàn quốc kháng chiến",
                description:
                    "Pháp gây hấn và gửi tối hậu thư; ta buộc phải đứng lên kháng chiến. " +
                    "Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến, kêu gọi nhân dân đứng lên bảo vệ Tổ quốc.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Toan+quoc+khang+chien"
            },
            {
                date: "1946-1950",
                title: "Đường lối kháng chiến",
                description:
                    "Đường lối chiến lược: Toàn dân – Toàn diện – Trường kỳ – Tự lực cánh sinh. " +
                    "Đây là tư duy sáng tạo của Đảng, phù hợp với tương quan lực lượng và điều kiện thực tiễn.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Duong+loi+khang+chien"
            },
            {
                date: "Thu – Đông 1947",
                title: "Chiến dịch Việt Bắc",
                description:
                    "Quân dân ta đánh bại cuộc tấn công quy mô lớn của Pháp, làm phá sản chiến lược 'đánh nhanh thắng nhanh'. " +
                    "Giữ vững an toàn căn cứ Việt Bắc – trung tâm đầu não của kháng chiến.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Chien+dich+Viet+Bac"
            },
            {
                date: "1950",
                title: "Chiến dịch Biên giới",
                description:
                    "Tiêu diệt sinh lực địch, khai thông biên giới Việt – Trung, mở rộng quan hệ quốc tế; " +
                    "ta giành thế chủ động chiến lược trên toàn chiến trường.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Chien+dich+Bien+gioi"
            }
        ]
    },

    {
        id: 3,
        title: "Chiến cuộc Đông Xuân 1953–1954 và Điện Biên Phủ",
        period: "1953-1954",
        description: {
            heading: "III. Chiến cuộc Đông Xuân 1953–1954 và Điện Biên Phủ",
            content:
                "Kế hoạch Nava nhằm xoay chuyển cục diện chiến tranh nhưng nhanh chóng phá sản trước chủ trương chiến lược linh hoạt của Đảng. " +
                "Chiến thắng Điện Biên Phủ (1954) là đỉnh cao của cuộc kháng chiến chống Pháp, quyết định buộc Pháp phải đàm phán."
        },
        images: [
            {
                url: "assets/3.jpg",
                alt: "Chiến cuộc Đông Xuân 1953–1954 và Điện Biên Phủ"
            }
        ],
        events: [
            {
                date: "1953",
                title: "Bối cảnh và Kế hoạch Nava",
                description:
                    "Pháp suy yếu, Mỹ can thiệp sâu. Nava đề ra kế hoạch quân sự 18 tháng với tham vọng giành lại thế chủ động. " +
                    "Điện Biên Phủ được xây dựng thành tập đoàn cứ điểm mạnh nhất Đông Dương.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Ke+hoach+Nava"
            },
            {
                date: "09/1953",
                title: "Chủ trương chiến lược của Đảng",
                description:
                    "Hội nghị Bộ Chính trị 9/1953 đề ra chiến lược tiến công vào nơi địch yếu để phân tán lực lượng cơ động của Nava. " +
                    "Phương châm tác chiến: 'Tiêu diệt sinh lực địch là chính; đánh chắc, tiến chắc'.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Chu+truong+chien+luoc"
            },
            {
                date: "13/3 – 7/5/1954",
                title: "Chiến dịch Điện Biên Phủ",
                description:
                    "Chuẩn bị: Chọn Điện Biên Phủ làm nơi quyết chiến; huy động sức mạnh toàn dân; chuyển phương châm từ 'đánh nhanh' sang 'đánh chắc, tiến chắc'. " +
                    "Diễn biến 3 đợt: Đợt 1 – Him Lam, Độc Lập; Đợt 2 – các cao điểm trung tâm; Đợt 3 – tổng công kích, bắt sống tướng Đờ Cát. " +
                    "Kết quả: Tiêu diệt toàn bộ quân địch, làm sụp đổ kế hoạch Nava.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Chien+dich+DBP"
            }
        ]
    },

    {
        id: 4,
        title: "Ý nghĩa lịch sử của giai đoạn 1945–1954",
        period: "1945-1954",
        description: {
            heading: "IV. Ý nghĩa lịch sử của giai đoạn 1945–1954",
            content:
                "Giai đoạn 1945–1954 đánh dấu thắng lợi trọn vẹn của cuộc kháng chiến chống Pháp, đặt nền móng xây dựng CNXH ở miền Bắc " +
                "và cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên thế giới."
        },
        images: [
            {
                url: "assets/4.jpg",
                alt: "Ý nghĩa lịch sử của giai đoạn 1945–1954"
            }
        ],
        events: [
            {
                date: "21/07/1954",
                title: "Kết thúc thắng lợi kháng chiến chống Pháp",
                description:
                    "Chiến thắng Điện Biên Phủ buộc Pháp phải ký Hiệp định Genève, công nhận độc lập – chủ quyền – toàn vẹn lãnh thổ. " +
                    "Miền Bắc hoàn toàn giải phóng.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Hiep+dinh+Geneve"
            },
            {
                date: "1945-1954",
                title: "Ý nghĩa đối với cách mạng Việt Nam",
                description:
                    "Giữ vững thành quả Cách mạng Tháng Tám; tạo nền tảng xây dựng CNXH tại miền Bắc; " +
                    "khởi đầu cuộc đấu tranh giải phóng miền Nam.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=YNghia+CMVN"
            },
            {
                date: "1954",
                title: "Ý nghĩa quốc tế và bài học lịch sử",
                description:
                    "Lần đầu tiên một dân tộc thuộc địa đánh bại thực dân; cổ vũ phong trào giải phóng dân tộc toàn cầu. " +
                    "Bài học: lãnh đạo đúng đắn, đại đoàn kết, kết hợp quân sự – chính trị – ngoại giao, tự lực cánh sinh.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=YNghia+QT"
            }
        ]
    },
    {
        id: 5,
        title: "Cách mạng Tháng Tám",
        period: "1945",
        description: {
            heading: "Giành độc lập",
            content: "Cách mạng Tháng Tám năm 1945 là cuộc cách mạng dân tộc dân chủ nhân dân đầu tiên thắng lợi ở Đông Nam Á, đưa đến việc thành lập nước Việt Nam Dân chủ Cộng hòa."
        },
        images: [
            {
                url: "assets/5.jpg",
                alt: "Cách mạng Tháng Tám"
            }
        ],
        events: [
            {
                date: "13/08/1945",
                title: "Hội nghị toàn quốc",
                description: "Hội nghị toàn quốc của Đảng quyết định phát động Tổng khởi nghĩa giành chính quyền trên toàn quốc.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Hoi+nghi+toan+quoc"
            },
            {
                date: "19/08/1945",
                title: "Khởi nghĩa ở Hà Nội",
                description: "Nhân dân Hà Nội nổi dậy giành chính quyền, đánh dấu sự khởi đầu của Cách mạng Tháng Tám.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Khoi+nghia+Ha+Noi"
            },
            {
                date: "02/09/1945",
                title: "Tuyên ngôn Độc lập",
                description: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
                image: "https://via.placeholder.com/300x200/FFD700/000000?text=Tuyen+ngon+Doc+lap"
            }
        ]
    },
    {
        id: 6,
        title: "Kháng chiến chống Pháp",
        period: "1945-1954",
        description: {
            heading: "Cuộc kháng chiến trường kỳ",
            content: "Sau khi giành được độc lập, nhân dân Việt Nam lại phải đối mặt với cuộc xâm lược lần thứ hai của thực dân Pháp. Cuộc kháng chiến kéo dài 9 năm và kết thúc bằng chiến thắng Điện Biên Phủ lịch sử."
        },
        images: [
            {
                url: "https://via.placeholder.com/800x600/CC0000/FFFFFF?text=Khang+chien+1",
                alt: "Kháng chiến chống Pháp - Ảnh 1"
            },
            {
                url: "https://via.placeholder.com/800x600/8B0000/FFFFFF?text=Khang+chien+2",
                alt: "Kháng chiến chống Pháp - Ảnh 2"
            },
            {
                url: "https://via.placeholder.com/800x600/2d5016/FFFFFF?text=Khang+chien+3",
                alt: "Kháng chiến chống Pháp - Ảnh 3"
            }
        ],
        events: [
            {
                date: "19/12/1946",
                title: "Toàn quốc kháng chiến",
                description: "Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến, bắt đầu cuộc kháng chiến chống thực dân Pháp.",
                image: "https://via.placeholder.com/300x200/CC0000/FFFFFF?text=Toan+quoc+khang+chien"
            },
            {
                date: "07/05/1954",
                title: "Chiến thắng Điện Biên Phủ",
                description: "Quân đội nhân dân Việt Nam giành chiến thắng vang dội tại Điện Biên Phủ, buộc Pháp phải ký Hiệp định Geneva.",
                image: "https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Dien+Bien+Phu"
            },
            {
                date: "21/07/1954",
                title: "Hiệp định Geneva",
                description: "Ký kết Hiệp định Geneva, chấm dứt chiến tranh và công nhận độc lập, chủ quyền của Việt Nam.",
                image: "https://via.placeholder.com/300x200/2d5016/FFFFFF?text=Hiep+dinh+Geneva"
            }
        ]
    }
];



