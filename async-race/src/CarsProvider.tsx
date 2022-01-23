import React, { useState, useEffect, useMemo } from 'react';
import { ICar } from './components/types';
import { getCars } from './components/api';

export const CarsContext = React.createContext<any>([]);
export const CountContext = React.createContext<any>(0);
const CarsProvider = ({ children }: any) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ cars, setCars }), [cars]);
  const valueCount = useMemo(() => ({ count, setCount }), [count]);
  return (
    <CarsContext.Provider value={value}>
      <CountContext.Provider value={valueCount}>
        {children}
      </CountContext.Provider>
    </CarsContext.Provider>
  );
};

export default CarsProvider;