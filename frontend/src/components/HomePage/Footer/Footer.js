import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '40px 0',
        marginTop: '20px',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Link href="#" color="inherit" display="block" gutterBottom>
              Contact Us
            </Link>
            <Link href="#" color="inherit" display="block" gutterBottom>
              Track Order
            </Link>
            <Link href="#" color="inherit" display="block" gutterBottom>
              Return Policy
            </Link>
            <Link href="#" color="inherit" display="block" gutterBottom>
              FAQs
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Information
            </Typography>
            <Link id="footer" href="#" color="inherit" display="block" gutterBottom>
              About Us
            </Link>
            <Link href="#" color="inherit" display="block" gutterBottom>
              Careers
            </Link>
            <Link href="#" color="inherit" display="block" gutterBottom>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block" gutterBottom>
              Terms & Conditions
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Our Store
            </Typography>
            <Typography variant="body2" gutterBottom>
              We are an online store dedicated to providing the best products at the most affordable prices. Shop with us for a hassle-free shopping experience.
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={5}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Webshop. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
