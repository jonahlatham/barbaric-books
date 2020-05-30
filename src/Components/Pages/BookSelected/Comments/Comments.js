import React from 'react';
import './Comments.css';
import { placeholder } from '@babel/types';
import CameraIcon from '@material-ui/icons/Camera';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CommentsWritten from './CommentsWritten/CommentsWritten';
import { connect } from 'react-redux';
import axios from 'axios';
import ReplyIcon from '@material-ui/icons/Reply';

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
  const date = new Date().getTime();
  console.log(date);
  React.useEffect(() => {
    const displayRating = () => {
      return axios
        .get('/api/comments')
        .then(response => {
          setDisplayedComment(
            response.data.Comments.map(e => {
              // debugger
              if (e.BookId === Number(props.match.params.id)) {
                return (
                  <div className="comments-comments">
                    <p>
                      <strong>name: </strong>
                      <small>{Math.abs(date - e.TimePosted)}</small>
                    </p>
                    <p>{e.Comment}</p>
                    <div className="comments-comment-button-container">
                      <ButtonGroup
                        variant="text"
                        aria-label="text primary button group"
                      >
                        <small className="comments-comment-button-text">
                          900
                        </small>
                        <Button className="comments-comment-button">
                          <ImportExportIcon style={{ fontSize: 15 }} />
                        </Button>
                        <Button className="comments-comment-button">
                          <ReplyIcon style={{ fontSize: 15 }} />
                        </Button>
                        <Button
                          color="primary"
                          className="comments-comment-button"
                        >
                          <ThumbUpAltIcon style={{ fontSize: 15 }} />
                        </Button>
                        <Button
                          color="secondary"
                          className="comments-comment-button"
                        >
                          <ThumbDownAltIcon style={{ fontSize: 15 }} />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                );
              }
            })
          );
        })
        .catch(err => {
          alert(err);
        });
    };
    displayRating();
  }, []);

  const handleComment = payload => {
    props.dispatch({
      type: 'ADD_COMMENT',
      payload
    });
  };

  const handleAddComment = payload => {
    const body = {
      Comment: props.comments,
      BookId: Number(props.match.params.id)
    };
    setComment('');
    if (props.comments !== '') {
      axios
        .post('/api/comment', body)
        .then(response => {
          if (response.data.success) {
            props.dispatch({
              type: 'SUBMIT'
            });
          } else {
            alert(response.data.err);
          }
        })
        .catch(err => {
          alert(err);
        });
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
            value={props.comment}
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
})(Comments);
