function get_headlines(e) {
    // Get category name
    const category = e.currentTarget.dataset.category;
    const tab = e.currentTarget.dataset.bsTarget;

    // World category
    if (category == 'world') {
        load_world_headlines(category, tab);
    }
}


// Loads world news
function load_world_headlines(category, tab) {
    // Get tab where content will be populated and empty it
    const contentTab = document.querySelector(tab);
    contentTab.innerHTML = placeholderBanner;
    contentTab.innerHTML += placeholderHeading;
    contentTab.innerHTML += create_placeholder_cards(4);

    fetch(`headlines/${category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Check status
        if (data.status == "error") {
            console.log(data.message);
        }
        if (data.status == "ok") {

            const articles = data.articles;

            contentTab.innerHTML = carousel;
            contentTab.innerHTML += create_heading('Top Headlines');
            contentTab.innerHTML += create_articles_row('world-tab-articles-row');

            create_carousel_item('#myCarousel', articles[0], true);

            // Create first 4 carousels and other cards
            for (let i = 1; i < articles.length; i++) {
                if (i < 4) {
                    create_carousel_item('#myCarousel', articles[i], false);
                    continue;
                }
                create_articles_columns(articles[i], '#world-tab-articles-row');
            }
        }

    })
    .catch(err => {
        console.log(err);
    })
}


// Load specific category news
function load_news(category, tab) {
    
}

