// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

const toggleMobileMenu = () => {
    navLinks.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
    mobileMenuBtn.setAttribute('aria-expanded', 
        mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
};

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navLinks.classList.contains('show') && 
        !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        toggleMobileMenu();
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMobileMenu();
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add animation classes on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step, .testimonial');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate-fade-in');
        }
    });
};

// Initial check on page load
window.addEventListener('load', animateOnScroll);

// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Handle responsive menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('show');
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Add animation delay classes to elements
const addAnimationDelays = () => {
    const features = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    
    features.forEach((feature, index) => {
        feature.classList.add(`delay-${index + 1}`);
    });
    
    steps.forEach((step, index) => {
        step.classList.add(`delay-${index + 1}`);
    });
};

// Video Play Functionality
const initVideoPlayer = () => {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const videoElement = document.querySelector('.video-element');
    const playButton = document.querySelector('.play-button');
    const thumbnail = document.querySelector('.video-thumbnail');
    const playPauseBtn = document.querySelector('.play-pause');
    const forwardBtn = document.querySelector('.forward-10');
    const rewindBtn = document.querySelector('.rewind-10');
    const videoControls = document.querySelector('.video-controls');
    
    if (!videoPlaceholder || !videoElement) return;
    
    const updatePlayPauseIcon = () => {
        if (playPauseBtn) {
            playPauseBtn.innerHTML = videoElement.paused 
                ? '<i class="fas fa-play"></i>' 
                : '<i class="fas fa-pause"></i>';
        }
    };
    
    const togglePlayPause = () => {
        if (videoElement.paused) {
            videoElement.play();
            videoElement.classList.add('playing');
        } else {
            videoElement.pause();
            videoElement.classList.remove('playing');
        }
        updatePlayPauseIcon();
    };
    
    const playVideo = () => {
        // Show the video element and hide the thumbnail
        videoElement.style.display = 'block';
        thumbnail.style.display = 'none';
        playButton.style.display = 'none';
        
        // Play the video
        videoElement.play().then(() => {
            videoElement.classList.add('playing');
            updatePlayPauseIcon();
        }).catch(error => {
            console.error('Error playing video:', error);
            // Fallback to showing the controls if autoplay is blocked
            videoElement.controls = true;
        });
        
        // When video ends, show the thumbnail and play button again
        videoElement.onended = () => {
            videoElement.classList.remove('playing');
            thumbnail.style.display = 'block';
            playButton.style.display = 'flex';
            videoElement.style.display = 'none';
            updatePlayPauseIcon();
        };
    };
    
    // Click on the play button or thumbnail to play the video
    playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        playVideo();
    });
    
    // Also allow clicking on the thumbnail to play
    thumbnail.addEventListener('click', (e) => {
        e.stopPropagation();
        playVideo();
    });
    
    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });
    }
    
    // Forward 10 seconds
    if (forwardBtn) {
        forwardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
        });
    }
    
    // Rewind 10 seconds
    if (rewindBtn) {
        rewindBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
        });
    }
    
    // Click on video to toggle play/pause
    videoElement.addEventListener('click', () => {
        togglePlayPause();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!videoElement.classList.contains('playing') && document.activeElement !== videoElement) return;
        
        switch (e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowRight':
                e.preventDefault();
                videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
                break;
        }
    });
    
    // Pause video when it's not in viewport for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is in view
                if (!videoElement.paused) return;
            } else {
                // Video is out of view
                if (!videoElement.paused) {
                    videoElement.pause();
                    videoElement.classList.remove('playing');
                    // Reset to show thumbnail and play button if not at the end
                    if (videoElement.currentTime < videoElement.duration - 1) {
                        thumbnail.style.display = 'block';
                        playButton.style.display = 'flex';
                        videoElement.style.display = 'none';
                    }
                    updatePlayPauseIcon();
                }
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(videoElement);
};

// Initialize animations and video player
document.addEventListener('DOMContentLoaded', () => {
    addAnimationDelays();
    initVideoPlayer();
    
    // Set initial state for mobile menu
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
    }
});