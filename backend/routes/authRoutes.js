/* eslint-env node */
/* global require, module */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ExcelJS = require("exceljs"); // Add this with other requires at the top if you want

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
  let { rollNo, password } = req.body;
  rollNo = rollNo.trim().toLowerCase();
  password = password.trim();

  // Check admin login
  const admin = adminUsers.find(
    (u) => u.rollNo.toLowerCase() === rollNo && u.password === password
  );
  if (admin) {
    return res.json({ success: true, message: "Admin Login", role: "admin" });
  }

  // Check registered team login (normalize rollNo in DB too)
  const team = await Team.findOne({
    rollNo: { $regex: new RegExp(`^${rollNo}$`, "i") },
    password,
  });
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
    // Check total registered teams
    const teamCount = await Team.countDocuments();
    if (teamCount >= 20) {
      return res.status(403).json({
        success: false,
        message: "Registration limit reached. Only 20 teams are allowed.",
      });
    }

    let {
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

    rollNo = rollNo.trim().toLowerCase();

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

// PUT /api/teams/:id
router.put("/teams/:id", async (req, res) => {
  try {
    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to update team marks" });
  }
});

// ✅ GET /api/student/details?teamId=XXXX
router.get("/student/details", async (req, res) => {
  const { teamId } = req.query;

  if (!teamId) {
    return res.status(400).json({ message: "teamId is required" });
  }

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({
      student: {
        name: team.leaderName,
        email: team.rollNo,
        department: team.year,
        teamName: team.teamName,
      },
    });
  } catch (err) {
    console.error("Error fetching student data:", err);
    res.status(500).json({ message: "Failed to fetch student data" });
  }
});

// ✅ Export registered teams to Excel
router.get("/export-teams", async (req, res) => {
  try {
    const teams = await Team.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registered Teams");

    // Define columns
    worksheet.columns = [
      { header: "Team Name", key: "teamName", width: 20 },
      { header: "Year", key: "year", width: 10 },
      { header: "Leader Name", key: "leaderName", width: 20 },
      { header: "Leader Roll No", key: "rollNo", width: 15 },
      { header: "Leader Contact", key: "contactNo", width: 15 },
      { header: "Preferred Language", key: "language", width: 20 },
      { header: "Member 1 Name", key: "member1Name", width: 20 },
      { header: "Member 1 Roll", key: "member1Roll", width: 15 },
      { header: "Member 1 Contact", key: "member1Contact", width: 15 },
      { header: "Member 2 Name", key: "member2Name", width: 20 },
      { header: "Member 2 Roll", key: "member2Roll", width: 15 },
      { header: "Member 2 Contact", key: "member2Contact", width: 15 },
    ];

    // Add rows to worksheet
    teams.forEach((team) => {
      worksheet.addRow({
        teamName: team.teamName,
        year: team.year,
        leaderName: team.leaderName,
        rollNo: team.rollNo,
        contactNo: team.contactNo,
        language: team.language,
        member1Name: team.member1.name,
        member1Roll: team.member1.rollNo,
        member1Contact: team.member1.contact,
        member2Name: team.member2.name,
        member2Roll: team.member2.rollNo,
        member2Contact: team.member2.contact,
      });
    });

    // Set headers for Excel download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=team_registrations.xlsx"
    );

    await workbook.xlsx.write(res); // Write Excel to response
    res.end(); // End the response
  } catch (err) {
    console.error("Excel export error:", err);
    res.status(500).send("Failed to export Excel");
  }
});

module.exports = router;
