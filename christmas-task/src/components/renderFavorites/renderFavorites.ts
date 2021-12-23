import Card, { IData } from '../card/card';
import data from '../../data.json';

class RenderFavorites {
  favoritesContainer: HTMLElement;
  dataJson: IData[];
  buttonClear: HTMLElement;
  constructor() {
    this.dataJson = data as IData[];
    this.buttonClear = document.querySelector('.btn-clear-local-tree') as HTMLElement;
    this.favoritesContainer = document.querySelector('.favorites-container') as HTMLElement;
    this.buttonClear.addEventListener('click', this.clearLocalStorage.bind(this));
    this.renderFav();
  }

  clearLocalStorage() {
    console.log('1');
    localStorage.clear();
  }

  renderFav() {
    const localArr = localStorage.getItem('select') ?? '';
    let mainArr: IData[] = [];
    if (localArr != '') mainArr = JSON.parse(localArr);
    if (mainArr.length === 0) mainArr = this.dataJson;
    if (mainArr.length > 20) {
      const firstToysArr = mainArr.filter((item, index) => {
        if (index < 20) return item;
      });
      mainArr = firstToysArr;
    }

    mainArr.forEach((el, i) => {
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="favorites-count">${mainArr[i].count}</div>
      `;
      let n = 0;
      while (n < Number(mainArr[i].count)) {
        n++;
        const img = document.createElement('img');
        img.classList.add('favorites-card-img');
        img.id = `${i + 1}-${n}`;
        img.alt = 'toy';
        img.src = `./assets/toys/${mainArr[i].num}.png`;
        div.appendChild(img);
      }
      div.classList.add('favorites-card');
      this.favoritesContainer.appendChild(div);
    });
  }
}

export default RenderFavorites;