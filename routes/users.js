const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// fetch user model
const User = require('../models/user');

// @route   POST /user
// @desc    Redister user
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is REQUIRED').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Pease enter a password with 4 or more characters'
    ).isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //extract params
    var { name, email, password } = req.body;

    try {
      // see if user exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get user avatar
      // s size, r => rating (pg no naked ppl), d=> default mm default image
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // encrypt password
      // salt to do the hashing => the function return a promise (10 is recomended by the library)
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      // create an instance of user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //return  a promise
      await user.save();

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
