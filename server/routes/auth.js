const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req,res)=>{
  const { email, password } = req.body;

  if(email==="admin@example.com" && password==="password123"){
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  res.status(401).json({msg:"Invalid credentials"});
});

module.exports = router;