module.exports = {
  getRating: (req, res, next) => {
    const db = req.app.get('db');
    db.Rating.find()
      .then(rating => {
        res.send({ Rating: rating });
      })
      .catch(err => {
        res.send({ success: false, err });
      });
  },
  makeRating: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  getBookRating: (req, res, next) => {
    const db = req.app.get('db');
    db.Rating.find()
      .then(rating => {
        res.send({ Rating: rating });
      })
      .catch(err => {
        res.send({ success: false, err });
      });
  },
  makeBookRating: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  getGenre: (req, res, next) => {
    const db = req.app.get('db');
    db.RatingGenre.find().then(genre => {
      res.send({ genre, success: true });
    });
  },
  getThumbnail: (req, res, next) => {
    const db = req.app.get('db');
    db.Book.find()
      .then(book => {
        res.send({ Book: book });
      })
      .catch(err => {
        res.send({ success: false, err });
      });
  }
};
