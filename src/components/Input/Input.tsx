import css from './Input.module.css';
import React, { Component } from 'react';
import { InputType } from '../../Types';

class Input extends Component<InputType, string> {
  constructor(props: InputType) {
    super(props);
  }
  render() {
    return (
      <input
        type={this.props.type}
        className={css.input}
        placeholder={this.props.placeholder}
        value={this.props.value}
        id={this.props.id}
        ref={this.props.ref}
      />
    );
  }
}

export default Input;
