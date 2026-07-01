import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { buildReportMeta } from '../../services/reportGenerator';
import CalculationFormula from './CalculationFormula';
import OverallSummary from './OverallSummary';
import ReportHeader from './ReportHeader';
import SemesterTable from './SemesterTable';

export default function ReportPreview({ reportRef }) {
  const { settings, student, subjects, cgpa } = useApp();
  const meta = useMemo(() => buildReportMeta({ settings, student }), [settings, student]);

  return (
    <article className="report-page" ref={reportRef}>
      <ReportHeader meta={meta} />
      <section className="report-meta">
        <p><span>Name</span><strong>{student.name}</strong></p>
        <p><span>Register No.</span><strong>{student.registerNumber}</strong></p>
        <p><span>Department</span><strong>{meta.department}</strong></p>
        <p><span>Regulation</span><strong>{meta.regulation}</strong></p>
        <p><span>Semester</span><strong>{settings.semester}</strong></p>
        <p><span>Generated</span><strong>{meta.generatedAt}</strong></p>
      </section>
      <section>
        <h3>{subjects.currentSemester.name} Detailed Calculation</h3>
        <SemesterTable rows={cgpa.semester.rows} />
        <p className="report-gpa">Semester GPA: <strong>{cgpa.semester.gpa.toFixed(2)}</strong></p>
      </section>
      <OverallSummary overall={cgpa.overall} />
      <CalculationFormula totalPoints={cgpa.overall.totalPoints} totalCredits={cgpa.overall.totalCredits} />
      <footer className="report-footer">
        <span>Prepared by CGPA Calculator App</span>
        <span>Signature</span>
      </footer>
    </article>
  );
}
