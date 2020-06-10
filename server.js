const express = require('express');
const path = require('path');
require('dotenv').config();
const user = require('./server/controlers/user');
const comment = require('./server/controlers/comments');
const replies = require('./server/controlers/reply');
const rating = require('./server/controlers/rating');
const likes = require('./server/controlers/likes');
const setUp = require('./server/seUp');
const app = setUp(express());
//////////////////////////////////////////////////////////////////

app.get('/auth/user', user.authUser);

app.delete('/auth/user', user.deleteAuth);

//Register
app.post('/auth/register', user.registerAuth);

//Login
app.post('/auth/login', user.loginAuth);

//Make Comments
app.post('/api/comment', comment.makeComment);

//Get Comments
app.get('/api/comments', comment.getComment);

//Get Replies
app.get('/api/replies', replies.getReplies);

// Make Replies
app.post('/api/replies', replies.makeReplies);

//Get Ratings
app.get('/api/rating', rating.getRating);

//Make Rating
app.post('/api/rating', rating.makeRating);

// Get Genres
app.get('/api/ratingName', rating.getGenre);

//Get Book Thumbnails
app.get('/api/bookDisplayed', rating.getThumbnail);

//Get Rating
app.get('/api/bookRating', rating.getBookRating);

//Make Book
app.post('/api/book', rating.makeBookRating);

// Make Likes for Comments
app.post('/api/commentLike', likes.makeCommentLike);

//Get Like for Comments
app.get('/api/commentLike', likes.getCommentLike);

// Make Likes for Reply
app.post('/api/replyLike', likes.makeReplyLike);

//Get Like for Reply
app.get('/api/replyLike', likes.getReplyLike);
// //////////////////////////////////////////////////////////////////

app.get('/*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'build')
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// http://localhost:8080
