import axios from "axios";
import { useState } from "react";
// import { Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";

function getToken() {
  const tokenString = localStorage.getItem("access_token");
  const userToken = JSON.parse(tokenString);
  console.log(userToken.token);
  return userToken?.token;
}

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);

  function checkAxios() {
    // all in all, at least the api call is correct and doesn;t spaz out
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    axios.delete("/api/auth/logout", config).then((data) => {
      if (data.status === 200) {
        localStorage.clear();
        setLoggedOut(true);
      } else {
        console.log("blyat");
      }
    });
  }

  if (!loggedOut) {
    return <button onClick={checkAxios}>Press</button>;
  } else {
    console.log(loggedOut);
    // components do not refresh
    // redirect doesn't refresh components at all
    // even though state changed, nothing happens
    // the button goes away, though
    // nav link thing needs to a button with onClick handler
    return <Redirect to={{ pathname: "/register" }} />;
  }
}
