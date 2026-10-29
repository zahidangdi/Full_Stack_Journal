import { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./app/features/counterSlice";
import { setStudents, addStudent } from "./app/features/studentSlice";
import fetchStudents from "./app/api/studentapi";
import StudentCard from "./components/StudentCard";

function App() {
  const count = useSelector((state) => state.counter.value);
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    class: "",
    rollno: "",
    division: "",
    batch: ""
  });

  const [statusMessage, setStatusMessage] = useState("");

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      if (Array.isArray(data)) {
        dispatch(setStudents(data));
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const save = (e) => {
    if (e) e.preventDefault();

    // Create new student object and save directly into Redux state
    const newStudent = {
      id: Date.now(),
      name: formData.name,
      class: formData.class,
      rollno: formData.rollno,
      division: formData.division,
      batch: formData.batch
    };

    dispatch(addStudent(newStudent));
    setStatusMessage("Student added successfully to Redux!");

    setFormData({
      name: "",
      class: "",
      rollno: "",
      division: "",
      batch: ""
    });

    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "24px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>My Redux Application</h2>
        <p>count: {count}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </div>

      <div style={{ marginBottom: "24px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Add Student</h2>
        {statusMessage && (
          <p style={{ color: "green", fontWeight: "bold" }}>{statusMessage}</p>
        )}

        {/* 5-Field Student Form */}
        <form onSubmit={save} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Student Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>Class:</label>
            <input
              type="text"
              name="class"
              placeholder="Enter Class (e.g., 10th, TYBCA)"
              value={formData.class}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>Roll No:</label>
            <input
              type="text"
              name="rollno"
              placeholder="Enter Roll Number"
              value={formData.rollno}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>Division:</label>
            <input
              type="text"
              name="division"
              placeholder="Enter Division (e.g., A, B)"
              value={formData.division}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>Batch:</label>
            <input
              type="text"
              name="batch"
              placeholder="Enter Batch (e.g., 2026, Batch 1)"
              value={formData.batch}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ gridColumn: "span 2", marginTop: "8px" }}>
            <button type="submit">
              Save Student
            </button>
          </div>
        </form>
      </div>

      <h2>Student List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }} border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll No</th>
            <th>Division</th>
            <th>Batch</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <StudentCard
                key={student.id || index}
                name={student.name}
                class={student.class}
                rollno={student.rollno}
                division={student.division}
                batch={student.batch}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "12px", color: "#888" }}>
                No students found. Add one above!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;