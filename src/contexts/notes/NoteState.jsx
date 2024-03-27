import React, {useState} from "react";
import NoteContext from "./NoteContext";
import { useActionData } from "react-router-dom";
const NoteState = (props) => {
  const notesInitial=  [
    {
      "_id": "6603fe5c0e0f57255d4f1af2",
      "user": "66013c5e84ef114083e87c93",
      "title": "500 days of summer",
      "description": "One of my favourite movies",
      "tag": "movie",
      "date": "2024-03-27T11:09:16.788Z",
      "__v": 0
    },
    {
      "_id": "6603fe7f0e0f57255d4f1af4",
      "user": "66013c5e84ef114083e87c93",
      "title": "gaban",
      "description": "This Novel is written by Premchand",
      "tag": "Literature",
      "date": "2024-03-27T11:09:51.714Z",
      "__v": 0
    },
    {
      "_id": "6603fe7f0e0f57255d4f1af4",
      "user": "66013c5e84ef114083e87c93",
      "title": "gaban",
      "description": "This Novel is written by Premchand",
      "tag": "Literature",
      "date": "2024-03-27T11:09:51.714Z",
      "__v": 0
    },
    {
      "_id": "6603fe7f0e0f57255d4f1af4",
      "user": "66013c5e84ef114083e87c93",
      "title": "gaban",
      "description": "This Novel is written by Premchand",
      "tag": "Literature",
      "date": "2024-03-27T11:09:51.714Z",
      "__v": 0
    },
    {
      "_id": "6603fe7f0e0f57255d4f1af4",
      "user": "66013c5e84ef114083e87c93",
      "title": "gaban",
      "description": "This Novel is written by Premchand",
      "tag": "Literature",
      "date": "2024-03-27T11:09:51.714Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(notesInitial)
  return(
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

//in value we can provide the state and the function that chages the state
// everything that we want to provide can be passed in as value
export default NoteState;
