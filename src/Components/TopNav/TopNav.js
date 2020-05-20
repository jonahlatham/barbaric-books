import React, { Component } from 'react';
import './TopNav.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class TopNav extends Component {
  render() {
    return (
      <div className="TopNav-App">
        <div className="topnav-left-side">
          <Link className="link" to="/Home">
            Home
          </Link>
          <Link className="link" to="/AllBooks">
            All Books
          </Link>
          <Link className="link" to="/AddBook">
            Add Book
          </Link>
        </div>
        <div className="topnav-right-side">
          <Link className="link topnav-link-on-right" to="/Login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
