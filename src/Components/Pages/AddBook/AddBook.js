import React from 'react';
import './AddBook.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SexNudes from './SexAndNudity/SexAndNudity';
import ViolenceGore from './ViolenceAndGore/ViolenceAndGore';
import Profanity from './Profanity/Profanity';
import AlcoholDrugSmoking from './AlcoholDrugSmoking/AlcoholDrugSmoking';
import FrighteningIntense from './FrighteningIntense/FrighteningIntense';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const AddBook = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  return (
    <div className="AddBook-App">
      <div className="add-book-rating-container">
        <div className="add-book-text-boxes-container">
          <TextField
            autoFocus
            id="outlined-multiline-static"
            label="Summary"
            placeholder="Give a brief summary of the book. Try to leave the personal opinions in the comments."
            multiline
            rows={10}
            variant="outlined"
          />
          <SexNudes />
          <ViolenceGore />
          <Profanity />
          <AlcoholDrugSmoking />
          <FrighteningIntense />
        </div>
        <div className="add-book-button">
          <Button color="primary">Add Book</Button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
