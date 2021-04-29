//---------------------burger-menu----------------------------

const burgerOpen = document.querySelector(".burger-menu__button");
const burgerClose = document.querySelector(".burger-menu__button-close");
const burgerMenu = document.querySelector("#burger-menu");

burgerOpen.addEventListener('click', function (e) {
  burgerMenu.classList.add('js-act');
});
burgerClose.addEventListener('click', function (e) {
  burgerMenu.classList.remove('js-act');
});

//-------------------map

const mapImage = document.getElementById('map');
const wrapper = document.getElementById('wrapper');
const headerElem = document.getElementById('header');
const footerElem = document.getElementById('footer');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');
const iconWrapper = document.getElementById('icon-wrapper')

let topIndent = 0;
let leftIndent = 0;

const calculateCoords = (e, elem) => {
  var box = elem.getBoundingClientRect();
  topIndent = e.pageY - box.top + pageYOffset;
  leftIndent = e.pageX - box.left + pageXOffset;
}
const moveAt = (e) => {
  mapImage.style.left = e.pageX - leftIndent + 'px';
  iconWrapper.style.left = e.pageX - leftIndent + 'px';
  if (e.pageX >= wrapper.offsetWidth) {
    stopDrag();
  } else if (e.pageX <= 0) {
    stopDrag();
  }
  mapImage.style.top = e.pageY - (200 - pageYOffset) - topIndent + 'px';
  iconWrapper.style.top = e.pageY - (200 - pageYOffset) - topIndent + 'px';
}
const stopDrag = () => {
  document.removeEventListener('mousemove', moveAt);
  mapImage.removeEventListener('mouseup', stopDrag);
}

mapImage.addEventListener('mousedown', (e) => {
  if (mapImage.width <= wrapper.offsetWidth && mapImage.height <= wrapper.offsetHeight) {
    return;
  }

  calculateCoords(e, mapImage);
  moveAt(e);

  document.addEventListener('mousemove', moveAt);
  mapImage.addEventListener('mouseup', stopDrag);
});



mapImage.ondragstart = function () {
  return false;
};

headerElem.addEventListener('mouseenter', stopDrag);
footerElem.addEventListener('mouseenter', stopDrag);

zoomInButton.addEventListener('click', () => {
  if (mapImage.width <= wrapper.offsetWidth * 2) {
    if (mapImage.style.position !== "absolute") { mapImage.style.position = "absolute"; }
    const prevWidth = mapImage.width;
    const prevHeight = mapImage.height;
    mapImage.style.width = `${mapImage.width * 1.25}px`;
    iconWrapper.style.left = `${(mapImage.width * 1.25 - mapImage.width) / 2}px`;
    mapImage.style.height = "auto";
    const nextWidth = mapImage.width;
    const nextHeight = mapImage.height;
    const topPos = mapImage.offsetTop || 0;
    const leftPos = mapImage.offsetLeft || 0;


    mapImage.style.left = `${leftPos - ((nextWidth - prevWidth) / 2)}px`;
    mapImage.style.top = `${topPos - ((nextHeight - prevHeight) / 2)}px`;
  }
});

zoomOutButton.addEventListener('click', () => {
  if (mapImage.width >= wrapper.offsetWidth || mapImage.height >= wrapper.offsetHeight) {
    if (mapImage.style.position !== "absolute") { mapImage.style.position = "absolute"; }
    const prevWidth = mapImage.width;
    const prevHeight = mapImage.height;
    mapImage.style.width = `${mapImage.width / 1.25}px`;
    mapImage.style.height = "auto";
    const nextWidth = mapImage.width;
    const nextHeight = mapImage.height;
    const topPos = mapImage.offsetTop || 0;
    const leftPos = mapImage.offsetLeft || 0;


    mapImage.style.left = `${leftPos + ((prevWidth - nextWidth) / 2)}px`;
    mapImage.style.top = `${topPos + ((prevHeight - nextHeight) / 2)}px`;

    if (mapImage.width <= wrapper.offsetWidth && mapImage.height <= wrapper.offsetHeight) {
      mapImage.style.width = `${wrapper.offsetWidth}px`;
      mapImage.style.height = "auto";
      mapImage.style.top = `${(wrapper.offsetHeight - mapImage.height) / 2}px`;
      mapImage.style.left = '0px';
      if (mapImage.height >= wrapper.offsetHeight) {
        mapImage.style.height = `${wrapper.offsetHeight}px`;
        mapImage.style.width = 'auto';
        mapImage.style.top = '0px';
        mapImage.style.left = `${(wrapper.offsetWidth - mapImage.width) / 2}px`;
      }
    }
  }
});