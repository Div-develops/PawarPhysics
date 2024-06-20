import React, { useState } from "react";
import "./login.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import loginicon from "../../assests/loginicon.jpg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../index'
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth(app);// property holds the currently signed-in user object, or null if no user is signed in.
  //auth instance for our app  and we are using signInWithEmailAndPassword method to sign in the user with email and password.
  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)//returns promise
      .then((user) => {
        console.log(user);
        navigate('/')
      })
      .catch((error) => {
        console.error("Sign-In error:", error);


        if (error.code === "auth/invalid-email") {
          setErrorMessage("Please enter a valid email address.");
        } else if (error.code === "auth/user-disabled") {
          setErrorMessage("This account has been disabled. Please contact support.");
        } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          setErrorMessage("Invalid email or password. Please check your credentials.");
        }
      });

  }


  return (
    <div className="login">
      <div className="flex-login-container">
          <img
            src={loginicon}
            width="120px"
            height="120px"
            className="iconlogo"
        />
        <div className="title-pawar-physics">Pawar Physics</div>

          <div className="form">
            <div className="field">
              <p className="label">Email </p>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
              type="email"
                value={email}
              autoComplete="Off"
              placeholder="Enter your email address"

                onChange={(e) => {
                setEmail(e.target.value)
                }}
                className="input-container"
              />
            </div>
            <div className="field">
              <p className="label">Password </p>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
              autoComplete="Off"
              placeholder="Enter your password"

              type="password"
                aria-autocomplete="false"
                name="password"
                value={password}
                onChange={(e) => {
                setPassword(e.target.value)
                }}
                className="input-container"
              />
            </div>

            {errorMessage != "" ? (
              <div className="error-text">{errorMessage}</div>
            ) : null}

            <div className="div-center">
              <button
                className="button-container"
                onClick={(e) => {
                  handleSignIn(e)
                }}
              >
                Login
            </button>
            
          </div>
         
        </div>
        <div className="forgot-pw-un" style={{marginTop:"5px"}}>
          Forgot <span style={{ color: "#000", cursor: "pointer" }} >Username/Password?</span>
        </div>
        <div className="forgot-pw-un" onClick={() => navigate("/signup")}>
          Don't have an account?<span style={{ color: "#000" ,cursor:"pointer"}} >Sign Up</span>
        </div>
        </div>
      </div>

  );
}

export default Login;
