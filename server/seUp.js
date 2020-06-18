const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

module.exports = app => {
  
  app.use(cors());
  app.use(bodyParser.json());

  massive(process.env.DATABASE_URL)
    .then(dbInstance => {
      console.log(`DB is connected`);
      app.set('db', dbInstance);
    })
    .catch(err => {
      console.log(err);
    });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        //days hours minutes seconds milseconds
        expires: 1 * 24 * 60 * 60 * 1000
      },
      saveUninitialized: false,
      rolling: true,
      resave: false
    })
  );

  app.use('/api/*', (req, res, next) => {
    if (!req.session.User) {
      res.send({ success: false, message: 'Please login.' });
    } else {
      next();
    }
  });
  return app;
};
