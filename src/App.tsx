import { useState } from "react"
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

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  )
}
export default App