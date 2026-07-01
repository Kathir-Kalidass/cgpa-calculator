import { gradeOptions } from '../../utils/gradePoint';

export default function GradeSelector({ value, onChange }) {
  return (
    <select className="grade-select" value={value} onChange={(event) => onChange(Number(event.target.value))}>
      {gradeOptions.map((grade) => <option key={grade.label} value={grade.point}>{grade.label}</option>)}
    </select>
  );
}
