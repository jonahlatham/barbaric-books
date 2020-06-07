import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import moment from 'moment';
import axios from 'axios';

const DisplayReplies = props => {
  var d = new Date();
  var n = d.getHours();
  const [likes, setLikes] = React.useState('');
  const [dislikes, setDislikes] = React.useState('');

  React.useEffect(() => {
    const displayLikes = async () => {
      await handleGetLikes();
    };
    displayLikes();
  }, []);

  const handleLike = async id => {
    const body = {
      ReactionType: 1,
      ReplyId: id
    };
    await axios.post('/api/replyLike', body);
    await handleGetLikes();
  };

  const handleDislike = async id => {
    const body = {
      ReactionType: 2,
      ReplyId: id
    };
    await axios.post('/api/replyLike', body);
    await handleGetLikes();
  };

  const handleGetLikes = async () => {
    const response = await axios.get(`/api/replyLike?replyId=${props.e.Id}`);
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

  return (
    <div>
      <div key={props.e.Id} className="comments-comments">
        <p>
          <strong>Name: {props.e.username} </strong>
          <sup className="comments-date">
            {moment(props.e.TimePosted)
              .startOf(n)
              .fromNow()}
          </sup>
        </p>
        <div className="comment">{props.e.Comment}</div>
        <div className="comments-comment-button-container">
          <ButtonGroup variant="text" aria-label="text primary button group">
            <Button
              onClick={() => {
                handleLike(props.e.Id);
              }}
              color="primary"
              className="comments-comment-button"
            >
              <div>{likes ? likes.length : 0}</div>
              <ThumbUpAltIcon
                style={{
                  fontSize: 15,
                  paddingLeft: '5px',
                  paddingBottom: '3px'
                }}
              />
            </Button>
            <Button
              onClick={() => {
                handleDislike(props.e.Id);
              }}
              color="secondary"
              className="comments-comment-button"
            >
              <ThumbDownAltIcon
                style={{
                  fontSize: 15,
                  paddingLeft: '5px',
                  paddingBottom: '3px'
                }}
              />
              <div style={{ padding: '0px 5px' }}>
                {dislikes ? dislikes.length : 0}
              </div>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default DisplayReplies;
