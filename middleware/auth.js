const jwt = require('jsonwebtoken');
const config = require('config');

// middle ware func take req, res
// middle ware funciton that has the access to req and response cycle/objects
// next is callback that has to be done to go to next piece of code
module.exports = function (req, res, next) {
  // get token from header
  const bearerHeader = req.headers['authorization'];

  // check if no token
  if (typeof bearerHeader === 'undefined') {
    return res.status(401).json({ msg: 'NO token, authorization denied' });
  }

  // verify token
  try {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // we assign in request our user data (id, email)
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid ' });
  }
};
