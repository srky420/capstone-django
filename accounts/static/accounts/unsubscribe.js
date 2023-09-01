// Unsubscribe from source
function source_unsubscribe(button) {

    // Change button
    button.disabled = true;
    button.innerHTML = placeholderBtnsm;

    // Get source id
    const source_id = button.dataset.sourceId;

    const csrf_token = Cookies.get('csrftoken');

    // Create POST request
    fetch('unsubscribe/', {
        method: 'POST',
        headers: {'X-CSRFToken': csrf_token},
        mode: 'same-origin',
        body: JSON.stringify({
            source_id: source_id
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        // Remove source from suscriptions accordion
        document.querySelector(`#${source_id}`).remove();
        
    })
    .catch(err => {
        console.log(err);
    })
}