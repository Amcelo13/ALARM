const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const connectDatabase = async () => { 
  try {
    await mongoose.connect(process.env.CONN_STR);
    console.log("Connection to database is successful ");
  } 
  catch (err) { 
    console.log("Connection Error", err.message);
    mongoose.connection.close();
    process.exit(0);
  }
};

module.exports = connectDatabase;
