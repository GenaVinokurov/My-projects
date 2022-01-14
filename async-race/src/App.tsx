import React from 'react';
import './App.css';
import Garage from './pages/garage';
import Button from './components/UI/button/button';

const App: React.FC = () => (
  <div className="App">
    <header className="header">
      <Button>To Garage</Button>
      <Button>To winners</Button>
    </header>
    <Garage />
  </div>
);

export default App;
