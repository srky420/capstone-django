const loadingSpinner = `<div class="d-flex justify-content-center align-items-center w-100 my-5 py-5">
                            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`;

const placeholderBanner = `<div class="card bg-body-tertiary border-0 placeholder-banner mt-3" aria-hidden="true">
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

const placeholderHeading = `<div class="placeholder-glow my-3">
                                <span class="placeholder col-3"></span>
                            </div>`;

const placeholderCard = `<div class="col-lg-6 col-md-12 border py-3 placeholder-card">
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


// Creates placeholder cards given number of cards to create
function create_placeholder_cards(num) {
    let html = `<div class="row m-0">`;
    for (let i = 0; i < num; i++) {
        html += placeholderCard;
    }
    html += '</div>';
    return html;
}