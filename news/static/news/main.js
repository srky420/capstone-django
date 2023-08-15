document.addEventListener('DOMContentLoaded', () => {
    
    // Add event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => get_headlines(e));
    });

    // Default
    // document.querySelector('#world-tab').click();

});