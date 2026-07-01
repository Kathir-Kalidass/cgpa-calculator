import { useMemo } from 'react';
import { calculateOverall, calculateSemester } from '../services/calculator';

export function useCGPA({ semesters, semesterGrades, semesterCustomizations, defaultGrade }) {
  return useMemo(() => {
    const semesterResults = semesters.map((sem) => {
      const custom = semesterCustomizations?.[sem.semesterIndex] || {};
      const grades = semesterGrades?.[sem.semesterIndex] || {};
      const dropped = new Set(custom.dropped || []);
      const names = custom.customNames || {};
      const added = custom.added || [];

      const baseSubjects = sem.courses.map((s) => ({
        ...s,
        name: names[s.id] || s.name,
        dropped: dropped.has(s.id),
      }));

      const allSubjects = [
        ...baseSubjects,
        ...added.map((a) => ({ ...a, dropped: false })),
      ];

      const result = calculateSemester(allSubjects, grades, defaultGrade);
      return { ...result, name: sem.name, semesterIndex: sem.semesterIndex };
    });

    const overall = calculateOverall(semesterResults);
    return { semesterResults, overall };
  }, [semesters, semesterGrades, semesterCustomizations, defaultGrade]);
}
