import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import TopNav from './Components/TopNav/TopNav';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import AllBooks from './Components/Pages/AllBooks/AllBooks';
import AddBook from './Components/Pages/AddBook/AddBook';
import BookSelected from './Components/Pages/BookSelected/BookSelected';
import Summary from './Components/Pages/BookSelected/Summary/Summary';
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    axios.get('/auth/user').then(response => {
      this.setState({ isLoading: false });
      if (response.data.success) {
        this.props.dispatch({ type: 'SET_USER', payload: response.data.user });
      }
    });
  }
  render() {
    let authRoutes = '';
    if (this.props.user) {
      authRoutes = [
        <Route key={1} path="/AllBooks" component={AllBooks} />,
        <Route key={2} path="/AddBook" component={AddBook} />,
        <Route key={3} path="/BookSelected/:id" component={Summary} />,
        <Route key={3} path="/BookSelected" component={BookSelected} />,
        <Route key={4} path="/Home" component={Home} />
      ];
    }
    return (
      <div className="App">
        {this.state.isLoading ? (
          ''
        ) : (
          <Router>
            {this.props.user ? <TopNav /> : ''}
            <Switch>
              {authRoutes}
              <Route path="/Register" component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default connect(storeObject => {
  return storeObject;
})(App);
