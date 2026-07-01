import Card from '../components/common/Card';
import GradeLegend from '../components/calculator/GradeLegend';
import SemesterResult from '../components/calculator/SemesterResult';
import SubjectTable from '../components/calculator/SubjectTable';
import { useApp } from '../context/AppContext';

export default function Calculator({ embedded = false }) {
  const { settings, subjects, grades, updateGrade, updateSetting, cgpa } = useApp();

  return (
    <main className={embedded ? '' : 'page'}>
      {!embedded ? (
        <div className="page-title">
          <div>
            <h1>Semester Calculator</h1>
            <p>Select semester subjects and enter grades to calculate GPA.</p>
          </div>
        </div>
      ) : null}
      <Card>
        <div className="card-heading">
          <h2>{subjects.currentSemester.name} GPA Calculator</h2>
          <label>
            Semester
            <select value={settings.semester} onChange={(event) => updateSetting('semester', Number(event.target.value))}>
              {subjects.semesters.map((semester, index) => <option key={semester.name} value={index + 1}>Semester {index + 1}</option>)}
            </select>
          </label>
        </div>
        <SubjectTable subjects={subjects.currentSubjects} grades={grades} onGradeChange={updateGrade} />
        <SemesterResult semester={subjects.currentSemester} result={cgpa.semester} />
      </Card>
      {!embedded ? <GradeLegend /> : null}
    </main>
  );
}
