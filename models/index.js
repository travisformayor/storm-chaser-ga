const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/stormchasers';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false})
  .catch( err => console.log({error: err}))
  .then(() => console.log('...MongoDB Connected!'));

module.exports = {
  User: require('./user'),
};