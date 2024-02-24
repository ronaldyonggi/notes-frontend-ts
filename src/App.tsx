import { useEffect, useState } from 'react';
import AddNoteForm from './components/AddNoteForm/AddNoteForm';
import { Note } from './types/note';
import noteService from './services/notes';
import IndividualNote from './components/IndividualNote/IndividualNote';
import Notification from './components/Notification/Notification';
import Login from './components/Login/Login';
import { User } from './types/user';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState('');
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState<User | null>(null);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  /**
   * Fetch notes on initial render
   */
  useEffect(() => {
    noteService.getAll().then((res) => setNotes(res.data));
  }, []);

  /**
   * Fetch login details from browser local storage if there's one in the first place.
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    // If login details is found, set user and set token that user's token
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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
      setNotes(notes.concat(res.data))
      notificationHelper(
        `Successfully added note "${content}"`,
        false
      )
      return true // Indicates that submission is successful and input field may be reset
    } catch (error) {
      notificationHelper(
        error.response.data.error,
        true
      )
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
      notificationHelper(
        'Deleted!',
        false
      )
      setNotes(notes.filter(n => n.id !== id))
    } catch(error) {
      console.error(error)
    }
  };

  const handleLogout = () => {
    noteService.setToken(null);
    setUser(null);
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification} isError={isError} />
      { user ? 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <AddNoteForm addNote={addNote} />
        </div>
      : 
        <Login notificationHelper={notificationHelper} setUser={setUser} />
      }
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
    </div>
  );
};
export default App;
