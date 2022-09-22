const express = require('express');
const app = express();

// manipulate routes paths
const path = require('path');

// a method can be saved in a constant
const connectDB = require('./config/db');
// once () called then the method is executed
connectDB();

// init middleware => to parse json fron req.body in post requests
// express.json is direct pass-through of the .json() method from the body-parser module.
app.use(express.json());

// Define Routes
app.use('/user', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/post', require('./routes/posts'));

// down here
// server serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder (folder that is build for react after npm build)
  app.use(express.static('client/build'));

  // any path other than above will be served by front-end react (which is  /client/build/index.html page)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// if the enviroment PORT variable is not set (example in heroku env when deploying) then use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
