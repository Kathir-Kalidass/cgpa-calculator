import grades from '../data/grades.json';

export const gradeOptions = grades;

export const gradeLetterMap = {
  S: 10,
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  U: 0,
  RA: 0,
  SA: 0,
  WC: 0,
};

export function getGradeLabel(point) {
  return gradeOptions.find((grade) => grade.point === Number(point))?.label ?? `Grade ${point}`;
}
