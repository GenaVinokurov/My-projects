import './toys.scss';
// import Card from '../../components/card/card';



class Toys {
  rewindCount: HTMLInputElement;
  rewindYear: HTMLInputElement;
  constructor() {
    this.rewindCount = document.querySelector('.count-slider') as HTMLInputElement;
    this.rewindYear = document.querySelector('.year-slider') as HTMLInputElement;
    // this.rewindCount.addEventListener('input', this.rewindCountFun.bind(this));
    // this.rewindYear.addEventListener('input', this.rewindYearFun.bind(this));
  }

  // rewindCountFun() {
  //   let value: string | number = this.rewindCount.value;
  //   value = Number(value) / 12;
  //   this.rewindCount.style.background = `linear-gradient(to right, #24C5DB ${value * 100}%, #24C5DB ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  // }

  // rewindYearFun() {
  //   let value: string | number = this.rewindYear.value;
  //   value = Number(value) / 60;
  //   this.rewindYear.style.background = `linear-gradient(to right, #24C5DB ${value * 100}%, #24C5DB ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  // }
}

export default Toys;