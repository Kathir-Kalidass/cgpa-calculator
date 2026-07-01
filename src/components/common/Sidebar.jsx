import { BarChart3, BookOpen, Calculator, FileText, GraduationCap, History, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../utils/constants';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calculator', label: 'CGPA Calculator', icon: Calculator },
  { to: '/report', label: 'Reports', icon: FileText },
  { to: '/history', label: 'History', icon: History },
  { to: '/about', label: 'Subjects', icon: BookOpen },
];

export default function Sidebar() {
  const { cgpa, student } = useApp();

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={LOGOS.app} alt="CGPA Calculator logo" />
        <div>
          <strong>CGPA Calculator</strong>
          <span>CSE & IT</span>
        </div>
      </div>
      <nav>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={`${to}-${label}`} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-card">
        <span>Overall CGPA</span>
        <strong>{cgpa.overall.cgpa.toFixed(2)}</strong>
        <small>{cgpa.overall.semesterResults.length} semesters</small>
        <BarChart3 size={48} />
      </div>
      <div className="profile-card">
        <GraduationCap size={28} />
        <div>
          <strong>{student.name}</strong>
          <span>{student.batch}</span>
        </div>
      </div>
    </aside>
  );
}
