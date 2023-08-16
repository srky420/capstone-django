function create_sources(sources, heading) {
    // Create initial html
    let html = `<div class="w-100 p-3 bg-dark text-light"><h3 class="m-0">${heading}</h3></div>
                <div class="row mb-5 border mx-0 overflow-auto sources">`;
    
    // Create source columns
    sources.forEach(source => {
        html += (
            `<div class="col-lg-4 col-md-6 col-sm-12 border py-3">
                <div class="px-3 d-flex flex-column">
                    <h5 class="mb-0">${source.name}</h5>
                    <p class="card-text mb-auto text-wrap overflow-hidden">${source.description}</p>
                    <a href="${source.url}" class="link-underline link-offset-3 mb-2">
                        Continue reading
                    </a>
                </div>
            </div>`
        );
    });

    // Close tag
    html += '</div>';
    return html;
}