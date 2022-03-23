import React from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import AboutUs from './pages/AboutUs/AboutUs';
import Error from './pages/Error/Error';

function App() {
  console.log('test');
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
