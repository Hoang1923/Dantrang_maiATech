let currentSlide = 0;
const cards = document.querySelectorAll('.card');
const navButtons = document.querySelectorAll('.nav-btn');

function showSlide(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    navButtons.forEach((btn, i) => {
        btn.classList.remove('active');
        if (i === index) {
            btn.classList.add('active');
        }
    });

    currentSlide = index;
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});
