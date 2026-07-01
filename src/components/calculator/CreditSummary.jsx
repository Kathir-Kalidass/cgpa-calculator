export default function CreditSummary({ totalCredits, totalPoints, gpa }) {
  return (
    <div className="credit-summary">
      <div><span>Total Credits</span><strong>{totalCredits}</strong></div>
      <div><span>Total Points</span><strong>{totalPoints.toFixed(1)}</strong></div>
      <div><span>GPA</span><strong>{gpa.toFixed(2)}</strong></div>
    </div>
  );
}
