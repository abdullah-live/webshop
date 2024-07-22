import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';
import { config } from '../../config';
const URL = `${config.url.API_URL}/email/send-contact-email`; // Adjust the URL based on your API endpoint


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(URL, formData);
      if (response.status === 200) {
        alert('Contact email sent successfully');
      } else {
        alert('Failed to send contact email');
      }
    } catch (error) {
      console.error('Error sending contact email:', error);
      alert('Failed to send contact email');
    }
  };

  return (
    <Container id="contact" style={{ marginTop: '20px', paddingTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit} id="contactform">
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                label="Message"
                name="message"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
              />
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ height: '100%' }}>
            <iframe
              title="Webshop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25211.42319879775!2d8.631903499999998!3d50.1109221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdb1b4f1454fd5%3A0xf17fefb9c42184bb!2sFrankfurt%20am%20Main!5e0!3m2!1sen!2sde!4v1626202283353!5m2!1sen!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactForm;
