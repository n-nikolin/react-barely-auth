import { useState } from "react";
import axios from "axios";

import "../Login/Login.css";
import { Link, Redirect } from "react-router-dom";

export default function Register(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [registered, setRegistered] = useState(false);

  const isUsername = () => {
    if (username.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  const matchPassword = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const isEmail = () => {
    if (email.match(/^\w+([.-_]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = () => {
    if (
      password.length > 8 &&
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/)
    ) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (matchPassword() && validatePassword() && isEmail() && isUsername()) {
      console.log(username, email, password);
      axios
        .post("api/auth/register", {
          username: username,
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.status === 200) {
            setRegistered(true);
          }
        });
    } else {
      console.log("something wrong");
    }
  }

  if (!registered) {
    return (
      <div className="login-wrapper">
        <h1>Sign Up Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            <p>Email</p>
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
        <Link to="/">Login</Link>
      </div>
    );
  } else {
    console.log(email, password);
    return (
      // need input data from register form to be passed into email and password fieldsof login
      //<Redirect to={{pathname: '/', state: {email: setEmail}}} />
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
