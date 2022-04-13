import React, { Component } from 'react';
import css from './Modal.module.css';
import ReactDOM from 'react-dom';
type ModalType = {
  onClose: () => void;
  name?: string;
  region?: string;
  capital?: string;
};

class Modal extends Component<ModalType> {
  render() {
    return ReactDOM.createPortal(
      <div className={css.module}>
        <div className={css.overlay} id="overlay" onClick={this.props.onClose}></div>
        <div className={css.container}>
          <h1>{this.props.name}</h1>
          <p className={css.text}>Capital: {this.props.capital}</p>
          <p className={css.text}>Region: {this.props.region}</p>
          <button className={css.btn__close} onClick={this.props.onClose}>
            Close
          </button>
        </div>
        {this.props.children}
      </div>,
      document.getElementById('portal') as HTMLElement
    );
  }
}

export default Modal;
