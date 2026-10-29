import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function StudentCard(props) {
    const name = props.name || props.studentList?.name || '';
    const studentClass = props.class || props.studentList?.class || '';
    const rollno = props.rollno || props.studentList?.rollno || '';

    const { theme } = useContext(ThemeContext);

    const style = {
        backgroundColor: theme === "dark" ? "#333333" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
    };

    return (
        <tr style={style}>
            <td>{name}</td>
            <td>{studentClass}</td>
            <td>{rollno}</td>
        </tr>
    );
}

export default StudentCard;
