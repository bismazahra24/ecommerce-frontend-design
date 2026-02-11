// ======================================
// WEEK 2 - HOME PAGE JAVASCRIPT
// FIXED: Navigation and Product Links
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================
    // 1. FIX ALL NAVIGATION LINKS
    // ======================================
    
    // Fix all anchor links that use # to point to index.html
    function fixNavigationLinks() {
        // Home links
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        homeLinks.forEach(link => {
            link.href = 'index.html';
            console.log('Fixed home link:', link);
        });
        
        // Products links
        const productsLinks = document.querySelectorAll('a[href="#products"]');
        productsLinks.forEach(link => {
            link.href = 'index.html#products';
            console.log('Fixed products link:', link);
        });
        
        // Featured/Categories links
        const featuredLinks = document.querySelectorAll('a[href="#featured"]');
        featuredLinks.forEach(link => {
            link.href = 'index.html#featured';
            console.log('Fixed featured link:', link);
        });
        
        // Footer quick links
        const footerHomeLinks = document.querySelectorAll('.footer a[href="#home"]');
        footerHomeLinks.forEach(link => {
            link.href = 'index.html';
        });
        
        const footerProductsLinks = document.querySelectorAll('.footer a[href="#products"]');
        footerProductsLinks.forEach(link => {
            link.href = 'index.html#products';
        });
        
        const footerFeaturedLinks = document.querySelectorAll('.footer a[href="#featured"]');
        footerFeaturedLinks.forEach(link => {
            link.href = 'index.html#featured';
        });
    }
    
    // ======================================
    // 2. MAKE PRODUCT CARDS CLICKABLE
    // ======================================
    
    function makeProductsClickable() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            // Remove any existing onclick to avoid duplicates
            card.removeAttribute('onclick');
            
            // Add click event listener
            card.addEventListener('click', function(e) {
                // Don't redirect if clicking on button
                if (e.target.classList.contains('btn-buy') || 
                    e.target.closest('.btn-buy')) {
                    return;
                }
                
                // Redirect to product details
                window.location.href = 'product-details.html';
            });
            
            // Fix Buy Now buttons
            const buyBtn = card.querySelector('.btn-buy');
            if (buyBtn) {
                buyBtn.removeAttribute('onclick');
                buyBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    window.location.href = 'product-details.html';
                });
            }
        });
        
        console.log('Made', productCards.length, 'product cards clickable');
    }
    
    // ======================================
    // 3. FIX CATEGORY CARDS
    // ======================================
    
    function fixCategoryCards() {
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            if (link.getAttribute('href') === '#products') {
                link.href = 'index.html#products';
            }
        });
        
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('category-link')) {
                    window.location.href = 'index.html#products';
                }
            });
        });
    }
    
    // ======================================
    // 4. FIX HERO SECTION BUTTONS
    // ======================================
    
    function fixHeroButtons() {
        const shopNowBtn = document.querySelector('.btn-primary[href="#products"]');
        if (shopNowBtn) {
            shopNowBtn.href = 'index.html#products';
        }
        
        const viewCategoriesBtn = document.querySelector('.btn-secondary[href="#featured"]');
        if (viewCategoriesBtn) {
            viewCategoriesBtn.href = 'index.html#featured';
        }
        
        const promoBtn = document.querySelector('.btn-white[href="#products"]');
        if (promoBtn) {
            promoBtn.href = 'index.html#products';
        }
    }
    
    // ======================================
    // 5. FIX ACTIVE NAVIGATION STATE
    // ======================================
    
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (currentPage === 'index.html' && (href === 'index.html' || href === 'index.html#home')) {
                link.classList.add('active');
            }
        });
    }
    
    // ======================================
    // 6. PRODUCT FILTERS (Non-functional, styled only)
    // ======================================
    
    function initFilters() {
        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', function() {
                console.log('Filter changed to:', this.value);
                // Just for show - no actual filtering
            });
        });
    }
    
    // ======================================
    // 7. PAGINATION (Non-functional, styled only)
    // ======================================
    
    function initPagination() {
        const paginationBtns = document.querySelectorAll('.pagination-btn:not([disabled])');
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active from all
                paginationBtns.forEach(b => b.classList.remove('active'));
                
                // Add active to clicked button (if it's a number)
                if (!this.textContent.includes('Previous') && !this.textContent.includes('Next')) {
                    this.classList.add('active');
                }
                
                console.log('Pagination clicked:', this.textContent);
            });
        });
    }
    
    // ======================================
    // 8. LOAD MORE BUTTON (Non-functional, styled only)
    // ======================================
    
    function initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.innerHTML = 'Load More Products';
                    alert('Demo: More products would load here');
                }, 1000);
            });
        }
    }
    
    // ======================================
    // 9. CART COUNT UPDATE (from product-details)
    // ======================================
    
    function updateCartCountFromStorage() {
        const cartBadge = document.querySelector('.count-badge');
        if (cartBadge) {
            // Get cart count from localStorage if exists
            const savedCount = localStorage.getItem('ecommerceCartCount');
            if (savedCount) {
                cartBadge.textContent = savedCount;
            }
        }
    }
    
    // ======================================
    // 10. SEARCH BAR FOCUS EFFECT
    // ======================================
    
    function initSearchBar() {
        const searchInput = document.querySelector('.search-input');
        const searchBox = document.querySelector('.search-box');
        
        if (searchInput) {
            searchInput.addEventListener('focus', function() {
                searchBox.classList.add('focused');
            });
            
            searchInput.addEventListener('blur', function() {
                searchBox.classList.remove('focused');
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    alert('🔍 Search functionality is for demo only');
                    this.blur();
                }
            });
        }
        
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('🔍 Search functionality is for demo only');
            });
        }
    }
    
    // ======================================
    // RUN ALL FUNCTIONS
    // ======================================
    
    fixNavigationLinks();
    makeProductsClickable();
    fixCategoryCards();
    fixHeroButtons();
    setActiveNavLink();
    initFilters();
    initPagination();
    initLoadMore();
    updateCartCountFromStorage();
    initSearchBar();
    
    console.log('Week 2 JavaScript loaded successfully!');
});