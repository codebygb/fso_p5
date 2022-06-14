import React, { useState } from "react";
import * as loginService from "../services/login";

export default function Login({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    loginService
      .login(userName, password)
      .then((user) => {
        setUser(user);
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        setUserName("");
        setPassword("");
        setError(null);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
      {error && (
        <p>
          {error?.response?.data?.error ||
            error?.message ||
            "An error occurred while login"}
        </p>
      )}
    </>
  );
}
