import React, { useContext, useEffect } from 'react';
import Car from '../components/car';
import { ICar, IResult } from '../components/types';
import { getCars, creatCar } from '../components/api';
import { CarsContext } from '../CarsProvider';

const Garage = () => {
  const { cars, setCars } = useContext(CarsContext);
  useEffect(() => {
    getCars().then((result: any) => setCars(result.items));
  }, []);
  return (
    <div>
      <div className="title-wrapper">
        <h2 className="title">Garage</h2>
        <span className="counter">{cars.length}</span>
      </div>
      <p className="page">Page #1</p>
      <div className="garage-container">
        {cars.map((car: ICar, index: number) => (
          <Car
            color={cars[index].color}
            name={cars[index].name}
            key={cars[index].id}
            id={cars[index].id}
          />
        ))}
      </div>
    </div>
  );
};

export default Garage;