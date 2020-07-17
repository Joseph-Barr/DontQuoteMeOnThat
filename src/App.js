import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router";
import Quote from './components/quote';
import Navbar from './components/navbar';


function App() {
  return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/about">
            <h1> About </h1>
          </Route>
          <Route path="/:user">
            <h1> User </h1>
          </Route>
          <Route path="/">
            <Quote text="Gauss Warthog. Never Forgive, Never Forget" by="Me" year="2020" />
          </Route>
          <Route>
            <h1> No Match </h1>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
