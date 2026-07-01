export default function SemesterTable({ rows }) {
  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Subject Code</th>
          <th>Subject Name</th>
          <th>Credits</th>
          <th>Grade Point</th>
          <th>Points Earned</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>{row.credits}</td>
            <td>{row.gradePoint}</td>
            <td>{row.pointsEarned}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
