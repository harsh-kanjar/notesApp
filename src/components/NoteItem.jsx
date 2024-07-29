import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

function NoteItem(props) {
  const { note,updateNote } = props;
  const context = useContext(noteContext); // Fetching notes
  const { deleteNote } = context; //destructuring
  return (
    <>
      <div>
        <div className="card my-3">
          <div className="card-body">
          <h5> {note.title} <span className="badge badge-pill badge-secondary">{note.tag}</span></h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash " onClick={() => {deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() =>{updateNote(note)}}></i>
             
          </div>
        </div>
      </div>
    </>
  );
}
export default NoteItem;
