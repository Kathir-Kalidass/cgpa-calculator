import { createContext, useContext, useMemo, useState } from 'react';
import { useCGPA } from '../hooks/useCGPA';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSubjects } from '../hooks/useSubjects';
import { removeStorage } from '../services/storage';
import { DEFAULT_SETTINGS, DEFAULT_STUDENT, STORAGE_KEYS } from '../utils/constants';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  const [grades, setGrades] = useLocalStorage(STORAGE_KEYS.grades, {});
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, []);
  const [student, setStudent] = useState(DEFAULT_STUDENT);
  const subjects = useSubjects(settings);
  const cgpa = useCGPA({ ...subjects, grades, defaultGrade: 10 });

  function updateSetting(name, value) {
    setSettings((current) => ({ ...current, [name]: value }));
  }

  function updateGrade(id, point) {
    setGrades((current) => ({ ...current, [id]: Number(point) }));
  }

  function saveCalculation() {
    const item = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      settings,
      cgpa: cgpa.overall.cgpa,
      gpa: cgpa.semester.gpa,
      totalCredits: cgpa.overall.totalCredits,
    };
    setHistory((current) => [item, ...current].slice(0, 20));
  }

  function clearAll() {
    removeStorage(STORAGE_KEYS.grades);
    removeStorage(STORAGE_KEYS.history);
    setGrades({});
    setHistory([]);
  }

  const value = useMemo(() => ({
    settings,
    grades,
    history,
    student,
    subjects,
    cgpa,
    setStudent,
    updateSetting,
    updateGrade,
    saveCalculation,
    clearAll,
  }), [cgpa, grades, history, settings, student, subjects]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
