import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';

const CommentReplies = props => {
  const [comment, setComment] = React.useState('');

  const handleAddComment = () => {
    debugger;
    const body = {
      Comment: comment,
      BookId: props.BookId,
      CommentId: props.CommentId
    };
    if (comment !== '') {
      debugger;
      //   if (response.data.success) {
      return axios.post('/api/replies', body);
      alert('duh dunna dunnahhhh');
      setComment('');
      //   } else {
      //     alert(response.data.err);
      //   }
    } else {
      alert("you've been flipped the bird");
    }
  };

  const handleComment = payload => {
    setComment(payload);
  };

  return (
    <div className="CommentReplies-App">
      <div className="comments-add-add-replies-displayed">
        you think you so damn clever?
      </div>
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
