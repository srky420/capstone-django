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

        // Create placholder
        resultsDiv.innerHTML = create_placeholder_articles(8)

        // Fetch data for query
        fetch(`search?q=${query}`)
        .then(res => res.json())
        .then(data => {

            // Empty out results div
            resultsDiv.innerHTML = '';

            // Check status
            if (data.status == 'error') {
                resultsDiv.innerHTML += `<h4 class="my-5">An error occured</h4>`;
            }
            if (data.status == 'ok') {

                // Check if not articles were found
                const articles = data.articles;
                if (articles.length == 0) {
                    resultsDiv.innerHTML +=  `<h4 class="my-5">No results found</h4>`;
                }
                else {
                    resultsDiv.innerHTML += create_articles(data.articles, 'Search Results');
                }
            }
            // Enable search btn

        })
        .catch(err => {
            console.log(err)
        })

    });
});