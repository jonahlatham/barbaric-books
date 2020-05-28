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

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const Comments = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [comments, setComments] = React.useState('Controlled');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className="Comments-App">
      <div className="comments-section">
        <CommentsWritten />
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
          />
        </div>
        <div style={{ marginTop: '-10px' }}>
          <IconButton className="comments-add-button">
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
