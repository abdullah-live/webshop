const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');


// Routes
const product = require(path.join(__dirname, 'routes', 'product'));
const category = require(path.join(__dirname, 'routes', 'category'));
const home = require(path.join(__dirname, 'routes', 'home'));
const emailRoutes = require(path.join(__dirname, 'routes', 'email'));
// const product = require('./routes/product');
// const category = require('./routes/category');
// const home = require('./routes/home');
// const emailRoutes = require('./routes/email');

// Subscribers
app.use('/api/product', product);
app.use('/api/category', category);
app.use('/', home);
app.use('/api/email', emailRoutes);



// MongoDB Connection Code
const uri = "mongodb+srv://abdullah:1234@cluster0.nspdg.mongodb.net/fra-project?retryWrites=true&w=majority"

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Could not connect to MongoDB...',err)
    process.exit(1);
  });

// PORT Setup
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on Port ${port}...`))