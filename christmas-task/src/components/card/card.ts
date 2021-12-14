import data from '../../data.json';

export interface IData {
  num: string; name: string; count: string; year: string; shape: string; color: string; size: string; favorite: boolean;
}

class Card {
  dataJson: IData[];
  cardContainer: HTMLElement;
  favoriteEl: HTMLInputElement;
  cardCollection: NodeList;
  selectCountElem: HTMLElement;
  selectNumber: number;
  sortSelect: HTMLSelectElement;
  realToys: IData[];
  shapeWrap: HTMLElement;
  shapeCollection: NodeList;
  constructor() {
    this.dataJson = data as IData[];
    this.cardContainer = document.querySelector('.card-container') as HTMLElement;
    this.favoriteEl = document.getElementById('favoriteInput') as HTMLInputElement;
    this.cardCollection = document.querySelectorAll('.card') as NodeList;
    this.selectCountElem = document.querySelector('.select') as HTMLElement;
    this.selectNumber = 0 as number;
    this.sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    this.sortSelect.addEventListener('change', this.sortList.bind(this));
    this.favoriteEl.addEventListener('input', this.favoriteSort.bind(this));
    this.shapeWrap = document.querySelector('.shape') as HTMLElement;
    this.shapeCollection = this.shapeWrap.querySelectorAll('button') as NodeList;
    this.shapeWrap.addEventListener('click', this.shapeFun.bind(this));
    this.realToys = this.dataJson as IData[];
    this.checkLocalStorage();
  }


  checkLocalStorage() {
    if (localStorage.toys === undefined) {
      localStorage.setItem('toys', JSON.stringify(this.dataJson));
    }
    const localArrFav = localStorage.getItem('toys') || '';
    this.realToys = JSON.parse(localArrFav) as IData[];
    console.log(this.realToys);
  }

  shapeFun(e: Event) {
    const currentShape = e.target as HTMLElement;
    currentShape.classList.toggle('active');
    let renderArr = [] as IData[];
    const localArrFav = localStorage.getItem('toys') || '';
    const arrClone = JSON.parse(localArrFav);
    this.shapeCollection.forEach(el => {
      const typeShape = el as HTMLElement;
      if (typeShape == currentShape) {
        if (typeShape.classList.contains('active')) {
          renderArr = arrClone.filter((a: IData) => a.shape != currentShape.dataset.filter);
          console.log(renderArr);
          localStorage.setItem('toys', JSON.stringify(renderArr));
        } else {
          const returnArr = this.dataJson.filter((a: IData) => a.shape == currentShape.dataset.filter);
          renderArr = arrClone.concat(returnArr);
          console.log('Back ', renderArr);
          localStorage.setItem('toys', JSON.stringify(renderArr));
        }
      }
    });
    this.realToys = renderArr;
    this.render();
    // console.log(this.shapeCollection);
  }

  favoriteSort(e: Event) {

    let renderArr = [] as IData[];
    const localArrFav = localStorage.getItem('toys') || '';
    const arrClone = JSON.parse(localArrFav);
    if (this.favoriteEl.checked) {
      arrClone.map(function (a: IData): any {
        if (a.favorite == true) {
          renderArr.push(a);
        }
      });
      localStorage.setItem('toys', JSON.stringify(renderArr));
    } else {
      localStorage.setItem('toys', JSON.stringify(this.dataJson));
      const localArr = localStorage.getItem('toys') || '';
      renderArr = JSON.parse(localArr);
    }
    this.realToys = renderArr;
    this.render();
  }

  sortList() {
    const localArrFav = localStorage.getItem('toys') || '';
    const arrClone = JSON.parse(localArrFav);
    const renderArr = arrClone;
    this.cardContainer.innerHTML = '';


    if (this.sortSelect.selectedIndex == 0) {
      renderArr.sort((a: IData, b: IData) => a.year > b.year ? 1 : -1);
    }
    if (this.sortSelect.selectedIndex == 1) {
      renderArr.sort((a: IData, b: IData) => a.year < b.year ? 1 : -1);
    }
    if (this.sortSelect.selectedIndex == 2) {
      renderArr.sort((a: IData, b: IData) => Number(a.count) - Number(b.count));
    }
    if (this.sortSelect.selectedIndex == 3) {
      renderArr.sort((a: IData, b: IData) => Number(b.count) - Number(a.count));
    }
    this.realToys = renderArr;
    this.render();
  }

  render() {
    this.cardContainer.innerHTML = '';
    let localArr = localStorage.getItem('toys') || '';
    localArr = JSON.parse(localArr);
    const mainArr = this.realToys || localArr || this.dataJson;
    mainArr.forEach((el, i) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.id = `${mainArr[i].num}`;
      div.innerHTML = `
      <p class="card-title">${mainArr[i].name}</p>
      <img src="./assets/toys/${mainArr[i].num}.png" alt="img" class="card-img">
      <span class="card-count">Количество: ${mainArr[i].count}</span>
      <span class="card-year">Год покупки: ${mainArr[i].year}</span>
      <span class="card-shape">Форма игрушки: ${mainArr[i].shape}</span>
      <span class="card-color">Цвет игрушки: ${mainArr[i].color}</span>
      <span class="card-size">Размер игрушки: ${mainArr[i].size}</span>
      <span class="card-favorite">Любимая: ${(mainArr[i].favorite) ? 'да' : 'нет'}</span>
      `;
      this.cardContainer.appendChild(div);
    });
    this.cardCollection = document.querySelectorAll('.card');
    this.cardCollection.forEach(el => {
      if (this.selectNumber <= 20) {
        el.addEventListener('click', (e: Event) => {
          const card = e.currentTarget as HTMLElement;
          card.classList.toggle('select-card');
          if (card.classList.contains('select-card')) {
            this.selectNumber += 1;
          } else {
            this.selectNumber -= 1;
          }
          localStorage.setItem('select', JSON.stringify(this.selectNumber));
          this.selectCountElem.innerHTML = `<span>${this.selectNumber}</span>`;
        });
      }
    });
  }

}

export default Card;