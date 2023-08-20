// Load specified form
document.addEventListener('DOMContentLoaded', () => {
    // Get form json variable
    const formName = JSON.parse(document.querySelector('#view').textContent);

    // Switch view to specified form
    switch_view(formName);
});


// Toggle between login and signup view
function switch_view(form_name) {
    // Hide all auth forms
    document.querySelectorAll('.auth-form').forEach(div => {
        div.classList.add('visually-hidden');
        div.classList.remove('show');
    });

    // Show form with specified id
    document.querySelector(`#${form_name}`).classList.remove('visually-hidden');
    document.querySelector(`#${form_name}`).classList.add('show');
}

