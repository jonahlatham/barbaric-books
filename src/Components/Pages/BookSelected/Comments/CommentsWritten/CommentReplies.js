import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import DisplayReplies from './DisplayReplies';
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

  // React.useEffect(() => {
  //   const displayLikes = async () => {
  //     await handleGetLikes();
  //   };
  //   displayLikes();
  // }, []);

  /////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  const handleComment = payload => {
    setComment(payload);
  };

  let displayReplies;
  if (props.Replies && props.Replies.CommentReply) {
    displayReplies = props.Replies.CommentReply.map(e => {
      return <DisplayReplies e={e} />;
    });
  }
  return (
    <div className="all-replies-container">
      <div className="CommentReplies-App">
        <HighlightOffIcon
          style={{ fontSize: '35px' }}
          className="close-comment-replies"
          onClick={props.Closer}
        />
        <div className="comments-add-add-replies-displayed">
          {displayReplies}
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
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleAddComment();
                }
              }}
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
    </div>
  );
};

export default CommentReplies;
