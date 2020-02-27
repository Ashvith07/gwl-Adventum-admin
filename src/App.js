import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login_new from "./components/login/Login_new";


function App() {
  return (
    <Router>
      <Route exact path="/" component={Login_new}/>
      <Route  path="/dashboard" component={Dashboard}/>
      
      </Router>
  );
}

export default App;

