import { useContext, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import ThemeContext from './components/Context/themecontext'
import Contacts from './Pages/contacts'
import Home from './Pages/home'
import StudentPage from './Pages/Student'

const students = [
  { id: 1, name: 'Sample Student 1', className: 'TYBCA', rollNo: 'DEMO-01', subject: 'Full Stack Development' },
  { id: 2, name: 'Sample Student 2', className: 'TYBCA', rollNo: 'DEMO-02', subject: 'Full Stack Development' },
]

function App() {
  const { theme } = useContext(ThemeContext)
  const [themeWord, setThemeWord] = useState('Light')

  return (
    <main className="app-container" data-theme={theme}>
      <header className="page-header">
        <div className="page-heading">
          <h1>College management system</h1>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setThemeWord((word) => word === 'Light' ? 'Dark' : 'Light')}
          >
            {themeWord}
          </button>
        </div>
        <nav aria-label="Main navigation">
          <Link to="/home">Home</Link>{' '}
          <Link to="/contact">Contact</Link>{' '}
          <Link to="/student">Student</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/student" element={<StudentPage students={students} themeWord={themeWord} />} />
        <Route path="/students" element={<StudentPage students={students} themeWord={themeWord} />} />
      </Routes>
    </main>
  )
}

export default App
//student id can be link to studentpage and based on that we can show the student details in studentpage.