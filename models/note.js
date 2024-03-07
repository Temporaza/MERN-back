const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    skills: [String],
    archived: { type: Boolean, default: false },
  });

  const Note = mongoose.model('Note', noteSchema);

  module.exports = Note;