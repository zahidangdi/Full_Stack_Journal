function StudentAttendance({ present, total }) {
  const percentage = Math.round((present / total) * 100)

  return (
    <div className="attendance-box">
      <div className="attendance-header">
        <strong>Attendance</strong>
        <span>{percentage}%</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  ) 
}

export default StudentAttendance
