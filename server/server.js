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
const buildPath = path.resolve(__dirname, "../client/build");
console.log("Build path:", buildPath);
app.use(express.static(buildPath));

// Fallback to index.html for all non-API routes (SPA routing)
app.use((req, res) => {
  const indexPath = path.resolve(buildPath, "index.html");
  console.log("Serving SPA fallback:", indexPath);
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));