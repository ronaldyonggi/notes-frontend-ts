import { NoteType } from "../types/note";

interface NoteProps {
  note: NoteType
}

const Note = ({ note }: NoteProps) => {
  return (
    <li>{note.content}</li>
  )
}

export default Note;