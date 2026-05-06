const express = require("express");
const Lead = require("../models/Lead");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", auth, async(req,res)=>{
  const { status, source, search } = req.query;

  let filter = {};

  if(status) filter.status = status;
  if(source) filter.source = source;

  if(search){
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  const leads = await Lead.find(filter);
  res.json(leads);
});

router.post("/", auth, async(req,res)=>{
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

router.put("/:id", auth, async(req,res)=>{
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
});

router.delete("/:id", auth, async(req,res)=>{
  await Lead.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
});

module.exports = router;