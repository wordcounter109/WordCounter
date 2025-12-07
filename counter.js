/* ============================================
   WORD COUNTER - CORE FUNCTIONALITY
   ============================================ */

// Counter Class for Word and Character Counting
class WordCounter {
    constructor(textareaId) {
        this.textarea = document.getElementById(textareaId);
        this.wordCountEl = document.getElementById('wordCount');
        this.charCountEl = document.getElementById('charCount');
        this.charCountNoSpaceEl = document.getElementById('charCountNoSpace');
        this.sentenceCountEl = document.getElementById('sentenceCount');
        this.paragraphCountEl = document.getElementById('paragraphCount');
        this.readingTimeEl = document.getElementById('readingTime');
        
        this.init();
    }

    init() {
        // Add event listener for real-time counting
        this.textarea.addEventListener('input', () => this.updateCounts());
        
        // Initial count
        this.updateCounts();
    }

    countWords(text) {
        // Remove extra whitespace and count words
        const words = text.trim().split(/\s+/);
        return text.trim() === '' ? 0 : words.length;
    }

    countCharacters(text) {
        return text.length;
    }

    countCharactersNoSpaces(text) {
        return text.replace(/\s+/g, '').length;
    }

    countSentences(text) {
        // Count sentences based on punctuation
        if (text.trim() === '') return 0;
        const sentences = text.match(/[.!?]+/g);
        return sentences ? sentences.length : 0;
    }

    countParagraphs(text) {
        // Count non-empty paragraphs
        if (text.trim() === '') return 0;
        const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '');
        return paragraphs.length;
    }

    calculateReadingTime(wordCount) {
        // Average reading speed: 200 words per minute
        const wordsPerMinute = 200;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    }

    animateValue(element, newValue) {
        const currentValue = parseInt(element.textContent) || 0;
        
        if (currentValue === newValue) return;

        // Add animation class
        element.classList.add('updating');
        
        // Animate the number change
        const duration = 300;
        const steps = 20;
        const stepValue = (newValue - currentValue) / steps;
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            const value = Math.round(currentValue + (stepValue * currentStep));
            element.textContent = value;
            
            if (currentStep >= steps) {
                element.textContent = newValue;
                clearInterval(interval);
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    element.classList.remove('updating');
                }, 100);
            }
        }, stepDuration);
    }

    updateCounts() {
        const text = this.textarea.value;
        
        // Calculate all counts
        const wordCount = this.countWords(text);
        const charCount = this.countCharacters(text);
        const charCountNoSpace = this.countCharactersNoSpaces(text);
        const sentenceCount = this.countSentences(text);
        const paragraphCount = this.countParagraphs(text);
        const readingTime = this.calculateReadingTime(wordCount);
        
        // Update UI with animations
        this.animateValue(this.wordCountEl, wordCount);
        this.animateValue(this.charCountEl, charCount);
        this.animateValue(this.charCountNoSpaceEl, charCountNoSpace);
        this.animateValue(this.sentenceCountEl, sentenceCount);
        this.animateValue(this.paragraphCountEl, paragraphCount);
        this.animateValue(this.readingTimeEl, readingTime);
    }
}

// Button Actions
class CounterActions {
    constructor(textareaId, clearBtnId, copyBtnId) {
        this.textarea = document.getElementById(textareaId);
        this.clearBtn = document.getElementById(clearBtnId);
        this.copyBtn = document.getElementById(copyBtnId);
        
        this.init();
    }

    init() {
        // Clear button functionality
        this.clearBtn.addEventListener('click', () => this.clearText());
        
        // Copy button functionality
        this.copyBtn.addEventListener('click', () => this.copyText());
    }

    clearText() {
        if (this.textarea.value.trim() === '') {
            this.showNotification('Text area is already empty!', 'info');
            return;
        }

        // Confirm before clearing if there's substantial text
        if (this.textarea.value.length > 100) {
            if (!confirm('Are you sure you want to clear all text?')) {
                return;
            }
        }

        this.textarea.value = '';
        this.textarea.dispatchEvent(new Event('input'));
        this.textarea.focus();
        
        this.showNotification('Text cleared successfully!', 'success');
    }

    async copyText() {
        if (this.textarea.value.trim() === '') {
            this.showNotification('Nothing to copy!', 'warning');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.textarea.value);
            this.showNotification('Text copied to clipboard!', 'success');
            
            // Visual feedback on button
            const originalHTML = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            this.copyBtn.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                this.copyBtn.innerHTML = originalHTML;
                this.copyBtn.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            this.showNotification('Failed to copy text. Please try again.', 'error');
            console.error('Copy failed:', err);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${this.getNotificationColor(type)};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        // Add icon based on type
        const icon = this.getNotificationIcon(type);
        notification.innerHTML = `<i class="${icon}"></i> ${message}`;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
        return colors[type] || colors.info;
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize word counter
    const counter = new WordCounter('textInput');
    
    // Initialize button actions
    const actions = new CounterActions('textInput', 'clearBtn', 'copyBtn');
    
    // Add sample text for demonstration (optional)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('demo')) {
        const sampleText = `Welcome to Word Counter! This is a sample text to demonstrate the functionality of our tool. 

Students can use this tool to track their essay word counts and ensure they meet assignment requirements. Whether you're writing a 500-word reflection or a 5000-word research paper, our counter helps you stay on track.

Bloggers and content writers benefit from understanding their content length. Different platforms have different optimal lengths - LinkedIn articles perform well at 1500 words, while Twitter threads need to be concise.

SEO professionals know that content length matters for rankings. Comprehensive articles between 1500-2500 words tend to perform better in search results. Use our tool to optimize your content for both users and search engines!`;
        
        document.getElementById('textInput').value = sampleText;
        counter.updateCounts();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to clear text
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('clearBtn').click();
    }
    
    // Ctrl/Cmd + Shift + C to copy text
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        document.getElementById('copyBtn').click();
    }
});