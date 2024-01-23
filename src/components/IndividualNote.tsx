import { Note } from "../types/note";

interface NoteProps {
  note: Note;
  toggleImportance: () => void;
}

const IndividualNote = ({ note, toggleImportance }: NoteProps) => {
  const label = note.important
  ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default IndividualNote;