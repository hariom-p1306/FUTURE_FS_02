const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  name: String,
  email: String,
  source: String,

  status: {
    type: String,
    enum: ["New", "Contacted", "Converted"],
    default: "New"
  },

  notes: String,
  followUpDate: Date

}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);