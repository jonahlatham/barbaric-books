import React from 'react';
import './Comments.css';
import CameraIcon from '@material-ui/icons/Camera';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CommentsWritten from './CommentsWritten/CommentsWritten';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const Comments = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [comment, setComment] = React.useState('');
  const [displayedComment, setDisplayedComment] = React.useState('');

  const getComments = async () => {
    const response = await axios.get('/api/comments');
    setDisplayedComment(
      response.data.Comments.map(e => {
        if (e.BookId === Number(props.match.params.id)) {
          return <CommentsWritten key={e.Id} data={e} />;
        }
      })
    );
  };

  React.useEffect(() => {
    const displayRating = async () => {
      await getComments();
    };
    displayRating();
  }, []);

  const handleComment = payload => {
    setComment(payload);
  };

  const handleAddComment = async payload => {
    const body = {
      Comment: comment,
      BookId: Number(props.match.params.id)
    };
    if (comment !== '') {
      const response = await axios.post('/api/comment', body);
      if (response.data.success) {
        setComment('');
        await getComments();
      } else {
        alert(response.data.err);
      }
    }
  };

  return (
    <div className="Comments-App">
      <div className="comments-section">
        {/* <CommentsWritten /> */}
        <div className="all-comment-container">{displayedComment}</div>
      </div>
      <div className="comments-add-comment">
        <div className="comments-add-icon-container">
          {/* <CameraIcon className='comments-add-icon'/> */}
          <CameraIcon style={{ fontSize: 40 }} />
        </div>
        <div className="comments-add-comment-input-container">
          <TextField
            className="comments-add-comment-input"
            id="standard-textarea"
            label="Add a comment"
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
export default connect(storeObject => {
  return storeObject;
})(withRouter(Comments));
