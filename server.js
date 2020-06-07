const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.use(cors());
app.use(bodyParser.json());

massive(process.env.DATABASE_URL)
  .then(dbInstance => {
    console.log(`DB is connected`);
    app.set('db', dbInstance);
  })
  .catch(err => {
    console.log(err);
  });

//////////////////////////////////////////////////////////////////

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      //days hours minutes seconds milseconds
      expires: 1 * 24 * 60 * 60 * 1000
    },
    saveUninitialized: false,
    rolling: true,
    resave: false
  })
);

app.use('/api/*', (req, res, next) => {
  if (!req.session.User) {
    res.send({ success: false, message: 'Please login.' });
  } else {
    next();
  }
});

app.get('/auth/user', (req, res, next) => {
  if (req.session.User) {
    res.send({ success: true, user: req.session.User });
  } else {
    res.send({ success: false });
  }
});

app.delete('/auth/user', (req, res, next) => {
  req.session.destroy();
  res.send({ success: true });
});

///////////////////////////////////////////////////////////////////
//Register
app.post('/auth/register', (req, res, next) => {
  const db = app.get('db');
  const { Username, Email, Password } = req.body;
  db.User.findOne({ Username })
    .then(user => {
      const condition1 = /^[a-zA-Z0-9]+$/.test(Username);
      const condition2 = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        Email
      );
      const condition3 = /^(?=.*[0-9])(?=.*[!@#$%^&*_+-=:;()'])[a-zA-Z0-9!@#$%^&*_+-=:;()']{7,15}$/.test(
        Password
      );
      if (user) {
        throw 'This username is already in use, please pick a different one.';
      } else if (
        Username.length < 1 ||
        Email.length < 1 ||
        Password.length < 1
      ) {
        throw 'All boxes must be filled';
      } else if (!condition1) {
        throw 'Username does not follow the format';
      } else if (!condition2) {
        throw 'Make sure you are using a real email';
      } else if (!condition3) {
        throw "Your password doesn't pass the test";
      } else {
        return db.User.findOne({ Email }).then(ema => {
          if (ema) {
            throw 'This email is already in use, please login.';
          } else {
            return bcrypt.hash(Password, 10);
          }
        });
      }
    })
    .then(hash => {
      return db.User.insert({ Username, Email, Password: hash });
    })
    .then(user => {
      delete user.Password;
      req.session.User = user;
      res.send({ success: true, User: user });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//////////////////////////////////////////////////////////////////////////////////////
//Login
// Password7-15
app.post('/auth/login', (req, res, next) => {
  const db = app.get('db');
  const { Email, Password } = req.body;
  let catchUser = {};
  db.User.findOne({ Email })
    .then(user => {
      if (!user) {
        throw 'We could not find a user for this email. Please register.';
      } else {
        catchUser = user;
        return bcrypt.compare(Password, user.Password);
      }
    })
    .then(isMatch => {
      if (!isMatch) {
        throw `Your credentials don't match our records.`;
      }
      delete catchUser.Password;
      req.session.User = catchUser;
      res.send({ success: true, User: catchUser });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});
//////////////////////////////////////////////////////////////////////////////////////
//Make Comments
app.post('/api/comment', (req, res, next) => {
  const db = app.get('db');
  const date = new Date();
  const { Comment, BookId } = req.body;
  db.Comments.insert({
    Comment,
    UserId: req.session.User.Id,
    TimePosted: date,
    BookId,
    IsActive: true
  })
    .then(item => {
      res.send({ success: true, item });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Get Comments
app.get('/api/comments', (req, res, next) => {
  const db = app.get('db');
  db.Comments.find()
    .then(comment => {
      const commentPromises = comment.map(e => {
        return db.User.findOne({
          Id: e.UserId
        }).then(user => {
          e.username = user.Username;
          return e;
        });
      });
      return Promise.all(commentPromises);
    })
    .then(comment => {
      res.send({ Comments: comment });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Get Replies
app.get('/api/replies', (req, res, next) => {
  const db = app.get('db');
  db.CommentReply.find({ CommentId: req.query.commentId })
    .then(comment => {
      const commentPromises = comment.map(e => {
        return db.User.findOne({
          Id: e.UserId
        }).then(user => {
          e.username = user.Username;
          return e;
        });
      });
      return Promise.all(commentPromises);
    })
    .then(comment => {
      res.send({ CommentReply: comment });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

// Make Replies
app.post('/api/replies', (req, res, next) => {
  const db = app.get('db');
  const date = new Date();
  const { Comment, BookId, CommentId } = req.body;
  db.CommentReply.insert({
    UserId: req.session.User.Id,
    BookId,
    CommentId,
    Comment,
    TimePosted: date,
    IsActive: true
  })
    .then(comment => {
      res.send({ Comments: comment });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//////////////////////////////////////////////////////////////////
//Get Ratings
app.get('/api/rating', (req, res, next) => {
  const db = app.get('db');
  db.Rating.find()
    .then(rating => {
      res.send({ Rating: rating });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Make Rating
app.post('/api/rating', (req, res, next) => {
  const db = app.get('db');
  const date = new Date();
  const { BookName, AuthorName, BookSummary } = req.body;
  db.Book.insert({
    BookName,
    AuthorName,
    BookSummary,
    UserId: req.session.user.id
  })
    .then(item => {
      res.send({ success: true, item });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});
//////////////////////////////////////////////////////////////////
// Get Genres
app.get('/api/ratingName', (req, res, next) => {
  const db = app.get('db');
  db.RatingGenre.find().then(genre => {
    res.send({ genre, success: true });
  });
});
//////////////////////////////////////////////////////////////////
//Get Book Thumbnails
app.get('/api/bookDisplayed', (req, res, next) => {
  const db = app.get('db');
  db.Book.find()
    .then(book => {
      res.send({ Book: book });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Get Rating
app.get('/api/bookRating', (req, res, next) => {
  const db = app.get('db');
  db.Rating.find()
    .then(rating => {
      res.send({ Rating: rating });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Make Book
app.post('/api/book', (req, res, next) => {
  const db = app.get('db');
  const date = new Date();
  const { BookName, AuthorName, BookSummary, Rating } = req.body;
  db.Book.insert({
    BookName,
    AuthorName,
    BookSummary,
    DateAdded: date,
    UserId: req.session.User.Id
  })
    .then(book => {
      return Promise.all(
        Rating.map(e => {
          return db.Rating.insert({
            GenreId: e.id,
            GenreRating: e.genreRating,
            Description: e.description,
            BookId: book.Id,
            DateAdded: date
          });
        })
      );
    })
    .then(response => {
      res.send({ success: true });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});
//////////////////////////////////////////////////////////////////
// Make Likes for Comments
app.post('/api/commentLike', (req, res, next) => {
  const db = app.get('db');
  const date = new Date();
  const { ReactionType, CommentId } = req.body;
  db.CommentLike.findOne({
    CommentId,
    UserId: req.session.User.Id
  })
    .then(response => {
      if (response) {
        return db.CommentLike.update(
          { Id: response.Id },
          {
            IsActive:
              ReactionType === response.ReactionType
                ? !response.IsActive
                : true,
            ReactionType
          }
        );
      } else {
        return db.CommentLike.insert({
          UserId: req.session.User.Id,
          ReactionType,
          CommentId,
          IsActive: true,
          DateAdded: date
        });
      }
    })
    .then(item => {
      res.send({ success: true, item });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Get Like for Comments
app.get('/api/commentLike', (req, res, next) => {
  const db = app.get('db');
  db.CommentLike.find({ CommentId: req.query.commentId, IsActive: true })
    .then(rating => {
      res.send({ Rating: rating });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});
//////////////////////////////////////////////////////////////////

// Make Likes for Reply
app.post('/api/replyLike', (req, res, next) => {
  const db = app.get('db');
  const date = new Date();
  const { ReactionType, CommentId, ReplyId } = req.body;
  db.ReplyLike.findOne({
    ReplyId,
    UserId: req.session.User.Id
  })
    .then(response => {
      if (response) {
        return db.ReplyLike.update(
          { Id: response.Id },
          {
            IsActive:
              ReactionType === response.ReactionType
                ? !response.IsActive
                : true,
            ReactionType
          }
        );
      } else {
        return db.ReplyLike.insert({
          UserId: req.session.User.Id,
          ReactionType,
          ReplyId,
          IsActive: true,
          DateAdded: date
        });
      }
    })
    .then(item => {
      res.send({ success: true, item });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//Get Like for Reply
app.get('/api/replyLike', (req, res, next) => {
  const db = app.get('db');
  db.ReplyLike.find({ ReplyId: req.query.replyId, IsActive: true })
    .then(rating => {
      res.send({ Rating: rating });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});
//////////////////////////////////////////////////////////////////
// Set Replies to inactive
app.post('/api/replyDeactivate', (req, res, next) => {
  const db = app.get('db');
  db.CommentReply.find({ Id: req.query.replyId }).then(response => {
    return db.CommentReply.update({ Id: response.Id }, { IsActive: false });
  });
});
//////////////////////////////////////////////////////////////////

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
