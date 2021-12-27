
class MainTree {
  localTree: HTMLImageElement;
  treeCollection: NodeList;
  mainTree: HTMLElement;
  bgCollection: NodeList;
  treeNum: string;
  bgNum: string;
  constructor() {
    this.localTree = document.getElementById('mapTree') as HTMLImageElement;
    this.treeCollection = document.querySelectorAll('.tree') as NodeList;
    this.treeNum = '1' as string;
    this.bgNum = '1' as string;
    this.mainTree = document.querySelector('.main-tree') as HTMLElement;
    this.bgCollection = document.querySelectorAll('.bg') as NodeList;
    this.checkLocalStorage();
    this.treeLoader();
    this.bgLoader();
  }

  checkLocalStorage() {
    if (localStorage.tree === undefined) {
      localStorage.setItem('tree', JSON.stringify(this.treeNum));
    }
    if (localStorage.bgTree === undefined) {
      localStorage.setItem('bgTree', JSON.stringify(this.bgNum));
    }
    const localTreeNum = localStorage.getItem('tree') || '';
    this.treeNum = JSON.parse(localTreeNum) as string;
    const localBgNum = localStorage.getItem('bgTree') || '';
    this.bgNum = JSON.parse(localBgNum) as string;
  }

  treeLoader() {
    let cardNum = this.treeNum;
    this.localTree.src = `./assets/tree/${cardNum}.png`;
    this.treeCollection.forEach((el, i) => {
      const cardElem = (<Element>this.treeCollection[i]);
      cardElem.id = `${i + 1}`;
      el.addEventListener('click', function (e) {
        const card = e.currentTarget as HTMLElement;
        cardNum = card.id;
        localStorage.setItem('tree', JSON.stringify(cardNum));
        const mainTreeEvent = document.getElementById('mapTree') as HTMLImageElement;
        mainTreeEvent.src = `./assets/tree/${cardNum}.png`;
      });
    });
  }

  bgLoader() {
    let bgNum = this.bgNum;
    this.bgCollection.forEach((el, i) => {
      const bgElem = (<Element>this.bgCollection[i]);
      const mainBgEvent = document.querySelector('.tree-main') as HTMLElement;
      mainBgEvent.style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
      bgElem.id = `${i + 1}`;
      el.addEventListener('click', function (e) {
        const card = e.currentTarget as HTMLElement;
        bgNum = card.id;
        localStorage.setItem('bgTree', JSON.stringify(bgNum));
        mainBgEvent.style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
      });
    });
  }
}



export default MainTree;