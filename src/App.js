// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // Adjust the path as necessary
import TermsOfService from './TermsOfService'; // Adjust the path as necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/terms" element={<TermsOfService/>} />
      </Routes>
    </Router>
  );
};

export default App;
