import React from 'react';
import './AllBooks.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const AllBooks = props => {
  const classes = useStyles();
  const bookTitles = [
    'To Kill a Mockingbird',
    'Moby Dick',
    'Great Expectations',
    'Lord of the Rings',
    'The Great Gatsby',
    'Pride and Prejudice',
    'Wuthering Heights',
    'The Count of Monte Cristo',
    'Harry Potter',
    'Percy Jackson',
    'The Hunger Games'
  ];
  // const [activeStep, setActiveStep] = React.useState(0);
  const [books, setBooks] = React.useState([]);
  const [filterBooks, setFilterBooks] = React.useState('');

  React.useEffect(() => {
    const displayBooks = () => {
      return axios
        .get('/api/bookDisplayed')
        .then(response => {
          setBooks(
            response.data.Book.map(e => {
              // if (books.includes(filterBooks)) {
              return (
                <Link
                  to={`/BookSelected/${e.Id}`}
                  className="all-books-displayed"
                >
                  <div className="all-books-displayed-name">{e.BookName}</div>
                  <div className="all-books-displayed-author">
                    {e.AuthorName}
                  </div>
                </Link>
              );
              // }
            })
          );
        })
        .catch(err => {
          alert(err);
        });
    };
    displayBooks();
  }, []);

  return (
    <div className="AllBooks-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-search"
            onChange={e => setFilterBooks(e.target.value)}
            label="Search for a book"
            placeholder={
              bookTitles[Math.floor(Math.random() * bookTitles.length)]
            }
            type="search"
          />
        </div>
      </form>
      <div className="add-books-displayed-container">{books}</div>
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(AllBooks);
