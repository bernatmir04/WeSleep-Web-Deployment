// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    // Function to close all accordion items except the one that was clicked
    function closeOtherAccordions(currentButton) {
        accordionButtons.forEach(button => {
            if (button !== currentButton && button.getAttribute('aria-expanded') === 'true') {
                button.setAttribute('aria-expanded', 'false');
                const content = button.nextElementSibling;
                content.style.maxHeight = '0';
                content.style.padding = '0 25px';
            }
        });
    }
    
    // Add click event to each accordion button
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const content = this.nextElementSibling;
            
            // Close all other accordion items
            if (!isExpanded) {
                closeOtherAccordions(this);
            }
            
            // Toggle current accordion item
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                // Open the accordion
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '0 25px 20px 25px';
            } else {
                // Close the accordion
                content.style.maxHeight = '0';
                content.style.padding = '0 25px';
            }
        });
        
        // Add keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Initialize first accordion as open by default
    if (accordionButtons.length > 0) {
        const firstButton = accordionButtons[0];
        const firstContent = firstButton.nextElementSibling;
        firstButton.setAttribute('aria-expanded', 'true');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstContent.style.padding = '0 25px 20px 25px';
    }
});
