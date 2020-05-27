import React from 'react';
import './Summary.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

const Summary = props => {
  const classes = useStyles();

  const [summary, setSummary] = React.useState([]);

  React.useEffect(() => {
    const displaySummary = () => {
      return axios
        .get('/api/bookDisplayed')
        .then(response => {
          setSummary(
            response.data.Book.map(e => {
              if (e.Id === Number(props.match.params.id)) {
                return <div className="summary-app-text">{e.BookSummary}</div>;
              }
            })
          );
        })
        .catch(err => {
          alert(err);
        });
    };
    displaySummary();
  }, []);

  return (
    <div className="Summary-App">
      {summary}
      {/* <div className="summary-like-buttons-container">
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
      </div> */}
    </div>
  );
};

export default Summary;
