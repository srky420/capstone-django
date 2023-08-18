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