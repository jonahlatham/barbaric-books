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

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <TopNav />
          <Switch>
            <Route path="/Home" component={Home} />
            <Route path="/AllBooks" component={AllBooks} />
            <Route path="/AddBook" component={AddBook} />
            <Route path="/BookSelected" component={BookSelected} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            {/* <Route path="/" component={Home} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
