import Card from '../common/Card';

export default function RecentCalculation({ history }) {
  return (
    <Card>
      <h3>Recent Calculations</h3>
      <div className="history-list compact">
        {history.length ? history.slice(0, 4).map((item) => (
          <div key={item.id}>
            <strong>Semester {item.settings.semester}</strong>
            <span>GPA {item.gpa.toFixed(2)} | CGPA {item.cgpa.toFixed(2)}</span>
          </div>
        )) : <p>No saved calculations yet.</p>}
      </div>
    </Card>
  );
}
