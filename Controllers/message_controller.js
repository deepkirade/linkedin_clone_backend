
const Conversation = require("../models/conversation-model")
const Message = require("../models/message-model")
const { io, getReceiverSocketId } = require("../socketio/socketio")

const sendmessage = async (req, res) => {

    // await Message.deleteMany({})

    try {
        const { message } = req.body
        const receiverID = req.params.id
        const senderID = req.user.id    //current logged in user


        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            });
            // conversation.save()
        }
        const newmessage = await new Message({
            senderID,
            receiverID,
            message
        });
        if (newmessage) {
            conversation.messages.push(newmessage._id)
        }
        await Promise.all([conversation.save(), newmessage.save()])

        const ReceiverSocketId = getReceiverSocketId(receiverID)
        if (ReceiverSocketId) {
            io.to(ReceiverSocketId).emit('ReceiverSocketId', newmessage)
            console.log("message successfully sent to client")
        }
        res.status(201).json({ message: "message sent successfully", newmessage })

    } catch (error) {
        console.log("error in sending message" + error)
        res.status(500).json({ message: "Internal server error" })

    }
}


const getmessages = async (req, res) => {
    try {

        const receiverID = req.params.id
        const senderID = req.user.id    //current logged in user
        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] }
        }).populate("messages")

        if (!conversation) {
            return res.json({ message: 'conversation not found' })
        }
        res.status(200).send(conversation.messages)
    } catch (error) {
        console.log("error in sending message" + error)
        res.status(500).json({ message: "Internal server error" })
    }

}






module.exports = { sendmessage, getmessages }