import GradeSelector from './GradeSelector';

export default function SubjectTable({ subjects, grades, onGradeChange }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Grade Point</th>
            <th>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => {
            const gradePoint = grades[subject.id] ?? 10;
            return (
              <tr key={subject.id}>
                <td>{subject.code}</td>
                <td>{subject.name}</td>
                <td>{subject.credits}</td>
                <td><GradeSelector value={gradePoint} onChange={(point) => onGradeChange(subject.id, point)} /></td>
                <td>{gradePoint}</td>
                <td>{subject.credits * gradePoint}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
