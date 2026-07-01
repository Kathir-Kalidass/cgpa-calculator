import { Award, BookOpen, Gauge } from 'lucide-react';
import CGPACard from '../components/dashboard/CGPACard';
import CreditCard from '../components/dashboard/CreditCard';
import RecentCalculation from '../components/dashboard/RecentCalculation';
import StatsCard from '../components/dashboard/StatsCard';
import { useApp } from '../context/AppContext';
import Calculator from './Calculator';

export default function Home() {
  const { cgpa, history, settings } = useApp();

  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h1>Welcome, Kathir!</h1>
          <p>Calculate, analyze, and export a professional CGPA report.</p>
        </div>
      </div>
      <section className="stats-grid">
        <CreditCard value={cgpa.overall.totalCredits} hint="/ 160" />
        <CGPACard value={cgpa.overall.cgpa.toFixed(2)} hint={`Till Semester ${settings.semester}`} />
        <StatsCard icon={Award} label="Highest GPA" value={cgpa.overall.highestGPA.toFixed(2)} hint="Best semester" />
        <StatsCard icon={Gauge} label="Average GPA" value={cgpa.overall.averageGPA.toFixed(2)} hint="All semesters" />
      </section>
      <Calculator embedded />
      <section className="feature-grid">
        <StatsCard icon={BookOpen} label="Subject Database" value="CSE + IT" hint="Regulation-ready JSON data" />
        <RecentCalculation history={history} />
      </section>
    </main>
  );
}
