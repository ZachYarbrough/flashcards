const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/flashcard_db',
  {
    useNewUrlParser: true
  }
);

module.exports = mongoose.connection;