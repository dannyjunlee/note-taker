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
    console.info(`${req.method} request received to add notes`);

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        fs.readFile('../db/db.json', (err, data) => {
            if (err) res.status(400).json({err});
            const json = JSON.parse(data);
            json.push(newNote);
            fs.writeFileSync('../db/db.json', JSON.stringify(json));
        });

        const response = {
            status: "success",
            body: newNote
        };

        console.log(response);
        res.json(response);
    } else {
        res.status(400).json('Error in posting note');
    };
});

module.exports = notesRouter;