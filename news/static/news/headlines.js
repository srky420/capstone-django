function load_headlines(e) {
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

    // Get tab where content will be populated
    const contentTab = document.querySelector(tab);

    // Show placeholders while content is loaded
    contentTab.innerHTML = placeholderCarousel;
    contentTab.innerHTML += create_placeholder_articles(4);

    fetch(`headlines/${category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Check status
        if (data.status == "error") {
            console.log(data.message);
        }
        if (data.status == "ok") {

            // Main articles for carousel and articles for column view
            const mainArticles = data.articles.slice(0, 4);
            const articlesFirst = data.articles.slice(4, 8);
            const wideArticleFirst = data.articles[8];
            const articlesSecond = data.articles.slice(9, data.articles.length - 1);
            const wideArticleSecond = data.articles[data.articles.length - 1]
            const sources = data.sources;

            contentTab.innerHTML = create_carousel('world-tab-carousel', mainArticles);
            contentTab.innerHTML += create_articles(articlesFirst, "Recent News");
            contentTab.innerHTML += create_wide_article(wideArticleFirst);
            contentTab.innerHTML += create_sources(sources, 'Top Sources');
            contentTab.innerHTML += create_articles(articlesSecond, 'Top Headlines');
            contentTab.innerHTML += create_wide_article(wideArticleSecond);
        }

    })
    .catch(err => {
        console.log(err);
    })
}


// Load specific category news
function load_news(category, tab) {
    
}

