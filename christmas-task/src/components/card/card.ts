import data from '../../data.json';
import noUiSlider, { API, TargetElement } from 'nouislider';
import '../../../node_modules/nouislider/dist/nouislider.css';

export interface IData {
  num: string; name: string; count: string; year: string; shape: string; color: string; size: string; favorite: boolean;
}

interface IObj {
  count: { start: string | number, end: string | number },
  year: { start: string | number, end: string | number },
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
  num?: string;
  name?: string;
  count?: string;
  year?: string;
  shape?: string;
  color?: string;
  size?: string;
  favorite?: boolean;
}

type Target = TargetElement & IObj & API;

class Card {
  dataJson: IData[];
  cardContainer: HTMLElement;
  cardCollection: NodeList;
  selectCountElem: HTMLElement;
  selectNumber: number;
  sortSelect: HTMLSelectElement;
  realToys: IData[];
  shapeWrap: HTMLElement;
  shapeCollection: NodeList;
  colorWrap: HTMLElement;
  colorCollection: NodeList;
  sizeCollection: NodeList;
  countWrap: HTMLElement;
  sizeWrap: HTMLElement;
  countValueUpper: HTMLInputElement;
  countValueLower: HTMLInputElement;
  yearValueUpper: HTMLInputElement;
  yearValueLower: HTMLInputElement;
  buttonClear: HTMLElement;
  selectArr: IData[];
  filterObj: IObj = {
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

  constructor() {
    this.dataJson = data as IData[];
    this.cardContainer = document.querySelector('.card-container') as HTMLElement;
    this.cardCollection = document.querySelectorAll('.card') as NodeList;
    this.selectCountElem = document.querySelector('.select') as HTMLElement;
    this.selectNumber = 0 as number;
    this.sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    this.shapeWrap = document.querySelector('.shape') as HTMLElement;
    this.colorWrap = document.querySelector('.color') as HTMLElement;
    this.countWrap = document.querySelector('.count') as HTMLElement;
    this.sizeWrap = document.querySelector('.size') as HTMLElement;
    this.countValueUpper = document.getElementById('count-value-upper') as HTMLInputElement;
    this.countValueLower = document.getElementById('count-value-lower') as HTMLInputElement;
    this.yearValueUpper = document.getElementById('year-value-upper') as HTMLInputElement;
    this.yearValueLower = document.getElementById('year-value-lower') as HTMLInputElement;
    this.shapeCollection = this.shapeWrap.querySelectorAll('button') as NodeList;
    this.colorCollection = this.colorWrap.querySelectorAll('button') as NodeList;
    this.sizeCollection = this.sizeWrap.querySelectorAll('button') as NodeList;
    this.buttonClear = document.querySelector('.btn-clear-local') as HTMLElement;
    this.selectArr = [] as IData[];
    this.shapeWrap.addEventListener('click', this.eventFilterShape.bind(this));
    this.colorWrap.addEventListener('click', this.eventFilterColor.bind(this));
    this.sizeWrap.addEventListener('click', this.eventFilterSize.bind(this));
    this.buttonClear.addEventListener('click', this.clearLocalStorage.bind(this));
    this.realToys = this.dataJson as IData[];
    this.checkLocalStorage();
    this.sliderUiFun();
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  checkLocalStorage() {
    if (localStorage.toys === undefined) {
      localStorage.setItem('toys', JSON.stringify(this.dataJson));
    }
    if (localStorage.filters === undefined) {
      localStorage.setItem('filters', JSON.stringify(this.filterObj));
    }
    if (localStorage.select === undefined) {
      localStorage.setItem('select', JSON.stringify([]));
    }
    const localArrFav = localStorage.getItem('toys') || '';
    this.realToys = JSON.parse(localArrFav) as IData[];
    const filterLocal = localStorage.getItem('filters') || '';
    this.filterObj = JSON.parse(filterLocal) as IObj;
    const selectNumLocal = localStorage.getItem('select') || '';
    this.selectArr = JSON.parse(selectNumLocal) as IData[];
    console.log(this.selectArr);
    this.selectCountElem.innerHTML = `<span>${this.selectArr.length}</span>`;

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
      if (key === 'size') {
        if (this.filterObj[key].big) activeArr[1].push('большой');
        if (this.filterObj[key].medium) activeArr[1].push('средний');
        if (this.filterObj[key].small) activeArr[1].push('малый');

        activeArr[1].forEach(el => {
          (el === 'большой') ? activeArr[0].push('size') :
            (el === 'средний') ? activeArr[0].push('size') :
              (el === 'малый') ? activeArr[0].push('size') : undefined;
        });
      }
    }
    if (activeArr != [[], []]) {
      this.mainFilter(activeArr);
    }
  }

  sliderUiFun() {
    //--count
    const skipSlider = document.querySelector('.count-slider') as Target;
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
      start: [this.filterObj.count.start, this.filterObj.count.end],
    });
    const skipValues: any = [
      this.countValueLower,
      this.countValueUpper,
    ];

