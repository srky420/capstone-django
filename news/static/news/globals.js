// Creates carousel item from given data
function create_carousel_item(carousel_id, article, is_active) {
    document.querySelector(carousel_id).querySelector('.carousel-inner').innerHTML += `
    <div class="carousel-item ${is_active ? 'active' : ''}">
        <img src="${article.urlToImage}" 
            alt="carousel-pic-1" class="carousel-img" onError="this.onerror=null; this.src='../static/news/img/placeholder.jpg';">
        <div class="shadow-over position-absolute w-100 h-100 bg-dark bg-opacity-50 bottom-0"></div>
        <div class="container">
            <div class="carousel-caption text-start">
                <h1 class="text-light">${article.title}</h1>
                <p><a class="link-light link-underline link-underline-opacity-0 link-underline-opacity-100-hover h4" href="${article.url}">Read more...</a></p>
            </div>
        </div>
    </div>`;
}


// Create news heading
function create_heading(text) {
    return `<div class="w-100 p-3 bg-dark text-light"><h3 class="m-0">${text}</h3></div>`;
}


// Create a wide article card
function create_wide_article_card(article) {
    let publishedDate = new Date(article.publishedAt);
    publishedDate = publishedDate.toLocaleDateString();

    return (
        `<div class="card text-white border-0 rounded-0">
            <img src="${article.urlToImage}" height="300" style="object-fit: cover;" class="card-img" alt="article-img">
            <div class="card-img-overlay bg-dark bg-opacity-50 rounded-0">
                <h3 class="card-title">${article.title}</h3>
                <p class="card-text">${article.description}</p>
                <p class="card-text"><small>${publishedDate}</small></p>
            </div>
        </div>`
    );
}


// Create articles row
function create_articles_row(id) {
    return `<div class="row mb-2 border mx-0" id="${id}"></div>`;
}


// Creates two column articles view
function create_articles_columns(article, row_id) {
    let publishedDate = new Date(article.publishedAt);
    publishedDate = publishedDate.toLocaleDateString();

    document.querySelector(row_id).innerHTML += `
    <div class="col-lg-6 col-md-12 border py-3">
        <div class="row mb-4 h-100">
            <div class="col-lg col-md-6 col-sm-12 px-3 d-flex flex-column">
                <h5 class="mb-0">${article.title}</h5>
                <small class="my-1 text-body-secondary">${publishedDate} by ${article.author}</small>
                <p class="card-text mb-auto">${article.description}</p>
                <a href="${article.url}" class="link-underline mb-2">
                    Continue reading
                </a>
            </div>
            <div class="col-lg col-md-6 col-sm-12 article-img-container">
                <img src="${article.urlToImage}" 
                    alt="carousel-pic-1" class="article-img" onError="this.onerror=null; this.src='../static/news/img/placeholder.jpg';">
            </div>
        </div>
    </div>`;
}

