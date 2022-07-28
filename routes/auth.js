const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');

// @route   GET /auth
// @desc    Test route
// @access  public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route   POST /
// @desc    Login user
// @access  public
router.post(
  '/',
  [
    check('email', 'Please include an email').isEmail(),
    check('password', 'Please include a password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //extract params
    var { email, password } = req.body;

    try {
      // see if user exist
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };

      // return jwt token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            return res.status(400).json({ errors: [{ msg: err.msg }] });
          }
          res.json({ token });
        }
      );
      // to check on token use jwt.io website
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
