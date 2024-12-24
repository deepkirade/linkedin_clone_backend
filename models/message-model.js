const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("message", messageSchema);
