export default function OverallSummary({ overall }) {
  return (
    <section className="report-overall">
      <h3>Overall Summary</h3>
      <div className="report-overall-grid">
        <div className="report-overall-item">
          <span>Total Credits</span>
          <strong>{overall.totalCredits}</strong>
        </div>
        <div className="report-overall-item">
          <span>Total Points</span>
          <strong>{overall.totalPoints.toFixed(1)}</strong>
        </div>
        <div className="report-overall-item">
          <span>Overall CGPA</span>
          <strong>{overall.cgpa.toFixed(2)}</strong>
        </div>
        <div className="report-overall-item">
          <span>Highest GPA</span>
          <strong>{overall.highestGPA.toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
}
