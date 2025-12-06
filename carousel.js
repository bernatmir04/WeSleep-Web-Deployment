document.addEventListener('DOMContentLoaded', () => {
    class Carousel {
        constructor(container) {
            this.container = container;
            this.items = Array.from(container.querySelectorAll('.carousel-item'));
            this.indicators = Array.from(container.querySelectorAll('.indicator'));
            this.prevBtn = container.querySelector('.carousel-control.prev');
            this.nextBtn = container.querySelector('.carousel-control.next');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            
            this.init();
        }
        
        init() {
            // Set initial active state
            this.updateActiveItem();
            
            // Event listeners
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
            
            // Indicator click events
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goTo(index));
            });
            
            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            this.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
            
            // Start autoplay
            this.startAutoPlay();
            
            // Pause autoplay on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        updateActiveItem() {
            // Update items
            this.items.forEach((item, index) => {
                item.classList.toggle('active', index === this.currentIndex);
            });
            
            // Update indicators
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.updateActiveItem();
        }
        
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.updateActiveItem();
        }
        
        goTo(index) {
            this.currentIndex = index;
            this.updateActiveItem();
        }
        
        handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for a swipe
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }
        
        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => this.next(), 5000);
        }
        
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    }
    
    // Initialize all carousels on the page
    document.querySelectorAll('.carousel').forEach(carouselEl => {
        new Carousel(carouselEl);
    });
});

