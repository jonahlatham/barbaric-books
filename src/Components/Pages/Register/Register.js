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
  const [rePassword, setRePassword] = React.useState('');
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

  const handleBirdFlip = () => {
    alert("Your passwords don't match up.");
  };

  return (
    <div className="register-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="register-input-container">
          <div className="register-logo">BB</div>
          <small className="register-small-instructions">
            Username can contain letters, numbers, and underscores and hyphens.
          </small>
          <TextField
            className="register-input"
            autoFocus
            onChange={e => setUsername(e.target.value)}
            id="register-outlined-username"
            label="Username"
            type="search"
            variant="outlined"
            placeholder="You could be superman"
          />
          <small className="register-small-instructions">
            It must be a real email
          </small>
          <TextField
            className="register-input"
            onChange={e => setEmail(e.target.value)}
            id="register-outlined-email"
            label="Email"
            type="search"
            variant="outlined"
            placeholder="example@example.com"
          />
          <small className="register-small-instructions">
            Passwords must contain 1 capital, 1 lowercase, 1 number, 1 special
            character, and must be between 7-15 characters.
          </small>
          <TextField
            className="register-input"
            onChange={e => setPassword(e.target.value)}
            id="register-outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Please make it hard"
          />
          <small className="register-small-instructions">
            Make sure your password matches your first input
          </small>
          <TextField
            className="register-input"
            onChange={e => setRePassword(e.target.value)}
            id="register-outlined-password-retype"
            label="Re-enter Password"
            type="password"
            variant="outlined"
            placeholder="Let's see if you made any mistakes"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                password === rePassword ? handleRegister() : handleBirdFlip();
              }
            }}
          />
          <div className="register-button-container">
            <Button
              onClick={
                password === rePassword ? handleRegister : handleBirdFlip
              }
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
