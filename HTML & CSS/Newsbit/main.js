let bars = document.querySelector('.berger-menu');
let menu = document.querySelector('#menu');

bars.addEventListener('click', showbars);

function showbars() {
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
    } else {
        menu.classList.add('show');
    }

}