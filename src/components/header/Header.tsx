import { Link } from "react-router-dom";
import React, { FC, useState, useEffect } from "react";
import "./Header.scss";
import TraverseLogo from "../../assets/logo/traverse-logo.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../components/config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import UserLogo from "../../assets/icons/user-solid.svg";

const Header: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="header">
        <div>
          <Link className="navBar__list-link" to="/">
            <img
              className="header__logo"
              src={TraverseLogo}
              alt="Traverse logo"
            ></img>
          </Link>
        </div>
        <div>
          <button className="hamburger" onClick={toggleMenu}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
          <nav className={`navBar ${showMenu ? "show" : ""}`}>
            <ul className="navBar__list">
              {!isAuth ? (
                <>
                  <Link className="navBar__list-link" to="/login">
                    <li
                      className="navBar__list-item navBar__auth"
                      onClick={() => setShowMenu(false)}
                    >
                      Login
                    </li>
                  </Link>
                  <Link
                    className="navBar__list-link"
                    to="/signup"
                    onClick={() => setShowMenu(false)}
                  >
                    <li className="navBar__list-item navBar__auth">Sign up</li>
                  </Link>
                </>
              ) : (
                <>
                  {/* <div className="navBar__list-email">
                    <p className="navBar__email">{`Signed in as: ${isAuth.email}`}</p>
                  </div> */}
                  <Link
                    className="navBar__list-link"
                    to="/"
                    onClick={() => setShowMenu(false)}
                  >
                    <li className="navBar__list-item">Home</li>
                  </Link>
                  <Link
                    className="navBar__list-link"
                    to="/favorites"
                    onClick={() => setShowMenu(false)}
                  >
                    <li className="navBar__list-item">Favorites</li>
                  </Link>
                  <Link
                    className="navBar__list-link"
                    to="/hikes"
                    onClick={() => setShowMenu(false)}
                  >
                    <li className="navBar__list-item">Explore</li>
                  </Link>
                  <Link
                    className="navBar__list-link"
                    to="/bulletin"
                    onClick={() => setShowMenu(false)}
                  >
                    <li className="navBar__list-item">Bulletin</li>
                  </Link>
                  <Link
                    className="navBar__list-link"
                    onClick={() => setShowMenu(false)}
                    to=""
                  >
                    <li className="navBar__list-item">
                      <img src={UserLogo} className="navBar__user" />
                    </li>
                  </Link>

                  <Link
                    className="navBar__list-link"
                    to="/"
                    onClick={() => setShowMenu(false)}
                  >
                    <button
                      onClick={logout}
                      className="navBar__list-item navBar__auth"
                    >
                      Logout
                    </button>
                  </Link>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
