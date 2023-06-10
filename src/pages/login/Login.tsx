import React, { FormEvent, ChangeEvent, FC, useState } from "react";
import { auth, googleProvider } from "../../components/config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "../../components/google-btn/GoogleButton";
import "./Login.scss";

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
      <form className="login__form" onSubmit={signIn}>
        <h2 className="login__title">Login</h2>
        <label className="login__form-label" htmlFor="email">
          Email
        </label>
        <input
          className="login__form-body"
          type="email"
          id="email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        ></input>
        <label className="login__form-label" htmlFor="password">
          Password
        </label>
        <input
          className="login__form-body"
          type="password"
          id="password"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        ></input>
        <div>
          <button type="submit" className="login__form-btn">
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
      </form>
    </section>
  );
};

export default Login;
