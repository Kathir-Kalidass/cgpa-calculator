import { useMemo } from 'react';
import { calculateOverall, calculateSemester } from '../services/calculator';

export function useCGPA({ selectedSemesters, currentSubjects, grades, defaultGrade }) {
  return useMemo(() => {
    const semester = calculateSemester(currentSubjects, grades, defaultGrade);
    const overall = calculateOverall(selectedSemesters, grades, defaultGrade);
    return { semester, overall };
  }, [currentSubjects, defaultGrade, grades, selectedSemesters]);
}
