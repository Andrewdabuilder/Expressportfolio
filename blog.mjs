// blog.js

// load node into module 
const http = require('http')

import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/your-app-name');

// start Mongo
// start MongoDB Server


// load third party Express module
const express = require('express')
const app = express()


// load database controllers
const userController = require('./database/controllers/userController');
const blogController = require('./database/controllers/blogController');

// load own modules
const logger = require('./modules/logger')

// parse application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger);

// define the routes
app.get('/', (req, res) => {
    res.send('Hello, this is the Blog Home Page.')
  })

app.post('/createusers', userController.createUser)

app.post('/updateuseremail', userController.updateUserEmail)

app.post('/removeusers', userController.removeUser)

app.post('/createblogs', blogController.createBlog)

app.post('/removeblogs', blogController.removeBlog)

app.get('/blog/:year?/:month?/:day?', (req, res) => {

  url = req.url
  year = req.params.year
  month = req.params.month
  day = req.params.day

  var allBlogs = queryBlogs.queryAllBlogs()

    if (url == '/blog') {
      if (allBlogs.length == 0) {
        res.send('no post found')
      } else {
        res.send(allBlogs)
      }
    }

    else if (url == '/blog/'+year) {

      const blogsYear = queryBlogs.queryBlogsYear(allBlogs)

      if(blogsYear.length == 0) {
        res.send('no post found for this year')
      } else {
        res.send(blogsYear)
      }

    }

    else if (url == '/blog/'+year+'/'+month) {

      const blogsYearMonth = queryBlogs.queryBlogsYearMonth(allBlogs)

      if(blogsYearMonth.length == 0) {
        res.send('no post found for this year and month')
      } else {
        res.send(blogsYearMonth)
      }

    }

    else if (url == '/blog/'+year+'/'+month+'/'+day) {

      const blogsYearMonthDay = queryBlogs.queryBlogsYearMonthDay(allBlogs)

      if(blogsYearMonthDay.length == 0) {
        res.send('no post found for this year and month and day')
      } else {
        res.send(blogsYearMonthDay)
      }

    }

    else {
      res.status(404).send('Not Found')
    }

})

app.post('/createusers', (req, res) => {
    createUsers(req, res)
    res.send('User has been added successfully.')
  })

app.post('/removeusers', (req, res) => {
    removeUsers(req, res)
    res.send('User has been successfully removed.')
  })

  
app.post('/createblogs', (req, res) => {
    createBlogs(req, res)
    res.send('Blog has been added successfully.')
  })
  
app.post('/removeblogs', (req, res) => {
    removeBlogs(req, res)
    res.send('Blog has been successfully removed.')
  })

  // default server error handler
app.use((error, req, res, next) => {
  res.status(500).send({
    code: 500,
    status: 'Internal Server Error',
    message: error.message
  });
 })
 


//create the server
const server = http.createServer(app);

// server listen for incoming requests
server.listen(3000);

//Access the page by going to here:
// http://localhost:3000/

console.log('My blog is live at ')


