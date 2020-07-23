import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router";
import Quote from './components/quote';
import Navbar from './components/navbar';
import LoginPage from './pages/user/loginPage';
import RegisterPage from './pages/user/registerPage';
import QuotePage from './pages/quote/quotePage';
import ProfilePage from './pages/quote/myQuotesPage';




function App() {
  return (
      <div>
        <Navbar />
        <Switch>
        <Route path="/quote/:id">
            <h1> Custom link </h1>
          </Route>
          <Route path="/quote">
            <QuotePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
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
