import { ArrowUp } from 'lucide-react';
import GradeLegend from '../components/calculator/GradeLegend';
import SemesterBlock from '../components/calculator/SemesterBlock';
import { useApp } from '../context/AppContext';

export default function Calculator({ embedded = false }) {
  const {
    settings, subjects, semesterGrades, semesterCustomizations,
    updateSemesterGrade, toggleDropSubject, toggleSemesterExclude, editSubjectName, addSubject, removeAddedSubject, cgpa,
  } = useApp();

  const { overall } = cgpa;

  return (
    <main className={embedded ? '' : 'page'}>
      {!embedded && (
        <div className="page-title">
          <div>
            <h1>CGPA Calculator</h1>
            <p>Enter grades for each semester. CGPA updates automatically.</p>
          </div>
        </div>
      )}
      <div className="cgpa-banner">
        <div className="cgpa-banner-main">
          <span className="cgpa-label">Overall CGPA</span>
          <span className="cgpa-value">{overall.cgpa.toFixed(2)}</span>
        </div>
        <div className="cgpa-banner-stats">
          <span>Total Credits: <strong>{overall.totalCredits}</strong></span>
          <span>Total Points: <strong>{overall.totalPoints.toFixed(1)}</strong></span>
          <span>Highest GPA: <strong>{overall.highestGPA.toFixed(2)}</strong></span>
          <span>Avg GPA: <strong>{overall.averageGPA.toFixed(2)}</strong></span>
        </div>
      </div>
      <div className="semesters-list">
        {subjects.semesters.map((sem) => (
          <SemesterBlock
            key={sem.semesterIndex}
            semester={sem}
            semesterIndex={sem.semesterIndex}
            grades={semesterGrades}
            customizations={semesterCustomizations}
            onGradeChange={(subjectId, point) => updateSemesterGrade(sem.semesterIndex, subjectId, point)}
            onToggleDrop={(subjectId) => toggleDropSubject(sem.semesterIndex, subjectId)}
            onToggleExclude={toggleSemesterExclude}
            onNameEdit={(subjectId, name) => editSubjectName(sem.semesterIndex, subjectId, name)}
            onAddSubject={(subject) => addSubject(sem.semesterIndex, subject)}
            onRemoveAdded={(subjectId) => removeAddedSubject(sem.semesterIndex, subjectId)}
          />
        ))}
      </div>
      {subjects.semesters.length > 0 && (
        <p className="gpa-formula-display">
          CGPA = {overall.totalPoints.toFixed(1)} / {overall.totalCredits} = {overall.cgpa.toFixed(2)}
        </p>
      )}
      {!embedded && <GradeLegend />}
    </main>
  );
}
