import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import Slider from 'react-slick';
import { selectProduct } from '../../../redux/slices/productSlice';
import { addItemToCart } from '../../../redux/slices/cartSlice';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const product = products.find(item => item._id === productId);

  useEffect(() => {
    if (product) {
      dispatch(selectProduct(product));
    }
  }, [dispatch, product]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <Container>
      <Grid container spacing={4} style={{ marginTop: '80px' }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '40px' }}>
            <Box sx={{ width: '100%' }}>
              <Slider {...settings}>
                {product.images.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative', height: '400px' }}>
                    <img
                      src={image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" gutterBottom dangerouslySetInnerHTML={{ __html: product.description }}></Typography>
          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
