const express = require('express');
const app = express();

// a method can be saved in a constant
const connectDB = require('./config/db');
// once () called then the method is executed
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/posts', require('./routes/posts'));

// if the enviroment PORT variable is not set (example in heroku env when deploying) then use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
