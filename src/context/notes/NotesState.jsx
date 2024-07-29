import noteContext from "./noteContext";
import { useState } from "react";
function NotesState(props) {
  const host = "http://localhost:5000";
  const notesInitial = [];

  // Fetch all notes using fetch api
  const getAllNotes = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);

    // ------------------------------------
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), //send to body
    });

    // ------------------------------------

    console.log("adding a note");
    let note = {
      _id: "669c0dddd6311600b17af735",
      user: "669c032aef2ca004e37c3247",
      title: title,
      description: description,
      tag: tag,
      date: "2024-07-20T19:19:57.253Z",
      __v: 0,
    };
    setNotes(notes.concat(note)); //notes - const [notes,setNotes] = useState(notesInitial);
  };

  // Delete a note
  const deleteNote = async (id) => {
    // Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json);
    // ------------------------------------
    console.log("Delete note , with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit/Update a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    // ------------------------------------
    let newNote = JSON.parse(JSON.stringify(notes))

    // Edit a note
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
    // --------------------------------------------------
  };

  const [notes, setNotes] = useState(notesInitial);
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
}

export default NotesState;
