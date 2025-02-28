require('dotenv').config();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function () {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGO_URI;
    const options = {
      serverSelectionTimeoutMS: 30000,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    };

    mongoose.connect(uri, options)
      .then(() => console.log('Connected to MongoDB successfully!'))
      .catch((err) => console.error('Error connecting to MongoDB:', err));
  }
  return mongoose;
};
