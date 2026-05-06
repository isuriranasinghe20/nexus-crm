const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/notes", require("./routes/notes"));

app.listen(5000, ()=> console.log("Server running on 5000"));