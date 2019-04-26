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

//GET All Users
app.get('/api/users', (req, res) => {
  db.User.find()
  .exec((err, allUsers) => {
    if (err) return res.json({error: err});
    res.json(allUsers);
  })
});

//GET New User Route
app.get('/signup', (req, res) => {
  res.render('landing');
});

//GET User Route
app.get('/users', (req, res) => {
  res.render('users');
})

//POST Create User Route
app.post('/signup', (req, res) => {
  const errors = [];

  //Validation Form Data
  if(!req.body.firstName) {
    errors.push({
      type: 'firstName',
      message: 'Please enter your first name'
    });
  } else if (req.body.firstName) {
    let check = /[A-Za-z]+$/;
    // console.log(req.body.firstName)
    // console.log(req.body.firstName.length)
    if(req.body.firstName.match(check) && req.body.firstName.length >= 2){
    } else {
      errors.push({
        type: 'firstName',
        message: 'Please enter a valid first name'
      })
    }
  }

  if(!req.body.lastName) {
    errors.push({
      type: 'lastName',
      message: 'Please enter your last name'
    })
  } else if (req.body.lastName) {
    let check = /[A-Za-z]+$/;
    if(req.body.lastName.match(check) && req.body.lastName.length >= 2){
    } else {
      errors.push({
        type: 'lastName',
        message: 'Please enter a valid last name'
      })
    }
  }

  if(!req.body.email) {
    errors.push({
      type: 'email',
      message: 'Please enter your email'
    });
  } else if (req.body.email) {
    let check = /\S+@\S+\.\S+/;
    if(req.body.email.match(check)){
    } else {
      errors.push({
        type: 'email',
        message: 'Please enter a valid email'
      })
    }
  }

  //If there are any validation errors, Re-render signup page with error messages
  if(errors.length) {
    return res.json({
      errors: errors
    });
  };
  //Add User to DB, catch and then-res JSON success, send success
  console.log(req.body)
  db.User.create(req.body)
    .catch(err => res.json({error: err}))
    .then(newUser => res.json({success: 'success'}))
})



// Server ======================================= //
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});