const express = require('express');
const User = require('../services/user.service');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findUserByUsername(username);
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      req.session.username = username;
      req.session.role = user.role;
      res.redirect('/home');
    } else {
      res.redirect('/auth');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session && req.session.username) {
    req.session.destroy();
    next();
  } else {
    next();
  }
});

module.exports = router;
