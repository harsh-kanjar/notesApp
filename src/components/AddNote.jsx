import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(noteContext); // Fetching notes
  const { addNote } = context; //destructuring
  const [note,setNote] = useState({title:"", description:"", tag:""}) //initial note for this component only 


  const handleEvent = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }

  const onChange = (e) => {
    // spread operator (...note)
    // means - whatever valuse are in ...note are present remains same but next valuse should add or override 
    setNote({...note,[e.target.name]: e.target.value})
  }
  
  return (
    <>
      <div className="container my-3">
        <h2>Add a note:</h2>
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" name="description" id="description" rows="5" onChange={onChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success" onClick={handleEvent}>
            Add <i className="fa-solid fa-check mx-2"></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
