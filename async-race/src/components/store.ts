import { ICar } from './types';

export default {
  isSelected: false,
  selectedId: 0,
  car: {} as ICar,
  page: 1,
  cars: [] as ICar[],
  carsCount: 4,
  pageWinners: 1,
  winnersCount: 1,
  view: 'garage',
  sort: 'id',
  order: 'ASC',
  animation: {} as Record<string, Record<string, number>>,
};