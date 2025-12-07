/* ============================================
   WORD COUNTER - ANIMATIONS & EFFECTS
   ============================================ */

// Floating Particles Animation
class ParticleSystem {
    constructor(containerId, particleCount = 30) {
        this.container = document.getElementById(containerId);
        this.particleCount = particleCount;
        this.particles = [];
        this.symbols = ['A', 'B', 'C', 'a', 'b', 'c', '1', '2', '3', '@', '#', '&', '•', '○', '◆', '★'];
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random symbol
        const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        particle.textContent = symbol;
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        
        // Random animation duration (10-30 seconds)
        const duration = 10 + Math.random() * 20;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random size
        const size = 1 + Math.random() * 1.5;
        particle.style.fontSize = `${size}rem`;
        
        // Random opacity
        const opacity = 0.2 + Math.random() * 0.4;
        particle.style.opacity = opacity;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    destroy() {
        this.particles.forEach(particle => {
            this.container.removeChild(particle);
        });
        this.particles = [];
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Get all elements with fade-in-up class
        this.elements = document.querySelectorAll('.fade-in-up');
        
        // Create intersection observer
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, options);
        
        // Observe all elements
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 50;
        
        this.init();
    }

    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                this.navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                this.navbar.style.backgroundColor = '#ffffff';
            }
        });
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Textarea Auto-resize
class TextareaAutoResize {
    constructor(textareaId) {
        this.textarea = document.getElementById(textareaId);
        this.init();
    }

    init() {
        if (!this.textarea) return;
        
        this.textarea.addEventListener('input', () => {
            this.resize();
        });
        
        // Initial resize
        this.resize();
    }

    resize() {
        // Reset height to auto to get the correct scrollHeight
        this.textarea.style.height = 'auto';
        
        // Set new height based on content
        const newHeight = Math.max(300, this.textarea.scrollHeight);
        this.textarea.style.height = newHeight + 'px';
    }
}

// Stats Counter Animation on Hover
class StatsHoverEffect {
    constructor() {
        this.init();
    }

    init() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const value = item.querySelector('.stat-value');
                if (value) {
                    value.style.transform = 'scale(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const value = item.querySelector('.stat-value');
                if (value) {
                    value.style.transform = 'scale(1)';
                }
            });
        });
    }
}

// Button Ripple Effect
class RippleEffect {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.className = 'ripple';
                
                ripple.style.cssText += `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;
                
                // Ensure button has position relative
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero-section');
        this.init();
    }

    init() {
        if (!this.hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < this.hero.offsetHeight) {
                this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add fade-in to body after page loads
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.animation = 'fadeIn 0.5s ease-out forwards';
        });
    }
}

// Feature Cards Stagger Animation
class FeatureCardsAnimation {
    constructor() {
        this.init();
    }

    init() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1
        });
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });
    }
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem('particlesContainer', 30);
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize navbar scroll effect
    new NavbarScroll();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize textarea auto-resize
    new TextareaAutoResize('textInput');
    
    // Initialize stats hover effect
    new StatsHoverEffect();
    
    // Initialize button ripple effect
    new RippleEffect();
    
    // Initialize parallax effect
    new ParallaxEffect();
    
    // Initialize loading animation
    new LoadingAnimation();
    
    // Initialize feature cards animation
    new FeatureCardsAnimation();
});

// Add custom CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);