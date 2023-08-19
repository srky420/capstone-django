function filter_sources() {
    // Get sources div
    const sourcesDiv = document.querySelector('#sources-div');

    // Get filter values
    const categoryFilters = [];
    document.querySelectorAll('.sources-category-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
            categoryFilters.push(checkbox.value);
        }
    })

    // For each source check if source's category is in selected filters
    sourcesDiv.querySelectorAll('.source').forEach(source => {

        // Check only those sources which are visible
        if (!source.classList.contains('visually-hidden')) {

            const sourceCategory = source.querySelector('.source-category').innerHTML;

            if (categoryFilters.length != 0 && !categoryFilters.includes(sourceCategory)) {
                source.classList.add('visually-hidden');
            }
            else {
                source.classList.remove('visually-hidden');
            }
        }   
    });
}