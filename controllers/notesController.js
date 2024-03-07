const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  //find the notes
  const notes = await Note.find();
  //respond with them
  res.json({ notes });
};

const fetchNote = async (req, res) => {
  // Get id off the url
  const noteId = req.params.id;
  // Find the note using that id
  const note = await Note.findById(noteId);
  // Respond with the note
  res.json({ note });
};

const createNote = async (req, res) => {
  //Get the sent data off request body
  const { title, body, skills } = req.body;

  //create a note with it
  const note = await Note.create({
    title,
    body,
    skills,
  });

  //respond with the new note
  res.json({ note });
};

const updateNote = async (req, res) => {
  // Get the id off the URL
  const noteId = req.params.id;

  // Get the data off the request body
  const { title, body, skills } = req.body;

  // Log the received data
  console.log("Received update data:", { title, body, skills });

  try {
    // Find and update the record
    await Note.findByIdAndUpdate(noteId, {
      title,
      body,
      skills,
    });

    // Find the updated note
    const updatedNote = await Note.findById(noteId);

    // Log the updated note
    console.log("Updated note:", updatedNote);

    // Respond with the updated note
    res.json({ note: updatedNote });
  } catch (error) {
    // Log any errors that occur
    console.error("Error updating note:", error);

    // Respond with an error message
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  //Get the id off the url
  const noteId = req.params.id;
  //Delete the record
  await Note.deleteOne({ _id: noteId });
  //Respond
  res.json({ success: "Record deleted" });
};

const archiveNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { archived: true },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unArchiveNotes = async (req, res) => {
  const noteId = req.params.id;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { archived: false },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchArchivedNotes = async (req, res) => {
  try {
    const archivedNotes = await Note.find({ archived: true });
    res.json({ archivedNotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteArchivedNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      archived: true,
    });

    if (!deletedNote) {
      return res.status(404).json({ error: "Archived note not found" });
    }

    res.json({ success: "Archived note deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  fetchArchivedNotes,
  deleteArchivedNote,
  unArchiveNotes,
};
