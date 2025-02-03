

const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

module.exports = {
    dbconnect: () => {
      
        mongoose.connect(process.env.Mongo_url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(() => {
            console.log("MongoDB is connected");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
    }
};
