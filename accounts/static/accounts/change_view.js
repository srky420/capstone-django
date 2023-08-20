// Toggle between login and signup view
function switch_view() {
    document.querySelector('#login-div').classList.toggle('show');
    document.querySelector('#login-div').classList.toggle('visually-hidden');
    document.querySelector('#signup-div').classList.toggle('show');
    document.querySelector('#signup-div').classList.toggle('visually-hidden');
}