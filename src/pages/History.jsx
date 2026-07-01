import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

export default function History() {
  const { history, clearAll } = useApp();

  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h1>Calculation History</h1>
          <p>Recent semester GPA and overall CGPA snapshots.</p>
        </div>
        <Button variant="danger" onClick={clearAll}>Clear History</Button>
      </div>
      <Card>
        <div className="history-list">
          {history.length ? history.map((item) => (
            <div key={item.id}>
              <strong>{item.settings.department.toUpperCase()} Regulation {item.settings.regulation}</strong>
              <span>Semester {item.settings.semester} | GPA {item.gpa.toFixed(2)} | CGPA {item.cgpa.toFixed(2)} | Credits {item.totalCredits}</span>
            </div>
          )) : <p>No history yet. Click New Calculation after entering grades.</p>}
        </div>
      </Card>
    </main>
  );
}
