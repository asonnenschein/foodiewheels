var express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  ;

var server = express();
require('./passport')(passport);

server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '25mb'}));

server.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(passport.session());

// POST Routes =================================================================
server.post('/user/register',
  passport.authenticate('register'),
  function (req, res) {
    res.send(req.user);
  })
;

server.post('/user/login',
  passport.authenticate('login'),
  function (req, res) {
    res.send(req.user);
  })
;

// GET Routes ==================================================================

module.exports = server;