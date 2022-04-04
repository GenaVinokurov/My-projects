import React from "react";

export type CardType = {
  flag: string;
  name: string;
  region: string;
  id?: string;
  capital: string;
}
export type RenderCards = {
  error: null;
  isLoaded: boolean;
  allCountries?: CardType[];
}
export type InputType = {
  type: string;
  placeholder?: string;
  value?: string;
  id: string;
  onChange?: ({ target: value }: { target: string }) => void;
  ref?: React.RefObject<HTMLInputElement>
}
export type FormState = {
  formData: FormCardType[]
}
export type FormCardType = {
  name: string;
  lastName: string;
  date: string;
  countries: string;
  img: string;
}