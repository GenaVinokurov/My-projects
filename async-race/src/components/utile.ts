import React, { useContext } from 'react';
import { CarsContext } from '../CarsProvider';
import { getCars } from './api';
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

export const checkButtons = (page: number, all: number) => {
  const prevButton = document.querySelector('.prev') as HTMLButtonElement;
  const nextButton = document.querySelector('.next') as HTMLButtonElement;
  if (page === 1) {
    prevButton.classList.add('disabled');
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
    prevButton.classList.remove('disabled');
  }
  if (page === all) {
    nextButton.classList.add('disabled');
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
    nextButton.classList.remove('disabled');
  }
};