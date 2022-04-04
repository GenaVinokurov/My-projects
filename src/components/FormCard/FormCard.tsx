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
        <p className={css.text}>{this.props.name}</p>
        <p className={css.text}>{this.props.lastName}</p>
        <p className={css.text}>{this.props.date}</p>
        <p className={css.text}>{this.props.countries}</p>
      </div>
    );
  }
}

export default FormCard;
