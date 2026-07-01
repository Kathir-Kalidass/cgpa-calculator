import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import GradeSelector from './GradeSelector';

function SubjectRow({ subject, gradePoint, onGradeChange, onToggleDrop, onNameEdit, isDropped }) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(subject.name);

  function handleBlur() {
    setEditing(false);
    if (editName !== subject.name) {
      onNameEdit(subject.id, editName);
    }
  }

  return (
    <tr className={isDropped ? 'dropped' : ''}>
      <td>{subject.code}</td>
      <td className="subject-name-cell">
        {editing ? (
          <input
            className="name-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            autoFocus
          />
        ) : (
          <span className="subject-name" onClick={() => { setEditName(subject.name); setEditing(true); }} title="Click to edit">
            {subject.name}
          </span>
        )}
      </td>
      <td>{subject.credits}</td>
      <td>
        <GradeSelector
          value={gradePoint}
          onChange={(point) => onGradeChange(subject.id, point)}
          disabled={isDropped}
        />
      </td>
      <td>{isDropped ? '—' : gradePoint}</td>
      <td>{isDropped ? '—' : subject.credits * gradePoint}</td>
      <td>
        <label className="drop-check" title={isDropped ? 'Include subject' : 'Drop subject'}>
          <input
            type="checkbox"
            checked={isDropped}
            onChange={() => onToggleDrop(subject.id)}
          />
          <span>{isDropped ? 'Add' : 'Drop'}</span>
        </label>
      </td>
    </tr>
  );
}

function AddSubjectForm({ onAdd, onCancel }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState(3);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: `add_${Date.now()}`,
      code: code.trim() || 'ELECTIVE',
      name: name.trim(),
      credits: Number(credits),
    });
    setCode('');
    setName('');
    setCredits(3);
  }

  return (
    <tr className="add-subject-row">
      <td>
        <input className="name-input" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
      </td>
      <td>
        <input className="name-input" placeholder="Subject name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      </td>
      <td>
        <input className="name-input credits-input" type="number" min="1" max="12" value={credits} onChange={(e) => setCredits(e.target.value)} />
      </td>
      <td colSpan={3}>
        <span className="add-hint">Set grade below</span>
      </td>
      <td>
        <div className="add-actions">
          <button className="btn-icon add-btn" onClick={handleSubmit} title="Add subject"><Plus size={14} /></button>
          <button className="btn-icon cancel-btn" onClick={onCancel} title="Cancel"><X size={14} /></button>
        </div>
      </td>
    </tr>
  );
}

function CreditSummarySmall({ totalCredits, totalPoints, gpa, semesterIndex }) {
  return (
    <div className="semester-stats">
      <span><strong>{totalCredits}</strong> Credits</span>
      <span><strong>{totalPoints.toFixed(1)}</strong> Points</span>
      <span className="gpa-badge">GPA: <strong>{gpa.toFixed(2)}</strong></span>
    </div>
  );
}

export default function SemesterBlock({
  semester,
  semesterIndex,
  grades,
  customizations,
  onGradeChange,
  onToggleDrop,
  onNameEdit,
  onAddSubject,
  onRemoveAdded,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const custom = customizations?.[semesterIndex] || {};
  const dropped = new Set(custom.dropped || []);
  const names = custom.customNames || {};
  const added = custom.added || [];

  const baseSubjects = semester.courses.map((s) => ({
    ...s,
    name: names[s.id] || s.name,
    isDropped: dropped.has(s.id),
  }));

  const allSubjects = [
    ...baseSubjects,
    ...added.map((a) => ({ ...a, isDropped: false })),
  ];

  const activeSubjects = allSubjects.filter((s) => !s.isDropped);
  const totalCredits = activeSubjects.reduce((sum, s) => sum + s.credits, 0);
  const gradeEntries = allSubjects.map((s) => {
    const gp = s.isDropped ? 0 : Number(grades?.[s.id] ?? 10);
    return { gp, credits: s.credits, dropped: s.isDropped };
  });
  const totalPoints = gradeEntries.reduce((sum, e) => sum + (e.dropped ? 0 : e.gp * e.credits), 0);
  const gpa = totalCredits ? totalPoints / totalCredits : 0;

  return (
    <div className={`semester-block ${isOpen ? 'open' : ''}`}>
      <button className="semester-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="semester-title">
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <h3>{semester.name}</h3>
        </div>
        <CreditSummarySmall totalCredits={totalCredits} totalPoints={totalPoints} gpa={gpa} semesterIndex={semesterIndex} />
      </button>
      {isOpen && (
        <div className="semester-body">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>Point</th>
                  <th>Earned</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allSubjects.map((subject) => {
                  const gp = grades?.[subject.id] ?? 10;
                  return (
                    <SubjectRow
                      key={subject.id}
                      subject={subject}
                      gradePoint={subject.isDropped ? 0 : gp}
                      onGradeChange={onGradeChange}
                      onToggleDrop={onToggleDrop}
                      onNameEdit={onNameEdit}
                      isDropped={subject.isDropped}
                    />
                  );
                })}
                {showAddForm && (
                  <AddSubjectForm
                    onAdd={(sub) => { onAddSubject(sub); setShowAddForm(false); }}
                    onCancel={() => setShowAddForm(false)}
                  />
                )}
              </tbody>
            </table>
          </div>
          <button className="btn btn-ghost add-subject-btn" onClick={() => setShowAddForm(true)}>
            <Plus size={14} /> Add Subject
          </button>
        </div>
      )}
    </div>
  );
}
