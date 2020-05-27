import React from 'react';
import './AddBook.css';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Genre from './Genre/Genre';
import SumTitAuth from './SumTitAuth/SumTitAuth';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [1, 2, 3, 4, 5];
}

const AddBook = props => {
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SumTitAuth />;
      case 1:
        return <Genre />;
      case 2:
        return <Genre />;
      case 3:
        return <Genre />;
      case 4:
        return <Genre />;
      case 5:
        return <Genre />;
      default:
        return '';
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [genres, setGenres] = React.useState([]);
  const [steps, setSteps] = React.useState(['Book Title & Summary']);

  React.useEffect(() => {
    const getGenres = () => {
      return axios
        .get('/api/ratingName')
        .then(response => {
          setGenres(
            response.data.genre.map(e => {
              return e.SuggestiveContent;
            })
          );
          setSteps([
            ...steps,
            ...response.data.genre.map(e => {
              return e.SuggestiveContent;
            }),
            'Submit'
          ]);
        })
        .catch(err => {
          alert(err);
        });
    };
    getGenres();
  }, []);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleSubmit = () => {
    const body = {
      BookName: props.bookTitle,
      AuthorName: props.authorName,
      BookSummary: props.summary
    };
    const body2 = {};

    axios.post('/api/rating', body).then(response => {});
    // alert('All done!');
    setActiveStep(0);
  };

  const [value, setValue] = React.useState('Controlled');

  return (
    <div className="AddBook-App">
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button variant="contained" onClick={handleSubmit}>
                Submit post
              </Button>
            </div>
          ) : (
            <div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? '' : handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
        <Typography className={classes.instructions}>
          {getStepContent(activeStep)}
        </Typography>
      </div>
    </div>
  );
};

export default connect(storeObject => {
  return storeObject;
})(AddBook);
