import React from 'react';
import './AddBook.css';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SexNudes from './SexAndNudity/SexAndNudity';
import ViolenceGore from './ViolenceAndGore/ViolenceAndGore';
import Profanity from './Profanity/Profanity';
import AlcoholDrugSmoking from './AlcoholDrugSmoking/AlcoholDrugSmoking';
import FrighteningIntense from './FrighteningIntense/FrighteningIntense';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
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
  return [
    'Book Title and Summary',
    'Sex & Nudity',
    'Violence & Gore',
    'Profanity',
    'Alcohol, Drugs, & Smoking',
    'Frightening & Intense'
    // 'Submit'
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <SumTitAuth />;
    case 1:
      return <SexNudes />;
    case 2:
      return <ViolenceGore />;
    case 3:
      return <Profanity />;
    case 4:
      return <AlcoholDrugSmoking />;
    case 5:
      return <FrighteningIntense />;
    default:
      return '';
  }
}

const AddBook = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

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
    alert('All done!');
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
                  onClick={handleNext}
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
