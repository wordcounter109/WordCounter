/* ============================================
   WORD COUNTER - MAIN JAVASCRIPT
   ============================================ */

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.init();
    }

    init() {
        if (!this.menuBtn || !this.navMenu) return;
        
        this.menuBtn.addEventListener('click', () => {
            this.toggle();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.close();
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = this.navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
    }

    toggle() {
        this.navMenu.classList.toggle('active');
        
        // Change icon
        const icon = this.menuBtn.querySelector('i');
        if (this.navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    close() {
        this.navMenu.classList.remove('active');
        const icon = this.menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Dark Mode Toggle (Optional Enhancement)
class DarkModeToggle {
    constructor() {
        this.darkMode = localStorage.getItem('darkMode') === 'enabled';
        this.init();
    }

    init() {
        // Apply saved preference
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    toggle() {
        this.darkMode = !this.darkMode;
        
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.setAttribute('aria-label', 'Scroll to top');
        
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c2f711 0%, #a8d410 100%);
            color: #2c2c2c;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(button);
        return button;
    }

    init() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'translateY(-5px) scale(1.1)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log(`%c📊 Page Performance Stats`, 'color: #c2f711; font-weight: bold; font-size: 14px;');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
                
                // Log if page is slow
                if (pageLoadTime > 3000) {
                    console.warn('Page load time is slow. Consider optimization.');
                }
            });
        }
    }
}

// Analytics Helper (for tracking user interactions)
class AnalyticsHelper {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn')) {
                const btnText = e.target.textContent.trim();
                this.trackEvent('Button Click', btnText);
            }
        });

        // Track textarea focus
        const textarea = document.getElementById('textInput');
        if (textarea) {
            let focusTime = 0;
            
            textarea.addEventListener('focus', () => {
                focusTime = Date.now();
                this.trackEvent('Textarea Focus', 'User started typing');
            });

            textarea.addEventListener('blur', () => {
                if (focusTime) {
                    const duration = Math.round((Date.now() - focusTime) / 1000);
                    this.trackEvent('Textarea Blur', `Duration: ${duration}s`);
                }
            });
        }
    }

    trackEvent(eventName, eventData) {
        const event = {
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        };
        
        this.events.push(event);
        
        // Log to console for debugging
        console.log(`📌 Event: ${eventName}`, eventData);
        
        // Here you can send to actual analytics service
        // Example: gtag('event', eventName, { event_data: eventData });
    }

    getEvents() {
        return this.events;
    }
}

// Local Storage Manager for saving text
class TextStorage {
    constructor(textareaId) {
        this.textarea = document.getElementById(textareaId);
        this.storageKey = 'wordcounter_saved_text';
        this.autoSaveInterval = 5000; // 5 seconds
        
        this.init();
    }

    init() {
        if (!this.textarea) return;
        
        // Load saved text on page load
        this.loadText();
        
        // Auto-save every 5 seconds
        setInterval(() => {
            this.saveText();
        }, this.autoSaveInterval);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => {
            this.saveText();
        });
    }

    saveText() {
        if (this.textarea.value.trim() !== '') {
            localStorage.setItem(this.storageKey, this.textarea.value);
            console.log('💾 Text auto-saved');
        }
    }

    loadText() {
        const savedText = localStorage.getItem(this.storageKey);
        if (savedText && this.textarea.value.trim() === '') {
            // Ask user if they want to restore
            if (confirm('We found saved text from your last session. Would you like to restore it?')) {
                this.textarea.value = savedText;
                this.textarea.dispatchEvent(new Event('input'));
            } else {
                this.clearStorage();
            }
        }
    }

    clearStorage() {
        localStorage.removeItem(this.storageKey);
        console.log('🗑️ Saved text cleared');
    }
}

// Utility Functions
const Utils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Easter Egg - Konami Code
class KonamiCode {
    constructor() {
        this.pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.pattern[this.current]) {
                this.current++;
                
                if (this.current === this.pattern.length) {
                    this.activate();
                    this.current = 0;
                }
            } else {
                this.current = 0;
            }
        });
    }

    activate() {
        // Fun easter egg effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        alert('🎉 Konami Code Activated! You found the secret!');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    new MobileMenu();
    
    // Initialize dark mode (optional)
    // new DarkModeToggle();
    
    // Initialize scroll to top button
    new ScrollToTop();
    
    // Initialize performance monitoring
    new PerformanceMonitor();
    
    // Initialize analytics helper
    new AnalyticsHelper();
    
    // Initialize text storage (auto-save)
    new TextStorage('textInput');
    
    // Initialize Konami code easter egg
    new KonamiCode();
    
    console.log('%c✨ Word Counter Loaded Successfully!', 'color: #c2f711; font-weight: bold; font-size: 16px;');
    console.log('%cVersion 1.0.0 | © 2024 Word Counter', 'color: #5e5e5e;');
});

// Export utilities for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);