import React, { FC } from "react";
import { auth, googleProvider } from "../../components/config/firebase";
import { signInWithPopup } from "firebase/auth";
import "./GoogleButton.scss";

const GoogleButton: FC = () => {
  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="google-btn" onClick={signInWithGoogle}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className="btn-text">
        <b>Sign in with google</b>
      </p>
    </div>
  );
};

export default GoogleButton;
