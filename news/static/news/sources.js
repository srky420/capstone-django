// Create sources list with info for sources tab
function create_sources_lg(sources, heading) {
    let html = `<div class="w-100 p-3 bg-dark text-light border border border-bottom-0"><h3 class="m-0">${heading}</h3></div>`;

    sources.forEach(source => {
        html += (
            `<div class="p-3 d-flex flex-column position-relative border border-bottom-0 source">
                <strong class="d-inline-block mb-2 text-primary-emphasis category-name">${source.category}</strong>
                <a href="${source.url}" class="mb-0 link-underline link-underline-opacity-0"><h4 class="source-name">${source.name}</h4></a>
                <p class="my-2">${source.description}</p>
                <button type="button" onclick="source_subscription(this, '${source.id}', '${source.name}', '${source.category}', '${encodeURIComponent(source.description).replaceAll('\'', '%27')}', '${source.url}')" 
                    class="btn btn-lg btn-dark position-absolute top-0 end-0 m-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Subscribe">
                    ${source.subscribed ? `<i class="fa fa-minus"></i>`: `<i class="fa fa-plus"></i>`}
                </button>
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
    let html = `<div class="w-100 p-3 bg-dark text-light border border-bottom-0"><h3 class="m-0">${heading}</h3></div>
                <div class="row mb-5 border mx-0 overflow-auto" style="height: 400px;">`;
    
    // Create source columns
    sources.forEach(source => {
        html += (
            `<div class="col-lg-4 col-md-6 col-sm-12 py-3">
                <div class="px-3 d-flex flex-column h-100 position-relative">
                    <strong class="d-inline-block mb-2 text-primary-emphasis category-name">${source.category}</strong>
                    <a href="#" class="mb-0 link-underline link-underline-opacity-0" onclick=""><h4>${source.name}</h4></a>
                    <p class="my-2 text-wrap overflow-hidden">${source.description}</p>
                    <button onclick="source_subscription(this, '${source.id}', '${source.name}', '${source.category}', '${encodeURIComponent(source.description).replaceAll('\'', '%27')}', '${source.url}')" 
                        class="btn btn-sm btn-dark position-absolute top-0 end-0 m-2">
                        ${source.subscribed == true ? `<i class="fa fa-minus"></i>`: `<i class="fa fa-plus"></i>`}
                    </button>
                </div>
            </div>`
        );
    });

    // Close tag
    html += '</div>';
    return html;
}


// Create sources accordion
function create_sources_accordion(sources, heading) {
    // Initial html
    let html = `<div class="accordion" id="subs-accordion">
                    <div class="accordion-item rounded-0">
                        <h1 class="accordion-header rounded-0">
                            <button class="accordion-button rounded-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse">
                                <h3 class="m-0">${heading}</h3>
                            </button>
                        </h1>
                        <div id="collapse" class="accordion-collapse collapse" data-bs-parent="#subs-accordion">
                            <div class="accordion-body">
                                <div class="row">`

    // Create source columns
    sources.forEach(source => {
        html += (
            `<div class="col-lg-4 col-md-6 col-sm-12 border py-3">
                <div class="px-3 d-flex flex-column h-100 position-relative">
                    <strong class="d-inline-block mb-2 text-primary-emphasis category-name">${source.category}</strong>
                    <a href="#" class="mb-0 link-underline link-underline-opacity-0" onclick=""><h4>${source.name}</h4></a>
                    <p class="my-2 text-wrap overflow-hidden">${source.description}</p>
                    <button onclick="source_subscription(this, '${source.id}', '${source.name}', '${source.category}', '${encodeURIComponent(source.description).replaceAll('\'', '%27')}', '${source.url}')" 
                        class="btn btn-sm btn-dark position-absolute top-0 end-0 m-2">
                        ${source.subscribed == true ? `<i class="fa fa-minus"></i>`: `<i class="fa fa-plus"></i>`}
                    </button>
                </div>
            </div>`
        );
    });

    // Closing tags
    html += `</div></div></div></div></div>`;
    return html;
}


// Search for sources
function search_sources(e) {
    // Get sources div
    const sourcesDiv = document.querySelector('#sources-div');

    // For each source, find value in source's name
    sourcesDiv.querySelectorAll('.source').forEach(source => {

        // Convert source name and input value to lower case
        let name = source.querySelector('.source-name').innerHTML.toLowerCase();
        let value = e.currentTarget.value.toLowerCase();

        // Check if value is substring of source name
        if (!name.includes(value)) {
            source.classList.add('visually-hidden');
        }
        else {
            source.classList.remove('visually-hidden');
        }
    });
}
