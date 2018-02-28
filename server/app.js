// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const redis = require('redis')
const connect = require('connect-redis');


const app = express();
const client = redis.createClient();
const redisStore = connect(session);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//json parser
app.use(bodyParser.json())
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))
// Serve our api
app.set('trust proxy', 1) // trust first proxy

app.use('/api', require('./api'))

app.use(session({
	secret: 'PUT01SL0V3_PUT01SL1F3',
  resave: false,
  saveUninitialized: false,
  store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: client,
  }),
  cookie: {
      httpOnly: false,
      secure: false, // set "true" if https
      maxAge: 3600000 * 5 //Not sure now //should be 5 hours since 3600000 is equivalent to 1 hour according to http://www.senchalabs.org/connect/session.html
  }
}))


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
