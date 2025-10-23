// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and other elements
    const animatedElements = document.querySelectorAll('.service-card, .option-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Phone number click tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Phone number clicked:', this.href);
        });
    });
    
    // Form submission handling (if you add a contact form later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation and submission logic here
            const formData = new FormData(this);
            
            // Example: Show success message
            showNotification('Thank you for your message. We will contact you soon!', 'success');
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#2c5aa0'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Add click-to-call functionality for mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const phoneNumbers = document.querySelectorAll('.phone-btn, .contact-item a[href^="tel:"]');
        phoneNumbers.forEach(phone => {
            phone.style.cursor = 'pointer';
        });
    }
    
    // Lazy loading for images (if you add images later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;
            
            const originalText = this.innerHTML;
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Reset after 2 seconds (adjust based on your needs)
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = originalText;
            }, 2000);
        });
    });
    
    // Add CSS for loading buttons
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .btn.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .btn.loading .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Mobile menu functionality (add if needed)
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const navBrand = document.querySelector('.nav-brand');
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.className = 'mobile-menu-btn';
        
        // Position the menu button relative to the nav-brand
        navBrand.style.position = 'relative';
        navBrand.appendChild(menuButton);
        
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
                nav.classList.remove('active');
                menuButton.querySelector('i').className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuButton.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeNav = document.querySelector('.nav.active');
            if (activeNav) {
                activeNav.classList.remove('active');
                document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
            }
        }
    });
    
    console.log('Website initialized successfully! 🏥');
});

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);
