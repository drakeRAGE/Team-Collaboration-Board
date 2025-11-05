import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';

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