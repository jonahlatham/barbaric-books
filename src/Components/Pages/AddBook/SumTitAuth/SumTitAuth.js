import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const SumTitAuth = props => {
  const handleTitle = payload => {
    props.dispatch({
      type: 'SET_BOOK_TITLE',
      payload
    });
  };

  const handleAuthor = payload => {
    props.dispatch({
      type: 'SET_AUTHOR_NAME',
      payload
    });
  };

  const handleSummary = payload => {
    props.dispatch({
      type: 'SET_SUMMARY',
      payload
    });
  };

  return (
    <div className="add-book-SumTitAuth">
      <div className="add-book-title-div">
        <TextField
          id="standard-search"
          label="Book Title"
          placeholder="Check Spelling"
          type="search"
          onChange={e => handleTitle(e.target.value)}
          value={props.bookTitle}
        />
        <TextField
          id="standard-search"
          label="Author"
          placeholder="Check Spelling"
          type="search"
          onChange={e => handleAuthor(e.target.value)}
          value={props.authorName}
        />
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Summary"
        placeholder="Give a brief summary of the book. Try to leave personal opinions in the comments."
        multiline
        rows={10}
        variant="outlined"
        onChange={e => handleSummary(e.target.value)}
        value={props.summary}
      />
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(SumTitAuth);
