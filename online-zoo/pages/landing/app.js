//------------------------------carousel How it works

const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
  var newActive = event.target;
  var isItem = newActive.closest('.carousel__item');
  console.log(newActive)
  if (!isItem || newActive.classList.contains('carousel__item_active')) {
    return;
  };

  update(newActive);
});

const update = function (newActive) {
  const newActivePos = newActive.dataset.pos;
  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);

  current.classList.remove('carousel__item_active');

  [current, prev, next, first, last].forEach(item => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos)
  });
};

const getPos = function (current, active) {

  const diff = current - active;
  console.log(current, active, diff)
  if (Math.abs(current - active) > 2) {
    return -current
  }

  return diff;
}

//------------------Carousel Pets in zoo
const gap = 16;

const carousel = document.getElementById("carousel");
const content = document.getElementById("content");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.visibility = "visible";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.visibility = "hidden";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.visibility = "hidden";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.visibility = "visible";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));


