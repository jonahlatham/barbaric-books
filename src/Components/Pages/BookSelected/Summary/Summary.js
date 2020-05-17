import React from 'react';
import './Summary.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const Summary = () => {
  const classes = useStyles();

  return (
    <div className="Summary-App">
      <div className="summary-app-text">All text</div>
      <div className="summary-like-buttons-container">
        {/* <ButtonGroup variant="text" aria-label="text primary button group"> */}
        <Button
          variant="outlined"
          className="summary-button-like"
          color="primary"
        >
          Like
        </Button>
        <Button
          variant="outlined"
          className="summary-button-like"
          color="secondary"
        >
          Dislike
        </Button>
        <Button
          variant="outlined"
          disabled
          className="summary-button-disabled"
        ></Button>
        <Button className="summary-button-like" variant="outlined">
          Incorrect
        </Button>
        {/* </ButtonGroup> */}
      </div>
    </div>
  );
};

export default Summary;
