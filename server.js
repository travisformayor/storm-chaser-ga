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


// Server ======================================= //
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});