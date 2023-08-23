// Load specified form
document.addEventListener('DOMContentLoaded', () => {
    // Get form json variable
    const view = JSON.parse(document.querySelector('#view').textContent);

    // Switch view to specified form
    switch_view(view);
});


// Toggle between login and signup view
function switch_view(view) {
    // Hide all auth forms
    document.querySelectorAll('.auth-form').forEach(div => {
        div.classList.add('visually-hidden');
        div.classList.remove('show');
    });

    // Show form with specified id
    document.querySelector(`#${view}`).classList.remove('visually-hidden');
    document.querySelector(`#${view}`).classList.add('show');
}

