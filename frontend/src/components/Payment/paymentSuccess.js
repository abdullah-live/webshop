import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutline } from '@mui/icons-material';
import { clearCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleShopMore = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(clearCart());
  }, [])
  

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <CheckCircleOutline sx={{ fontSize: 60, color: 'green' }} />
        <Typography component="h1" variant="h4" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your payment has been processed successfully.
        </Typography>
        <Typography variant="body1" gutterBottom>
          For further details, please check your email.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleShopMore}>
            Shop More
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
