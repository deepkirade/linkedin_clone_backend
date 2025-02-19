const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [ 
        {
        type: mongoose.Schema.Types.ObjectId,
         ref: "User" 
        }
        ],
    messages: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "message"
      }],

}, { timestamps: true });

module.exports = mongoose.model("conversation", conversationSchema);
