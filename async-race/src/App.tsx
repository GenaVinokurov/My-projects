import React from 'react';
import './App.css';
import Garage from './pages/garage';
import Button from './components/UI/button';

import Form from './components/form/form';

const App: React.FC = () => (
  <div className="App">
    <header className="header">
      <div className="nav-wrapper">
        <Button>To Garage</Button>
        <Button>To winners</Button>
      </div>
      <Form />
    </header>
    <Garage />

  </div>
);

export default App;
