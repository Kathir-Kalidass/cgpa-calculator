export function calculateSemester(subjects, grades, defaultGrade = 10) {
  const rows = subjects.map((subject) => {
    const gradePoint = Number(grades[subject.id] ?? defaultGrade);
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

export function calculateOverall(semesters, grades, defaultGrade = 10) {
  const semesterResults = semesters.map((semester, semesterIndex) => {
    const subjects = semester.courses.map((course, courseIndex) => ({
      ...course,
      id: `s${semesterIndex}c${courseIndex}`,
      semesterName: semester.name,
    }));
    return { ...calculateSemester(subjects, grades, defaultGrade), name: semester.name, semester: semesterIndex + 1 };
  });
  const totalCredits = semesterResults.reduce((sum, result) => sum + result.totalCredits, 0);
  const totalPoints = semesterResults.reduce((sum, result) => sum + result.totalPoints, 0);
  const gpas = semesterResults.map((result) => result.gpa);
  return {
    semesterResults,
    totalCredits,
    totalPoints,
    cgpa: totalCredits ? totalPoints / totalCredits : 0,
    highestGPA: gpas.length ? Math.max(...gpas) : 0,
    averageGPA: gpas.length ? gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length : 0,
  };
}
