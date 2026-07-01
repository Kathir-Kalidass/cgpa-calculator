import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { buildReportMeta } from '../../services/reportGenerator';
import CalculationFormula from './CalculationFormula';
import OverallSummary from './OverallSummary';
import ReportHeader from './ReportHeader';
import SemesterTable from './SemesterTable';

export default function ReportPreview({ reportRef }) {
  const { settings, student, subjects, semesterGrades, semesterCustomizations, cgpa } = useApp();
  const meta = useMemo(() => buildReportMeta({ settings, student }), [settings, student]);

  const allSemesterRows = cgpa.overall.semesterResults.map((result) => {
    const custom = semesterCustomizations?.[result.semesterIndex] || {};
    const names = custom.customNames || {};
    const rows = result.rows.map((r) => ({
      ...r,
      name: names[r.id] || r.name,
    }));
    return { ...result, rows };
  });

  return (
    <article className="report-page" ref={reportRef}>
      <ReportHeader meta={meta} />
      <section className="report-meta">
        <p><span>Name</span><strong>{student.name}</strong></p>
        <p><span>Register No.</span><strong>{student.registerNumber}</strong></p>
        <p><span>Department</span><strong>{meta.department}</strong></p>
        <p><span>Regulation</span><strong>{meta.regulation}</strong></p>
        <p><span>Generated</span><strong>{meta.generatedAt}</strong></p>
      </section>
      {allSemesterRows.map((sem) => (
        <section key={sem.semesterIndex} className="report-semester">
          <h3>{sem.name}  |  GPA: <span className="sem-gpa">{sem.gpa.toFixed(2)}</span></h3>
          <SemesterTable rows={sem.rows} />
          <div className="report-semester-summary">
            <span>Credits: <strong>{sem.totalCredits}</strong></span>
            <span>Points: <strong>{sem.totalPoints.toFixed(1)}</strong></span>
          </div>
        </section>
      ))}
      <OverallSummary overall={cgpa.overall} />
      <CalculationFormula totalPoints={cgpa.overall.totalPoints} totalCredits={cgpa.overall.totalCredits} />
      <footer className="report-footer">
        <span>Prepared by CGPA Calculator App</span>
        <span>Signature</span>
      </footer>
    </article>
  );
}
