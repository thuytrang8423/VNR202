/**
 * Main JavaScript file cho ứng dụng Lịch sử Đảng Cộng sản Việt Nam
 * Xử lý: Gallery loading, Modal interactions, Lazy loading, Accessibility
 */

// ============================================
// Global Variables
// ============================================
let currentEventIndex = 0;
let currentImageIndex = 0;
let scrollPosition = 0; // Lưu vị trí scroll trước khi mở modal

// ============================================
// DOM Elements
// ============================================
const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('event-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const flipbook = document.getElementById('flipbook');
const spineAnchor = document.getElementById('spineAnchor');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Flipbook instance
let flipbookInstance = null;

// ============================================
// Initialize Gallery
// ============================================
/**
 * Khởi tạo gallery với lazy loading
 * Chỉ hiển thị 5 sự kiện đầu tiên
 */
function initGallery() {
    if (!galleryGrid) return;
    
    // Chỉ lấy 5 sự kiện đầu tiên để hiển thị 5 cards trải ngang
    const eventsToShow = historicalEvents.slice(0, 5);
    
    eventsToShow.forEach((event, index) => {
        const galleryItem = createGalleryItem(event, index);
        galleryGrid.appendChild(galleryItem);
    });
}

/**
 * Tạo gallery item với lazy loading - Book Style
 */
function createGalleryItem(event, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item loading';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Xem chi tiết: ${event.title}`);
    
    // Book Cover Container
    const bookCover = document.createElement('div');
    bookCover.className = 'book-cover';
    
    // Book Spine (Gáy sách)
    const bookSpine = document.createElement('div');
    bookSpine.className = 'book-spine';
    
    // Book Pages (Trang sách bên trong)
    const bookPages = document.createElement('div');
    bookPages.className = 'book-pages';
    
    // Lazy load image
    const img = document.createElement('img');
    img.src = event.images[0].url;
    img.alt = event.images[0].alt;
    img.loading = 'lazy';
    
    // Title trên cuốn sách
    const title = document.createElement('div');
    title.className = 'gallery-item-title';
    title.textContent = event.title;
    
    // Assemble book structure
    bookCover.appendChild(bookSpine);
    bookCover.appendChild(bookPages);
    bookCover.appendChild(img);
    bookCover.appendChild(title);
    item.appendChild(bookCover);
    
    // Remove loading class when image loads
    img.addEventListener('load', () => {
        item.classList.remove('loading');
    });
    
    // Click handler
    item.addEventListener('click', () => openModal(index));
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(index);
        }
    });
    
    return item;
}

// ============================================
// Modal Functions
// ============================================
/**
 * Mở modal với thông tin sự kiện và tạo flipbook
 */
function openModal(eventIndex) {
    if (eventIndex < 0 || eventIndex >= historicalEvents.length) return;
    
    currentEventIndex = eventIndex;
    currentImageIndex = 0;
    const event = historicalEvents[eventIndex];
    
    // Lưu vị trí scroll hiện tại
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Tạo flipbook từ dữ liệu sự kiện
    createFlipbook(event);
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Ẩn title trang 2 khi mở modal (giữ nguyên vị trí)
    const timelineHeader = document.querySelector('.timeline-header');
    if (timelineHeader) {
        timelineHeader.style.visibility = 'hidden';
    }
    
    // Focus management for accessibility
    modalClose.focus();
    
    // Prevent body scroll
    preventBodyScroll(true);
}

/**
 * Đóng modal
 */
function closeModal() {
    // Đóng modal ngay lập tức, không cần reset flipbook
    // (mỗi lần mở modal sẽ tạo flipbook mới từ đầu)
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    preventBodyScroll(false);
    
    // Hiện lại title trang 2 khi đóng modal
    const timelineHeader = document.querySelector('.timeline-header');
    if (timelineHeader) {
        timelineHeader.style.visibility = 'visible';
    }
    
    // Restore scroll position ngay lập tức
    requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
    });
}

/**
 * Tạo flipbook từ dữ liệu sự kiện
 */
function createFlipbook(event) {
    // Xóa flipbook cũ nếu có
    if (flipbookInstance) {
        flipbookInstance.destroy();
    }
    flipbook.innerHTML = '';
    
    const leaves = [];
    
    // Trang bìa (trang đầu tiên)
    const coverLeaf = createLeaf(0, 'cover', event);
    flipbook.appendChild(coverLeaf);
    leaves.push(coverLeaf);
    
    // Trang mô tả chính
    const descLeaf = createLeaf(1, 'description', event);
    flipbook.appendChild(descLeaf);
    leaves.push(descLeaf);
    
    // Tạo các trang cho từng sự kiện
    if (event.events && event.events.length > 0) {
        event.events.forEach((evt, evtIndex) => {
            const eventLeaf = createLeaf(2 + evtIndex, 'event', event, evt, evtIndex);
            flipbook.appendChild(eventLeaf);
            leaves.push(eventLeaf);
        });
    }
    
    // Thêm trang kết thúc
    const endLeaf = createLeaf(2 + (event.events ? event.events.length : 0), 'end', event);
    flipbook.appendChild(endLeaf);
    leaves.push(endLeaf);
    
    // Khởi tạo flipbook logic
    flipbookInstance = new MagazineLogic(leaves);
}

