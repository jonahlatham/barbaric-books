import React, { Component } from 'react';
import './TopNav.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class TopNav extends Component {
  handleLogout = () => {
    axios
      .delete('/auth/user')
      .then(response => {
        if (response.data.success) {
          this.props.dispatch({
            type: 'LOGOUT'
          });
          this.props.history.push('/');
        } else {
          alert('something blew up');
        }
      })
      .then(() => {
        this.props.dispatch({
          type: 'RESET'
        });
      });
  };

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
          <Link
            to="/"
            className="link topnav-link-on-right"
            onClick={this.handleLogout}
          >
            <small>Log Out</small>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(storeObject => {
  return storeObject;
})(withRouter(TopNav));
