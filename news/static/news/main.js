document.addEventListener('DOMContentLoaded', () => {
    
    // Add event listeners to category buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => load_headlines(e));
    });

    // Default
    document.querySelector('#world-tab').click();

    // Source search event
    document.querySelector('#sources-search').addEventListener('input', (e) => search_sources(e));

});
