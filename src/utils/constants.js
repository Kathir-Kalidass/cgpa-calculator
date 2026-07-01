const BASE = import.meta.env.BASE_URL || '/';

export const APP_NAME = 'CGPA Calculator';
export const STORAGE_KEYS = {
  settings: 'cgpa_calculator_settings',
  grades: 'cgpa_calculator_data',
  customizations: 'cgpa_calculator_customizations',
  history: 'cgpa_calculator_history',
  student: 'cgpa_calculator_student',
  theme: 'darkMode',
};

export const LOGOS = {
  app: `${BASE}logo.png`,
  annaUniversity: `${BASE}anna-university-logo.jpg`,
  report: `${BASE}report-logo.png`,
};

export const DEFAULT_STUDENT = {
  name: 'Student Name',
  registerNumber: '123456789012',
  batch: '2023 Batch',
};

export const DEFAULT_SETTINGS = {
  department: 'cse',
  regulation: '2023',
};
