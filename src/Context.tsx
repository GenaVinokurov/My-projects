import React, { useState, useMemo } from 'react';
import { CardType, FormCardType } from './Types';
export type ContextType = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};
export type BlocOptContextType = {
  defaultBlocOpt: string;
  setDefaultBlocOpt: React.Dispatch<React.SetStateAction<string>>;
};
export type LangOptContextType = {
  defaultLangOpt: string;
  setDefaultLangOpt: React.Dispatch<React.SetStateAction<string>>;
};
export type FormDataContextType = {
  formData: FormCardType[];
  setFormData: React.Dispatch<React.SetStateAction<FormCardType[]>>;
};
export type AllCountriesContextType = {
  allCountries: CardType[];
  setAllCountries: React.Dispatch<React.SetStateAction<CardType[]>>;
};
export const CountriesContext = React.createContext<ContextType | undefined>(undefined);
export const BlocOptContext = React.createContext<BlocOptContextType | undefined>(undefined);
export const LangOptContext = React.createContext<LangOptContextType | undefined>(undefined);
export const FormDataContext = React.createContext<FormDataContextType | undefined>(undefined);
export const AllCountriesContext = React.createContext<AllCountriesContextType | undefined>(
  undefined
);

const Context: React.FC<React.ReactNode> = ({ children }) => {
  const [sort, setSort] = useState<string>('all');
  const [defaultBlocOpt, setDefaultBlocOpt] = useState<string>('all');
  const [defaultLangOpt, setDefaultLangOpt] = useState<string>('all');
  const [formData, setFormData] = useState<FormCardType[]>([]);
  const [allCountries, setAllCountries] = useState<CardType[]>([]);
  const value = useMemo(() => ({ sort, setSort }), [sort]);
  const valueBlocOpt = useMemo(() => ({ defaultBlocOpt, setDefaultBlocOpt }), [defaultBlocOpt]);
  const valueLangOpt = useMemo(() => ({ defaultLangOpt, setDefaultLangOpt }), [defaultLangOpt]);
  const valueFormData = useMemo(() => ({ formData, setFormData }), [formData]);
  const valueAllCountries = useMemo(() => ({ allCountries, setAllCountries }), [allCountries]);
  return (
    <CountriesContext.Provider value={value}>
      <BlocOptContext.Provider value={valueBlocOpt}>
        <LangOptContext.Provider value={valueLangOpt}>
          <FormDataContext.Provider value={valueFormData}>
            <AllCountriesContext.Provider value={valueAllCountries}>
              {children}
            </AllCountriesContext.Provider>
          </FormDataContext.Provider>
        </LangOptContext.Provider>
      </BlocOptContext.Provider>
    </CountriesContext.Provider>
  );
};

export default Context;
