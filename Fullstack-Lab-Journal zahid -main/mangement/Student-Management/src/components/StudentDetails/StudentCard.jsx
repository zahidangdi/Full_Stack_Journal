import { useState } from 'react'

function StudentCard({ student, themeWord }) {
  const [count, setCount] = useState(0)
  const [hiddenCount, setHiddenCount] = useState(0)
  const [note, setNote] = useState('')
  const [savedNote, setSavedNote] = useState(null)

  const handleVisibleClick = () => {
    setCount(count + 1)
  }

  const handleHiddenClick = () => {
    const newValue = hiddenCount + 1
    setHiddenCount(newValue)
    console.log('Hidden count:', newValue)
  }

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    setSavedNote(note)
  }

  return (
    <article
      className="student-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Class:</strong> {student.className}</p>
      <p><strong>Roll No:</strong> {student.rollNo}</p>
      <p aria-live="polite">Selected: {themeWord}</p>
      <p><strong>Subject:</strong> {student.subject}</p>

      <form className="student-note-form" onSubmit={handleNoteSubmit}>
        <input
          className="student-note-input"
          type="text"
          aria-label={`Note for ${student.name}`}
          placeholder="Enter text"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <button type="submit">OK</button>
      </form>
      {savedNote !== null && <p aria-live="polite">Saved: {savedNote}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <button onClick={handleVisibleClick} style={{ width: '90px', padding: '4px 8px', fontSize: '12px' }}>
          Count: {count}
        </button>
        <button onClick={handleHiddenClick} style={{ width: '60px', padding: '4px 8px', fontSize: '12px' }}>
          0
        </button>
      </div>
    </article>
  )
}

export default StudentCard
