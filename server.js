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
  db.Users.find()
  .exec((er, AllUsers) => {
    if (err) return res.json({error: err});
    res.json(allUsers);
  })
});

//GET New User Route
app.get('/signup', (req, res) => {
  res.render('landing');
});

//POST Create User Route
app.post('/signup', (req, res) => {
  const errors = [];

  //Validation Form Data
  if(!req.body.name) {
    errors.push({message: 'Please enter your name'});
  } else if (req.body.name) {
    let check = /[A-Za-z]+$/;
    if(req.body.name.match(check)){
    } else {
      errors.push({message: 'Please enter a valid first name'})
    }
  }

  if(!req.body.last) {
    errors.push({message: 'Please enter your last name'})
  } else if (req.body.last) {
    let check = /[A-Za-z]+$/;
    if(req.body.last.match(check)){
    } else {
      errors.push({message: 'Please enter a valid last name'})
    }
  }

  if(!req.body.email) {
    errors.push({message: 'Please enter your email'});
  } else if (req.body.email) {
    let check = /\S+@\S+\.\S+/;
    if(req.body.email.match(check)){
    } else {
      errors.push({message: 'Please enter a valid email'})
    }
  }

  //If there are any validation errors, Re-render signup page with error messages
  if(errors.length) {
    return res.json({
      error: [errors]
    });
  };
  //Add User to DB, catch and then-res JSON success, send success
  // db.User.create(req.body, (err, newUser) => {
  //   .catch(err => res.json({error: err}))
  //   .then(res.json(success))
  // })

})


// Server ======================================= //
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});