module.exports = {
  makeCommentLike: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  getCommentLike: (req, res, next) => {
    const db = req.app.get('db');
    db.CommentLike.find({ CommentId: req.query.commentId, IsActive: true })
      .then(rating => {
        res.send({ Rating: rating });
      })
      .catch(err => {
        res.send({ success: false, err });
      });
  },
  makeReplyLike: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  getReplyLike: (req, res, next) => {
    const db = req.app.get('db');
    db.ReplyLike.find({ ReplyId: req.query.replyId, IsActive: true })
      .then(rating => {
        res.send({ Rating: rating });
      })
      .catch(err => {
        res.send({ success: false, err });
      });
  }
};