/**
 * Tạo một leaf (trang sách) với nội dung
 */
function createLeaf(index, type, event, eventData = null, eventIndex = -1) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.id = `leaf${index}`;
    
    // Mặt trước (front)
    const frontPage = document.createElement('div');
    frontPage.className = 'page front';
    
    // Mặt sau (back)
    const backPage = document.createElement('div');
    backPage.className = 'page back';
    
    if (type === 'cover') {
        // Trang bìa - Full ảnh giống bên ngoài
        frontPage.classList.add('cover-page');
        if (event.images && event.images.length > 0) {
            // Hiển thị full ảnh
            const img = document.createElement('img');
            img.src = event.images[0].url;
            img.alt = event.images[0].alt || event.title;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; display: block;';
            frontPage.appendChild(img);
            frontPage.style.padding = '0';
        } else {
            // Fallback nếu không có ảnh
            frontPage.innerHTML = `
                <div style="border: 1px solid var(--gold-color); padding: 30px; width: 85%; height: 85%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <p style="letter-spacing: 2px; font-size: 0.9rem;">LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM</p>
                    <div style="width: 40px; height: 2px; background: var(--gold-color); margin: 20px 0;"></div>
                    <h1 style="font-size: 1.8rem; line-height: 1.3; padding: 0 5px; margin-bottom: 20px; text-align: center;">
                        ${event.title}
                    </h1>
                    <div style="width: 40px; height: 2px; background: var(--gold-color); margin: 20px 0;"></div>
                    <p style="text-align: center; opacity: 0.9; margin-top: 20px;">${event.period}</p>
                </div>
            `;
        }
        
        // Mặt sau của trang bìa - mô tả
        backPage.innerHTML = `
            <h2>${event.description.heading}</h2>
            <div class="highlight-box">
                "${event.description.content}"
            </div>
            ${event.images && event.images.length > 1 ? `
                <div class="img-container">
                    <div class="img-frame">
                        <img src="${event.images[1].url}" alt="${event.images[1].alt || ''}">
                    </div>
                </div>
            ` : ''}
            <div class="page-num">2</div>
        `;
    } else if (type === 'description') {
        // Trang mô tả chi tiết
        frontPage.innerHTML = `
            <h2>Giới thiệu</h2>
            <p>${event.description.content}</p>
            ${event.images && event.images.length > 0 ? `
                <div class="img-container">
                    <div class="img-frame">
                        <img src="${event.images[0].url}" alt="${event.images[0].alt || ''}">
                    </div>
                </div>
            ` : ''}
            <div class="page-num">3</div>
        `;
        
        // Mặt sau - danh sách sự kiện
        if (event.events && event.events.length > 0) {
            backPage.innerHTML = `
                <h2>Các sự kiện chính</h2>
                <ul style="list-style: none; padding-left: 0;">
                    ${event.events.slice(0, 3).map((evt, idx) => `
                        <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
                            <strong>${evt.date}</strong> — ${evt.title}
                            <p style="margin-top: 5px; font-size: 0.9rem;">${evt.description.substring(0, 150)}...</p>
                        </li>
                    `).join('')}
                </ul>
                <div class="page-num">4</div>
            `;
        } else {
            backPage.innerHTML = `
                <h2>Thông tin bổ sung</h2>
                <p>Đang cập nhật thông tin chi tiết...</p>
                <div class="page-num">4</div>
            `;
        }
    } else if (type === 'event' && eventData) {
        // Trang sự kiện cụ thể - mỗi event chiếm 2 trang (1 leaf)
        const pageNum = 3 + (index - 2) * 2;
        
        // Mặt trước - hiển thị sự kiện
        frontPage.innerHTML = `
            <h2>${eventData.title}</h2>
            <div class="highlight-box">
                <strong>Ngày:</strong> ${eventData.date}
            </div>
            <p>${eventData.description}</p>
            ${eventData.image ? `
                <div class="img-container">
                    <div class="img-frame">
                        <img src="${eventData.image}" alt="${eventData.title}">
                    </div>
                    <div class="caption">${eventData.title}</div>
                </div>
            ` : ''}
            <div class="page-num">${pageNum}</div>
        `;
        
        // Mặt sau - thông tin bổ sung hoặc trang trống nếu là event cuối
        const nextEventIndex = eventIndex + 1;
        const isLastEvent = !event.events || nextEventIndex >= event.events.length;
        
        if (isLastEvent) {
            // Nếu là event cuối cùng, hiển thị thông tin bổ sung
            backPage.innerHTML = `
                <h2>Thông tin bổ sung</h2>
                <p>Tiếp tục lật trang để xem phần kết thúc...</p>
                <div class="page-num">${pageNum + 1}</div>
            `;
        } else {
            // Nếu không phải event cuối, hiển thị event tiếp theo
            const nextEvent = event.events[nextEventIndex];
            backPage.innerHTML = `
                <h2>${nextEvent.title}</h2>
                <div class="highlight-box">
                    <strong>Ngày:</strong> ${nextEvent.date}
                </div>
                <p>${nextEvent.description}</p>
                ${nextEvent.image ? `
                    <div class="img-container">
                        <div class="img-frame">
                            <img src="${nextEvent.image}" alt="${nextEvent.title}">
                        </div>
                    </div>
                ` : ''}
                <div class="page-num">${pageNum + 1}</div>
            `;
        }
    } else if (type === 'end') {
        // Trang kết thúc
        const totalEvents = event.events ? event.events.length : 0;
        const pageNum = 3 + totalEvents * 2;
        
        // Mặt trước - trang kết thúc
        frontPage.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center;">
                <h2 style="font-size: 2rem; margin-bottom: 30px; color: var(--accent-color);">Kết thúc</h2>
                <p style="font-size: 1.2rem; margin-bottom: 20px;">Cảm ơn bạn đã theo dõi!</p>
                <p style="opacity: 0.8;">${event.title}</p>
            </div>
            <div class="page-num">${pageNum}</div>
        `;
        
        // Mặt sau - màu giống bìa sách
        backPage.classList.add('cover-page');
        backPage.style.backgroundColor = '#2c0e0e';
        backPage.style.color = '#eaddcf';
        backPage.style.border = '3px solid var(--gold-color)';
        backPage.style.boxShadow = 'inset 0 0 50px #000';
        backPage.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center;">
                <p style="letter-spacing: 2px; font-size: 0.9rem; color: #eaddcf;">LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM</p>
                <div style="width: 40px; height: 2px; background: var(--gold-color); margin: 20px 0;"></div>
                <h1 style="font-size: 1.8rem; line-height: 1.3; padding: 0 5px; margin-bottom: 20px; text-align: center; color: #d4af37; text-shadow: 2px 2px 4px #000;">
                    ${event.title}
                </h1>
                <div style="width: 40px; height: 2px; background: var(--gold-color); margin: 20px 0;"></div>
                <p style="text-align: center; opacity: 0.9; margin-top: 20px; color: #eaddcf;">${event.period}</p>
            </div>
        `;
    }
    
    leaf.appendChild(frontPage);
    leaf.appendChild(backPage);
    
    return leaf;
}

