// ======================================
// PRODUCT DETAILS PAGE - COMPLETE INTERACTIVITY
// WEEK 3 - FIXED: Navigation back to home
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================
    // 1. FIX NAVIGATION LINKS TO HOME
    // ======================================
    
    function fixNavigationLinks() {
        // Fix Home link in navigation
        const homeLinks = document.querySelectorAll('a[href="#home"], a[href="index.html#home"]');
        homeLinks.forEach(link => {
            link.href = 'index.html';
            console.log('Fixed home link:', link);
        });
        
        // Fix logo link
        const logoLinks = document.querySelectorAll('.logo a');
        logoLinks.forEach(link => {
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
                link.href = 'index.html';
            }
        });
        
        // Fix footer links
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
        
        // Fix footer logo
        const footerLogo = document.querySelector('.footer-logo a');
        if (footerLogo) {
            footerLogo.href = 'index.html';
        }
    }
    
    // ======================================
    // 2. IMAGE GALLERY
    // ======================================
    
    window.changeImage = function(imageSrc) {
        const mainImage = document.getElementById('mainProductImage');
        if (mainImage) {
            mainImage.src = imageSrc;
            
            // Update active thumbnail
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
                if (thumb.src.includes(imageSrc)) {
                    thumb.classList.add('active');
                }
            });
        }
    };
    
    // ======================================
    // 3. QUANTITY CONTROLS
    // ======================================
    
    window.decreaseQuantity = function() {
        const input = document.getElementById('quantityInput');
        if (input) {
            let value = parseInt(input.value) || 1;
            if (value > 1) {
                input.value = value - 1;
            }
        }
    };
    
    window.increaseQuantity = function() {
        const input = document.getElementById('quantityInput');
        if (input) {
            let value = parseInt(input.value) || 1;
            if (value < 10) {
                input.value = value + 1;
            }
        }
    };
    
    // ======================================
    // 4. SIZE VALIDATION
    // ======================================
    
    function validateSize() {
        const sizeSelect = document.getElementById('sizeSelect');
        const errorMsg = document.getElementById('sizeErrorMessage');
        
        if (!sizeSelect) return true;
        
        if (sizeSelect.value === "") {
            if (errorMsg) errorMsg.style.display = "block";
            sizeSelect.style.borderColor = "#e74c3c";
            return false;
        } else {
            if (errorMsg) errorMsg.style.display = "none";
            sizeSelect.style.borderColor = "#dce1e5";
            return true;
        }
    }
    
    // ======================================
    // 5. ADD TO CART
    // ======================================
    
    window.addToCart = function() {
        if (!validateSize()) {
            alert("⚠️ Please select a size before adding to cart!");
            return;
        }
        
        const quantity = document.getElementById('quantityInput')?.value || 1;
        const cartBadge = document.querySelector('.count-badge');
        const productName = document.querySelector('.product-title-detail')?.textContent || 'Gaming Headset';
        const productPrice = document.querySelector('.current-price')?.textContent || '$89.99';
        
        // Update cart badge
        if (cartBadge) {
            let current = parseInt(cartBadge.textContent) || 0;
            let newCount = current + parseInt(quantity);
            cartBadge.textContent = newCount;
            
            // Save to localStorage for home page
            localStorage.setItem('ecommerceCartCount', newCount);
            
            // Animation
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 200);
        }
        
        alert(`✅ Added to Cart!\n\nProduct: ${productName}\nQuantity: ${quantity}\nPrice: ${productPrice}`);
    };
    
    // ======================================
    // 6. BUY NOW
    // ======================================
    
    window.buyNow = function() {
        if (!validateSize()) {
            alert("⚠️ Please select a size to continue!");
            return;
        }
        
        const quantity = document.getElementById('quantityInput')?.value || 1;
        const productName = document.querySelector('.product-title-detail')?.textContent || 'Gaming Headset';
        const price = document.querySelector('.current-price')?.textContent || '$89.99';
        const numericPrice = parseFloat(price.replace('$', '')) || 89.99;
        const total = numericPrice * parseInt(quantity);
        
        alert(`🛒 Proceeding to Checkout...\n\nProduct: ${productName}\nQuantity: ${quantity}\nTotal: $${total.toFixed(2)}`);
    };
    
    // ======================================
    // 7. TOGGLE WISHLIST
    // ======================================
    
    window.toggleWishlist = function(btn) {
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.color = '#ff6b6b';
            btn.style.borderColor = '#ff6b6b';
            btn.style.backgroundColor = '#fff5f5';
            alert('❤️ Added to Wishlist');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.color = '#5d6b7c';
            btn.style.borderColor = '#dce1e5';
            btn.style.backgroundColor = 'white';
            alert('💔 Removed from Wishlist');
        }
    };
    
    // ======================================
    // 8. HELPFUL BUTTON
    // ======================================
    
    window.markHelpful = function(btn) {
        if (btn.classList.contains('clicked')) {
            return;
        }
        
        btn.classList.add('clicked');
        btn.style.backgroundColor = '#0066cc';
        btn.style.color = 'white';
        btn.style.borderColor = '#0066cc';
        
        let text = btn.innerHTML;
        let countMatch = text.match(/\d+/);
        let count = countMatch ? parseInt(countMatch[0]) : 0;
        btn.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count + 1})`;
    };
    
    // ======================================
    // 9. RELATED PRODUCTS CLICKABLE
    // ======================================
    
    function makeRelatedProductsClickable() {
        const relatedCards = document.querySelectorAll('.related-products-grid .product-card');
        
        relatedCards.forEach(card => {
            // Remove any existing onclick
            card.removeAttribute('onclick');
            
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-buy') || e.target.closest('.btn-buy')) {
                    e.stopPropagation();
                    window.location.href = 'product-details.html';
                    return;
                }
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
    }
    
    // ======================================
    // 10. BREADCRUMB LINKS
    // ======================================
    
    function fixBreadcrumbLinks() {
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
        breadcrumbLinks.forEach(link => {
            if (link.getAttribute('href') === '#products' || link.getAttribute('href') === 'index.html#products') {
                link.href = 'index.html#products';
            }
            if (link.textContent.includes('Home')) {
                link.href = 'index.html';
            }
        });
    }
    
    // ======================================
    // 11. SIZE SELECT CHANGE EVENT
    // ======================================
    
    function initSizeSelect() {
        const sizeSelect = document.getElementById('sizeSelect');
        if (sizeSelect) {
            sizeSelect.addEventListener('change', function() {
                if (this.value !== "") {
                    this.style.borderColor = '#2ecc71';
                    const errorMsg = document.getElementById('sizeErrorMessage');
                    if (errorMsg) errorMsg.style.display = 'none';
                } else {
                    this.style.borderColor = '#e74c3c';
                }
            });
        }
    }
    
    // ======================================
    // 12. SET ACTIVE THUMBNAIL
    // ======================================
    
    function setActiveThumbnail() {
        const firstThumb = document.querySelector('.thumbnail');
        if (firstThumb) {
            firstThumb.classList.add('active');
        }
    }
    
    // ======================================
    // 13. LOAD MORE REVIEWS (Demo)
    // ======================================
    
    function initLoadMoreReviews() {
        const loadMoreBtn = document.querySelector('.load-more-reviews');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.innerHTML = 'Load More Reviews';
                    alert('📝 Demo: More reviews would load here');
                }, 1000);
            });
        }
    }
    
    // ======================================
    // 14. CART COUNT FROM STORAGE
    // ======================================
    
    function loadCartCount() {
        const cartBadge = document.querySelector('.count-badge');
        if (cartBadge) {
            const savedCount = localStorage.getItem('ecommerceCartCount');
            if (savedCount) {
                cartBadge.textContent = savedCount;
            }
        }
    }
    
    // ======================================
    // RUN ALL FUNCTIONS
    // ======================================
    
    fixNavigationLinks();
    makeRelatedProductsClickable();
    fixBreadcrumbLinks();
    initSizeSelect();
    setActiveThumbnail();
    initLoadMoreReviews();
    loadCartCount();
    
    console.log('Product Details JavaScript loaded successfully!');
});