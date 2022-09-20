// This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

const express = require('express');
const app = express();

app.use((req, res, next) => {
  log('Time:', Date.now());
  next();
});

// This example shows a middleware function mounted on the /user/:id path. The function is executed for any type of HTTP request on the /user/:id path.

app.use('/user/:id', (req, res, next) => {
  log('Request Type:', req.method);
  next();
});
