import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CarsProvider from './CarsProvider';

ReactDOM.render(
  <React.StrictMode>
    <CarsProvider>
      <App />
    </CarsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
