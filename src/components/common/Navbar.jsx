import { Moon, Plus, Sun } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { LOGOS } from '../../utils/constants';
import Button from './Button';

export default function Navbar() {
  const { settings, updateSetting, saveCalculation } = useApp();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src={LOGOS.app} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">CGPA Calculator</span>
      </div>
      <div className="select-row">
        <label>
          <span>Department</span>
          <select value={settings.department} onChange={(e) => updateSetting('department', e.target.value)}>
            <option value="cse">Computer Science Engineering</option>
            <option value="it">Information Technology</option>
          </select>
        </label>
        <label>
          <span>Regulation</span>
          <select value={settings.regulation} onChange={(e) => updateSetting('regulation', e.target.value)}>
            <option value="2023">2023</option>
            <option value="2026">2026</option>
          </select>
        </label>
      </div>
      <div className="nav-actions">
        <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">{isDark ? <Sun size={18} /> : <Moon size={18} />}</Button>
        <Button onClick={saveCalculation}><Plus size={16} /> Save</Button>
      </div>
    </header>
  );
}
