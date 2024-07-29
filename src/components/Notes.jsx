import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
function Notes() {
  const context = useContext(noteContext); // Fetching notes
  const { notes, getAllNotes,  editNote } = context; //destructuring
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  }); //initial note for this component only
  const ref = useRef(null);

  //  fetch all notes
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }else{
      navigate("/login");  // redirect
    }
  }, []);
  
// update note
  const updateNote = (currentNote) => {
    ref.current.click(); //react-bootstrap docs
    setNote({
      id: currentNote._id, 
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleEvent = (e) => {
    console.log('note to be added on edit: ',note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    e.preventDefault();
  };

  const onChange = (e) => {
    // spread operator (...note)
    // means - whatever valuse are in ...note are present remains same but next valuse should add or override
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {/* {note.title} */}
                Edit
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* form */}
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <textarea
                    value={note.edescription}
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    rows="5"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            {/* ********************************************** */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                data-dismiss="modal"
                type="submit"
                className="btn btn-success"
                onClick={handleEvent}
              >
                Edit <i className="fa-solid fa-check mx-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your notes:</h2>
      <div className="my-3">
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;