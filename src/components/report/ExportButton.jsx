import { FileDown } from 'lucide-react';
import { useRef } from 'react';
import { exportElementToPdf } from '../../services/pdfGenerator';
import Button from '../common/Button';

export default function ExportButton({ targetRef, filename }) {
  const isExporting = useRef(false);

  async function exportPdf() {
    if (isExporting.current) return;
    isExporting.current = true;
    await exportElementToPdf(targetRef.current, filename);
    isExporting.current = false;
  }

  return <Button onClick={exportPdf}><FileDown size={16} /> Export PDF</Button>;
}
