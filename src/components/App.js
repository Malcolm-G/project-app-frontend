import '../stylesheets/App.css';
import React,{ useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './login/Login';
import SignUp from './login/SignUp';
import LandingPage from './LandingPage';
import MyProjects from './MyProjects';
import ProjectForm from './ProjectForm';
import UpdateProjectForm from './UpdateProjectForm';

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
        exact path="/"
        element={<LandingPage />}
        />
        <Route
        path="/my-projects"
        element={<MyProjects/>}
        />
        <Route
        path="/project-form"
        element={<ProjectForm />}
        />
        <Route
        path="/update-project-form/:id"
        element={<UpdateProjectForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
