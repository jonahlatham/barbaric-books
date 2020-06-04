import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import moment from 'moment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const CommentReplies = props => {
  var d = new Date();
  var n = d.getHours();
  const [comment, setComment] = React.useState('');

  const handleAddComment = async () => {
    const body = {
      Comment: comment,
      BookId: props.BookId,
      CommentId: props.CommentId
    };
    if (comment !== '') {
      await axios.post('/api/replies', body);
      setComment('');
      props.handleGetReplies();
    }
  };

  const handleComment = payload => {
    setComment(payload);
  };

  let displayReplies;
  if (props.Replies && props.Replies.CommentReply) {
    displayReplies = props.Replies.CommentReply.map(e => {
      return (
        <div key={e.Id} className="comments-comments">
          <p>
            <strong>Name: {e.username} </strong>
            <sup className="comments-date">
              {moment(e.TimePosted)
                .startOf(n)
                .fromNow()}
            </sup>
          </p>
          <div className="comment">{e.Comment}</div>
          <div className="comments-comment-button-container">
            <ButtonGroup variant="text" aria-label="text primary button group">
              <Button color="primary" className="comments-comment-button">
                <ThumbUpAltIcon
                  style={{
                    fontSize: 15,
                    paddingLeft: '5px',
                    paddingBottom: '3px'
                  }}
                />
                <div style={{ padding: '0px 5px' }}>0</div>
              </Button>
              <Button color="secondary" className="comments-comment-button">
                <ThumbDownAltIcon
                  style={{
                    fontSize: 15,
                    paddingLeft: '5px',
                    paddingBottom: '3px'
                  }}
                />
                <div style={{ padding: '0px 5px' }}>0</div>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="CommentReplies-App">
      <HighlightOffIcon
        style={{ fontSize: '35px' }}
        className="close-comment-replies"
        onClick={props.Closer}
      />
      <div className="comments-add-add-replies-displayed">{displayReplies}</div>
      <div className="comments-add-add-replies">
        <div className="comments-add-comment-input-container">
          <TextField
            autoFocus
            className="comments-add-comment-input"
            id="standard-textarea"
            label="Add a reply"
            placeholder="Try not to be too mean..."
            multiline
            onChange={e => handleComment(e.target.value)}
            value={comment}
          />
        </div>
        <div style={{ marginTop: '-10px' }}>
          <IconButton
            className="comments-add-button"
            onClick={handleAddComment}
          >
            <AddCircleIcon style={{ fontSize: 50, color: 'black' }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CommentReplies;
