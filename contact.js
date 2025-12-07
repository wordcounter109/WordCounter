/* ============================================
   WORD COUNTER - CONTACT FORM HANDLER
   ============================================ */

class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.responseDiv = document.getElementById('formResponse');
        
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        
        // Remove previous error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Remove error class
        field.classList.remove('error');
        
        // Validation rules
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (fieldName === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (fieldName === 'name' && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        } else if (fieldName === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        field.parentElement.appendChild(errorDiv);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    async handleSubmit() {
        // Validate all fields
        if (!this.validateForm()) {
            this.showResponse('Please fix the errors before submitting.', 'error');
            return;
        }
        
        // Get form data
        const formData = {
            name: this.form.querySelector('#name').value.trim(),
            email: this.form.querySelector('#email').value.trim(),
            subject: this.form.querySelector('#subject').value.trim(),
            message: this.form.querySelector('#message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (in production, this would send to a server)
        try {
            await this.simulateSubmission(formData);
            
            // Show success message
            this.showResponse(
                'Thank you for contacting us! We\'ve received your message and will get back to you within 24-48 hours.',
                'success'
            );
            
            // Reset form
            this.form.reset();
            
            // Log to console (in production, this would be sent to server/analytics)
            console.log('Contact form submitted:', formData);
            
        } catch (error) {
            this.showResponse(
                'Sorry, there was an error sending your message. Please try again or email us directly at support@wordcounter.com',
                'error'
            );
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }

    simulateSubmission(data) {
        // Simulate API call with delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 95% success rate simulation
                if (Math.random() > 0.05) {
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    showResponse(message, type) {
        this.responseDiv.style.display = 'block';
        this.responseDiv.className = `response-message response-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const bgColor = type === 'success' ? '#4caf50' : '#f44336';
        
        this.responseDiv.style.cssText = `
            display: block;
            padding: 1.5rem;
            background-color: ${bgColor};
            color: white;
            border-radius: 8px;
            margin-top: 1.5rem;
            animation: slideInRight 0.5s ease-out;
        `;
        
        this.responseDiv.innerHTML = `
            <i class="fas ${icon}" style="margin-right: 0.5rem;"></i>
            ${message}
        `;
        
        // Scroll to response
        this.responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.responseDiv.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => {
                    this.responseDiv.style.display = 'none';
                }, 500);
            }, 10000);
        }
    }
}

// Add custom styles for form validation
const formStyles = document.createElement('style');
formStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #f44336 !important;
    }

    .faq-section {
        margin-top: 5rem;
    }

    .faq-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .faq-item {
        background: var(--bg-light);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: var(--shadow-sm);
        transition: var(--transition);
    }

    .faq-item:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-4px);
    }

    .faq-item h3 {
        font-size: 1.2rem;
        color: var(--text-dark);
        margin-bottom: 1rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .faq-item h3 i {
        color: var(--primary-color);
    }

    .faq-item p {
        color: var(--secondary-color);
        line-height: 1.7;
    }

    .social-section {
        margin-top: 3rem;
    }

    @media (max-width: 768px) {
        .faq-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(formStyles);

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm('contactForm');
    console.log('📧 Contact form initialized');
});