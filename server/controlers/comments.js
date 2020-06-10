module.exports = {
  makeComment: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  getComment: (req, res, next) => {
    const db = req.app.get('db');
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
  }
};
