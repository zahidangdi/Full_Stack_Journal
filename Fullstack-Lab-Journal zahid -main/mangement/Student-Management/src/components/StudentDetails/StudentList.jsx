import StudentCard from './StudentCard'

function StudentList({ students, themeWord }) {
  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          themeWord={themeWord}
        />
      ))}
    </div>
  )
}




export default StudentList


