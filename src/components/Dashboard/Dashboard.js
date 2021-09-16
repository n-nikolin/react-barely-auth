import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";

// TODO: turn this into something reusable
// get token from localStorage
function getToken() {
  const tokenString = localStorage.getItem("access_token");
  const userToken = JSON.parse(tokenString);
  // console.log(userToken.token)
  return userToken?.token;
}
// decode token to get public_id
function getPublicId() {
  const encodedToken = getToken();
  const decodedToken = jwt_decode(encodedToken);
  return JSON.stringify(decodedToken.sub);
}

// get json data
// TODO: rewrite for axios

async function getUserData() {
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const response = await fetch(`/api/${getPublicId()}/dashboard`, options);
  const result = await response.json();
  return result;
}

// make json data renderable by using the useEffect hook

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function updateUserInfo(e) {
    e.preventDefault();
    axios
      .put(
        `/api/${getPublicId()}/update_profile`,
        { username: username, email: email, password: password },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => console.log(response));
  }

  useEffect(() => {
    getUserData().then((data) => {
      setUserInfo(data);
    });
  }, []);
  if (!localStorage.getItem("access_token")) {
    <Redirect to="/" />;
  }
  // put update account functionality here
  return (
    <>
      <h2>Dashboard</h2>
      <form onSubmit={updateUserInfo}>
        <label>
          <p>Username</p>
          <p>current username: {userInfo.username}</p>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Email</p>
          <p>current email: {userInfo.email}</p>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
