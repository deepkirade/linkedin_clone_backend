const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    location:{
        type:String 
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
    
},{timestamps:true})
module.exports = mongoose.model("Company", companySchema);