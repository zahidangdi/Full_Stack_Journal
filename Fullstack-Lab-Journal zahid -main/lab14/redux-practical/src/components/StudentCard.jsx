function StudentCard({ name, class: studentClass, rollno, division, batch, student }) {
  const sName = name ?? student?.name ?? '';
  const sClass = studentClass ?? student?.class ?? '';
  const sRollno = rollno ?? student?.rollno ?? '';
  const sDivision = division ?? student?.division ?? '';
  const sBatch = batch ?? student?.batch ?? '';

  return (
    <tr>
      <td>{sName}</td>
      <td>{sClass}</td>
      <td>{sRollno}</td>
      <td>{sDivision}</td>
      <td>{sBatch}</td>
    </tr>
  );
}

export default StudentCard;
