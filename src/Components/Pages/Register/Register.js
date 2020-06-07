import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
import { Link } from 'react-router-dom';
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

const Register = props => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const classes = useStyles();

  const handleRegister = () => {
    const body = {
      Username: username,
      Email: email,
      Password: password
    };
    axios
      .post('/auth/register', body)
      .then(response => {
        if (response.data.success) {
          props.dispatch({
            type: 'SET_USER',
            payload: response.data.User
          });
          props.history.push('/Home');
        } else {
          alert(response.data.err);
        }
        return axios.get('/api/ratingName');
      })
      .then(response => {
        if (response.data.success) {
          props.dispatch({
            type: 'SET_INITIAL_REVIEWS_STATE',
            payload: response.data.genre
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div className="register-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="register-input-container">
          <div className="register-logo">BB</div>
          <TextField
            autoFocus
            onChange={e => setUsername(e.target.value)}
            id="outlined-search"
            label="Username"
            type="search"
            variant="outlined"
            placeholder="You could be superman"
          />
          <TextField
            onChange={e => setEmail(e.target.value)}
            id="outlined-search"
            label="Email"
            type="search"
            variant="outlined"
            placeholder="example@example.com"
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            id="outlined-search"
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Please make it hard"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleRegister();
              }
            }}
          />
          <div className="register-button-container">
            <Button
              onClick={handleRegister}
              variant="contained"
              className="register-button"
            >
              Register
            </Button>
          </div>
          <Link className="reg-log" to="/">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(Register);
