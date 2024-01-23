import { useEffect, useState } from "react"
import AddNoteForm from "./components/AddNoteForm"
import { Note } from "./types/note"
import noteService from './services/notes'
import IndividualNote from "./components/IndividualNote"

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(res => setNotes(res.data))
  }, [])

  const toggleImportance = (id: number): void => {
    // First find the note that matches the id
    const matchedNote = notes.find(note => note.id === id)
    // Then create the updated note
    if (matchedNote) {
      const updatedNote = {
        ...matchedNote,
        important: !matchedNote.important
      }
      // Then call put
      noteService
        .update(id, updatedNote)
        .then(res => {
          setNotes(notes.map(note => note.id === id ? res.data : note))
        })
    }

  }

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
          <IndividualNote key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
        ))}
      </ul>
      <AddNoteForm notes={notes} setNotes={setNotes} />
    </div>
  )
}
export default App