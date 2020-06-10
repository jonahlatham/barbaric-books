module.exports = {
  getReplies: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  makeReplies: (req, res, next) => {
    const db = req.app.get('db');
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
  }
};
