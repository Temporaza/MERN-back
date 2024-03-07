
// lOAD ebv file
if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


// Import dependencies
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/connectToDb');
const notesController = require("./controllers/notesController");

// Create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cors());

//Connect to database
connectToDb();

//Routing
// app.get("/", (req, res) => {
//     res.json({Hello: "World" })
// });

app.get('/notes', notesController.fetchNotes)
app.get("/notes/:id",notesController.fetchNote)
app.post('/notes',notesController.createNote)
app.put('/notes/:id',notesController.updateNote)
app.delete("/notes/:id",notesController.deleteNote)
app.put('/notes/archive/:id', notesController.archiveNote);
app.get('/archive', notesController.fetchArchivedNotes);
app.delete('/notes/archive/:id', notesController.deleteArchivedNote);
app.put('/notes/unarchive/:id', notesController.unArchiveNotes);
//Start our server
app.listen(process.env.PORT);