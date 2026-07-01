export function formatFormula(totalPoints, totalCredits, label = 'CGPA') {
  if (!totalCredits) return `${label}: No credits selected`;
  return `${label} = ${totalPoints.toFixed(2)} / ${totalCredits} = ${(totalPoints / totalCredits).toFixed(2)}`;
}
