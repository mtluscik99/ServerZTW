const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/TripServer', { useNewUrlParser: true });

const app = express();

const users = require('./routes/users');
const offers = require('./routes/offers');
//const auth = require('./routes/auth');
app.use(cors());

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/offers', offers);
//catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  //respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  //respons to me
  console.error(err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));