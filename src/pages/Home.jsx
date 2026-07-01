import { Award, BookOpen, Gauge } from 'lucide-react';
import CGPACard from '../components/dashboard/CGPACard';
import CreditCard from '../components/dashboard/CreditCard';
import RecentCalculation from '../components/dashboard/RecentCalculation';
import StatsCard from '../components/dashboard/StatsCard';
import { useApp } from '../context/AppContext';
import Calculator from './Calculator';

export default function Home() {
  const { cgpa, history, student } = useApp();

  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h1>Welcome, {student.name}!</h1>
          <p>Calculate your CGPA across all semesters and export a professional report.</p>
        </div>
      </div>
      <section className="stats-grid">
        <CGPACard value={cgpa.overall.cgpa.toFixed(2)} hint="Overall CGPA" />
        <CreditCard value={cgpa.overall.totalCredits} hint="Total credits earned" />
        <StatsCard icon={Award} label="Highest GPA" value={cgpa.overall.highestGPA.toFixed(2)} hint="Best semester" />
        <StatsCard icon={Gauge} label="Average GPA" value={cgpa.overall.averageGPA.toFixed(2)} hint="All semesters" />
      </section>
      <Calculator embedded />
      <section className="feature-grid">
        <StatsCard icon={BookOpen} label="Regulation" value={`${cgpa.overall.semesterResults.length} Semesters`} hint="All semesters loaded" />
        <RecentCalculation history={history} />
      </section>
    </main>
  );
}
