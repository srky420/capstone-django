// Create carousel
function create_carousel(id, articles) {

    // Create carousel indicators and carousel inner
    let carousel_indicators = `<div class="carousel-indicators">`;
    let carousel_inner = `<div class="carousel-inner">`;

    // Create main carousel start
    let carousel = `<div id="${id}" class="carousel slide mb-5 mt-3" data-bs-ride="carousel">`;
    
    // Create indicators and inner carousel items
    for (let i = 0; i < articles.length; i++) {
        if (i == 0) {
            carousel_indicators += `<button type="button" data-bs-target="#${id}" data-bs-slide-to="${i}" class="active" aria-label="Slide ${i + 1}" aria-current="true"></button>`;
            carousel_inner += (
                `<div class="carousel-item active">
                    <img src="${articles[i].urlToImage}" 
                        alt="carousel-pic-1" class="carousel-img" onError="this.onerror=null; this.src='../static/news/img/placeholder.jpg';">
                    <div class="shadow-over position-absolute w-100 h-100 bg-dark bg-opacity-50 bottom-0"></div>
                    <div class="container">
                        <div class="carousel-caption text-start">
                            <h1 class="text-light">${articles[i].title}</h1>
                            <p><a class="link-light link-underline link-underline-opacity-0 link-underline-opacity-100-hover h4" href="${articles[i].url}">Read more...</a></p>
                        </div>
                    </div>
                </div>`
            );
            continue;
        }
        carousel_indicators += `<button type="button" data-bs-target="#${id}" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}" class=""></button>`;
        carousel_inner += (
            `<div class="carousel-item">
                <img src="${articles[i].urlToImage}" 
                    alt="carousel-pic-1" class="carousel-img" onError="this.onerror=null; this.src='../static/news/img/placeholder.jpg';">
                <div class="shadow-over position-absolute w-100 h-100 bg-dark bg-opacity-50 bottom-0"></div>
                <div class="container">
                    <div class="carousel-caption text-start">
                        <h1 class="text-light">${articles[i].title}</h1>
                        <p><a class="link-light link-underline link-underline-opacity-0 link-underline-opacity-100-hover h4" href="${articles[i].url}">Read more...</a></p>
                    </div>
                </div>
            </div>`
        );
    }
    
    // Close indicators and inner carousel
    carousel_indicators += '</div>';
    carousel_inner += `</div>`;

    // Append to main carousel
    carousel += carousel_indicators;
    carousel += carousel_inner;

    // Close carousel tag
    carousel += (
            `<button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>`
    );
    return carousel;
}