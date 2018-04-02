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
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
} else
	app.use(express.static(path.resolve(__dirname, '..', 'build')))
// Serve our api
app.set('trust proxy', 1) // trust first proxy

app.use(session({
	secret: 'keyboard cat',
	cookie: {},
	httpOnly: false
}));

app.use('/api', require('./api'))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
