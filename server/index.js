require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

/* =====================
   TEST ROUTE (PUT THIS FIRST)
===================== */
app.get("/", (req, res) => {
  res.send("🛡 SOC Backend is running");
});

/* =====================
   SERVER + SOCKET
===================== */
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

/* =====================
   DATABASE
===================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 MongoDB connected");

    server.listen(5000, "0.0.0.0", () => {
      console.log("🔥 SOC v3 running on port 5000");
    });

  })
  .catch(err => {
    console.error("🔴 MongoDB connection error:", err);
  });