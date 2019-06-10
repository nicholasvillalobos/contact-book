const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Contact = require("../../models/Contact");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              userId: user._id,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.delete('/contacts/:id', (req, res, next) => {
  Contact.findOne({_id: req.params.id}, (err, contacts) => {
    if (err) return res.status(500).send("Error getting Contact")
    if (!contacts) return res.status(404).send("Error finding Contact")
      contacts.remove();
      res.send("Deleted Contact")
  })
})

router.post('/contacts', (req, res) => {
  Contact.create({
    owner: req.body.owner,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }, (err, user) => {
    if (err) return res.status(500).send("error making contact");
      return res.send({
        success: true,
        message: 'New Contact created!'
      });
  });
})

router.get('/', (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) return res.status(500).send("Error getting Users")
      res.status(200).send(user)
  })
})

// add contact for the user then search
/*export const addContact = (userData, history) => dispatch => {
  axios
    .post("/api/users/contacts", userData)
    .then(res => history.push("/contacts/:id"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};
*/

router.get('/contacts/', (req, res, next) => {
  console.log('WHATS UP?!');
  res.status(200).send('my name is jonas');
})

router.get('/contacts/:id', (req, res, next) => {
  Contact.find({owner: req.params.id}, (err, contacts) => {
    if (err) return res.status(500).send("Error getting Contacts")
    if (!contacts) return res.status(404).send("Error finding User")
      res.status(200).send(contacts)
  })
})

module.exports = router;
