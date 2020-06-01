import React from 'react';
import './Summary.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { withRouter } from 'react-router';

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
  const [summary, setSummary] = React.useState([]);

  React.useEffect(() => {
    const displaySummary = () => {
      return axios
        .get('/api/bookDisplayed')
        .then(response => {
          setSummary(
            response.data.Book.map(e => {
              if (e.Id === Number(props.match.params.id)) {
                return (
                  <div key={e.Id} className="summary-app-text">
                    {e.BookSummary}
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
    displaySummary();
  }, []);

  return <div className="Summary-App">{summary}</div>;
};

export default withRouter(Summary);
