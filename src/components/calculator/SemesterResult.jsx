import Card from '../common/Card';
import CreditSummary from './CreditSummary';

export default function SemesterResult({ semester, result }) {
  return (
    <Card>
      <h3>{semester.name} Result</h3>
      <CreditSummary totalCredits={result.totalCredits} totalPoints={result.totalPoints} gpa={result.gpa} />
    </Card>
  );
}
