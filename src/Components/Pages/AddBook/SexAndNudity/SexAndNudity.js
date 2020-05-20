import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const SexAndNudity = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  return (
    <div>
      <div className="add-book-rate-age">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Sex & Nudity
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            //   value={age}
            label="Rate Severity"
          >
            <MenuItem value="">
              <em>Rate the age group</em>
            </MenuItem>
            <MenuItem value={10}>PG</MenuItem>
            <MenuItem value={20}>PG-13</MenuItem>
            <MenuItem value={30}>R</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        label="Sex & Nudity"
        id="outlined-size-small"
        placeholder="Be descriptive"
        variant="outlined"
        size="small"
        multiline
        rows={5}
      />
    </div>
  );
};

export default SexAndNudity;
