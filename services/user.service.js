const User = require('../models/user.model');

exports.findUserByUsername = username => User.findOne({ username });
