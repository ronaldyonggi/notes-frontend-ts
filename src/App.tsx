import { useEffect, useState } from 'react';
import AddNoteForm from './components/AddNoteForm/AddNoteForm';
import { Note } from './types/note';
import noteService from './services/notes';
import IndividualNote from './components/IndividualNote/IndividualNote';
import Notification from './components/Notification/Notification';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState('');
  const [isError, setIsError] = useState(false)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    noteService.getAll().then((res) => setNotes(res.data));
  }, []);

  /**
   * Helper function to set up notification and automatically resets it
   * 
   * @param message The message to display
   * @param isItError Boolean that indicates whether the notification serves as an error
   */
  const notificationHelper = (message: string, isItError: boolean) => {
    setNotification(message)
    setIsError(isItError)
    setTimeout(() => {
      setNotification('');
    }, 6000);
  }

  const addNote = async (content: string) => {
    const newNoteObject = {
      content,
      important: Math.random() < 0.5
    }

    try {
      const res = await noteService.create(newNoteObject)
      setIsError(false)
      setNotification(`Successfully added note "${content}"`)
      setNotes(notes.concat(res.data))
      setTimeout(() => {
        setNotification('');
      }, 6000);
      return true // Indicates that submission is successful and input field may be reset
    } catch (error) {
      setIsError(true)
      setNotification(`${error.response.data.error}`)
      setTimeout(() => {
        setNotification('');
      }, 6000);
      return false // Indicates that submission is failed. Input field shouldn't be reset
  }}

  const toggleImportance = (id: string): void => {
    // First find the note that matches the id
    const matchedNote = notes.find((note) => note.id === id);
    // Then create the updated note
    if (matchedNote) {
      const updatedNote = {
        ...matchedNote,
        important: !matchedNote.important,
      };

      noteService.update(id, updatedNote).then((res) => {
        setNotes(notes.map((note) => (note.id === id ? res.data : note)));
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await noteService.deleteNote(id)
      setIsError(false)
      setNotification(`Deleted!`)
      setTimeout(() => {
        setNotification('')
      }, 6000);
      setNotes(notes.filter(n => n.id !== id))
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification} isError={isError} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'only important notes' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <IndividualNote
            key={note.id}
            note={note}
            toggleImportance={toggleImportance}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
      <AddNoteForm addNote={addNote} />
    </div>
  );
};
export default App;
