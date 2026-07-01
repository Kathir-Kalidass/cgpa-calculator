import { LOGOS } from '../../utils/constants';

export default function ReportHeader({ meta }) {
  return (
    <header className="report-header">
      <img src={LOGOS.annaUniversity} alt="Anna University logo" />
      <div>
        <h2>College of Engineering Guindy</h2>
        <p>Anna University, Chennai - 600025</p>
        <h1>{meta.title}</h1>
      </div>
      <img src={LOGOS.report} alt="CGPA Calculator app logo" />
    </header>
  );
}
