import { formatDateTime } from '../utils/formatter';

export function buildReportMeta({ settings, student }) {
  return {
    title: 'CGPA Calculation Report',
    student,
    department: settings.department.toUpperCase(),
    regulation: settings.regulation,
    generatedAt: formatDateTime(),
  };
}
