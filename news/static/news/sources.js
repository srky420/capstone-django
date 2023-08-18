// Create sources list with info for sources tab
function create_sources_lg(sources, heading) {
    let html = `<div class="w-100 p-3 bg-dark text-light"><h3 class="m-0">${heading}</h3></div>`;

    sources.forEach(source => {
        html += (
            `<div class="p-3 d-flex flex-column position-relative border">
                <strong class="d-inline-block mb-2 text-primary-emphasis">${source.category}</strong>
                <a href="${source.url}" class="mb-0 link-underline link-underline-opacity-0"><h4>${source.name}</h4></a>
                <p class="my-2">${source.description}</p>
                <a href="${source.url}" class="btn btn-sm btn-dark position-absolute top-0 end-0 m-2">
                    <i class="fa fa-plus"></i> Subscribe
                </a>
            </div>`
        );
    });

    // Close tag
    html += '</div>';
    return html;
}


// Create sources grid for use in other tabs
function create_sources_sm(sources, heading) {
    // Create initial html
    let html = `<div class="w-100 p-3 bg-dark text-light"><h3 class="m-0">${heading}</h3></div>
                <div class="row mb-5 border mx-0 overflow-auto" style="height: 400px;">`;
    
    // Create source columns
    sources.forEach(source => {
        html += (
            `<div class="col-lg-4 col-md-6 col-sm-12 border py-3">
                <div class="px-3 d-flex flex-column h-100 position-relative">
                    <strong class="d-inline-block mb-2 text-primary-emphasis">${source.category}</strong>
                    <a href="#" class="mb-0 link-underline link-underline-opacity-0" onclick><h4>${source.name}</h4></a>
                    <p class="my-2 text-wrap overflow-hidden">${source.description}</p>
                    <a href="${source.url}" class="btn btn-sm btn-dark position-absolute top-0 end-0">
                        <i class="fa fa-plus"></i>
                    </a>
                </div>
            </div>`
        );
    });

    // Close tag
    html += '</div>';
    return html;
}