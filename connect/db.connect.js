// Configuring the database
var { dbConfig } = require("../config");
var Mongoose = require("mongoose").Mongoose;

Mongoose.Promise = global.Promise;

var blogDB = new Mongoose();

// Connecting to the database
blogDB
  .connect(dbConfig.dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the blog database");
  })
  .catch((err) => {
    console.log("Could not connect to the blog database. Exiting now...", err);
    process.exit();
  });

module.exports = {
  blogDB,
};
