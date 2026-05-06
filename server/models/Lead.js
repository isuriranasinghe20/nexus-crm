const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  source: String,
  salesperson: String,
  status: {
    type: String,
    enum: ["New","Contacted","Qualified","Proposal Sent","Won","Lost"],
    default: "New"
  },
  dealValue: Number
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);