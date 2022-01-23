import { ICar } from './types';
import { brandsCars } from '../assets/brands-cars';
import { modelsCars } from '../assets/models-cars';

const getRandomName = () => {
  const model = modelsCars[Math.floor(Math.random() * modelsCars.length)];
  const brand = modelsCars[Math.floor(Math.random() * brandsCars.length)];
  return `${model} ${brand}`;
};
const getRandomColor = () => {
  const letters = '0123456789ABCDEFG';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};
export const generateRandomCars = (count = 100): ICar[] => new Array(count)
  .fill(1).map((x) => ({ name: getRandomName(), color: getRandomColor() }));