import React, { useState, useMemo } from 'react';
import { CardType, FormCardType } from './Types';
import { ContextType, OptContextType, FormDataContextType, AllCountriesContextType } from './Types';
export const CountriesContext = React.createContext<ContextType | undefined>(undefined);
export const OptContext = React.createContext<OptContextType | undefined>(undefined);
export const FormDataContext = React.createContext<FormDataContextType | undefined>(undefined);
export const AllCountriesContext = React.createContext<AllCountriesContextType | undefined>(
  undefined
);

const Context: React.FC<React.ReactNode> = ({ children }) => {
  const [sort, setSort] = useState<string>('all');
  const [defaultOpt, setDefaultOpt] = useState({
    bloc: 'all',
    lang: 'all',
  });
  const [formData, setFormData] = useState<FormCardType[]>([]);
  const [allCountries, setAllCountries] = useState<CardType[]>([]);
  const value = useMemo(() => ({ sort, setSort }), [sort]);
  const valueOpt = useMemo(() => ({ defaultOpt, setDefaultOpt }), [defaultOpt]);
  const valueFormData = useMemo(() => ({ formData, setFormData }), [formData]);
  const valueAllCountries = useMemo(() => ({ allCountries, setAllCountries }), [allCountries]);
  return (
    <CountriesContext.Provider value={value}>
      <OptContext.Provider value={valueOpt}>
        <FormDataContext.Provider value={valueFormData}>
          <AllCountriesContext.Provider value={valueAllCountries}>
            {children}
          </AllCountriesContext.Provider>
        </FormDataContext.Provider>
      </OptContext.Provider>
    </CountriesContext.Provider>
  );
};

export default Context;
