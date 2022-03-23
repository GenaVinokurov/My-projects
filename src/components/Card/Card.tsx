import React, { Component } from 'react';
import css from './Card.module.css';
import { ICard } from '../../Types';

class Card extends Component<Partial<ICard>> {
  constructor(props: Partial<ICard>) {
    super(props);
  }
  render() {
    return (
      <li className={css.container} key={this.props.id}>
        <img src={this.props.flag} alt="img-flag" className={css.flag} />
        <div className={css.description}>
          <h3 className={css.name}>{this.props.name}</h3>
          <p className={css.text}>Region: {this.props.region}</p>
          <p className={css.text}>Capital: {this.props.capital}</p>
        </div>
      </li>
    );
  }
}

export default Card;
