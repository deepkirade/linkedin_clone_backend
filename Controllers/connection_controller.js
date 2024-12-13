const Connection = require("../models/connection-model")

// Send Connection Request
const sendrequest =   async (req, res) => {
  try {
    const connection = new Connection(req.body);
    const savedConnection = await connection.save();
    res.status(201).json(savedConnection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Accept Connection Request
const accept = async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(req.params.id, { status: "accepted" }, { new: true });
    if (!connection) return res.status(404).json({ error: "Connection not found" });
    res.json(connection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Decline Connection Request
const decline =  async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(req.params.id, { status: "declined" }, { new: true });
    if (!connection) return res.status(404).json({ error: "Connection not found" });
    res.json(connection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {sendrequest, accept, decline}
