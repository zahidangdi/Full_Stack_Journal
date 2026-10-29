const initialStudents = [
  { id: 1, name: "Aarav Sharma", class: "TYBCA", rollno: "101", division: "A", batch: "2026" },
  { id: 2, name: "Diya Patel", class: "TYBCA", rollno: "102", division: "B", batch: "2026" },
  { id: 3, name: "Rohan Gupta", class: "SYBCA", rollno: "201", division: "A", batch: "2025" }
];

const fetchStudents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialStudents);
    }, 100);
  });
};

export { fetchStudents };
export default fetchStudents;