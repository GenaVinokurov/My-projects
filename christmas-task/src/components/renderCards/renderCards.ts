import Card, { IData } from '../card/card';

class RenderCards extends Card {
  buttonReset: HTMLElement;
  favoriteEl: HTMLInputElement;
  constructor() {
    super();
    this.buttonReset = document.querySelector('.btn-reset') as HTMLElement;
    this.favoriteEl = document.getElementById('favoriteInput') as HTMLInputElement;
    this.buttonReset.addEventListener('click', this.reset.bind(this));
    this.favoriteEl.addEventListener('input', this.favoriteSort.bind(this));
    this.sortSelect.addEventListener('change', this.render.bind(this));
  }

  render() {
    this.sortList();
    (this.filterObj.favorite) ? this.favoriteEl.checked = true : this.favoriteEl.checked = false;
    localStorage.setItem('filters', JSON.stringify(this.filterObj));
    let localArr = localStorage.getItem('toys') || '';
    localArr = JSON.parse(localArr);
    let mainArr: IData[] = this.realToys;
    if (mainArr.length === 0) mainArr = this.dataJson;
    this.cardContainer.innerHTML = '';
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
    this.cardCollection.forEach((el, i) => {
      const cardElem = (<Element>this.cardCollection[i]);
      this.selectArr.forEach(item => {
        if (item.num === cardElem.id) cardElem.classList.add('select-card');
      });

      el.addEventListener('click', (e: Event) => {
        const card = e.currentTarget as HTMLElement;

        if (this.selectArr.length < 20) {
          card.classList.toggle('select-card');
          this.cardCollection.forEach((elem, num) => {
            const cardElemRem = (<Element>this.cardCollection[num]);
            cardElemRem.classList.remove('select-max');
          });

          if (card.classList.contains('select-card')) {
            const selectData: IData | undefined = this.dataJson.find(item => {
              return item.num === card.id;
            });
            if (selectData != undefined) {
              this.selectArr.push(selectData);
            }
          } else {
            this.selectArr.forEach((item, index) => {
              if (item.num === card.id) {
                this.selectArr.splice(index, 1);
              }
            });
          }
        } else if (card.classList.contains('select-card')) {
          card.classList.remove('select-card');
          this.selectArr.forEach((item, index) => {
            if (item.num === card.id) {
              this.selectArr.splice(index, 1);
            }
            this.cardCollection.forEach((elem, num) => {
              const cardElemRem = (<Element>this.cardCollection[num]);
              cardElemRem.classList.remove('select-max');
            });
          });
        } else {
          card.classList.add('select-max');
          this.selectArr.forEach((item, index) => {
            if (item.num === card.id) {
              this.selectArr.splice(index, 1);
            }
          });
        }

        localStorage.setItem('select', JSON.stringify(this.selectArr));
        this.selectCountElem.innerHTML = `<span>${this.selectArr.length}</span>`;
      });
    });
    this.checkFilters();
    this.updateSort();
  }

  reset() {
    this.filterObj = {
      count: { start: '0', end: '12' },
      year: { start: '1940', end: '2020' },
      shape: {
        ball: false,
        bell: false,
        pinecone: false,
        snowflake: false,
        figurine: false,
      },
      color: {
        white: false,
        yellow: false,
        red: false,
        blue: false,
        green: false,
      },
      size: {
        big: false,
        medium: false,
        small: false,
      },
      favorite: false,
    };
    this.realToys = this.dataJson;
    this.render();
    this.checkFilters();
    document.querySelectorAll('[data-filter]').forEach(el => el.classList.remove('active'));
  }

  favoriteSort() {
    let renderArr = [] as IData[];
    if (!this.filterObj.favorite) {
      this.realToys.map(function (a: IData): any {
        if (a.favorite == true) {
          renderArr.push(a);
        }
      });

      localStorage.setItem('toys', JSON.stringify(renderArr));
      this.filterObj.favorite = true;
      localStorage.setItem('filters', JSON.stringify(this.filterObj));
    } else {
      this.checkFilters();
      renderArr = this.dataJson;
      localStorage.setItem('toys', JSON.stringify(renderArr));
      localStorage.setItem('filters', JSON.stringify(this.filterObj));
      this.filterObj.favorite = false;
    }
    this.realToys = renderArr;
    this.render();
  }
}

export default RenderCards;