    skipSlider.noUiSlider.on('update', function (values, handle) {
      skipValues[handle].value = Number(values[handle]);
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
      start: [this.filterObj.year.start, this.filterObj.year.end],
    });
    const skipValuesYear: any = [
      document.getElementById('year-value-lower'),
      document.getElementById('year-value-upper'),
    ];

    skipSliderYear.noUiSlider.on('update', function (values, handle) {
      skipValuesYear[handle].innerHTML = Number(values[handle]);
    });
  }

  updateSort() {
    //count
    const skipSlider = document.querySelector('.count-slider') as Target;
    let valuesCount: any = [];
    const updateFilterSortCount = () => {
      this.filterObj.count.start = valuesCount[0];
      this.filterObj.count.end = valuesCount[1];
      localStorage.setItem('filters', JSON.stringify(this.filterObj));
      this.sortForValueSlider();
    };
    skipSlider.noUiSlider.on('update', function () {
      valuesCount = skipSlider.noUiSlider.get();
      updateFilterSortCount();
    });
    const skipSliderYear = document.querySelector('.year-slider') as Target;
    let valuesCountYear: any = [];
    const updateFilterSortYear = () => {
      this.filterObj.year.start = valuesCountYear[0];
      this.filterObj.year.end = valuesCountYear[1];
      localStorage.setItem('filters', JSON.stringify(this.filterObj));
      this.sortForValueSlider();
    };
    skipSliderYear.noUiSlider.on('update', function () {
      valuesCountYear = skipSliderYear.noUiSlider.get();
      updateFilterSortYear();
    });
  }

  sortForValueSlider() {
    const allCards = document.querySelectorAll('.card');
    const startCount = this.filterObj.count.start;
    const endCount = this.filterObj.count.end;
    const startYear = this.filterObj.year.start;
    const endYear = this.filterObj.year.end;
    this.realToys.forEach((dataCard: IData, index: number) => {
      if ((Number(dataCard.count) < Number(startCount)) || (Number(dataCard.count) > Number(endCount))) {
        allCards[index].classList.add('hide-count');
      } else {
        allCards[index].classList.remove('hide-count');
      }
    });
    this.realToys.forEach((dataCard: IData, index: number) => {
      if ((Number(dataCard.year) < Number(startYear)) || (Number(dataCard.year) > Number(endYear))) {
        allCards[index].classList.add('hide-year');
      } else {
        allCards[index].classList.remove('hide-year');
      }
    });
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
    localStorage.setItem('filters', JSON.stringify(this.filterObj));
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
    localStorage.setItem('filters', JSON.stringify(this.filterObj));
  }

  eventFilterSize(e: Event) {
    const current = e.target as HTMLElement;
    current.classList.toggle('active');
    const elemArr = Array.prototype.slice.call(this.sizeCollection);
    (elemArr[0].classList.contains('active')) ? this.filterObj.size.big = true : this.filterObj.size.big = false;
    (elemArr[1].classList.contains('active')) ? this.filterObj.size.medium = true : this.filterObj.size.medium = false;
    (elemArr[2].classList.contains('active')) ? this.filterObj.size.small = true : this.filterObj.size.small = false;
    this.checkFilters();
    localStorage.setItem('filters', JSON.stringify(this.filterObj));
  }

  mainFilter(active: string[][]) {
    const allCards = document.querySelectorAll('.card');
    let key: keyof IObject;
    const stringFilter = active[0];
    const allFilter = active[1];
    this.realToys.forEach((dataCard: IData, index: number) => {
      allCards[index].classList.remove('hide');
      for (key in dataCard) {
        if (stringFilter.indexOf(String(key)) >= 0) {
          // if (key === 'name') {
          //   ((String(dataCard[key]).toLowerCase()).indexOf(String(other.name)))
          // }
          if (allFilter.indexOf(String(dataCard[key]).toLowerCase()) < 0) {
            allCards[index].classList.add('hide');
          } else {
            allFilter.forEach(i => {
              document.querySelector(`[data-filter=${i}]`)?.classList.add('active');
            });
          }
        }
      }
    });
    this.sortForValueSlider();
  }

  sortList() {
    if (this.sortSelect.selectedIndex == 0) {
      this.realToys.sort((a: IData, b: IData) => a.year > b.year ? 1 : -1);
    }
    if (this.sortSelect.selectedIndex == 1) {
      this.realToys.sort((a: IData, b: IData) => a.year < b.year ? 1 : -1);
    }
    if (this.sortSelect.selectedIndex == 2) {
      this.realToys.sort((a: IData, b: IData) => Number(a.count) - Number(b.count));
    }
    if (this.sortSelect.selectedIndex == 3) {
      this.realToys.sort((a: IData, b: IData) => Number(b.count) - Number(a.count));
    }
  }
}

export default Card;