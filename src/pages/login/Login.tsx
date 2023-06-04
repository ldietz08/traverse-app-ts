import React, { useState } from "react";
import { auth, googleProvider } from "../../components/config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "../../components/google-btn/GoogleButton";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/hikes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="login__container">
      <div className="login__form">
        <h2 className="login__title">Login</h2>
        <label className="login__form-label" htmlFor="email">
          Email
        </label>
        <input
          className="login__form-body"
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="login__form-label" htmlFor="password">
          Password
        </label>
        <input
          className="login__form-body"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div>
          <button onClick={signIn} className="login__form-btn">
            LOGIN
          </button>
        </div>
        <div>
          <span className="login__form-text">New User?</span>
          <Link to="/Signup" className="login__form-link">
            SIGN UP
          </Link>
        </div>
        <GoogleButton />
      </div>
    </section>
  );
}
