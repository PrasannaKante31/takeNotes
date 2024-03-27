import React, {useContext} from 'react'
import NoteContext from '../contexts/notes/NoteContext';
import NoteItem from './NoteItem';
const Notes = () => {

    const context= useContext(NoteContext);
    const {notes, setNotes}= context;
  return (
    <div className= "row my-3">
      <h2>YOUR NOTES</h2>

      {notes.map((note)=>{
        return <NoteItem note={note}/>
      })}
    </div>
  )
}

export default Notes ;
