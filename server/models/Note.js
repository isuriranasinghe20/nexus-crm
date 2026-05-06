const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  content: String,
  createdBy: String
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);