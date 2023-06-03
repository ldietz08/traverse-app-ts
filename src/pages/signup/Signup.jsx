import React, { useState } from "react";
import { auth, googleProvider } from "../../components/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/hikes");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/explore");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="signup__container">
      <form className="signup__form">
        <h2 className="signup__title">Sign up</h2>
        <label className="signup__form-label" htmlFor="email">
          Email
        </label>
        <input
          className="signup__form-body"
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="signup__form-label" htmlFor="password">
          Password
        </label>
        <input
          className="signup__form-body"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={signIn} className="login__form-btn">
          SIGN UP
        </button>
        <div>
          <span className="signup__form-text">Already have an account?</span>
          <Link to="/Login" className="signup__form-link">
            LOGIN
          </Link>
        </div>
      </form>
    </section>
  );
}
