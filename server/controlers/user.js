const bcrypt = require('bcrypt');
module.exports = {
  authUser: (req, res, next) => {
    if (req.session.User) {
      res.send({ success: true, user: req.session.User });
    } else {
      res.send({ success: false });
    }
  },
  registerAuth: (req, res, next) => {
    const db = req.app.get('db');
    const { Username, Email, Password } = req.body;
    db.User.findOne({ Username })
      .then(user => {
        const condition1 = /^[a-zA-Z0-9]+$/.test(Username);
        const condition2 = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
          Email
        );
        const condition3 = /^(?=.*[0-9])(?=.*[!@#$%^&*_+-=:;()'])[a-zA-Z0-9!@#$%^&*_+-=:;()']{7,15}$/.test(
          Password
        );
        if (user) {
          throw 'This username is already in use, please pick a different one.';
        } else if (
          Username.length < 1 ||
          Email.length < 1 ||
          Password.length < 1
        ) {
          throw 'All boxes must be filled';
        } else if (!condition1) {
          throw 'Username does not follow the format';
        } else if (!condition2) {
          throw 'Make sure you are using a real email';
        } else if (!condition3) {
          throw "Your password doesn't pass the test";
        } else {
          return db.User.findOne({ Email }).then(ema => {
            if (ema) {
              throw 'This email is already in use, please login.';
            } else {
              return bcrypt.hash(Password, 10);
            }
          });
        }
      })
      .then(hash => {
        return db.User.insert({ Username, Email, Password: hash });
      })
      .then(user => {
        delete user.Password;
        req.session.User = user;
        res.send({ success: true, User: user });
      })
      .catch(err => {
        res.send({ success: false, err });
      });
  },
  loginAuth: (req, res, next) => {
    const db = req.app.get('db');
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
  },
  deleteAuth: (req, res, next) => {
    req.session.destroy();
    res.send({ success: true });
  }
};
