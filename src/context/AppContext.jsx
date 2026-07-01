import { createContext, useContext, useMemo, useState } from 'react';
import { useCGPA } from '../hooks/useCGPA';
import { useGradesStorage, useLocalStorage } from '../hooks/useLocalStorage';
import { useSubjects } from '../hooks/useSubjects';
import { removeStorage } from '../services/storage';
import { DEFAULT_SETTINGS, DEFAULT_STUDENT, STORAGE_KEYS } from '../utils/constants';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  const [semesterGrades, setSemesterGrades, updateGrade] = useGradesStorage(STORAGE_KEYS.grades, {});
  const [semesterCustomizations, setSemesterCustomizations] = useLocalStorage(STORAGE_KEYS.customizations, {});
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, []);
  const [student, setStudent] = useState(DEFAULT_STUDENT);

  const subjects = useSubjects(settings);

  const regulationGrades = semesterGrades[settings.regulation] || {};
  const regulationCustoms = semesterCustomizations[settings.regulation] || {};

  const cgpa = useCGPA({
    semesters: subjects.semesters,
    semesterGrades: regulationGrades,
    semesterCustomizations: regulationCustoms,
    defaultGrade: 10,
  });

  function updateSetting(name, value) {
    setSettings((current) => ({ ...current, [name]: value }));
  }

  function updateSemesterGrade(semesterIndex, subjectId, point) {
    updateGrade(settings.regulation, String(semesterIndex), subjectId, point);
  }

  function updateCustomization(semesterIndex, updater) {
    setSemesterCustomizations((current) => {
      const next = { ...current };
      if (!next[settings.regulation]) next[settings.regulation] = {};
      if (!next[settings.regulation][semesterIndex]) next[settings.regulation][semesterIndex] = {};
      next[settings.regulation][semesterIndex] = updater(next[settings.regulation][semesterIndex]);
      return next;
    });
  }

  function toggleDropSubject(semesterIndex, subjectId) {
    updateCustomization(semesterIndex, (custom) => {
      const dropped = custom.dropped || [];
      return {
        ...custom,
        dropped: dropped.includes(subjectId)
          ? dropped.filter((id) => id !== subjectId)
          : [...dropped, subjectId],
      };
    });
  }

  function editSubjectName(semesterIndex, subjectId, name) {
    updateCustomization(semesterIndex, (custom) => ({
      ...custom,
      customNames: { ...(custom.customNames || {}), [subjectId]: name },
    }));
  }

  function addSubject(semesterIndex, subject) {
    updateCustomization(semesterIndex, (custom) => ({
      ...custom,
      added: [...(custom.added || []), subject],
    }));
  }

  function removeAddedSubject(semesterIndex, subjectId) {
    updateCustomization(semesterIndex, (custom) => ({
      ...custom,
      added: (custom.added || []).filter((s) => s.id !== subjectId),
      dropped: (custom.dropped || []).filter((id) => id !== subjectId),
    }));
    updateGrade(settings.regulation, String(semesterIndex), subjectId, null);
  }

  function saveCalculation() {
    const item = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      settings,
      cgpa: cgpa.overall.cgpa,
      gpa: cgpa.overall.averageGPA,
      totalCredits: cgpa.overall.totalCredits,
    };
    setHistory((current) => [item, ...current].slice(0, 50));
  }

  function clearAll() {
    removeStorage(STORAGE_KEYS.grades);
    removeStorage(STORAGE_KEYS.history);
    removeStorage(STORAGE_KEYS.customizations);
    setSemesterGrades({});
    setHistory([]);
    setSemesterCustomizations({});
  }

  const value = useMemo(() => ({
    settings,
    semesterGrades: regulationGrades,
    semesterCustomizations: regulationCustoms,
    history,
    student,
    subjects,
    cgpa,
    setStudent,
    updateSetting,
    updateSemesterGrade,
    toggleDropSubject,
    editSubjectName,
    addSubject,
    removeAddedSubject,
    saveCalculation,
    clearAll,
  }), [cgpa, history, regulationGrades, regulationCustoms, settings, student, subjects]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
