import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const [note, setNote]= useState({id:"",etitle:"", edescription:"",etag:""})

  let { notes, getNotes, setNotes , editNote} = context;
  useEffect(() => {
    getNotes();
  }, []);

  //bootstrap modal is used
  const ref = useRef(null);
  const refClose= useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleClick= (e)=>{
    console.log("updating")
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    
  }

  const onChange = (e)=>{
      console.log(e.target.value);
      setNote({...note, [e.target.name]: e.target.value})
  }

  //see the data-bs-toggle= "modal" and data-bs-target="#exampleModal"
  //apply this to every button if the button is not working

  return (
    <>
      <h2>ADD NOTES</h2>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>


            <div class="modal-body">
              <form className="my-5">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Titles" value={note.etitle} onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" >Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Decription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" >Tag`</label>
                  <input type="text" className="form-control" id="etag" name="etag" placeholder="Tag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>


            <div class="modal-footer">

              <button
                ref={refClose}
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {console.log("in the return ", notes)}
        {notes &&
          notes.map((note) => {
            return (
              <NoteItem key={note._key} note={note} updateNote={updateNote} />
            );
          })}
      </div>
    </>
  );
};

export default Notes;
