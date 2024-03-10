import { SyntheticEvent, useState } from "react"
import loginService from "../../services/login";
import noteService from "../../services/notes";
import { User } from "../../types/user";

interface LoginProps {
  notificationHelper: (message: string, isItError: boolean) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login = ({ notificationHelper, setUser } : LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({
        username, password
      });
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(loginUser)
      );
      noteService.setToken(loginUser.token);
      setUser(loginUser);
      setUsername('')
      setPassword('')
    } catch (error) {
      notificationHelper(
        'Wrong credentials',
        true
      );
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          password
          <input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login