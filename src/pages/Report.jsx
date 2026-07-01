import { useRef } from 'react';
import ExportButton from '../components/report/ExportButton';
import ReportPreview from '../components/report/ReportPreview';
import ReportLayout from '../layouts/ReportLayout';

export default function Report() {
  const reportRef = useRef(null);

  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h1>Academic Transcript</h1>
          <p>Full semester-wise report. Export as PDF.</p>
        </div>
        <ExportButton targetRef={reportRef} filename="cgpa-academic-transcript.pdf" />
      </div>
      <ReportLayout>
        <ReportPreview reportRef={reportRef} />
      </ReportLayout>
    </main>
  );
}
