// blog.js

// load node into module 
const http = require('http')


// load third party Express module
const express = require('express')
const app = express()
// const { MongoClient } = require("mongodb");

// // This is from mongoDB university 
// // https://github.com/mongodb-university/atlas_starter_nodejs/blob/master/app.js
// async function run() {
//   // TODO:
//   // Replace the placeholder connection string below with your
//   // Altas cluster specifics. Be sure it includes
//   // a valid username and password! Note that in a production environment,
//   // you do not want to store your password in plain-text here.
//   const uri =
//     "mongodb+srv://atgallag:Ia10CdhxoPYfHIoH@cluster0.lp3om0i.mongodb.net/?retryWrites=true&w=majority";

//   // The MongoClient is the object that references the connection to our
//   // datastore (Atlas, for example)
//   const client = new MongoClient(uri);

//   // The connect() method does not attempt a connection; instead it instructs
//   // the driver to connect using the settings provided when a connection
//   // is required.
//   await client.connect();

//   // Provide the name of the database and collection you want to use.
//   // If the database and/or collection do not exist, the driver and Atlas
//   // will create them automatically when you first write data.
//   const dbName = "myDatabase";
//   const collectionName = "blogs";
//   const collectionName = "users";

  

//     // Make sure to call close() on your client to perform cleanup operations
//     await client.close();
// }
// run().catch(console.dir);

// load own modules
const createUsers = require('./modules/createUsers')
const removeUsers = require('./modules/removeUsers')
const createBlogs = require('./modules/createBlogs')
const removeBlogs = require('./modules/removeBlogs')
const queryBlogs = require('./modules/queryBlogs')
const logger = require('./modules/logger')

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(logger);

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

//Access the page by going to here:
// http://localhost:3000/

console.log('My blog is live at port 3000')


