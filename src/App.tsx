import { useState } from "react"
import AddNoteForm from "./components/AddNoteForm"
import Note from "./components/Note"
import { NoteType } from "./types/note"

const App = () => {
  const initialNotes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    }
  ]

  const [notes, setNotes] = useState<NoteType[]>(initialNotes);
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

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