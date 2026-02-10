// ========================================
// GLOBAL VARIABLES
// ========================================

let cart = [];
let currentPage = 1;
const productsPerPage = 20;

// ========================================
// DOM CONTENT LOADED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ========================================
// INITIALIZE APP
// ========================================

function initializeApp() {
    setupSmoothScrolling();
    setupNavigation();
    setupDropdowns();
    setupProductCards();
    setupFilters();
    setupPagination();
    setupLoadMore();
    setupCartFunctionality();
    addScrollAnimations();
    setupHeroButtons();
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// NAVIGATION
// ========================================

function setupNavigation() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 0) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// DROPDOWNS
// ========================================

function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (btn && menu) {
            // Mobile touch support
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = menu.style.display === 'block';
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.style.display = 'none';
                });
                
                // Toggle current dropdown
                menu.style.display = isOpen ? 'none' : 'block';
            });
        }
        
        // Handle dropdown item clicks
        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const text = this.textContent.trim();
                const btnText = btn.querySelector('span');
                if (btnText) {
                    btnText.textContent = text;
                }
                menu.style.display = 'none';
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
}

// ========================================
// PRODUCT CARDS
// ========================================

function setupProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add entrance animation delay
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Add click animation
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-buy')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
        
        // Image zoom on hover
        const productImage = card.querySelector('.product-image img');
        if (productImage) {
            card.addEventListener('mouseenter', function() {
                productImage.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                productImage.style.transform = 'scale(1)';
            });
        }
    });
}

// ========================================
// FILTERS
// ========================================

function setupFilters() {
    const categoryFilter = document.querySelectorAll('.filter-select')[0];
    const sortFilter = document.querySelectorAll('.filter-select')[1];
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            filterProducts(selectedCategory);
            
            // Add feedback animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            const sortType = this.value;
            sortProducts(sortType);
            
            // Add feedback animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productCategory = card.querySelector('.product-category').textContent;
        
        if (category === 'All Categories' || productCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortProducts(sortType) {
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    let sortedCards = [...productCards];
    
    if (sortType === 'Price: Low to High') {
        sortedCards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceA - priceB;
        });
    } else if (sortType === 'Price: High to Low') {
        sortedCards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceB - priceA;
        });
    }
    
    // Clear and re-append sorted cards
    productsGrid.innerHTML = '';
    sortedCards.forEach(card => {
        productsGrid.appendChild(card);
    });
    
    // Re-setup product cards
    setupProductCards();
}

// ========================================
// PAGINATION
// ========================================

function setupPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            // Remove active class from all buttons
            paginationBtns.forEach(b => b.classList.remove('active'));
            
            // Handle navigation
            if (this.textContent === 'Previous') {
                currentPage = Math.max(1, currentPage - 1);
            } else if (this.textContent === 'Next') {
                currentPage = Math.min(4, currentPage + 1);
            } else {
                currentPage = parseInt(this.textContent);
                this.classList.add('active');
            }
            
            // Update button states
            updatePaginationButtons();
            
            // Scroll to products section
            const productsSection = document.querySelector('#products');
            const navHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: productsSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
            
            // Add visual feedback
            showPageTransition();
        });
    });
}

function updatePaginationButtons() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const prevBtn = paginationBtns[0];
    const nextBtn = paginationBtns[paginationBtns.length - 1];
    
    // Update Previous button
    prevBtn.disabled = currentPage === 1;
    
    // Update Next button
    nextBtn.disabled = currentPage === 4;
    
    // Update number buttons
    paginationBtns.forEach(btn => {
        if (!isNaN(parseInt(btn.textContent))) {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === currentPage) {
                btn.classList.add('active');
            }
        }
    });
}

function showPageTransition() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.style.opacity = '0';
    productsGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        productsGrid.style.transition = 'all 0.5s ease';
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
    }, 100);
}

// ========================================
// LOAD MORE
// ========================================

function setupLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                // Show success message
                this.textContent = 'More Products Loaded!';
                this.style.background = '#10b981';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = 'Load More Products';
                    this.disabled = false;
                    this.style.background = '';
                }, 2000);
            }, 1000);
        });
    }
}

// ========================================
// CART FUNCTIONALITY
// ========================================

function setupCartFunctionality() {
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };
            
            addToCart(product, this);
        });
    });
}

function addToCart(product, button) {
    cart.push(product);
    updateCartCount();
    
    // Visual feedback
    const originalText = button.textContent;
    button.textContent = 'Added! ✓';
    button.style.background = '#10b981';
    
    // Animate cart button
    const cartBtn = document.querySelector('.cart-btn-header');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Reset button after delay
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.querySelector('.count-badge');
    if (cartCount) {
        cartCount.textContent = cart.length;
        
        // Animate count update
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
}

function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.featured-categories, .promo-banner, .products-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// ========================================
// HERO BUTTONS
// ========================================

function setupHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: 20px;
                height: 20px;
                animation: ripple 0.6s ease;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ========================================
// CATEGORY CARDS
// ========================================

const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        const categoryFilter = document.querySelectorAll('.filter-select')[0];
        
        if (categoryFilter) {
            categoryFilter.value = categoryName;
            filterProducts(categoryName);
            
            // Scroll to products
            const productsSection = document.querySelector('#products');
            const navHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: productsSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CSS ANIMATIONS (Added dynamically)
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') return;
    
    const productCards = document.querySelectorAll('.product-card');
    let found = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (found) {
        // Scroll to products
        const productsSection = document.querySelector('#products');
        const navHeight = document.querySelector('.header').offsetHeight;
        window.scrollTo({
            top: productsSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    } else {
        showNotification('No products found for "' + searchTerm + '"');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
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

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Console welcome message
console.log('%c Welcome to Ecommerce Store! ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px; font-family: Poppins;');
console.log('%c Happy Shopping! ', 'background: #10b981; color: white; font-size: 16px; padding: 5px; font-family: Poppins;');