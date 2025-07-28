/* eslint-env node */
/* global require, module */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Hardcoded Admins
const adminUsers = [
  { rollNo: "Vishnu", password: "Vishnu@1505" },
  { rollNo: "BMK", password: "Bmk@cse" },
  { rollNo: "totadmin", password: "totadmin007" },
];

// MongoDB Model
const teamSchema = new mongoose.Schema({
  teamName: String,
  year: String,
  leaderName: String,
  rollNo: String,
  contactNo: String,
  password: String,
  language: String,
  member1: {
    name: String,
    rollNo: String,
    contact: String,
  },
  member2: {
    name: String,
    rollNo: String,
    contact: String,
  },
  design: { type: Number, default: 0 },
  aptitude: { type: Number, default: 0 },
  coding: { type: Number, default: 0 },
  nontech: { type: Number, default: 0 },
});

const Team = mongoose.model("Team", teamSchema);

// ✅ Get all registered teams (for admin dashboard or view)
router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// 🔐 Login Route
router.post("/login", async (req, res) => {
  const { rollNo, password } = req.body;

  // Check admin login
  const admin = adminUsers.find(
    (u) => u.rollNo === rollNo && u.password === password
  );
  if (admin) {
    return res.json({ success: true, message: "Admin Login", role: "admin" });
  }

  // Check registered team login
  const team = await Team.findOne({ rollNo, password });
  if (team) {
    return res.json({
      success: true,
      message: "Team Login",
      role: "team",
      teamId: team._id,
    });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// 📝 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const {
      teamName,
      year,
      leaderName,
      rollNo,
      contactNo,
      password,
      language,
      member1Name,
      member1Roll,
      member1Contact,
      member2Name,
      member2Roll,
      member2Contact,
    } = req.body;

    const existing = await Team.findOne({ rollNo });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Roll No already registered." });
    }

    const newTeam = new Team({
      teamName,
      year,
      leaderName,
      rollNo,
      contactNo,
      password,
      language,
      member1: {
        name: member1Name,
        rollNo: member1Roll,
        contact: member1Contact,
      },
      member2: {
        name: member2Name,
        rollNo: member2Roll,
        contact: member2Contact,
      },
    });

    await newTeam.save();
    res.status(201).json({
      success: true,
      message: "Team registered successfully",
      teamId: newTeam._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
