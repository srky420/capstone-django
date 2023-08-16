// Generate articles html
function create_articles(articles, heading) {
    // Create row
    let html = `<div class="w-100 p-3 bg-dark text-light"><h3 class="m-0">${heading}</h3></div>
                <div class="row mb-5 border mx-0">`;

    // Create columns
    articles.forEach(article => {

        // Create approprate date for each article column
        let publishedDate = new Date(article.publishedAt);
        publishedDate = publishedDate.toLocaleDateString();

        html += (
            `<div class="col-lg-6 col-md-12 border py-3">
                <div class="row mb-4 h-100">
                    <div class="col-lg col-md-6 col-sm-12 px-3 d-flex flex-column" style="max-height: 300px;">
                        <h5 class="mb-0">${article.title}</h5>
                        <small class="my-1 text-body-secondary">${publishedDate} by ${article.author}</small>
                        <p class="card-text mb-auto text-wrap overflow-hidden">${article.description}</p>
                        <a href="${article.url}" class="link-underline link-offset-3 mt-auto mb-2">
                            Continue reading
                        </a>
                    </div>
                    <div class="col-lg col-md-6 col-sm-12 article-img-container">
                        <img src="${article.urlToImage}" 
                            alt="carousel-pic-1" class="article-img" onError="this.onerror=null; this.src='../static/news/img/placeholder.jpg';">
                    </div>
                </div>
            </div>`
        );
    });

    // Close row tag
    html += '</div>';
    return html
}


// Create wide article
function create_wide_article(article) {
    return (
        `<div class="p-5 mb-5 position-relative" style="min-height: 400px">
            <img src="${article.urlToImage}"
                alt="" class="position-absolute top-0 start-0 object-fit-cover w-100 h-100" style="z-index: -1000;">
            <div class="position-absolute w-100 h-100 bg-dark bg-opacity-50 top-0 start-0" style="z-index: -1000;"></div>
            <div class="text-light z-3">
                <h1 class="">${article.title}</h1>
                <p class="my-3">${article.description}</p>
                <a href="${article.url}" class="link-light link-underline link-underline-opacity-0 link-underline-opacity-100-hover">Continue reading...</a>
            </div>
        </div>`
    );
}
