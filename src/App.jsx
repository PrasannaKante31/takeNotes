import './App.css'
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx"
import NoteState from './contexts/notes/NoteState';
//Switch in react-router-dom has been depricated and Routes is being used
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//defining routes has also changed in react-router-dom
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
function App() {
    //  wrapping the app inside NoteState, the ones which are inside will be able to access the props 

  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <div className="container">
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  )
}

export default App
