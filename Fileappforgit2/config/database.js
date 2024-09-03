const mongoose= require("mongoose");
require("dotenv").config();

exports.connect= ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("db ka connection successful"))
    .catch((error)=>{
        console.log("db connection issues");
        console.error(error);
        process.exit(1);
    })
}