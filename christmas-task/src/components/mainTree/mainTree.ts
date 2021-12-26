
class MainTree {
  localTree: HTMLImageElement;
  treeCollection: NodeList;
  mainTree: HTMLElement;
  bgCollection: NodeList;
  constructor() {
    this.localTree = document.getElementById('mapTree') as HTMLImageElement;
    this.treeCollection = document.querySelectorAll('.tree') as NodeList;
    this.mainTree = document.querySelector('.main-tree') as HTMLElement;
    this.bgCollection = document.querySelectorAll('.bg') as NodeList;
    this.treeLoader();
    this.bgLoader();
  }

  treeLoader() {
    this.localTree.src = './assets/tree/1.png';
    let cardNum = '1';
    this.treeCollection.forEach((el, i) => {
      const cardElem = (<Element>this.treeCollection[i]);
      cardElem.id = `${i + 1}`;
      el.addEventListener('click', function (e) {
        const card = e.currentTarget as HTMLElement;
        cardNum = card.id;
        const mainTreeEvent = document.getElementById('mapTree') as HTMLImageElement;
        mainTreeEvent.src = `./assets/tree/${cardNum}.png`;
      });
    });
  }

  bgLoader() {
    let bgNum = '1';
    this.bgCollection.forEach((el, i) => {
      const bgElem = (<Element>this.bgCollection[i]);
      bgElem.id = `${i + 1}`;
      el.addEventListener('click', function (e) {
        const card = e.currentTarget as HTMLElement;
        bgNum = card.id;
        const mainBgEvent = document.querySelector('.tree-main') as HTMLElement;
        mainBgEvent.style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
      });
    });
  }
}



export default MainTree;