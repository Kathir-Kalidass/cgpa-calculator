import { GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { student, setStudent, settings, updateSetting } = useApp();

  function update(field, value) {
    setStudent((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h1>Student Profile</h1>
          <p>Edit your personal and academic details</p>
        </div>
      </div>

      <div className="card">
        <div className="card-heading">
          <h2><GraduationCap size={20} /> Personal Details</h2>
        </div>
        <div className="profile-form">
          <label>
            <span>Full Name</span>
            <input value={student.name} onChange={(e) => update('name', e.target.value)} placeholder="Enter your name" />
          </label>
          <label>
            <span>Register Number</span>
            <input value={student.registerNumber} onChange={(e) => update('registerNumber', e.target.value)} placeholder="e.g. 123456789012" />
          </label>
          <label>
            <span>Batch</span>
            <input value={student.batch} onChange={(e) => update('batch', e.target.value)} placeholder="e.g. 2023 Batch" />
          </label>
        </div>
      </div>

      <div className="card">
        <div className="card-heading">
          <h2>Academic Settings</h2>
        </div>
        <div className="profile-form">
          <label>
            <span>Department</span>
            <select value={settings.department} onChange={(e) => updateSetting('department', e.target.value)}>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
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
      </div>
    </main>
  );
}
