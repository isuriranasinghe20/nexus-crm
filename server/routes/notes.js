const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, async(req,res)=>{
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

router.get("/:leadId", auth, async(req,res)=>{
  const notes = await Note.find({leadId: req.params.leadId});
  res.json(notes);
});

module.exports = router;