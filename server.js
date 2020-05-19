const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '/build')));

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

//////////////////////////////////////////////////////////////////

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       //days hours minutes seconds milseconds
//       expires: 1 * 24 * 60 * 60 * 1000
//     },
//     saveUninitialized: false,
//     rolling: true,
//     resave: false
//   })
// );

// app.use('/api/*', (req, res, next) => {
//   if (!req.session.user) {
//     res.send({ success: false, message: 'Please login.' });
//   } else {
//     next();
//   }
// });

// app.get('/auth/user', (req, res, next) => {
//     if (req.session.user) {
//         res.send({ success: true, user: req.session.user })
//     } else {
//         res.send({ success: false })
//     }
// })

// app.delete('/auth/user', (req, res, next) => {
//     req.session.destroy()
//     res.send({ success: true })
// })

///////////////////////////////////////////////////////////////////

// app.post('/auth/login', (req, res, next) => {
//     const db = app.get('db');
//     const { email, password } = req.body
//     let catchUser = {}
//     db.people.findOne({ email })
//         .then((user) => {
//             if (!user) {
//                 throw 'We could not find a user for this email. Please register.'
//             } else {
//                 catchUser = user;
//                 return bcrypt.compare(password, user.password)
//             }
//         })
//         .then((isMatch) => {
//             if (!isMatch) {
//                 throw `Your credentials don't match our records.`
//             }
//             delete catchUser.password
//             req.session.user = catchUser;
//             res.send({ success: true, user: catchUser })
//         })
//         .catch((err) => {
//             res.send({ success: false, err })
//         })
// })

////////////////////////////////////////////////////////////////////////////
//Register
app.post('/auth/register', (req, res, next) => {
  const db = app.get('db');
  const { Username, Email, Password } = req.body;
  db.User.findOne({ Email })
    .then(user => {
      const condition1 = /^[a-zA-Z0-9]+$/.test(Username);
      const condition2 = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        Email
      );
      const condition3 = /^(?=.*[0-9])(?=.*[!@#$%^&*_+-=:;()'])[a-zA-Z0-9!@#$%^&*_+-=:;()']{7,15}$/.test(
        Password
      );
      if (user) {
        throw 'This email is already in use, please login.';
      } else if (!condition1 || !condition2 || !condition3) {
        throw 'Make sure all of the boxes are green before submitting.';
      } else {
        return bcrypt.hash(Password, 10);
      }
    })
    .then(hash => {
      return db.User.insert({ Username, Email, Password: hash });
    })
    .then(user => {
      delete user.Password;
      req.session.User = user;
      res.send({ success: true, user });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

//////////////////////////////////////////////////////////////////////////////////////
//Login
// Password7-15
app.post('/auth/login', (req, res, next) => {
  const db = app.get('db');
  const { Email, Password } = req.body;
  let catchUser = {};
  db.User.findOne({ Email })
    .then(user => {
      if (!user) {
        throw 'We could not find a user for this email. Please register.';
      } else {
        catchUser = user;
        return bcrypt.compare(Password, user.Password);
      }
    })
    .then(isMatch => {
      if (!isMatch) {
        throw `Your credentials don't match our records.`;
      }
      delete catchUser.Password;
      req.session.User = catchUser;
      res.send({ success: true, User: catchUser });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});
//////////////////////////////////////////////////////////////////////////////////////

//all users

//////////////////////////////////////////////////////////////////

// app.get('/*', (req, res) => {
//   res.sendFile('index.html', {
//     root: path.join(__dirname, 'build')
//   });
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// http://localhost:8080
