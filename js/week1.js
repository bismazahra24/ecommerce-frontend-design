// week1.js - Complete JavaScript for Header and Footer

document.addEventListener('DOMContentLoaded', function() {
    console.log('Ecommerce Store - Week 1 Complete Loaded');
    
    // ========== HEADER FUNCTIONALITY ==========
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    function performSearch() {
        if (searchInput.value.trim() !== '') {
            alert(`🔍 Searching for: "${searchInput.value}"`);
            searchInput.value = '';
        } else {
            searchInput.focus();
            searchInput.placeholder = 'Type something to search...';
            setTimeout(() => {
                searchInput.placeholder = 'Search for products...';
            }, 2000);
        }
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartBadge = document.querySelector('.count-badge');
    
    if (cartBtn && cartBadge) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            let currentCount = parseInt(cartBadge.textContent) || 0;
            cartBadge.textContent = currentCount + 1;
            
            // Animation effect
            cartBadge.style.transform = 'scale(1.3)';
            cartBtn.style.backgroundColor = '#e0f2fe';
            cartBtn.style.borderColor = '#38bdf8';
            
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
                cartBtn.style.backgroundColor = '';
                cartBtn.style.borderColor = '';
            }, 300);
            
            // Notification
            showNotification('🎉 Item added to cart!', 'success');
        });
    }
    
    // Country selection for shipping
    const shippingItems = document.querySelectorAll('.shipping-dropdown .dropdown-item');
    const shippingBtn = document.querySelector('.shipping-dropdown .dropdown-btn span');
    const shippingIcon = document.querySelector('.shipping-dropdown .fa-shipping-fast');
    
    shippingItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const countryName = this.textContent.trim();
            const flagSrc = this.querySelector('.flag-icon').src;
            
            // Update button text
            shippingBtn.textContent = `Shipping to: ${countryName}`;
            
            // Visual feedback
            shippingBtn.parentElement.style.backgroundColor = '#e0f2fe';
            shippingBtn.parentElement.style.borderColor = '#38bdf8';
            
            setTimeout(() => {
                shippingBtn.parentElement.style.backgroundColor = '';
                shippingBtn.parentElement.style.borderColor = '';
            }, 500);
            
            // Notification
            showNotification(`🚚 Shipping country changed to: ${countryName}`, 'info');
        });
    });
    
    // Language selection
    const languageItems = document.querySelectorAll('.language-dropdown .dropdown-item');
    const languageBtn = document.querySelector('.language-dropdown .dropdown-btn span');
    const globeIcon = document.querySelector('.language-dropdown .fa-globe');
    
    languageItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const languageName = this.textContent.trim();
            const flagSrc = this.querySelector('.flag-icon').src;
            
            // Update button text
            languageBtn.textContent = languageName;
            
            // Visual feedback
            languageBtn.parentElement.style.backgroundColor = '#f0f9ff';
            languageBtn.parentElement.style.borderColor = '#7dd3fc';
            
            setTimeout(() => {
                languageBtn.parentElement.style.backgroundColor = '';
                languageBtn.parentElement.style.borderColor = '';
            }, 500);
            
            // Notification
            showNotification(`🌐 Language changed to: ${languageName}`, 'info');
        });
    });
    
    // Categories dropdown hover effect
    const categoriesDropdown = document.querySelector('.dropdown.categories-menu');
    const categoriesLink = document.querySelector('.nav-link[href="#"]');
    
    if (categoriesDropdown) {
        categoriesDropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').style.display = 'block';
        });
        
        categoriesDropdown.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!this.matches(':hover')) {
                    this.querySelector('.dropdown-menu').style.display = 'none';
                }
            }, 300);
        });
    }
    
    // ========== FOOTER FUNCTIONALITY ==========
    
    // App buttons hover effect
    const appButtons = document.querySelectorAll('.app-btn');
    appButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Click effect
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.querySelector('img').alt;
            showNotification(`📱 Redirecting to download ${appName}...`, 'info');
        });
    });
    
    // Social links hover and click effects
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1].split('-')[1];
            showNotification(`🔗 Opening ${platform}...`, 'info');
        });
    });
    
    // Footer links click effects
    const footerLinks = document.querySelectorAll('.footer-col ul a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            showNotification(`🔗 Navigating to: ${linkText}`, 'info');
        });
    });
    
    // Payment methods hover effect
    const paymentIcons = document.querySelectorAll('.payment-methods i');
    paymentIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.color = '#ffffff';
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'scale(1)';
        });
        
        icon.addEventListener('click', function() {
            const paymentMethod = this.title;
            showNotification(`💳 Selected payment method: ${paymentMethod}`, 'info');
        });
    });
    
    // ========== MOBILE MENU FUNCTIONALITY ==========
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.style.display = 'none';
    
    const headerTop = document.querySelector('.header-top');
    if (headerTop) {
        headerTop.appendChild(mobileToggle);
    }
    
    // Check if mobile and add toggle functionality
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
            const nav = document.querySelector('.main-nav');
            if (nav) {
                nav.style.display = 'none';
            }
            
            mobileToggle.onclick = function() {
                const nav = document.querySelector('.main-nav');
                if (nav) {
                    nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
                    this.innerHTML = nav.style.display === 'none' ? 
                        '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
                    
                    // Add animation
                    nav.style.animation = nav.style.display === 'block' ? 
                        'slideDown 0.3s ease' : '';
                }
            };
        } else {
            mobileToggle.style.display = 'none';
            const nav = document.querySelector('.main-nav');
            if (nav) {
                nav.style.display = 'block';
                nav.style.animation = '';
            }
        }
    }
    
    // Add CSS animation for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // ========== HELPER FUNCTIONS ==========
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideIn 0.3s ease;
        `;
        
        // Add close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 14px;
            opacity: 0.8;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
        });
        
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Add animation styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(notificationStyle);
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
    
    // ========== INITIALIZATION ==========
    
    // Initialize dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                setTimeout(() => {
                    if (!this.matches(':hover') && !menu.matches(':hover')) {
                        menu.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
    
    // Add hover effect to header links
    const headerLinks = document.querySelectorAll('.nav-link');
    headerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#2563eb';
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
            }
            this.style.transform = '';
        });
    });
    
    // Initialize current year in footer copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace('2024', currentYear);
    }
    
    // Log initialization
    console.log('✅ Header and Footer functionality loaded successfully');
});