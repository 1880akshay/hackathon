import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md transparent-nav fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand font-weight-800">Kgp Website</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fa fa-bars"></span>
            </button>
  
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Recent Events</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">News Bulletin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Quick Info</a>
                </li>
              </ul>
              <div className="dropdown">
                <button className="login-btn font-weight-700 dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  LOGIN
                </button> 
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink to="/student-login" className="dropdown-item">Student Login</NavLink>
                  <div className="dropdown-divider"></div>
                  <NavLink to="/official-login" className="dropdown-item">Official Login</NavLink>
                </div> 
              </div>
            </div>
          </div>
        </nav>
    );
}

export default Navbar;