import React from 'react';
import css from './Modal.module.css';
import { ModalType } from '../../Types';

const Modal: React.FC<ModalType> = (props) => {
  const { onClose, name, capital, region, children } = props;
  return (
    <div className={css.module}>
      <div className={css.overlay} id="overlay" onClick={onClose}></div>
      <div className={css.container}>
        <h1>{name}</h1>
        <p className={css.text}>Capital: {capital}</p>
        <p className={css.text}>Region: {region}</p>
        <button className={css.btn__close} onClick={onClose}>
          Close
        </button>
      </div>
      {children}
    </div>
  );
};

export default Modal;
