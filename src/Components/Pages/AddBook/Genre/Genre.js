import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const AlcoholDrugSmoking = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleAlcoholDescription = payload => {
    props.dispatch({
      type: 'SET_ALCOHOL_DESCRIPTION',
      payload
    });
  };

  const handleAlcoholRating = payload => {
    props.dispatch({
      type: 'SET_ALCOHOL_RATING',
      payload
    });
  };

  return (
    <div className="add-book-suggestive-content-container">
      <div className="add-book-rate-age">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Alcohol/Drugs/Smoking
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={e => handleAlcoholRating(e.target.value)}
            value={props.alcoholRating}
            label="Rate Severity"
          >
            <MenuItem value="">
              <em>Rate out of ten</em>
            </MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={6}>Six</MenuItem>
            <MenuItem value={7}>Seven</MenuItem>
            <MenuItem value={8}>Eight</MenuItem>
            <MenuItem value={9}>Nine</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          label="Alcohol/Drugs/Smoking"
          id="outlined-size-small"
          placeholder="Be descriptive"
          variant="outlined"
          size="small"
          multiline
          rows={5}
          onChange={e => handleAlcoholDescription(e.target.value)}
          value={props.alcoholDescription}
        />
      </div>
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(AlcoholDrugSmoking);
