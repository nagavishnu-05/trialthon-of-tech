/* eslint-env node */
/* global require, process */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Vite dev (keep if you develop locally)
  "https://trialthon-of-tech.vercel.app", // <-- your deployed frontend
];

app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / server-to-server / curl (no origin header)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

/** --- Trust proxy (Render/hosted env) --- */
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB error ❌", err));

// Sample root route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
