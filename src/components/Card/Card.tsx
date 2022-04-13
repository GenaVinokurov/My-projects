import React, { Component } from 'react';
import css from './Card.module.css';
import { CardType } from '../../Types';

class Card extends Component<Partial<CardType>> {
  constructor(props: Partial<CardType>) {
    super(props);
  }
  render() {
    return (
      <li
        className={css.container}
        key={this.props.id}
        id={this.props.name}
        data-testid={`card-${this.props.id}`}
      >
        <img src={this.props.flag} alt="img-flag" className={css.flag} />
        <div className={css.description}>
          <h3 className={css.name}>{this.props.name}</h3>
          {this.props.children}
        </div>
      </li>
    );
  }
}

export default Card;
