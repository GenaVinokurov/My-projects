import React, { useState, useEffect, useMemo } from 'react';
import { ICar } from './components/types';
import { getCars } from './components/api';

export const CarsContext = React.createContext<any>([]);

const CarsProvider = ({ children }: any) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const value = useMemo(() => ({ cars, setCars }), [cars]);

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
};

export default CarsProvider;