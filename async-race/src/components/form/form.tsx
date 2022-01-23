import React, { useState, useEffect, useContext } from 'react';
import MyInput from '../UI/input';
import Button from '../UI/button';
import { creatCar, updateCar, getCars } from '../api';
import { selectCar } from '../car';
import { CarsContext, CountContext } from '../../CarsProvider';
import GenerateCars from './generateCars';
import store from '../store';

const Form: React.FC = () => {
  const [name, setCar] = useState<string>();
  const [color, setColor] = useState<string>();
  const [nameUpd, setCarUpd] = useState<string>();
  const [colorUpd, setColorUpd] = useState<string>();
  const { setCars } = useContext(CarsContext);
  const { setCount } = useContext(CountContext);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string | undefined>>,
  ) => {
    set(e.target.value);
  };

  const getFunction = () => {
    creatCar({ name, color })
      .then(() => getCars(store.page)
        .then((result: any) => {
          setCount(result.count);
          setCars(result.items);
        }));
  };
  const updateFunction = () => {
    const parent = selectCar.parentElement?.parentElement as HTMLElement;
    updateCar({ name: nameUpd, color: colorUpd, id: parent.id })
      .then(() => getCars(store.page)
        .then((result: any) => {
          setCount(result.count);
          setCars(result.items);
        }));
  };

  return (
    <form action="" className="form">
      <div className="form-wrapper">
        <MyInput
          value={name}
          id="input-1"
          placeholder="Add name"
          onChange={(event) => changeHandler(event, setCar)}
        />
        <input
          type="color"
          id="head"
          name="head"
          className="input-color"
          onChange={(event) => changeHandler(event, setColor)}
        />

        <Button onClick={() => getFunction()}>Create</Button>
      </div>
      <div className="form-wrapper">
        <MyInput
          value={nameUpd}
          id="input-2"
          placeholder="Change name"
          onChange={(event) => changeHandler(event, setCarUpd)}
        />
        <input
          type="color"
          id="head"
          name="head"
          className="input-color"
          onChange={(event) => changeHandler(event, setColorUpd)}
        />
        <Button onClick={() => updateFunction()}>
          Update
        </Button>
      </div>
      <GenerateCars />
    </form>
  );
};

export default Form;