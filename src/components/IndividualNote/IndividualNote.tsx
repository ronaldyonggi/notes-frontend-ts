import { Note } from '../../types/note';

interface NoteProps {
  note: Note;
  toggleImportance: (id: string) => void;
  deleteNote: (id: string) => void;
}

const IndividualNote = ({
  note,
  toggleImportance,
  deleteNote,
}: NoteProps) => {
  const label = note.important ? 'make not important' : 'make important';

  const handleDeleteClick = () => {
    handleDelete(note.id);
  };

  return (
    <li>
      {note.content}
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      <button onClick={handleDeleteClick}>delete</button>
    </li>
  );
};

export default IndividualNote;
