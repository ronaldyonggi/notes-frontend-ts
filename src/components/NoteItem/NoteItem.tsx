import { Note } from '../../types/note';

interface NoteItemProps {
  note: Note;
  toggleImportance: (id: string) => void;
  deleteNote: (id: string) => void;
}

const NoteItem = ({
  note,
  toggleImportance,
  deleteNote,
}: NoteItemProps) => {
  const label = note.important ? 'make not important' : 'make important';

  const handleDelete = () => {
    deleteNote(note.id);
  };

  return (
    <li className='note'>
      {note.content}
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

export default NoteItem;
