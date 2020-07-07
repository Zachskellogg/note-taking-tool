// DEPENDENCIES
const fs = require("fs");
const { v1: uuid } = require('uuid');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



module.exports = function (app) {

    //get
    app.get("/api/notes", function (req, res) {
        readFileAsync("./db/db.json", "utf8")
            .then(function (notesData) {
                var notes = JSON.parse(notesData)
                // console.log(notes);
                res.json(notes);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    //post 

    app.post("/api/notes", function (req, res) {
        const { title, text } = req.body;
        const newNote = { title, text, id: uuid() };

        // req.body is the newly-inputted note 
        // console.log(req.body);
        // req.body.id


        // Want to add req.body to the notes array from db.json
        readFileAsync("./db/db.json", "utf8")
            .then(function (notesData) {
                var notes = JSON.parse(notesData)
                notes.push(newNote);
                writeFileAsync('./db/db.json', JSON.stringify(notes));
                res.json(notes);
            })
    })
    //delete
    app.delete("/api/notes/:id", function (req, res) {
        console.log(req);
        const id = req.params.id;
        readFileAsync("./db/db.json", "utf8")
            .then(function (notesData) {
                var notes = JSON.parse(notesData)
                return notes;
            })
            .then((notes) => {
                return notes.filter((note) => note.id !== id);

            }).then((filteredNotes) => {
                console.log(filteredNotes);
                writeFileAsync('./db/db.json', JSON.stringify(filteredNotes));
                res.json(filteredNotes);

            })
    })
    // figure out which note someone wants to delete
    // target based on the id
    // look up req.params.id
    // google how to remove a specific element from an array
}
