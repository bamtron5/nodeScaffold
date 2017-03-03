import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as path from 'path';
import * as mongoose from 'mongoose';

// express routes
import routes from './routes/index';

// init express and assign it to app var
// INITIATE THE APP
let app = express();

// optional for security
const dev = app.get('env') === 'development' ? true : false;

//  view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// config bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// static routing
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));

// a server route
app.use('/', routes);

//  redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});

//  catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//  development error handler
//  will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//  production error handler
//  no stacktraces leaked to user
// production error handler
app.use((err, res) => {
  res.status(err['status'] || 500);
});

export = app;