/**
 * Class MagazineLogic - Logic lật sách (dựa trên mln111_Flipbook)
 */
class MagazineLogic {
    constructor(leaves) {
        this.leaves = leaves;
        this.spine = spineAnchor;
        this.totalLeaves = this.leaves.length;
        this.currentPage = 0;
        this.isAnimating = false;
        const animSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-speed'));
        this.animMs = Number.isFinite(animSec) ? animSec * 1000 : 1600;

        this.init();
    }

    init() {
        // Khởi tạo z-index: trang đầu nằm trên cùng
        this.leaves.forEach((leaf, index) => {
            leaf.style.zIndex = this.totalLeaves - index;
        });

        // Xử lý click trên từng lá sách
        this.leaves.forEach((leaf, index) => {
            leaf.addEventListener('click', () => {
                // Chỉ cho phép click trên trang hiện tại để lật
                if (!this.isAnimating) {
                    if (index === this.currentPage && !leaf.classList.contains('turned')) {
                        this.next();
                    } else if (index === this.currentPage - 1 && leaf.classList.contains('turned')) {
                        this.prev();
                    }
                }
            });
        });

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === "ArrowRight") this.next();
                if (e.key === "ArrowLeft") this.prev();
            }
        });

        this.updateButtons();
        this.updatePosition();
    }

    next() {
        if (this.currentPage >= this.totalLeaves || this.isAnimating) return;
        this.isAnimating = true;

        const leaf = this.leaves[this.currentPage];

        // Đưa trang hiện tại lên trên cùng
        leaf.style.zIndex = this.totalLeaves + 1;

        // Lật trang
        leaf.style.transform = "rotateY(-180deg)";
        leaf.classList.add('turned');

        this.currentPage++;
        this.updatePosition();

        setTimeout(() => {
            // Sau khi lật xong, đưa trang về đúng vị trí z-index
            leaf.style.zIndex = this.currentPage;
            this.isAnimating = false;
            this.updateButtons();
        }, this.animMs);
    }

    prev() {
        if (this.currentPage <= 0 || this.isAnimating) return;
        this.isAnimating = true;

        this.currentPage--;
        const leaf = this.leaves[this.currentPage];
        this.updatePosition();

        // Đưa trang lên trên cùng
        leaf.style.zIndex = this.totalLeaves + 1;

        // Lật ngược lại
        leaf.style.transform = "rotateY(0deg)";
        leaf.classList.remove('turned');

        setTimeout(() => {
            // Trả về z-index ban đầu
            leaf.style.zIndex = this.totalLeaves - this.currentPage;
            this.isAnimating = false;
            this.updateButtons();
        }, this.animMs);
    }

    updateButtons() {
        prevBtn.disabled = this.currentPage === 0;
        nextBtn.disabled = this.currentPage === this.totalLeaves;
    }

    // Chức năng căn chỉnh vị trí gáy sách / trang hiển thị
    updatePosition() {
        this.spine.classList.remove('start', 'end');

        if (this.currentPage === 0) {
            // Trang bìa (phải) ở giữa
            this.spine.classList.add('start');
        } else if (this.currentPage === this.totalLeaves) {
            // Trang cuối (trái) ở giữa
            this.spine.classList.add('end');
        }
        // Nếu 0 < currentPage < totalLeaves (đang xem hai trang),
        // spine-anchor không có class nào và giữ nguyên (gáy ở giữa).
    }

    destroy() {
        // Cleanup nếu cần
        this.leaves = [];
        this.currentPage = 0;
    }
}

