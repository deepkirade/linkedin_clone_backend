const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({

    job:{ 
      
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job',
        
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    status:{
       type:String,
       enum:['pending','accepted', 'rejected'],
       default: 'pending'
    }
}, {timestamps:true})

 const Application = mongoose.model("Application", applicationSchema)
 module.exports = Application  