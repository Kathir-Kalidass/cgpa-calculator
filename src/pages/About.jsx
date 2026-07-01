import GradeLegend from '../components/calculator/GradeLegend';
import Card from '../components/common/Card';
import { useApp } from '../context/AppContext';

export default function About() {
  const { subjects } = useApp();

  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h1>Subject List</h1>
          <p>All subjects loaded for your department and regulation.</p>
        </div>
      </div>
      <Card>
        {subjects.semesters.map((semester) => (
          <details key={semester.name} style={{ marginBottom: 8 }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', padding: '8px 0' }}>{semester.name}</summary>
            <ul className="subject-list">
              {semester.courses.map((course) => (
                <li key={course.code}>
                  <strong>{course.code}</strong> {course.name} — {course.credits} credits
                </li>
              ))}
            </ul>
          </details>
        ))}
        {subjects.semesters.length === 0 && <p>No subjects found for this selection.</p>}
      </Card>
      <GradeLegend />
    </main>
  );
}
