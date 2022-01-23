import React, { useContext, useEffect, useState } from 'react';
import Car from '../components/car';
import { ICar, IResult } from '../components/types';
import { getCars, creatCar } from '../components/api';
import { CarsContext, CountContext } from '../CarsProvider';
import Button from '../components/UI/button';
import store from '../components/store';
import { checkButtons } from '../components/utile';

const Garage = () => {
  const { cars, setCars } = useContext(CarsContext);
  const { count, setCount } = useContext(CountContext);
  const allPage = Math.ceil(count / 7);
  useEffect(() => {
    getCars(store.page)
      .then((result: any) => {
        setCount(result.count);
        setCars(result.items);
        checkButtons(store.page, allPage);
      });
  }, []);

  const changePage = (e: Event, argument: number) => {
    const prevButton = document.querySelector('.prev') as HTMLButtonElement;

    if (e.target === prevButton) {
      if (store.page > 1) {
        store.page += argument;
        getCars(store.page).then((result: any) => {
          setCars(result.items);
          checkButtons(store.page, allPage);
        });
      }
    } else if (store.page !== allPage) {
      store.page += argument;
      getCars(store.page).then((result: any) => {
        setCars(result.items);
        checkButtons(store.page, allPage);
      });
    }
    // if (prevButton.classList.contains('prev')) {
    //   if (store.page > 1) {
    //     prevButton.disabled = false;
    //     console.log('no disabled');
    //     prevButton.classList.remove('disabled');
    //   } else {
    //     console.log('disabled');
    //     prevButton.disabled = true;
    //     prevButton.classList.add('disabled');
    //   }
    // } else if (store.page * 7 < count) {
    //   nextButton.disabled = false;
    //   nextButton.classList.remove('disabled');
    // } else {
    //   nextButton.disabled = true;
    //   nextButton.classList.add('disabled');
    // }
  };
  return (
    <div>
      <div className="title-wrapper">
        <h2 className="title">Garage <span className="counter">({count})</span></h2>
      </div>
      <p className="page">
        Page <span># {store.page}</span>
      </p>
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
      <div className="pagination">
        <Button extraClass="prev" onClick={(e) => changePage(e, -1)}>prev</Button>
        <Button extraClass="next" onClick={(e) => changePage(e, +1)}>next</Button>
      </div>
    </div>
  );
};

export default Garage;