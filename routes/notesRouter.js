const notesRouter = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');

// GET
notesRouter.get('/', (req, res) => {
    res.status(200).json(db);
    console.info(`${req.method} request received to view notes`);
});

// POST
notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        fs.readFile('./db/db.json', (err, data) => {
            // if (err) res.status(400).json({err});
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        });

        const response = {
            status: 'success',
            body: newNote
        };

        console.log(response);
        res.status(200).json(response);
    } else {
        res.status(400).json('Error in posting note');
    };
});

module.exports = notesRouter;