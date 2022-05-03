import React from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import AboutUs from './pages/AboutUs/AboutUs';
import Error from './pages/Error/Error';
import FormPage from './pages/FormPage/FormPage';
import MorePage from './pages/MorePage/MorePage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="form" element={<FormPage />} />
          <Route path="*" element={<Error />} />
          <Route path="more" element={<MorePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
