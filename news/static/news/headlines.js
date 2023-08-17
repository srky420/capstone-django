function load_headlines(e) {
    // Get category name
    const category = e.currentTarget.dataset.category;
    const tabId = e.currentTarget.dataset.bsTarget;

    // World category
    if (category == 'world') {
        load_world_headlines(category, tabId);
    }
    // Other categories
    else {
        load_category_headlines(category, tabId);
    }
}


// Loads world news
function load_world_headlines(category, tab_id) {

    // Get tab where content will be populated
    const contentTab = document.querySelector(tab_id);

    // Show placeholders while content is loaded
    contentTab.innerHTML = placeholderCarousel;
    contentTab.innerHTML += create_placeholder_articles(4);
    contentTab.innerHTML += placeholderArticleWide;

    // Fetch data
    fetch(`headlines/${category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Check status
        if (data.status == "error") {
            console.log(data.message);
        }
        if (data.status == "ok") {

            // Articles distribution for different layouts
            const mainArticles = data.articles.slice(0, 4);
            const articlesFirst = data.articles.slice(4, 8);
            const wideArticleFirst = data.articles[8];
            const articlesSecond = data.articles.slice(9, data.articles.length - 1);
            const wideArticleSecond = data.articles[data.articles.length - 1]
            const sources = data.sources;

            // Creating article layouts
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
function load_category_headlines(category, tab_id) {

    // Get tab where content will be populated
    const contentTab = document.querySelector(tab_id);

    // Show placeholders until content loaded
    contentTab.innerHTML = placeholderArticleWide;
    contentTab.innerHTML += create_placeholder_articles(2);
    contentTab.innerHTML += placeholderArticleWide
    
    // Fetch data
    fetch(`headlines/${category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        // Check status
        if (data.status == 'error') {
            console.log(data.message);
        }
        if (data.status == 'ok') {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

            // Create articles distribution
            const articleWideFirst = data.articles[0];
            const articlesFirst = data.articles.slice(1, 3);
            const aritcleWideSecond = data.articles[3];
            const articlesSecond = data.articles.slice(4);
            const sources = data.sources;

            // Create article layouts
            contentTab.innerHTML = create_wide_article(articleWideFirst);
            contentTab.innerHTML += create_articles(articlesFirst, `Recent ${categoryName} News`);
            contentTab.innerHTML += create_wide_article(aritcleWideSecond);
            contentTab.innerHTML += create_sources(sources, `Top Sources for ${categoryName}`);
            contentTab.innerHTML += create_articles(articlesSecond, `Top Headlines for ${categoryName}`);
        }
    })
    .catch(err => {
        console.log(err);
    })
}

