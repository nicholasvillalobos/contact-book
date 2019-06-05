const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const testing = require(path.join(__dirname, '..', 'contact-book', 'models', 'testing'))
const User = require(path.join(__dirname, '..', 'contact-book', 'models', 'User'))
const UserSession = require(path.join(__dirname, '..', 'contact-book', 'models', 'UserSession'))
const Contact = require(path.join(__dirname, '..', 'contact-book', 'models', 'Contact'))
const bcrypt = require('bcryptjs')
// const User = require('.\\models\\User')
//const signin = require(path.join(__dirname, '..', 'contact-book', 'signin'))

const portnum = process.env.PORT || 3000

testing()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nicholasvillalobos:%23Xboxcrazy30@cluster0-wdkku.mongodb.net/test?retryWrites=true', { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error('db failed to open'))
db.once('open', () => console.log('db opened successfully'))

app.get('/', (req, res, next) => {
  res.send("welcome to the contact-book")
})

//signin()
/*
app.post('/users/', (req, res, next) => {
  // take info given, format, and send to data base
  User.create({
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    if (err) return res.status(500).send("error making user");
    res.status(200).send(user);
  })
})
*/
app.post('/users/signup', (req, res, next) => {
  const { body } = req;
  const {
    username,
    phone,
    password
  } = body;
  let{
    email
  } = body;

  if (!username) {
    return res.send({
      success: false,
      message: 'Error: Username cannot be blank.'
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  email = email.toLowerCase();

  // Steps
  // Verify that email doesnt exists
  // save

  User.find({
    email: email
  }, (err, previoususers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    else if (previoususers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exists.'
      });
    }
    //res.status(200).send(users)

    const newUser = new User();

    newUser.email = email;
    newUser.username = username;
    newUser.phone = phone;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) return res.status(500).send("error making user");
      return res.send({
        success: true,
        message: 'Signed up!'
      });
      })
    });
  })

  app.post('/users/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let{
      email
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: 'Error: Invalid email'
          });
        }

        const user = users[0];
        //console.log('user:', user);
        if (!user.validPassword(password)) {
          //console.log('err 1:', err);
          //console.log('password:', password);
          return res.send({
            success: false,
            message: 'Error: Invalid Password'
          });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }

          return res.send({
            success: true,
            message: 'Valid signin',
            token: doc._id
          });

        });
      });
    })

app.get('/users/contacts/:id', (req, res, next) => {
  console.log(req.params.id);
  Contact.find(
    {owner: req.params.id}, (err, contacts) => {
      if (err) return res.status(500).send("couldn't get contacts");
      if (!contacts) return res.status(404).send("couldnt find user");
      res.status(200).send(contacts)
    });
  })

app.post('/users/contacts', (req, res, next) => {
  Contact.create({
    owner: req.body.owner,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone
  }, (err, user) => {
    if (err) return res.status(500).send("error making user");
      return res.send({
        success: true,
        message: 'New Contact!'
      });
  });
})

//app.put('/')

app.get('/users/contacts', (req, res, next) => {
  Contact.find({}, (err, contacts) => {
    if (err) return res.status(500).send("error making user");
      res.status(200).send(contacts)
    });
})

app.get('/users/verify', (req, res, next) => {

  const { query } = req;
  const { token } = query;

  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, session) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (session.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Already a session'
      });
    } else {
        return res.send({
          success: true,
          message:'Valid session'
        });
      }
  });
})

app.get('/users/signout', (req, res, next) => {

    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set:{isDeleted: true}
    }, null, (err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message:'Valid session'
      });
    });
})

app.get('/users', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send("couldn't get user")
    res.status(200).send(users)
  })
})

app.get('/users/session', (req, res, next) => {
  UserSession.find({}, (err, users) => {
    if (err) return res.status(500).send("couldn't get user")
    res.status(200).send(users)
  })
})


const server = app.listen(portnum, () => {
  const port = server.address().port
  console.log("server is running on port %s", port)
})
