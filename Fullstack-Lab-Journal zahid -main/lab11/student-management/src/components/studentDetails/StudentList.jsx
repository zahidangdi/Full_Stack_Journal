import { useRef, useState } from "react";
import StudentCard from "./StudentCard";

function Studentlist(props) {
    const [count, setCount] = useState(0);
    let count1 = 0;
    const count3 = useRef(0);
    const renderStudentlist = [];
    const studentList = [
        { "name": "Sample Student 1", "class": "Sample Class", "rollno": "DEMO-01" },
        { "name": "Sample Student 2", "class": "Sample Class", "rollno": "DEMO-02" }
    ];
    for (let i = 0; i <= studentList.length - 1; i++) {
        renderStudentlist.push(
            <StudentCard key={i} studentList={studentList[i]} numberOfStudent={23}></StudentCard>
        );
    }

    return (
        <>
            <table border="1" style={{ margin: "16px auto", borderCollapse: "collapse", width: "80%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Roll No</th>
                    </tr>
                </thead>
                <tbody>
                    {renderStudentlist}
                </tbody>
            </table>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
                <button onClick={() => setCount(count + 1)}>State Count: {count}</button>
                <button onClick={() => { count1++; console.log("count1:", count1); }}>Var Count: {count1}</button>
                <button onClick={() => { count3.current++; console.log("count3 (ref):", count3.current); }}>Ref Count: {count3.current}</button>
            </div>
        </>
    )

    // return (
    //     <table>
    //         <th>
    //             <tr>
    //                 <td>Name</td>
    //                 <td>Class</td>
    //                 <td>Rollno</td>
    //             </tr>
    //             <StudentCard name={studentList[0].name} class={studentList[0].class} rollno={studentList[0].rollno}></StudentCard>
    //             <StudentCard name={studentList[1].name} class={studentList[1].class} rollno={studentList[1].rollno}></StudentCard>
    //         </th>
    //     </table>
    // );
}

export default Studentlist;