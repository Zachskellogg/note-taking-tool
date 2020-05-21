// DEPENDENCIES
const fs = require("fs");
const {v4: uuidv4} = require('uuid');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



module.exports = function (app) {

    //get
    app.get("/api/notes", function (req, res) {
        readFileAsync("./db/db.json", "utf8")
            .then(function (notesData) {
                var notes = JSON.parse(notesData)
                console.log(notes);
                res.json(notes);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    //post 

    app.post("/api/notes", function(req, res) {
        // req.body is the newly-inputted note 
        console.log(req.body);
        // req.body.id

    
        // Want to add req.body to the notes array from db.json
        readFileAsync("./db/db.json", "utf8")
        .then(function (notesData) {
            var notes = JSON.parse(notesData)
            notes.push(req.body);
            writeFileAsync('./db/db.json', JSON.stringify(notes));
            res.json(notes);
        })
    })
    //delete

    // figure out which note someone wants to delete
    // target based on the id
    // look up req.params.id
    // google how to remove a specific element from an array
}
