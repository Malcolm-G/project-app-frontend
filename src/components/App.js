import '../stylesheets/App.css';
import React,{ useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './login/Login';
import SignUp from './login/SignUp';
import LandingPage from './LandingPage';
import MyProjects from './MyProjects';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
        path="/login"
        element={<Login />}
        />
        <Route
        path="/signup"
        element={<SignUp />}
        />
        <Route
        path="/"
        element={<LandingPage />}
        />
        <Route
        path="/my-projects"
        element={<MyProjects/>}
        />
      </Routes>
    </div>
  );
}

export default App;
