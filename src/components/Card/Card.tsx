import React from 'react';
import css from './Card.module.css';
import { CardType } from '../../Types';

const Card: React.FC<CardType> = (props) => {
  return (
    <li className={css.container} key={props.id} id={props.name} data-testid={`item-${props.name}`}>
      <img src={props.flag} alt="img-flag" className={css.flag} />
      <div className={css.description}>
        <h3 className={css.name}>{props.name}</h3>
        {props.children}
      </div>
    </li>
  );
};

export default Card;
