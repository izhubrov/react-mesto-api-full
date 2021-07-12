/* eslint-disable react/display-name */
import React from "react";
const Footer = React.memo(() => {
  return (
    <footer className="footer page__container">
      <p className="footer__author">&copy; 2021 Mesto Russia</p>
    </footer>
  );
});

export default Footer;
