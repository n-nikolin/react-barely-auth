import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "./App.css";
import useToken from "./useToken";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Preferences from "../Preferences/Preferences";
import Navbar from "../Navbar/Navbar";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";

function App() {
  // const token = getToken();
  const { token, setToken } = useToken();
  // put into separate file
  // check expired
  function isExpiredToken() {
    const decodedTokenExp = JSON.stringify(jwt_decode(token).exp) * 1000;
    const currentTime = Date.now();
    if (decodedTokenExp < currentTime) {
      return true;
    }
  }

  if (!token || isExpiredToken()) {
    return (
      <>
        <BrowserRouter>
          <Switch>
            {/* the exact path thing looks like a cop out and a workaround */}
            {/* this needs to be a separate component */}
            <Route exact path="/" >
              <Login setToken={setToken} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <h1>Application</h1>
        <Navbar />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path = "/logout">
            <Logout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

// // change to cookies in next version
// function setToken(userToken) {
//   localStorage.setItem("access_token", `{"token": "${userToken}"}`);
// }

// function getToken() {
//   const tokenString = localStorage.getItem("access_token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }
