import { useState } from 'react'
import './App.css'
import Studentlist from './components/studentDetails/StudentList'
import { ThemeContext } from './components/Context/ThemeContext'
import Home from './components/pages/Home'
import Student from './components/pages/student'
import Contact from './components/pages/contact'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <h1>Student Management</h1>
        <h4>student</h4>
        {/* browser router */}
        <BrowserRouter>
          <nav>

            <Link to="/">Home</Link>
            <Link to="/student">Student</Link>
            <Link to="/contact">Contact</Link>

          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>

        <Studentlist />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
