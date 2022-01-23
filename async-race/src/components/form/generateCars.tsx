import React, { useContext } from 'react';
import { CarsContext, CountContext } from '../../CarsProvider';
import { creatCar, getCars } from '../api';
import Button from '../UI/button';
import { generateRandomCars } from '../utile';
import store from '../store';

const GenerateCars = () => {
  const { setCars } = useContext(CarsContext);
  const { setCount } = useContext(CountContext);
  const generate = () => {
    const newCars = generateRandomCars();
    newCars.forEach((car) => {
      creatCar(car)
        .then(() => getCars(store.page)
          .then((result: any) => {
            setCount(result.count);
            setCars(result.items);
          }));
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