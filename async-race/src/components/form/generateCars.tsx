import React, { useContext } from 'react';
import { CarsContext } from '../../CarsProvider';
import { creatCar, getCars } from '../api';
import Button from '../UI/button';
import { generateRandomCars } from '../utile';

const GenerateCars = () => {
  const { cars, setCars } = useContext(CarsContext);
  const generate = () => {
    const newCars = generateRandomCars();
    newCars.forEach((car) => {
      creatCar(car)
        .then(() => getCars().then((result: any) => setCars(result.items)));
    });
  };
  return (
    <div className="form-wrapper">
      <Button>Race</Button>
      <Button>Reset</Button>
      <Button onClick={() => generate()}>Generate cars</Button>
    </div>
  );
};

export default GenerateCars;