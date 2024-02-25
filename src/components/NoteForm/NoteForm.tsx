import { SyntheticEvent, useState } from 'react';

interface AddNoteFormProps {
  addNote: (content: string) => Promise<boolean>;
}

const AddNoteForm = ({ addNote }: AddNoteFormProps) => {
  const [newNote, setNewNote] = useState('');

  const handleAdd = async (event: SyntheticEvent) => {
    event.preventDefault();
    const submitSuccessful = await addNote(newNote)
    if (submitSuccessful) {
      setNewNote('')
    }
  };

  return (
    <form onSubmit={handleAdd}>
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
