import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
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
    <div className="register-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="register-input-container">
          <div className="register-logo">BB</div>
          <TextField
            autoFocus
            id="outlined-search"
            label="Username"
            type="search"
            variant="outlined"
            placeholder="You could be superman"
          />
          <TextField
            id="outlined-search"
            label="Email"
            type="search"
            variant="outlined"
            placeholder="example@example.com"
          />
          <TextField
            id="outlined-search"
            label="Password"
            type="search"
            variant="outlined"
            placeholder="Please make it hard"
          />
          <div className="register-button-container">
            <Button variant="contained" className="register-button">
              Register
            </Button>
          </div>
          <Link className="reg-log" to="/Login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
