import { SyntheticEvent, useState } from "react"
import { NoteType } from "../types/note";

interface AddNoteFormProps {
  notes: NoteType[]
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

const AddNoteForm = ({ notes, setNotes  }: AddNoteFormProps) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (event: SyntheticEvent) => {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(newNoteObject))
  }

  return (
    <form onSubmit= {addNote}>
      <input type="text" 
      value={newNote} 
      onChange={e => setNewNote(e.target.value)}/>
      <button type="submit">save note</button>
    </form>
  )
}
export default AddNoteForm