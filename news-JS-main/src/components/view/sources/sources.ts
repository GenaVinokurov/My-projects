import './sources.css';

export interface ISource {
  id: string;
  name: string;
}

class Sources {
  draw(data: ISource[]) {
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    const allSources = document.querySelector('.sources');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

      const itemName = sourceClone.querySelector('.source__item-name');

      if (itemName === null || sourceClone === null || allSources === null) {
        return;
      }
      itemName.textContent = item.name;
      sourceItemTemp.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });



    if (allSources === null) {
      return;
    }
    allSources.append(fragment);
  }
}

export default Sources;
