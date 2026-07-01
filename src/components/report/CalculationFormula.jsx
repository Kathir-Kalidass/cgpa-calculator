import { formatFormula } from '../../utils/cgpaFormula';

export default function CalculationFormula({ totalPoints, totalCredits }) {
  return (
    <section className="formula-box">
      <h3>GPA Calculation Formula</h3>
      <p>CGPA = Total Points Earned / Total Credits Earned</p>
      <strong>{formatFormula(totalPoints, totalCredits)}</strong>
    </section>
  );
}
