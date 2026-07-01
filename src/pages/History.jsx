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
          <p>Saved CGPA snapshots from your sessions.</p>
        </div>
        <Button variant="danger" onClick={clearAll}>Clear History</Button>
      </div>
      <Card>
        <div className="history-list">
          {history.length ? history.map((item) => (
            <div key={item.id}>
              <strong>{item.settings.department.toUpperCase()} — Reg {item.settings.regulation}</strong>
              <span>
                Avg GPA {item.gpa.toFixed(2)} | CGPA {item.cgpa.toFixed(2)} | Credits {item.totalCredits} | {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          )) : <p>No history yet. Fill in your grades and click Save.</p>}
        </div>
      </Card>
    </main>
  );
}
