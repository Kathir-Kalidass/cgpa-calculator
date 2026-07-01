export function calculateSemester(subjects, semesterGrades, defaultGrade = 10) {
  const activeSubjects = subjects.filter((s) => !s.dropped);
  const rows = activeSubjects.map((subject) => {
    const gradePoint = Number(semesterGrades?.[subject.id] ?? defaultGrade);
    const pointsEarned = subject.credits * gradePoint;
    return { ...subject, gradePoint, pointsEarned };
  });
  const totalCredits = rows.reduce((sum, row) => sum + row.credits, 0);
  const totalPoints = rows.reduce((sum, row) => sum + row.pointsEarned, 0);
  return {
    rows,
    totalCredits,
    totalPoints,
    gpa: totalCredits ? totalPoints / totalCredits : 0,
  };
}

export function calculateOverall(semesterResults) {
  const totalCredits = semesterResults.reduce((sum, r) => sum + r.totalCredits, 0);
  const totalPoints = semesterResults.reduce((sum, r) => sum + r.totalPoints, 0);
  const gpas = semesterResults.map((r) => r.gpa).filter((g) => g > 0);
  return {
    semesterResults,
    totalCredits,
    totalPoints,
    cgpa: totalCredits ? totalPoints / totalCredits : 0,
    highestGPA: gpas.length ? Math.max(...gpas) : 0,
    averageGPA: gpas.length ? gpas.reduce((sum, g) => sum + g, 0) / gpas.length : 0,
  };
}
