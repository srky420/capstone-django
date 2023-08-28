// Create subscription
function source_subscription(button, id, name, category, description, url) {

    // Change button
    button.disabled = true;
    button.innerHTML = placeholderBtnsm;

    // Create source JSON
    let source = JSON.stringify({
        id: id,
        name: name,
        category: category,
        description: decodeURIComponent(description),
        url: url
    });

    const csrf_token = Cookies.get('csrftoken');

    // Create POST request
    fetch('subscribe/', {
        method: 'POST',
        headers: {'X-CSRFToken': csrf_token},
        mode: 'same-origin',
        body: JSON.stringify({
            source: source
        })
    })
    .then(res => {
        // Enable button
        button.disabled = false;
        

        // Check status
        if (res.status == 201) {
            return res.json().then(data => {
                console.log(data)
                // Check subscription status
                if (data.subscribed) {
                    button.innerHTML = `<i class="fa fa-minus"></i>`;
                }
                else {
                    button.innerHTML = `<i class="fa fa-plus"></i>`;
                }
            })
        }
        else if (res.status == 403) {
            return res.json().then(data => {
                console.log(data);

                // Redirect to accounts
                window.location = '/accounts';
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
}