// blog.js

// load node into module 
const http = require('http')


// load third party Express module
const express = require('express')
const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


// load own modules
const createUsers = require('./modules/createUsers')
const createBlogs = require('./modules/createBlogs')

// define the routes
app.get('/', (req, res) => {
    res.send('Hello, this is the Blog Home Page.')
  })

app.post('/createusers', (req, res) => {
    createUsers(req, res)
    res.send('User has been added successfully.')
  })
  
  app.post('/createblogs', (req, res) => {
    createBlogs(req, res)
    res.send('Blog has been added successfully.')
  })


//create the server
const server = http.createServer(app);

// server listen for incoming requests
server.listen(3000);

console.log('My blog is live at port 3000')


