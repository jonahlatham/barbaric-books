import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
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

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const classes = useStyles();

  const handleLogin = () => {
    const body = {
      Email: email,
      Password: password
    };
    axios
      .post('/auth/login', body)
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
    <div className="Login-App">
      <div className={classes.root} noValidate autoComplete="off">
        <div className="login-input-container">
          <div className="login-logo">BB</div>
          <TextField
            className="login-input"
            autoFocus
            id="login-outlined-email"
            label="Email"
            type="search"
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
            placeholder="Did you make it unique?"
          />
          <TextField
            className="login-input"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleLogin();
              }
            }}
            id="login-outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
            placeholder="Don't tell me you forgot..."
          />
          <div className="login-button-container">
            <Button
              onClick={handleLogin}
              variant="contained"
              className="login-button"
            >
              Login
            </Button>
          </div>
          <Link className="reg-log" to="/Register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default connect(storeObject => {
  return storeObject;
})(Login);
