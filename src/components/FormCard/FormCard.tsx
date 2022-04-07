import React, { Component } from 'react';
import css from './FormCard.module.css';
import { FormCardType } from '../../Types';

class FormCard extends Component<Partial<FormCardType>> {
  constructor(props: Partial<FormCardType>) {
    super(props);
  }
  render() {
    return (
      <div className={css.container}>
        <p className={css.text}>Name: {this.props.name}</p>
        <p className={css.text}>Last name: {this.props.lastName}</p>
        <p className={css.text}>Date: {this.props.date}</p>
        <p className={css.text}>Country: {this.props.countries}</p>
      </div>
    );
  }
}

export default FormCard;
