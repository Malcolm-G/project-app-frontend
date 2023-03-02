import '../stylesheets/App.css';
import React,{ useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './login/Login';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
