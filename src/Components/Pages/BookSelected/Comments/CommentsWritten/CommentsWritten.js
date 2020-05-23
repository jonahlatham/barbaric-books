import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReplyIcon from '@material-ui/icons/Reply';

const CommentsWritten = () => {
  return (
    <div className="all-comment-container">
      <div className="comments-comments">
        <p>
          <strong>name: </strong>
          <small>posted date minus today</small>
        </p>
        <p>
          Text for the comment Text for the comment Text for the comment Text
        </p>
        <div className="comments-comment-button-container">
          <ButtonGroup variant="text" aria-label="text primary button group">
            <small className="comments-comment-button-text">900</small>
            <Button className="comments-comment-button">
              <ImportExportIcon style={{ fontSize: 15 }} />
            </Button>
            <Button className="comments-comment-button">
              <ReplyIcon style={{ fontSize: 15 }} />
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
      <div className="comments-replys-container">
        <p>
          <strong>name: </strong>
          <small>posted date minus today</small>
        </p>
        <p>
          Text for the comment Text for the comment Text for the comment Text
        </p>
        <div className="comments-comment-button-container">
          <ButtonGroup variant="text" aria-label="text primary button group">
            <small className="comments-comment-button-text">900</small>
            <Button className="comments-comment-button">
              <ImportExportIcon style={{ fontSize: 15 }} />
            </Button>
            <Button className="comments-comment-button">
              <ReplyIcon style={{ fontSize: 15 }} />
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
    </div>
  );
};

export default CommentsWritten;
