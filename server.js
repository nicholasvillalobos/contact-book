const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const testing = require(path.join(__dirname, '..', 'contact-book', 'models', 'testing'))
const User = require(path.join(__dirname, '..', 'contact-book', 'models', 'User'))
// const User = require('.\\models\\User')

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res, next) => {
  res.send("welcome to the contact-book")
})

app.post('/users/', (req, res, next) => {
  // take info given, format, and send to data base
  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    if (err) return res.status(500).send("error making user");
    res.status(200).send(user);
  })
})

app.get('/users/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send("couldn't get user")
    res.status(200).send(users)
  })
})

const server = app.listen(portnum, () => {
  const port = server.address().port
  console.log("server is running on port %s", port)
})
