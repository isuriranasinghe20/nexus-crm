const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/notes", require("./routes/notes"));

// Serve static files from client build
const buildPath = path.resolve(__dirname, "../client/build");
console.log("Build path:", buildPath);
console.log("Build path exists:", fs.existsSync(buildPath));

app.use(express.static(buildPath, {
  maxAge: "1d",
  etag: false
}));

// Fallback to index.html for all non-API routes (SPA routing)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));