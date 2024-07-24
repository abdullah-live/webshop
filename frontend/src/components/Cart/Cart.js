import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Paper, Button, Box } from '@mui/material';
import { removeItemFromCart, clearCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container style={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <Paper key={item.id} style={{ padding: '20px', marginBottom: '15px' }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Price: ${item.price}</Typography>
                <Typography variant="body1">Quantity: {item.quantity}</Typography>
                <Typography variant="body1">Total: ${item.totalPrice}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ marginTop: '10px' }}
                >
                  Remove
                </Button>
              </Paper>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <Typography variant="h6">Summary</Typography>
            <Typography variant="body1">Total Items: {totalQuantity}</Typography>
            <Typography variant="body1">Total Price: ${totalPrice.toFixed(2)}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClearCart}
                style={{ marginTop: '10px' }}
              >
                Clear Cart
              </Button>
              {cartItems.length > 0 && (
                <Link to="/payment">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                  >
                    Checkout
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
