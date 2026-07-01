export default function OverallSummary({ overall }) {
  return (
    <section className="report-summary">
      <h3>Overall Summary</h3>
      <p><span>Total Credits Earned</span><strong>{overall.totalCredits}</strong></p>
      <p><span>Total Points Earned</span><strong>{overall.totalPoints.toFixed(1)}</strong></p>
      <p><span>Overall CGPA</span><strong>{overall.cgpa.toFixed(2)}</strong></p>
      <p><span>Highest GPA</span><strong>{overall.highestGPA.toFixed(2)}</strong></p>
      <p><span>Average GPA</span><strong>{overall.averageGPA.toFixed(2)}</strong></p>
    </section>
  );
}
