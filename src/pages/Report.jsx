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
          <h1>Exportable Report</h1>
          <p>Preview the professional PDF report before exporting.</p>
        </div>
        <ExportButton targetRef={reportRef} filename="cgpa-calculation-report.pdf" />
      </div>
      <ReportLayout>
        <ReportPreview reportRef={reportRef} />
      </ReportLayout>
    </main>
  );
}
