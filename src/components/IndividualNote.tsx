import { Note } from "../types/note";

interface NoteProps {
  note: Note
}

const IndividualNote = ({ note }: NoteProps) => {
  return (
    <li>{note.content}</li>
  )
}

export default IndividualNote;