const mongoose= require("mongoose");
const env = require('dotenv').config()

 const URI = process.env.URI

const connectDb= async ()=>{
     try {
        await mongoose.connect(URI)
        console.log(" connection successful to DataBase")

     } catch (error) {
        console.log("database connection failed")
        process.exit(0);
     }

}

module.exports = connectDb ;