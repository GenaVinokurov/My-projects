import data from '../../data.json';
import noUiSlider, { API, Options, TargetElement } from 'nouislider';
import '../../../node_modules/nouislider/dist/nouislider.css';

export interface IData {
  num: string; name: string; count: string; year: string; shape: string; color: string; size: string; favorite: boolean;
}

interface IObj {
  count: { start: number, end: number },
  year: { start: number, end: number },
  shape: {
    ball: boolean,
    bell: boolean,
    pinecone: boolean,
    snowflake: boolean,
    figurine: boolean,
  },
  color: {
    white: boolean,
    yellow: boolean,
    red: boolean,
    blue: boolean,
    green: boolean,
  },
  size: {
    big: boolean,
    medium: boolean,
    small: boolean,
  },
  favorite: boolean,
}
interface IObject {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
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
  colorWrap: HTMLElement;
  colorCollection: NodeList;
  countWrap: HTMLElement;
  filterObj: IObj = {
    count: { start: 0, end: 12 },
    year: { start: 1940, end: 2020 },
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

  constructor() {
    this.dataJson = data as IData[];
    this.cardContainer = document.querySelector('.card-container') as HTMLElement;
    this.favoriteEl = document.getElementById('favoriteInput') as HTMLInputElement;
    this.cardCollection = document.querySelectorAll('.card') as NodeList;
    this.selectCountElem = document.querySelector('.select') as HTMLElement;
    this.selectNumber = 0 as number;
    this.sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    this.shapeWrap = document.querySelector('.shape') as HTMLElement;
    this.colorWrap = document.querySelector('.color') as HTMLElement;
    this.shapeCollection = this.shapeWrap.querySelectorAll('button') as NodeList;
    this.colorCollection = this.colorWrap.querySelectorAll('button') as NodeList;
    this.shapeWrap.addEventListener('click', this.eventFilterShape.bind(this));
    this.colorWrap.addEventListener('click', this.eventFilterColor.bind(this));
    this.countWrap = document.querySelector('.count') as HTMLElement;
    this.sortSelect.addEventListener('change', this.sortList.bind(this));
    this.favoriteEl.addEventListener('input', this.favoriteSort.bind(this));
    this.realToys = this.dataJson as IData[];
    this.checkLocalStorage();
    this.sliderUiFun();

  }

  sliderUiFun() {
    //--count
    const skipSlider = document.querySelector('.count-slider') as TargetElement;
    noUiSlider.create(skipSlider, {
      connect: true,
      behaviour: 'tap',
      range: {
        'min': 1,
        '9.09%': 2,
        '18.18%': 3,
        '27.27%': 4,
        '36.36%': 5,
        '45.45%': 6,
        '54.54%': 7,
        '63.63%': 8,
        '72.72%': 9,
        '81.81%': 10,
        '90.90%': 11,
        'max': 12,
      },
      snap: true,
      start: [1, 12],
    });
    const skipValues: any = [
      document.getElementById('count-value-lower'),
      document.getElementById('count-value-upper'),
    ];

    skipSlider.noUiSlider.on('update', function (values, handle) {
      skipValues[handle].innerHTML = Number(values[handle]);
    });
    //--Year
    const skipSliderYear = document.querySelector('.year-slider') as TargetElement;
    noUiSlider.create(skipSliderYear, {
      connect: true,
      behaviour: 'tap',
      range: {
        'min': 1940,
        '12.5%': 1950,
        '25%': 1960,
        '37.5%': 1970,
        '50%': 1980,
        '62.5%': 1990,
        '75%': 2000,
        '87.5%': 2010,
        'max': 2020,
      },
      snap: true,
      start: [1950, 2020],
    });
    const skipValuesYear: any = [
      document.getElementById('year-value-lower'),
      document.getElementById('year-value-upper'),
    ];

    skipSliderYear.noUiSlider.on('update', function (values, handle) {
      skipValuesYear[handle].innerHTML = Number(values[handle]);
    });

  }

  getValueSortSlider() {
    //--count
    let startValueCount: string | number | undefined = document.getElementById('count-value-lower')?.innerText;
    startValueCount = Number(startValueCount);
    this.filterObj.count.start = startValueCount;
    let endValueCount: string | number | undefined = document.getElementById('count-value-upper')?.innerText;
    endValueCount = Number(endValueCount);
    this.filterObj.count.end = endValueCount;
    //--year
    let startValue: string | number | undefined = document.getElementById('year-value-lower')?.innerText;
    startValue = Number(startValue);
    this.filterObj.year.start = startValue;
    let endValue: string | number | undefined = document.getElementById('year-value-upper')?.innerText;
    endValue = Number(endValue);
    this.filterObj.year.end = endValue;

  }


  checkLocalStorage() {
    if (localStorage.toys === undefined) {
      localStorage.setItem('toys', JSON.stringify(this.dataJson));
    }
    const localArrFav = localStorage.getItem('toys') || '';
    this.realToys = JSON.parse(localArrFav) as IData[];
  }

  eventFilterShape(e: Event) {
    const current = e.target as HTMLElement;
    current.classList.toggle('active');
    const elemArr = Array.prototype.slice.call(this.shapeCollection);
    (elemArr[0].classList.contains('active')) ? this.filterObj.shape.ball = true : this.filterObj.shape.ball = false;
    (elemArr[1].classList.contains('active')) ? this.filterObj.shape.bell = true : this.filterObj.shape.bell = false;
    (elemArr[2].classList.contains('active')) ? this.filterObj.shape.pinecone = true : this.filterObj.shape.pinecone = false;
    (elemArr[3].classList.contains('active')) ? this.filterObj.shape.snowflake = true : this.filterObj.shape.snowflake = false;
    (elemArr[4].classList.contains('active')) ? this.filterObj.shape.figurine = true : this.filterObj.shape.figurine = false;
    this.checkFilters();
  }

  eventFilterColor(e: Event) {
    const current = e.target as HTMLElement;
    current.classList.toggle('active');
    const elemArr = Array.prototype.slice.call(this.colorCollection);
    (elemArr[0].classList.contains('active')) ? this.filterObj.color.white = true : this.filterObj.color.white = false;
    (elemArr[1].classList.contains('active')) ? this.filterObj.color.yellow = true : this.filterObj.color.yellow = false;
    (elemArr[2].classList.contains('active')) ? this.filterObj.color.red = true : this.filterObj.color.red = false;
    (elemArr[3].classList.contains('active')) ? this.filterObj.color.blue = true : this.filterObj.color.blue = false;
    (elemArr[4].classList.contains('active')) ? this.filterObj.color.green = true : this.filterObj.color.green = false;
    this.checkFilters();
  }

  mainFilter(active: string[][]) {
    console.log('ключи', this.filterObj);
    console.log(this.realToys);
    let key: keyof IObject;
    console.log(active);
    const stringFilter = active[0];
    const allFilter = active[1];
    this.realToys = [];
    this.dataJson.forEach((dataCard: IData, index: number) => {
      for (key in dataCard) {
        if (stringFilter.indexOf(String(key)) >= 0) {
          // if (key === 'name') {
          //   ((String(dataCard[key]).toLowerCase()).indexOf(String(other.name)))
          // }
          if (allFilter.indexOf(String(dataCard[key]).toLowerCase()) >= 0) {
            console.log(allFilter.indexOf(String(dataCard[key])));
            console.log('index= ', index, 'data= ', dataCard);
            this.realToys.push(this.dataJson[index]);
          }
        }
      }
    });
    console.log('dataJSon', this.dataJson);
    this.render();
    // let renderArr = [] as IData[];
    // let localArr = [] as IData[];

    // active.forEach(el => {
    //   localArr = this.dataJson.filter((a: IData) => a.shape == el);
    //   renderArr = renderArr.concat(localArr);

    // });
    // localStorage.setItem('toys', JSON.stringify(renderArr));
    // this.realToys = renderArr;
    // this.render();
  }

  favoriteSort() {
    let renderArr = [] as IData[];
    const localArrFav = localStorage.getItem('toys') || '';
    const arrClone = JSON.parse(localArrFav);
    if (this.favoriteEl.checked) {
      this.realToys.map(function (a: IData): any {
        if (a.favorite == true) {
          renderArr.push(a);
        }
      });
      localStorage.setItem('toys', JSON.stringify(renderArr));
      this.filterObj.favorite = true;
    } else {
      this.filterObj.favorite = false;
      this.checkFilters();
      renderArr = this.realToys;
    }
    this.realToys = renderArr;
    this.render();
  }

  sortList() {
    const localArrFav = localStorage.getItem('toys') || '';
    const arrClone = JSON.parse(localArrFav);
    const renderArr = arrClone;

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

  checkFilters() {
    const activeArr: string[][] = [[], []];
    for (const key in this.filterObj) {
      if (key === 'shape') {
        if (this.filterObj[key].ball) activeArr[1].push('шар');
        if (this.filterObj[key].bell) activeArr[1].push('колокольчик');
        if (this.filterObj[key].pinecone) activeArr[1].push('шишка');
        if (this.filterObj[key].figurine) activeArr[1].push('фигурка');
        if (this.filterObj[key].snowflake) activeArr[1].push('снежинка');
        activeArr[1].forEach(el => {
          (el === 'шар') ? activeArr[0].push('shape') :
            (el === 'колокольчик') ? activeArr[0].push('shape') :
              (el === 'шишка') ? activeArr[0].push('shape') :
                (el === 'снежинка') ? activeArr[0].push('shape') :
                  (el === 'фигурка') ? activeArr[0].push('shape') : undefined;
        });
      }
      if (key === 'color') {
        if (this.filterObj[key].white) activeArr[1].push('белый');
        if (this.filterObj[key].yellow) activeArr[1].push('желтый');
        if (this.filterObj[key].red) activeArr[1].push('красный');
        if (this.filterObj[key].blue) activeArr[1].push('синий');
        if (this.filterObj[key].green) activeArr[1].push('зелёный');

        activeArr[1].forEach(el => {
          (el === 'белый') ? activeArr[0].push('color') :
            (el === 'желтый') ? activeArr[0].push('color') :
              (el === 'красный') ? activeArr[0].push('color') :
                (el === 'синий') ? activeArr[0].push('color') :
                  (el === 'зелёный') ? activeArr[0].push('color') : undefined;
        });
      }

    }
    if (activeArr != [[], []]) {
      this.mainFilter(activeArr);
    }
  }

  // removeDuplicates(arr: IData[]) {

  //   const result: IData[] = [];
  //   const duplicatesIndices: IData[] = [];
  //   arr.forEach((current: any, index: any) => {
  //     if (duplicatesIndices.includes(index)) return;
  //     result.push(current);
  //     for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
  //       const comparison: any = arr[comparisonIndex];
  //       const currentKeys = Object.keys(current);
  //       const comparisonKeys = Object.keys(comparison);
  //       if (currentKeys.length !== comparisonKeys.length) continue;
  //       const currentKeysString = currentKeys.sort().join('').toLowerCase();
  //       const comparisonKeysString = comparisonKeys.sort().join('').toLowerCase();
  //       if (currentKeysString !== comparisonKeysString) continue;
  //       let valuesEqual = true;
  //       for (let i = 0; i < currentKeys.length; i++) {
  //         const key = currentKeys[i];
  //         if (current[key] !== comparison[key]) {
  //           valuesEqual = false;
  //           break;
  //         }
  //       }
  //       if (valuesEqual) duplicatesIndices.push(comparisonIndex);
  //     }
  //   });
  //   return result;
  // }

  render() {

    let localArr = localStorage.getItem('toys') || '';
    localArr = JSON.parse(localArr);
    console.log(this.realToys);
    let mainArr: IData[] = this.realToys;
    if (mainArr.length === 0) mainArr = this.dataJson;
    console.log('mainArr', mainArr);
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