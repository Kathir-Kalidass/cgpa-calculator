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
          <p>JSON-backed department and regulation data.</p>
        </div>
      </div>
      <Card>
        {subjects.semesters.map((semester) => (
          <details key={semester.name}>
            <summary>{semester.name}</summary>
            <ul className="subject-list">
              {semester.courses.map((course) => <li key={course.code}><strong>{course.code}</strong> {course.name} - {course.credits} credits</li>)}
            </ul>
          </details>
        ))}
      </Card>
      <GradeLegend />
    </main>
  );
}
