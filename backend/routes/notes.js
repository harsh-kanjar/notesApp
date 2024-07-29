const express = require('express')
const router = express.Router();
const Note = require('../models/Note') //Model
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes using: GET api/notes/getallnotes
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }) // req.user.id comes from middleware -> fetchuser
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})


// Route 2: Add a new note using: POST api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Add a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        // Destructuring
        const { title, description, tag } = req.body;

        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new note
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id // Assuming fetchUser middleware sets req.user
        });

        // Save the note to the database
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});

// We use PUT request for updation 
// Route 3: Update an exiting note: PUT api/notes/updatenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // Destrucuring 
    const { title, description, tag } = req.body;

    // create a new object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    // -----------------------------------------------

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id) //this id is nothing but - /updatenote/:id
    if (!note) { return res.status(404).send('Not found..!') };

    // validate the  authorised user 
    if (note.user.toString() !== req.user.id) { return res.status(401).send('Not allowed') }
    // update note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note })
})

// Route 4: Delete an exiting note: DELETE api/notes/updatenote
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // Destrucuring 
    const { title, description, tag } = req.body;

    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id) //this id is nothing but - /deletenote/:id
    if (!note) { return res.status(404).send('Not found..!') };

    // Allow deletioon only if user owns it 
    if (note.user.toString() !== req.user.id) { return res.status(401).send('Not allowed') }
    // Delete note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted", note:note})
})


module.exports = router;