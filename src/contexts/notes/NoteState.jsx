import React, {useState} from "react";
import NoteContext from "./NoteContext";
import { useActionData } from "react-router-dom";
const NoteState = (props) => {
  const host= "http://localhost:8080"
  const notesInitial=  [];

  const [notes, setNotes] = useState(notesInitial)

  //get all notes
  const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwN2M5YWJmY2I1ODBhZWE1ZTljNTQ1In0sImlhdCI6MTcxMTc4NjQxMX0.JZmDRYQEl6N5btgXmapQ0d1rlZ_rQ8Kl5EMUKJzsqfQ",
        //hardcoded auth-token
      },
    });
    const json= await response.json();
    console.log("after enter into async ");
    console.log(json);

    // response is giving object and we want array
    // fuck this! took me a day to resolve!!!!
    setNotes(json.notes);
  }

  //add note

  const addNote= async (title, description, tag)=> {
    //TODO api call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwN2M5YWJmY2I1ODBhZWE1ZTljNTQ1In0sImlhdCI6MTcxMTc4NjQxMX0.JZmDRYQEl6N5btgXmapQ0d1rlZ_rQ8Kl5EMUKJzsqfQ",
        //hardcoded auth-token
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    console.log("adding a new Note")
    const note= {
      "_id": "6603fe7f0e0f57255d4f1af4",
      "user": "66013c5e84ef114083e87c93",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-03-27T11:09:51.714Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  //delete note
  const deleteNote= async (id)=>{

    //API call

    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwN2M5YWJmY2I1ODBhZWE1ZTljNTQ1In0sImlhdCI6MTcxMTc4NjQxMX0.JZmDRYQEl6N5btgXmapQ0d1rlZ_rQ8Kl5EMUKJzsqfQ",
        //hardcoded auth-token
      },
    });
    console.log("deleting the note with id "+id)
    const newNotes= notes.filter((note)=>{return note._id!=id});
    setNotes(newNotes)
  }

  //edit note

  const editNote= async (id, title, description, tag)=> {

    //API CALL

    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwN2M5YWJmY2I1ODBhZWE1ZTljNTQ1In0sImlhdCI6MTcxMTc4NjQxMX0.JZmDRYQEl6N5btgXmapQ0d1rlZ_rQ8Kl5EMUKJzsqfQ",
        //hardcoded auth-token
      },
      body: JSON.stringify({title, description,tag}), // body data type must match "Content-Type" header
    });
    //logic to edit 

    //json.parse makes the deep copy
    let newNotes= JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element= newNotes[index];
      if (element._id===id) {
        newNotes[index].title= title;
        newNotes[index].description= description;
        newNotes[index].tag= tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return(
    <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, getNotes, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

//in value we can provide the state and the function that chages the state
// everything that we want to provide can be passed in as value
export default NoteState;
