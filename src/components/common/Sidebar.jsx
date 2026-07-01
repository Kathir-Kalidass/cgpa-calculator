import { BarChart3, BookOpen, Calculator, FileText, GraduationCap, History, LayoutDashboard, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../utils/constants';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calculator', label: 'Semester Calculator', icon: Calculator },
  { to: '/report', label: 'Reports', icon: FileText },
  { to: '/history', label: 'Calculation History', icon: History },
  { to: '/about', label: 'Subject List', icon: BookOpen },
  { to: '/about', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { cgpa, settings, student } = useApp();

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={LOGOS.app} alt="CGPA Calculator logo" />
        <div>
          <strong>CGPA Calculator</strong>
          <span>CSE & IT Department</span>
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
        <span>Current CGPA</span>
        <strong>{cgpa.overall.cgpa.toFixed(2)}</strong>
        <small>Till Semester {settings.semester}</small>
        <BarChart3 size={48} />
      </div>
      <div className="profile-card">
        <GraduationCap size={28} />
        <div>
          <strong>{student.name}</strong>
          <span>{settings.department.toUpperCase()} - {student.batch}</span>
        </div>
      </div>
    </aside>
  );
}
