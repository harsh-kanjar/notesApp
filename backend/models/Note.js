const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  // Associating notes to the user 
  user:{
    type: mongoose.Schema.Types.ObjectId, // Similar to the  forgein key in SQL
    ref: 'user' // refrence model
    
  },
  // -----------------------------
  title:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true,
  },
  tag:{
    type: String,
    default: "General"
  },
  date:{
    type: Date,
    default: Date.now
  },
});

// CREATING MODELS USING SCHEMA 
module.exports = mongoose.model('note',NoteSchema);
