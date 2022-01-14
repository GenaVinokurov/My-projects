import React from 'react';
import MyInput from '../UI/input';
import Button from '../UI/button';

const Form: React.FC = () => (
  <form action="" className="form">
    <div className="form-wrapper">
      <MyInput id="input-1" placeholder="Hello" />
      <Button>Create</Button>
    </div>
    <div className="form-wrapper">
      <MyInput id="input-2" />
      <Button>Update</Button>
    </div>
  </form>
);

export default Form;