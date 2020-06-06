import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import moment from 'moment';
import ReplyIcon from '@material-ui/icons/Reply';
import CommentReplies from './CommentReplies';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

const CommentsWritten = props => {
  var d = new Date();
  var n = d.getHours();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openReplies, setOpenReplies] = React.useState(false);
  const [replies, setReplies] = React.useState('');
  const [likes, setLikes] = React.useState('');
  const [dislikes, setDislikes] = React.useState('');

  const handleGetReplies = async () => {
    const response = await axios.get(`/api/replies?commentId=${props.data.Id}`);
    setReplies(response.data);
  };

  const handleGetLikes = async () => {
    const response = await axios.get(
      `/api/commentLike?commentId=${props.data.Id}`
    );
    let likes = [];
    let dislikes = [];
    response.data.Rating.map(e => {
      if (e.ReactionType === 1) {
        likes.push(e);
      } else {
        dislikes.push(e);
      }
    });
    setLikes(likes);
    setDislikes(dislikes);
  };

  React.useEffect(() => {
    const displayComment = async () => {
      await handleGetReplies();
    };
    const displayLikes = async () => {
      await handleGetLikes();
    };
    displayComment();
    displayLikes();
  }, []);

  const handleOpenReplies = () => {
    setOpenReplies(true);
  };

  const handleCloseReplies = () => {
    setOpenReplies(false);
  };

  const handleLike = async () => {
    const body = {
      ReactionType: 1,
      CommentId: props.data.Id
    };
    await axios.post('/api/commentLike', body);
    await handleGetLikes();
  };

  const handleDislike = async () => {
    const body = {
      ReactionType: 2,
      CommentId: props.data.Id
    };
    await axios.post('/api/commentLike', body);
    await handleGetLikes();
  };

  const id = open ? 'simple-popover' : undefined;
  return (
    <div key={props.data.Id} className="comments-comments">
      <p>
        <strong>Name: {props.data.username} </strong>
        <sup className="comments-date">
          {moment(props.data.TimePosted)
            .startOf(n)
            .fromNow()}
        </sup>
      </p>
      <div className="comment">{props.data.Comment}</div>
      <div className="comments-comment-button-container">
        <ButtonGroup variant="text" aria-label="text primary button group">
          <Button className="comments-comment-button">
            {replies.CommentReply ? replies.CommentReply.length : ''}
            <div
              onClick={handleOpenReplies}
              className="comments-comment-button"
            >
              <ReplyIcon style={{ fontSize: 15 }} />
            </div>
            <Modal
              open={openReplies}
              onClose={handleCloseReplies}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <CommentReplies
                BookId={props.data.BookId}
                CommentId={props.data.Id}
                Replies={replies}
                Closer={handleCloseReplies}
                handleGetReplies={handleGetReplies}
              />
            </Modal>
          </Button>
          <Button
            color="primary"
            className="comments-comment-button"
            onClick={handleLike}
          >
            <ThumbUpAltIcon
              style={{ fontSize: 15, paddingLeft: '5px', paddingBottom: '3px' }}
            />
            <div style={{ padding: '0px 5px' }}>{likes ? likes.length : 0}</div>
          </Button>
          <Button
            color="secondary"
            className="comments-comment-button"
            onClick={handleDislike}
          >
            <ThumbDownAltIcon
              style={{ fontSize: 15, paddingLeft: '5px', paddingBottom: '3px' }}
            />
            <div style={{ padding: '0px 5px' }}>
              {dislikes ? dislikes.length : 0}
            </div>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CommentsWritten;