// ============================================
// Event Listeners
// ============================================
/**
 * Đóng modal khi click overlay
 */
modalOverlay.addEventListener('click', closeModal);

/**
 * Đóng modal khi click nút đóng
 */
modalClose.addEventListener('click', closeModal);

/**
 * Đóng modal khi nhấn ESC
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

/**
 * Keyboard navigation trong modal
 */
modal.addEventListener('keydown', (e) => {
    // Tab trap - giữ focus trong modal
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ============================================
// Scroll Management
// ============================================
/**
 * Ngăn body scroll khi modal mở
 */
function preventBodyScroll(prevent) {
    if (prevent) {
        // Lưu scroll position và fix body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    } else {
        // Restore body position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
    }
}

// ============================================
// Smooth Scroll to Timeline
// ============================================
/**
 * Scroll từ intro screen xuống timeline screen
 */
function scrollToTimeline() {
    const timelineScreen = document.getElementById('timeline-screen');
    if (timelineScreen) {
        timelineScreen.scrollIntoView({ behavior: 'smooth' });
    }
}

// Thêm click handler cho scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', scrollToTimeline);
    scrollIndicator.setAttribute('role', 'button');
    scrollIndicator.setAttribute('tabindex', '0');
    scrollIndicator.setAttribute('aria-label', 'Cuộn xuống màn hình timeline');
    scrollIndicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTimeline();
        }
    });
}

// ============================================
// Intersection Observer cho animations
// ============================================
/**
 * Thêm animation khi scroll vào view
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// ============================================
// Video Background Handling
// ============================================
/**
 * Xử lý video background
 */
function initVideoBackground() {
    const video = document.getElementById('bg-video');
    if (video) {
        // Thử load video, nếu không có thì ẩn video element
        video.addEventListener('error', () => {
            video.style.display = 'none';
            const placeholder = document.querySelector('.placeholder-bg');
            if (placeholder) {
                placeholder.style.display = 'block';
            }
        });
        
        // Autoplay với muted và loop
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Thử play (có thể bị browser block)
        video.play().catch(() => {
            // Nếu không thể autoplay, hiển thị placeholder
            video.style.display = 'none';
            const placeholder = document.querySelector('.placeholder-bg');
            if (placeholder) {
                placeholder.style.display = 'block';
            }
        });
    }
}

// ============================================
// Initialize App
// ============================================
/**
 * Khởi tạo ứng dụng khi DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initVideoBackground();
    
    // Delay scroll animations để đảm bảo gallery đã render
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
    
    // Lazy load images khi scroll
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ============================================
// Error Handling
// ============================================
/**
 * Xử lý lỗi khi load images
 */
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        // Thay thế bằng placeholder nếu ảnh không load được
        e.target.src = 'https://via.placeholder.com/800x600/333333/FFFFFF?text=Image+not+found';
        e.target.alt = 'Ảnh không tìm thấy';
    }
}, true);

// ============================================
// Performance Optimization
// ============================================
/**
 * Debounce function cho các event handlers
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Có thể thêm logic scroll-based animations ở đây
}, 100);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

