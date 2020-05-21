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
  const classes = useStyles();
  const [bookTitle, setBookTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [summary, setSummary] = React.useState('');
  return (
    <div className="add-book-SumTitAuth">
      <div className="add-book-title-div">
        <TextField
          id="standard-search"
          label="Book Title"
          placeholder="Check Spelling"
          type="search"
          onChange={e => setBookTitle(e.target.value)}
        />
        <TextField
          id="standard-search"
          label="Author"
          placeholder="Check Spelling"
          type="search"
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Summary"
        placeholder="Give a brief summary of the book. Try to leave the personal opinions in the comments."
        multiline
        rows={10}
        variant="outlined"
        onChange={e => setSummary(e.target.value)}
      />
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(SumTitAuth);
