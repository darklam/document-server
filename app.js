const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const checkAuth = require('./middleware/checkAuth');
require('dotenv').config();
const mongoose = require('mongoose');

const options = {
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASS,
};

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, options)
  .then(() => console.log('Connected to database'))
  .catch(error => console.log(error));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'lawl',
}));

const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const documentRouter = require('./routes/document');
const searchRouter = require('./routes/search');

app.use('/auth', authRouter);
app.use(checkAuth);
app.use('/home', homeRouter);
app.use('/document', documentRouter);
app.use('/search', searchRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
