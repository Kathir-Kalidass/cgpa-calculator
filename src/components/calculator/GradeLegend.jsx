import { gradeOptions } from '../../utils/gradePoint';
import Card from '../common/Card';

export default function GradeLegend() {
  return (
    <Card>
      <h3>Grade Point Scale</h3>
      <div className="grade-legend">
        {gradeOptions.map((grade) => <span key={grade.label}>{grade.label}</span>)}
      </div>
    </Card>
  );
}
