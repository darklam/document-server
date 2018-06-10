
const checkAuth = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.redirect('/auth');
  }
};

module.exports = checkAuth;
