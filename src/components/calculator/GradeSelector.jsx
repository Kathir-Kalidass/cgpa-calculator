import { gradeOptions } from '../../utils/gradePoint';

export default function GradeSelector({ value, onChange, disabled }) {
  return (
    <select className="grade-select" value={Number(value)} onChange={(e) => onChange(Number(e.target.value))} disabled={disabled}>
      {gradeOptions.map((grade) => <option key={grade.label} value={grade.point}>{grade.label}</option>)}
    </select>
  );
}
