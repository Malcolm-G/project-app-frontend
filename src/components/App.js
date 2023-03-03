import '../stylesheets/App.css';
import React,{ useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './login/Login';
import SignUp from './login/SignUp';
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <Navbar /*currentUser={currentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}*/ />
      {/* <Routes>
        <Route
        path="/login"
        element={<Login />}
        />
        <Route
        path="/signup"
        element={<SignUp />}
        />
      </Routes> */}
      <LandingPage />
    </div>
  );
}

export default App;
