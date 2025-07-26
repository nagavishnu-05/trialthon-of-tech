/* eslint-env node */
/* global require, module */
const express = require("express");
const router = express.Router();

// Hardcoded login data
const users = [
  { rollNo: "Vishnu", password: "Vishnu@1505" },
  { rollNo: "BMK", password: "Bmk@cse" },
  { rollNo: "totadmin", password: "totadmin007" },
];

// POST /api/login
router.post("/login", (req, res) => {
  const { rollNo, password } = req.body;

  const user = users.find(
    (u) => u.rollNo === rollNo && u.password === password
  );

  if (user) {
    res.json({ success: true, message: "Login successful", role: "admin" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
