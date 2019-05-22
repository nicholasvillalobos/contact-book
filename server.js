const express = require('express')
const portnum = process.env.PORT || 3000

const app = express()

app.get('/', (req, res, next) => {
  res.send("welcome to the contact-book")
})

const server = app.listen(portnum, () => {
  const port = server.address().port
  console.log("server is running on port %s", port)
})
