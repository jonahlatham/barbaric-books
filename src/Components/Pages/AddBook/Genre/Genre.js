import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

  const handleUpdateGenreDescription = payload => {
    props.dispatch({
      type: 'UPDATE_GENRE_DESCRIPTION',
      payload: { id: props.genre.Id, description: payload }
    });
  };

  const handleUpdateGenreRating = payload => {
    props.dispatch({
      type: 'UPDATE_GENRE_RATING',
      payload: { id: props.genre.Id, genreRating: payload }
    });
  };

  return (
    <div className="add-book-suggestive-content-container">
      <div className="add-book-rate-age">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            {props.genre.SuggestiveContent}
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={e => handleUpdateGenreRating(e.target.value)}
            value={props.reviews.reduce((r, e) => {
              if (e.id === props.genre.Id) {
                r = e.genreRating;
              }
              return r;
            }, '')}
            label="Rate Severity"
          >
            <MenuItem value="">
              <em>Rate out of ten</em>
            </MenuItem>
            <MenuItem value={0}>Zero</MenuItem>
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
          label={props.genre.SuggestiveContent}
          id="outlined-size-small"
          placeholder='Write "NONE" if it does not contain any explicit content'
          variant="outlined"
          size="small"
          multiline
          rows={5}
          onChange={e => handleUpdateGenreDescription(e.target.value)}
          value={props.reviews.reduce((r, e) => {
            if (e.id === props.genre.Id) {
              r = e.description;
            }
            return r;
          }, '')}
        />
      </div>
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(AlcoholDrugSmoking);
