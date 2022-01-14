import React from 'react';
import Car from '../components/car';

const Garage = () => (
  <div>
    <div className="title-wrapper">
      <h2 className="title">Garage</h2>
      <span className="counter">0</span>
    </div>
    <p className="page">Page #1</p>
    <div className="garage-container">
      <Car color="ffffff" name="Tesla" />
      <Car color="123212" name="Lada" />
    </div>
  </div>
);

export default Garage;