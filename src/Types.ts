import React from "react";

export type CardType = {
  flag: string;
  name: string;
  region: string;
  id?: string;
  capital: string;
  onOpen?: () => void;
}
export type RenderCards = {
  error: null;
  isLoaded: boolean;
  allCountries?: CardType[];
  isModalOpen: boolean;
  countryName: string;
  countryRegion: string;
  countryCapital: string;
}
export type InputType = {
  type: string;
  placeholder?: string;
  value?: string;
  id: string;
  onChange?: ({ target: value }: { target: string }) => void;
  ref?: React.RefObject<HTMLInputElement>
}
export type FormCardType = {
  name: string;
  lastName: string;
  date: string;
  countries: string;
  img?: string;
  notify?: string;
}
export type ModalType = {
  onClose: () => void;
  name?: string;
  region?: string;
  capital?: string;
};
export type PaginationType = {
  countriesPerPage: number;
  totalCountries: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}
export type ContextType = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};
export type OptContextType = {
  defaultOpt: {
    bloc: string,
    lang: string,
  };
  setDefaultOpt: React.Dispatch<React.SetStateAction<
    {
      bloc: string,
      lang: string,
    }>>;
};
export type FormDataContextType = {
  formData: FormCardType[];
  setFormData: React.Dispatch<React.SetStateAction<FormCardType[]>>;
};
export type AllCountriesContextType = {
  allCountries: CardType[];
  setAllCountries: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export type CounterType = {
  count: number,
}
export type ActionType = {
  type: string,
}