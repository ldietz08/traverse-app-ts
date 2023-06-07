import React from "react";
import "./Footer.scss";
import TraverseLogo from "../../assets/logo/traverse-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="footer__links-section">
          <h4 className="footer__links-title">Explore</h4>
          <ul className="footer__links-list">
            <li className="footer__links-item">Trails</li>
            <li className="footer__links-item">Regions</li>
            <li className="footer__links-item">Cities</li>
          </ul>
        </div>
        <div className="footer__links-section">
          <h4 className="footer__links-title">Resources</h4>
          <ul className="footer__links-list">
            <li className="footer__links-item">Blog</li>
            <li className="footer__links-item">Forum</li>
            <li className="footer__links-item">FAQ</li>
          </ul>
        </div>
        <div className="footer__links-section">
          <h4 className="footer__links-title">Company</h4>
          <ul className="footer__links-list">
            <li className="footer__links-item">About</li>
            <li className="footer__links-item">Contact</li>
            <li className="footer__links-item">Jobs</li>
          </ul>
        </div>
      </div>
      <div className="footer__logo">
        <img src={TraverseLogo} alt="TraVerse logo" />
      </div>
    </footer>
  );
}
