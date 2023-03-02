import '../stylesheets/App.css';
import React,{ useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './login/Login';

function App() {
  return (
    <div className="App">
      <Navbar /*currentUser={currentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}*/ />
      <Routes>
        <Route
        path="/login"
        element={<Login />}
        />
        {/* <Route
        path="/signup"
        /> */}
      </Routes>
      <Login />
    </div>
  );
}

export default App;
