import React, { useContext, useState } from 'react'
import NoteContext from '../contexts/notes/NoteContext'
const AddNote = () => {

    const context= useContext(NoteContext);
    const {addNote}= context;

    const [note, setNote]= useState({title:"", description:"",tag:""})
    const handleClick= (e)=>{
        e.preventDefault();
        addNote(note.title,note.description, "DEFAULT");
    }

    const onChange = (e)=>{
        console.log(e.target.value);
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form className="my-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Titles" onChange={onChange}/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >Description</label>
          <input type="text" className="form-control" id="description" name="description" placeholder="Decription" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" >Tag`</label>
          <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" onChange={onChange}/>
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
