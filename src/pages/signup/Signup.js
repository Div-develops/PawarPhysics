import React, { useState } from "react";
import "../login/login.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../index'
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import loginicon from "../../assests/loginicon.jpg";


function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // Success...
      console.log("User signed up:", user);
      navigate("/");
      setMessage("");
    } catch (error) {
      // Error
      console.error("Sign-up error:", error);

      let errorMessage =
        "An error occurred during sign-up. Please try again later.";

      if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists.";
      }
      // Handle more error codes here...

      setMessage(errorMessage);
    }
  }

  return (
    <div className="signup">
      <img
        src={loginicon}
        width="120px"
        height="120px"
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px dashed #675D50",
        }}
        className="signupiconlogo"
      />
      <div className="signup-container">
        <div className="flex-login-container">
          <div className="signup-form">
            <div
              style={{
                alignSelf: "center",
                fontFamily: "Ubuntu",
                fontWeight: "600",
                fontSize: "25px",
              }}
            >
              Sign Up
            </div>

            <div className="field">
              <TextField
                id="outlined-basic"
                label="Enter email"
                variant="outlined"
                autoComplete="Off"
                aria-autocomplete="false"
                placeholder=""
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-container"
              />
            </div>

            <div className="field">
              <TextField
                id="outlined-basic"
                label=""
                type="password"
                variant="outlined"
                autoComplete="Off"
                aria-autocomplete="false"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-container"
              />
            </div>

            <div className="div-center">
              <button
                className="button-container"
                onClick={(e) => handleSignUp(e)}
              >
                <div className="sign-up-text">Sign Up</div>
              </button>
            </div>

            <div
              style={{
                alignSelf: "center",
                marginTop: "10px",
                fontFamily: "Poppins",
                fontSize: "12px",
              }}
            >
              Already have an account?
              <span
                style={{ borderBottom: "1px solid black", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
              <div style={{ alignContent: "center", color: "#FF0000" }}>
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
