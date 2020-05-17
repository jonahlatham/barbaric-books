import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className="Login-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="login-input-container">
          <div className="login-logo">BB</div>
          <TextField
          className='text-me-maybe'
            autoFocus
            id="outlined-search"
            label="Email or Username"
            type="search"
            variant="outlined"
            placeholder="Did you make it unique?"
          />
          <TextField
            id="outlined-search"
            label="Password"
            type="search"
            variant="outlined"
            placeholder="Don't tell me you forgot..."
          />
          <div className="login-button-container">
            <Button variant="contained" className="login-button">
              Login
            </Button>
          </div>
          <Link className="reg-log" to="/Register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
