import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
        <section className="section-top">
          <div className="col">
            <h3>Home</h3>
            <h3>Features</h3>
            <h3>Pricing</h3>
          </div>
          <div className="col">
            <h3>Log In</h3>
            <h3>Sign Up</h3>
            <h3>Support</h3>
          </div>
          <div className="col">
            <h3>About Us</h3>
            <div>Contact Us</div>
            <div>Privacy</div>
          </div>
          <div className="col">
            <h3>Loans</h3>
            <div>Different kinds loans</div>
          </div>
        </section>
        <section className="section-bottom">
          <div>Copyright @ Tamannn</div>
        </section>
        </footer>
    );
};

export default Footer;