function load_headlines(e) {
    // Get names and ids
    const tabName = e.currentTarget.dataset.tabName;
    const tabId = e.currentTarget.dataset.bsTarget;

    // World tab
    if (tabName == 'world') {
        load_world_headlines(tabName, tabId);
    }
    // Sources tab
    else if(tabName == 'sources') {
        load_sources()
    }
    // Discover tab 
    else if (tabName == 'discover') {
        load_discover_tab()
    }
    // Other tab
    else {
        load_category_headlines(tabName, tabId);
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
            contentTab.innerHTML += create_sources_sm(sources, 'Top Sources');
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
            contentTab.innerHTML += create_sources_sm(sources, `Top Sources for ${categoryName}`);
            contentTab.innerHTML += create_articles(articlesSecond, `Top Headlines for ${categoryName}`);
        }
    })
    .catch(err => {
        console.log(err);
    })
}


// Load sources tab
function load_sources() {
    // Get source div
    const sourcesDiv = document.querySelector('#sources-div');

    // Disable search input
    document.querySelector('#sources-search').disabled = true;
    document.querySelector('#sources-search').value = '';

    // Create placeholders
    sourcesDiv.innerHTML = create_placeholder_sources(8);

    // Get filter values
    const categoryFilters = [];
    document.querySelectorAll('.sources-category-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
            categoryFilters.push(checkbox.value);
        }
    });

    console.log(categoryFilters);

    // Fetch sources data
    fetch('sources/')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        // Check if filters selected or not
        if (categoryFilters.length == 0) {
            // Create sources list
            sourcesDiv.innerHTML = create_sources_lg(data.sources, 'Sources')
        }
        else {
            // Filter out sources by category
            let sources = data.sources.filter(source => {
                if (categoryFilters.includes(source.category)) {
                    return source;
                }
            })
            // Create sources list
            sourcesDiv.innerHTML = create_sources_lg(sources, 'Sources')
        }

        // Enable search input
        document.querySelector('#sources-search').disabled = false;

    })
    .catch(err => {
        console.log(err);
    })
}


// Load discover tab i.e. subscriptions and news from subscriptions
function load_discover_tab() {
    // Get divs
    const subscriptionsDiv = document.querySelector('#subscriptions');
    const subscriptionsNewsDiv = document.querySelector('#subscriptions-news');

    // Create placeholders
    subscriptionsDiv.innerHTML = create_placeholder_articles(2);
    subscriptionsNewsDiv.innerHTML = create_placeholder_articles(6);

    // Fetch data
    fetch('discover/')
    .then(res => {

         // Check status
         if (res.status == 200) {
            return res.json().then(data => {
                console.log(data)
                
                // Populate data
                if (!data.sources) {
                    subscriptionsDiv.innerHTML = '<h2 class="h-100 text-center my-5">No subscriptions yet</h2>'
                    subscriptionsNewsDiv.innerHTML = '';
                }
                else {
                    subscriptionsDiv.innerHTML = create_sources_accordion(data.sources, 'Subscriptions');
                    subscriptionsNewsDiv.innerHTML = create_articles(data.articles, 'From your subcriptions')
                }
            })
        }
        else if (res.status == 403) {
            return res.json().then(data => {
                console.log(data);

                // Redirect to accounts
                window.location = '/accounts';
            })
        }
    })

}