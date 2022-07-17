const express = require('express');
const app = express();


app.get('/', (req, res) => res.send('API Running'));


// if the enviroment PORT variable is not set (example in heroku env when deploying) then use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));