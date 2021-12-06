import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: '0a50c7d3f7924068b50c55e073adff3e', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
