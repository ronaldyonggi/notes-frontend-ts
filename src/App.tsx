import { useEffect, useState } from "react"
import AddNoteForm from "./components/AddNoteForm"
import Note from "./components/Note"
import { NoteType } from "./types/note"
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(res => setNotes(res.data))
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'only important notes' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <AddNoteForm notes={notes} setNotes={setNotes} />
    </div>
  )
}
export default App