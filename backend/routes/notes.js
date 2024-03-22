const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");
const fetchUser = require("../middleware/fetchUser.js");
const { body, validationResult } = require("express-validator");

//ROUTE 1: get all notes using GET api/notes/getchAllNotes login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({ notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("some error occured");
  }
});

//ROUTE 2: create a note using POST api/notes/addNote login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Should be valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors then return bad request and errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ savedNote });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured");
    }
  }
);
module.exports = router;
