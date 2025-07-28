/* eslint-env node */
/* global require, module */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
