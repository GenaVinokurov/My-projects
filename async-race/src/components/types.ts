import react, { ReactNode } from 'react';

export type IPropsText = {
  children: string;
}

export interface ICar {
  name?: string;
  color?: string;
  id?: any;
  nameUpd?: string;
  colorUpd?: string;
}
export interface IResult {
  items: JSON;
  count: string;
}
export type ButtonProp = {
  children: ReactNode;
  extraClass?: string;
  disabled?: boolean;
  id?: string;
  onClick?: (e: any) => void;
  // React.MouseEvent<HTMLButtonElement>
};