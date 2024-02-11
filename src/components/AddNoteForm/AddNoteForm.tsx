import { SyntheticEvent, useState } from 'react';

interface AddNoteFormProps {
  handleAddNewNote: (content: string) => void;
}

const AddNoteForm = ({ handleAddNewNote }: AddNoteFormProps) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (event: SyntheticEvent) => {
    event.preventDefault();
    handleAddNewNote(newNote)
    setNewNote('')
  };

  return (
    <form onSubmit={addNote}>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button type="submit">save note</button>
    </form>
  );
};
export default AddNoteForm;
