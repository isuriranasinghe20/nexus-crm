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
app.use(express.static(path.resolve(__dirname,"../client/build")));

// Fallback to index.html for all non-API routes (SPA routing)
app.get(/.*/, (req,res)=>{
  const indexPath = path.resolve(__dirname,"../client/build/index.html");
  console.log("Serving index.html from:", indexPath);
  res.sendFile(indexPath, (err) => {
    if(err) {
      console.error("Error sending file. Path:", indexPath, "Error:", err.message);
      res.status(404).send("File not found");
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));