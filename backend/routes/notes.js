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

// Route 3: update a note using PUT api/notes/updateNotes
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Note.findById(req.params.id);

    if (!note) res.status(404).json({ error: "Note Not Found" });
    if (note.user.toString() != req.user.id)
      res.status(401).send("UNAUTHORIZED USER");

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (err) {
    res.status(500).json({ error: "some internal server error occured" });
  }
});

// Route 4: update a note using PUT api/notes/updateNotes
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ error: "Note Not Found" });
    if (note.user.toString() != req.user.id)
      res.status(401).send("UNAUTHORIZED USER");
    //allow deletion only if user owns this
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ SUCCESS: "Note has been deleted" });
  } catch (err) {
    res.status(500).json({ error: "some internal server error occured" });
  }
});

module.exports = router;
