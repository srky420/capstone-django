const loadingSpinner = `<div class="d-flex justify-content-center align-items-center w-100 my-5 py-5">
                            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`;

const placeholderBanner = `<div class="card bg-body-tertiary border-0 placeholder-banner" aria-hidden="true">
                                <div class="card-body h-100 d-flex flex-column justify-content-end">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>`

const placeholderCards = `<div class="placeholder-glow my-3">
                            <span class="placeholder col-3"></span>
                        </div>
                        <div class="row m-0">
                            <div class="col-md-6 border py-3 placeholder-card">
                                <div class="row g-0 flex-md-row mb-4 h-100">
                                    <div class="col-lg col-md-12 px-3 card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                    </div>
                                    <div class="col-lg col-md-12">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 border py-3 placeholder-card">
                                <div class="row g-0 flex-md-row mb-4 h-100">
                                    <div class="col-lg col-md-12 px-3 card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                    </div>
                                    <div class="col-lg col-md-12">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 border py-3 placeholder-card">
                                <div class="row g-0 flex-md-row mb-4 h-100">
                                    <div class="col-lg col-md-12 px-3 card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                    </div>
                                    <div class="col-lg col-md-12">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 border py-3 placeholder-card">
                                <div class="row g-0 flex-md-row mb-4 h-100">
                                    <div class="col-lg col-md-12 px-3 card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                    </div>
                                    <div class="col-lg col-md-12">
                                    </div>
                                </div>
                            </div>
                        </div>`;

const carousel = `<div id="myCarousel" class="carousel slide mb-5 mt-3" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 1" aria-current="true"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4" class=""></button>
                    </div>
                    <div class="carousel-inner">
                        
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>`;

const topNewsHeading = `<div class="w-100"><h3>Top Headlines</h3></div>`;
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
    <div class="col-md-6 border py-3">
        <div class="row g-0 flex-md-row mb-4 h-100">
            <div class="col-lg col-md-12 px-3 d-flex flex-column">
                <h5 class="mb-0">${article.title}</h5>
                <small class="my-1 text-body-secondary">${publishedDate} by ${article.author}</small>
                <p class="card-text mb-auto">${article.description}</p>
                <a href="${article.url}" class="link-underline">
                    Continue reading
                </a>
            </div>
            <div class="col-lg col-md-12 article-img-container">
                <img src="${article.urlToImage}" 
                    alt="carousel-pic-1" class="article-img" onError="this.onerror=null; this.src='../static/news/img/placeholder.jpg';">
            </div>
        </div>
    </div>`
}

