import { Note } from "../types/note";
import noteService from '../services/notes'

interface NoteProps {
  note: Note;
  toggleImportance: (id: string) => void;
  handleDelete: (id: string) => void
}

const IndividualNote = ({ note, toggleImportance, notes, setNotes }: NoteProps) => {
  const label = note.important
  ? 'make not important' : 'make important'

  const handleDeleteClick = () => {
    noteService.deleteNote(note.id)
      .then(() => {
        console.log(`Successfully deleted ${note.id}`)
        setNotes(notes.filter(n => n.id !== note.id))
      })
  }

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handleDeleteClick}>delete</button>
    </li>
  )
}

export default IndividualNote;