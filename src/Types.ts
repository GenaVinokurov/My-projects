export type CardType = {
  flag: string;
  name: string;
  region: string;
  id?: string;
  capital: string;
}
export type RenderCards = {
  error: null;
  isLoaded: boolean;
  allCountries?: CardType[];
}
