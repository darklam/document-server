const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { username: req.session.username });
});

module.exports = router;