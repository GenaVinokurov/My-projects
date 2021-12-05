export interface IGetResp {
  endpoint: string;
  options?: { [apiKey: string]: string };
}

export interface IUrl {
  urlOptions: {
    array1: Array<string>;
  }
}
export type CallbackType = <T>(data: T) => void;

class Loader {

  baseLink: string;

  options: { [apiKey: string]: string };

  constructor(baseLink: string, options: { [apiKey: string]: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: IGetResp,
    callback: CallbackType = () => {
      console.error('No callback for GET response');
    }) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: { [apiKey: string]: string }, endpoint: string) {
    const urlOptions: object = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: CallbackType, options: { [apiKey: string]: string } = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
