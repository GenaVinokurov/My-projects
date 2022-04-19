import React from 'react';
import css from './Card.module.css';
import { CardType } from '../../Types';

const Card: React.FC<CardType> = (props) => {
  const { id, name, flag, children } = props;
  return (
    <li className={css.container} key={id} id={name} data-testid={`item-${name}`}>
      <img src={flag} alt="img-flag" className={css.flag} />
      <div className={css.description}>
        <h3 className={css.name}>{name}</h3>
        {children}
      </div>
    </li>
  );
};

export default Card;
