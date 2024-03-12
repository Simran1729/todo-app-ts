import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import TodoList from './Components/TodoList';
import Signup from './Components/Signup';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todos' element={<TodoList />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
