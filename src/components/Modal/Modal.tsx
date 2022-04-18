import React from 'react';
import css from './Modal.module.css';
import ReactDOM from 'react-dom';
import { ModalType } from '../../Types';

const Modal: React.FC<ModalType> = (props) => {
  return ReactDOM.createPortal(
    <div className={css.module}>
      <div className={css.overlay} id="overlay" onClick={props.onClose}></div>
      <div className={css.container}>
        <h1>{props.name}</h1>
        <p className={css.text}>Capital: {props.capital}</p>
        <p className={css.text}>Region: {props.region}</p>
        <button className={css.btn__close} onClick={props.onClose}>
          Close
        </button>
      </div>
      {props.children}
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
