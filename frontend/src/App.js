import './App.css';
import React from 'react';
import AddCustomer from "./components/AddCustomer";
import AllCustomers from "./components/AllCustomers.js";
import UpdateCustomers from "./components/UpdateCustomers"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Correctly import Router and Routes

import Header from './components/Header.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<AllCustomers />} />
          <Route path="/add" element={<AddCustomer />} />
          <Route path="/update/:id" element={<UpdateCustomers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
