const topNewsHeading = `<div class="w-100 p-3 bg-dark text-light"><h3 class="m-0">Top Headlines</h3></div>`;
const articlesRow = `<div class="row mb-2 border mx-0" id="articles-row"></div>`;


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


// Creates two column articles view
function create_articles_view(article) {
    let publishedDate = new Date(article.publishedAt);
    publishedDate = publishedDate.toLocaleDateString();

    document.querySelector('#articles-row').innerHTML += `
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

