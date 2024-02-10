import { Note } from "../types/note";
import noteService from '../services/notes'

interface NoteProps {
  note: Note;
  toggleImportance: (id: string) => void;
  handleDelete: (id: string) => void
}

const IndividualNote = ({ note, toggleImportance, handleDelete }: NoteProps) => {
  const label = note.important
  ? 'make not important' : 'make important'

  const handleDeleteClick = () => {
    handleDelete(note.id)
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