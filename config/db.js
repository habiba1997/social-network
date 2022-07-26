const mongoose = require('mongoose');
// Configurations are stored in configuration files within your application, and can be overridden and extended by environment variables, command line parameters, or external sources.
//This gives your application a consistent configuration interface shared among a growing list of npm modules also using node-config.
// your configuration can be saved inside config folder => default.json file
const config = require('config');

const db = config.get('mongoURI');

//The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log(`Mongoose connected.....`);
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
