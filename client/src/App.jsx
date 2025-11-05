import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';

function App() {

  return (
    <div id="app" className='app'>
      <Router>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path='*' element={ <div>404 Not Found</div> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App


// We need a boardlist sidebar - toggle between boards
// We need a main detail dashboard page - show tasks grouped by status
// We need to create task modal
// Edit and Delete Task functionality
// Create Board functionality
// Edit and Delete Board functionality

// Routes needed:

// router.get('/boards', getAllBoards);
// router.post('/boards', addNewBoard);
// router.get('/boards/:id/tasks', getTasksByBoardId);
// router.post('/boards/:id/tasks', addTaskToBoard);
// router.put('/boards/:id/tasks/:taskId', updateTaskById);
// router.delete('/boards/:id/tasks/:taskId', deleteTaskById);
