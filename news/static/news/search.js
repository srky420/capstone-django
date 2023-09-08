// Search for news
document.addEventListener('DOMContentLoaded', () => {
    // Get search results div
    const resultsDiv = document.querySelector('#search-results');

    // Add event listener to search btn
    document.querySelector('#search-btn').addEventListener('click', (e) => {
        const query = document.querySelector('#search-input').value;

        // Check if query is empty
        if (!query) {
            document.querySelector('#search-input').classList.add('red-border');
            return;
        }
        else {
            document.querySelector('#search-input').classList.remove('red-border');
        }

        // Disable search btn
        e.currentTarget.disabled = true;

        // Create placholder
        resultsDiv.innerHTML = create_placeholder_articles(8)

        // Fetch data for query
        fetch(`search?q=${query}`)
        .then(res => res.json())
        .then(data => {

            console.log(data);

            // Empty out results div
            resultsDiv.innerHTML = '';

            // Check status
            if (data.status == 'error') {
                resultsDiv.innerHTML = `<h4 class="text-center my-5">An error occured.</h4>`;
            }
            if (data.status == 'ok') {
                
                // Remove nulls
                const articles = data.articles.filter(article => {
                    if (article.title && article.description && article.url) {
                        return article
                    }
                })

                // Check if not articles were found
                if (articles.length == 0) {
                    resultsDiv.innerHTML +=  `<h4 class="my-5">No results found</h4>`;
                }
                else {
                    resultsDiv.innerHTML += create_articles(articles, 'Search Results');
                }
            }

            // Enable search btn
            document.querySelector('#search-btn').disabled = false;

        })
        .catch(err => {
            console.log(err)
            resultsDiv.innerHTML = `<h4 class="text-center my-5">An error occured.</h4>`;

            // Enable search btn
            document.querySelector('#search-btn').disabled = false;
        })

    });

    // Click search button on enter key press
    document.querySelector('#search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.querySelector('#search-btn').click();
        }
    }); 
});