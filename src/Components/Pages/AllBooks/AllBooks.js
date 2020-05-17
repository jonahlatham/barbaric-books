import React from 'react';
import './AllBooks.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const AllBooks = () => {
  const classes = useStyles();
  const bookTitles = [
    'To Kill a Mockingbird',
    'Moby Dick',
    'Great Expectations',
    'The Great Gatsby',
    'Pride and Prejudice',
    'Wuthering Heights',
    'The Count of Monte Cristo',
    'Harry Potter',
    'Percy Jackson',
    'The Hunger Games'
  ];

  return (
    <div className="AllBooks-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-search"
            label="Search for a book"
            placeholder={
              bookTitles[Math.floor(Math.random() * bookTitles.length)]
            }
            type="search"
          />
        </div>
      </form>

      <Link className="link" to="/BookSelected">
        Look at book
      </Link>
    </div>
  );
};

export default AllBooks;
