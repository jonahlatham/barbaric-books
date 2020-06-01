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
import RepliesDisplayed from './RepliesDisplayed';

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

  const handleOpenReplies = () => {
    setOpenReplies(true);
  };

  const handleCloseReplies = () => {
    setOpenReplies(false);
  };

  const id = open ? 'simple-popover' : undefined;
  console.log(props);
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
          {/* <small className="comments-comment-button-text">900</small> */}
          {/* <small className="comments-comment-button-text">900</small> */}
          <Button /*className="replies-Button-container"*/>
            <div
              onClick={handleOpenReplies}
              className="comments-comment-button"
            >
              <ImportExportIcon style={{ fontSize: 15 }} />
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
              />
            </Modal>
          </Button>
          {/* <small className="comments-comment-button-text">900</small> */}
          {/* <small className="comments-comment-button-text">900</small> */}
          <Button className="comments-comment-button">
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
              />
            </Modal>
          </Button>
          <Button color="primary" className="comments-comment-button">
            <ThumbUpAltIcon style={{ fontSize: 15 }} />
          </Button>
          <Button color="secondary" className="comments-comment-button">
            <ThumbDownAltIcon style={{ fontSize: 15 }} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CommentsWritten;
