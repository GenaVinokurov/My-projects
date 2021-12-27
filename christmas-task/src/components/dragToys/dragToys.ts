class DragToys {
  mapTree: HTMLElement;
  imgCollection: NodeList;
  favoritesContainer: HTMLElement;
  constructor() {
    this.mapTree = document.querySelector('.area') as HTMLElement;
    this.imgCollection = document.querySelectorAll('.favorites-card-img') as NodeList;
    this.favoritesContainer = document.querySelector('.favorites-container') as HTMLElement;
    this.dragFun();
  }

  dragFun() {

    function allowDrop(event: Event) {
      event.preventDefault();
    }

    function dragStart(event: DragEvent) {
      const imgElem = (<HTMLImageElement>event.target);
      if (event.target != null) {
        event.dataTransfer?.setData('id', imgElem.id);
      }
    }

    function drop(event: DragEvent) {
      const checkCountElem = (card: Element) => {
        const counter = card.children[0];
        counter.textContent = `${card.children.length - 1}`;
      };
      const map = document.querySelector('.area') as HTMLElement;
      const eventTargetContainer = event.target as HTMLElement;
      const id = event.dataTransfer?.getData('id');
      const imgElem = document.getElementById(`${id}`) as HTMLImageElement;
      const currentCard = document.querySelector(`[data-num="${imgElem.dataset.slotNum}"]`) as HTMLElement;
      if (eventTargetContainer.classList.contains('area')) {
        if (event.target != null) {
          if (imgElem != null) {
            checkCountElem(currentCard);
            map.append(imgElem);
            imgElem.style.left = '0px';
            imgElem.style.top = '0px';
            imgElem.style.left = `${+imgElem.style.left.split('px')[0] + (event.offsetX - 25)}px`;
            imgElem.style.top = `${+imgElem.style.top.split('px')[0] + (event.offsetY - 25)}px`;
          }
        }
      } else if (eventTargetContainer.classList.contains('favorites-card') || eventTargetContainer.classList.contains('favorites-card-img') || eventTargetContainer.classList.contains('favorites-container')) {
        if (event.target != null) {
          if (imgElem != null) {
            currentCard.append(imgElem);
            imgElem.style.left = 'auto';
            imgElem.style.top = 'auto';
            checkCountElem(currentCard);
          }
        }
      }
    }

    this.mapTree.ondragover = allowDrop;
    this.mapTree.addEventListener('drop', drop);
    this.favoritesContainer.ondragover = allowDrop;
    this.favoritesContainer.addEventListener('drop', drop);
    this.imgCollection.forEach((el, i) => {
      const imgElem = (<HTMLImageElement>this.imgCollection[i]);
      imgElem.addEventListener('dragstart', dragStart);
    });
  }


}

export default DragToys;