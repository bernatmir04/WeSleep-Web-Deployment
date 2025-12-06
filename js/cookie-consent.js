// Cookie Consent Management
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    // Check if user has already made a choice
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // If no choice was made yet, show the banner
    if (cookiesAccepted === null) {
        // Small delay to ensure CSS is loaded
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
    
    // Handle accept button click
    acceptCookies.addEventListener('click', function() {
        setCookieConsent(true);
        cookieConsent.classList.remove('show');
        
        // Initialize analytics if accepted
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    });
    
    // Handle decline button click
    declineCookies.addEventListener('click', function() {
        setCookieConsent(false);
        cookieConsent.classList.remove('show');
        
        // Disable analytics if declined
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    });
    
    // Save user's choice
    function setCookieConsent(accepted) {
        localStorage.setItem('cookiesAccepted', accepted);
        
        // Set a cookie that expires in 1 year
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = `cookie_consent=${accepted}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    }
    
    // Handle language changes
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            // Re-show cookie banner on language change if not accepted
            if (localStorage.getItem('cookiesAccepted') === null) {
                cookieConsent.classList.add('show');
            }
        });
    });
});
