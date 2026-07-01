import { formatFormula } from '../../utils/cgpaFormula';

export default function CalculationFormula({ totalPoints, totalCredits }) {
  return (
    <section className="formula-box">
      <h3>GPA Formula</h3>
      <p>CGPA = &Sigma;(Credits × Grade Points) / &Sigma;(Credits)</p>
      <strong>{formatFormula(totalPoints, totalCredits)}</strong>
    </section>
  );
}
