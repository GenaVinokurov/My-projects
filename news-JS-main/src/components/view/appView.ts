import News, { IArticle } from './news/news';
import Sources, { ISource } from './sources/sources';

export interface IDataArticles {
  articles?: Array<IArticle>;
  status?: string;
  totalResult?: string;
}

export interface IDataSources {
  sources?: Array<ISource>;
  status?: string;
}

export class AppView {

  news: News;

  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();

  }

  drawNews(data: IDataArticles) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IDataSources) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
