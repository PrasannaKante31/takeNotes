// to connect to the database
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/takeNotes";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Connected to mongoDB successfully");
  });
};

module.exports = connectToMongo;
