const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = 'mongodb://127.0.0.1:27017/spaceresqueDB';

app.use(morgan('dev'));

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exitCode = 1;
  });

module.exports = app;
