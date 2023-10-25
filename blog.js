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
const removeUsers = require('./modules/removeUsers')
const createBlogs = require('./modules/createBlogs')
const removeBlogs = require('./modules/removeBlogs')

// define the routes
app.get('/', (req, res) => {
    res.send('Hello, this is the Blog Home Page.')
  })

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


//create the server
const server = http.createServer(app);

// server listen for incoming requests
server.listen(3000);

console.log('My blog is live at port 3000')


