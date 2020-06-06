import React, { Component } from 'react';
import './Home.css';
export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Barbaric Books</h1>
        <p className="home-text">
          Much like movies and shows, books can have a range of different
          ratings. For some people ratings don't really matter; however, for
          many of us, we care about the kind of media we are exposed to. With
          Barbaric Books you can look up books you want to read and find out
          exactly what type of content is inside before you read it.
        </p>
        <h3 className="home-text" style={{ textIndent: 20 }}>
          Directions:
        </h3>
        <p className="home-text">
          In the top nav you have a couple options on where to go. In the "All
          Books" tab you will be able to search for books that others have
          already reviewed. It will have a scale rating from 1-10 on how much
          explicit content it contains. You also get a chance to leave a comment
          or like one an already made one. <strong>Warning</strong> you most
          likely will find spoilers.
        </p>
        <p className="home-text">
          If you go to the "Add Book" tab you will have a chance to write a
          review of your own. Just fill out the stepper with the correct
          information and give someone else a chance to know what is in the book
          before they read it.
        </p>
      </div>
    );
  }
}
