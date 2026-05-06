const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/notes", require("./routes/notes"));

// Serve static files from client build
app.use(express.static(path.join(__dirname,"../client/build")));

// Fallback to index.html for all non-API routes (SPA routing)
app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname,"../client/build/index.html"));
});

app.listen(5000, ()=> console.log("Server running on 5000"));