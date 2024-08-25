const mongoose= require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("db ka connection is successful"))
    .catch((err)=>{
        console.log("issue in db connection");
        console.error(err.message);
        process.exit(1);
    });
}

module.exports= dbConnect;