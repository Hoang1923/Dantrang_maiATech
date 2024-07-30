const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        updateScale();
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    updateScale();
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; 
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
        updateScale();
    }, 5000);
}

const updateScale = () => {
    const cards = carousel.querySelectorAll(".card");
    const middleIndex = Math.floor(cards.length / 2);
    const middleScroll = carousel.scrollLeft + carousel.offsetWidth / 2;
    
    cards.forEach(card => {
        const cardMiddle = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(middleScroll - cardMiddle);
        const scale = Math.max(1 - distance / (carousel.offsetWidth / 2), 0.8);
        card.style.transform = `scale(${scale})`;
    });
}

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
carousel.addEventListener("scroll", updateScale);

updateScale();
