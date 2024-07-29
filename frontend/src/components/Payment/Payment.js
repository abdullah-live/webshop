import React, { useState } from 'react';
import {
  Container, Paper, Typography, Stepper, Step, StepLabel, Box, Button, TextField,
  CircularProgress, Snackbar, Alert, Grid
} from '@mui/material';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const steps = ['Card Details', 'Address and Phone', 'Confirm Order'];

const Payment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formValues, setFormValues] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (activeStep === 0) {
      if (!values.cardNumber) {
        errors.cardNumber = 'Card Number is required';
      } else if (!/^\d{16}$/.test(values.cardNumber)) {
        errors.cardNumber = 'Card Number must be 16 digits';
      }

      if (!values.expiryDate) {
        errors.expiryDate = 'Expiry Date is required';
      } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/.test(values.expiryDate)) {
        errors.expiryDate = 'Expiry Date must be in MM/YY or MM/YYYY format';
      }

      if (!values.cvv) {
        errors.cvv = 'CVV is required';
      } else if (!/^[0-9]{3,4}$/.test(values.cvv)) {
        errors.cvv = 'CVV must be 3 or 4 digits';
      }
    } else if (activeStep === 1) {
      if (!values.address) {
        errors.address = 'Address is required';
      }

      if (!values.phone) {
        errors.phone = 'Phone is required';
      } else if (!/^[0-9]{10}$/.test(values.phone)) {
        errors.phone = 'Phone must be 10 digits';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
        errors.email = 'Email must be a valid email address';
      }
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSnackbar(true);
      setActiveStep(0);
      navigate('/payment-success');
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography component="h1" variant="h4" align="center">
          Payment
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Processing your payment...
            </Typography>
          </Box>
        ) : (
          <>
            {activeStep === 0 ? (
              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <TextField
                      name="cardNumber"
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={formValues.cardNumber}
                      onChange={handleChange}
                      error={!!formErrors.cardNumber}
                      helperText={formErrors.cardNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <FaCcVisa size={48} style={{ marginRight: '10px' }} />
                    <FaCcMastercard size={48} />
                  </Grid>
                </Grid>
                <TextField
                  name="expiryDate"
                  label="Expiry Date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formValues.expiryDate}
                  onChange={handleChange}
                  error={!!formErrors.expiryDate}
                  helperText={formErrors.expiryDate}
                />
                <TextField
                  name="cvv"
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formValues.cvv}
                  onChange={handleChange}
                  error={!!formErrors.cvv}
                  helperText={formErrors.cvv}
                />
              </Box>
            ) : activeStep === 1 ? (
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formValues.address}
                  onChange={handleChange}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                />
                <TextField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formValues.phone}
                  onChange={handleChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                />
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formValues.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Review your details
                </Typography>
                <Box>
                  <Typography variant="body1"><strong>Card Number:</strong> **** **** **** {formValues.cardNumber.slice(-4)}</Typography>
                  <Typography variant="body1"><strong>Expiry Date:</strong> {formValues.expiryDate}</Typography>
                  <Typography variant="body1"><strong>CVV:</strong> {formValues.cvv}</Typography>
                  <Typography variant="body1"><strong>Address:</strong> {formValues.address}</Typography>
                  <Typography variant="body1"><strong>Phone:</strong> {formValues.phone}</Typography>
                  <Typography variant="body1"><strong>Email:</strong> {formValues.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm'}
                  </Button>
                </Box>
              </Box>
            )}
            {activeStep < steps.length - 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Next'}
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Payment processed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Payment;
