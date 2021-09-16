import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import "./Login.css";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/auth/login",
        {},
        {
          auth: { username: email, password: password },
        }
      )
      .then((data) => data.data.access_token)
      .then((token) => setToken(token));
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
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
            id = "password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/register">Sign Up</Link>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
