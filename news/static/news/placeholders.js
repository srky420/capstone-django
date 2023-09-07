const loadingSpinner = `<div class="d-flex justify-content-center align-items-center w-100 my-5 py-5">
                            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`;

const placeholderBtnsm = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span class="visually-hidden" role="status">Loading...</span>`;

const placeholderBtnlg = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>`;                   

const placeholderCarousel = `<div class="card bg-body-tertiary border-0 placeholder-banner mt-3" aria-hidden="true">
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
                            </div>`;

const placeholderArticle = `<div class="col-lg-6 col-md-12 py-3 placeholder-card">
                                <div class="row mb-4 h-100">
                                    <div class="col-lg col-md-6 col-sm-12 px-3 placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                    </div>
                                    <div class="col-lg col-md-6 col-sm-12 article-img-container">
                                    </div>
                                </div>
                            </div>`;

const placeholderArticleWide = `<div class="p-5 my-5 position-relative bg-body-tertiary article-wide">
                                    <div class="placeholder-glow">
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-5"></span>
                                        <span class="placeholder col-6"></span>
                                    </div>
                                </div>`;

const placeholderSource = `<div class="p-3 d-flex flex-column position-relative placeholder-glow" style="height: 150px;">
                                <div class="placeholder-glow">  
                                    <span class="placeholder col-8"></span>
                                    <span class="placeholder col-4"></span>
                                    <span class="placeholder col-5"></span>
                                    <span class="placeholder col-6"></span>
                                </div>
                            </div>`;


// Creates placeholder articles for specified columns
function create_placeholder_articles(num) {

    // Main html
    let html = `<div class="placeholder-glow my-3"><span class="placeholder col-3"></span></div><div class="row m-0 border">`;

    // Create required num of placholder articles
    for (let i = 0; i < num; i++) {
        html += placeholderArticle;
    }
    
    // Close tag
    html += '</div>';
    return html;
}


// Creates placeholder sources list for specified columns
function create_placeholder_sources(num) {

    // Main html
    let html = `<div class="placeholder-glow my-3"><span class="placeholder col-3"></span></div><div class="row m-0 border">`;

    // Create required num of placholder articles
    for (let i = 0; i < num; i++) {
        html += placeholderSource;
    }
    
    // Close tag
    html += '</div>';
    return html; 
}