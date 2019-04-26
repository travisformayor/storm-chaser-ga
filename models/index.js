const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/stormchasers';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log('...MongoDB Connected!'))
  .catch( err => console.log({error: err}));

module.exports = {
  User: require('./user'),
};