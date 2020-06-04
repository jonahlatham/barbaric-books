import React, { Component } from 'react';
import './Home.css';
export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Barbaric Books</h1>
        <p className="home-text">
          Books are a great source of knowledge and entertainment. They can
          bring us to other worlds and let our minds run wild, but some of us
          don't want to read about McKayla's curvaceous figure. Some things are
          better left unknown.
        </p>
        <p className="home-text">
          If you want to avoid falling into that difficult position where you
          are into the story, but find out it contains materials that go against
          your values. Then go ahead and use this site to its fullest. Don't put
          yourself in a bad environment. It's bad for health and can really
          bring down your day. Read for your enjoyment not for your depression.
        </p>
        <h3 className="home-text" style={{ textIndent: 20 }}>
          Directions:
        </h3>
        <p className="home-text">
          In the "All Books" tab in the top nav you will be able to search for
          all AllBooks. Click on the one you would like to learn the contents
          of. <strong>Warning</strong> you may find out some spoilers. If the
          book you want to learn about isn't shown then you will have to either
          wait until someone adds it, or you'll have to bite the bullet and read
          to find out what content is inside. Once you do this come back and
          head to the "Add Book" section so you can help others who haven't read
          the book know. This way we can avoid anything that is unpleasant to
          us.
        </p>
      </div>
    );
  }
}
