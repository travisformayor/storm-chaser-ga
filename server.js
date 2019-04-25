const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const PORT = process.env.PORT || 4000;

// Database
const db = require('./models');

// View Engine
app.set('view engine', 'ejs');

// Middleware =================================== //
// Body Parse
// Forms
app.use(bodyParser.urlencoded({extended: true}))
// JSON
app.use(bodyParser.json());

// Serve public directory
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret dev key for express sessions',
  resave: false,
  saveUninitialized: false,
}));

// Routes ======================================= //
// Sanity test route
app.get('/', (req, res) => {
  res.send('<h1>Test App</h1>');
});

//GET New User Route
app.get('/signup', (req, res) => {
  res.render('landing/signup');
});

//POST Create User Route
app.post('/signup', (req, res) => {
  const errors = [];

  //Validation Form Data
  if(!req.body.name) {
    errors.push({message: 'Please enter your name'});
  }

  if(!req.body.email) {
    errors.push({message: 'Please enter your email'});
  }

  if(!req.body.password) {
    errors.push({message: 'Please enter your password'});
  }

  if(!req.body.password != req.body.password2) {
    errors.push({message: 'Your passwords do not match'});
  }

  //If there are any validation errors, Re-render signup page with error messages
  if(errors.length) {
    return res.render('landing/signup', {user: req.body, errors: errors});
  }
})



// Server ======================================= //
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});