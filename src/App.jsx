import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { gradeLetterMap, gradeOptions, syllabusData } from './data.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const storageKey = 'cgpa_calculator_data';
const settingsKey = 'cgpa_calculator_settings';
const defaultSettings = { department: 'cse', numSemesters: 4, defaultGrade: 10, inputMode: 'dropdown', rowDensity: 'comfy' };

function loadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function App() {
  const [settings, setSettings] = useState(() => ({ ...defaultSettings, ...loadJson(settingsKey, {}) }));
  const [grades, setGrades] = useState(() => loadJson(storageKey, {}));
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('darkMode') === 'true');
  const fileInputRef = useRef(null);
  const chartCanvasRef = useRef(null);
  const chartRef = useRef(null);

  const syllabus = syllabusData[settings.department] || syllabusData.cse;
  const semesters = useMemo(() => syllabus.slice(0, settings.numSemesters), [settings.numSemesters, syllabus]);

  const visibleSemesters = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return semesters.map((semester, semesterIndex) => ({
      ...semester,
      courses: semester.courses
        .map((course, courseIndex) => ({ ...course, id: `s${semesterIndex}c${courseIndex}` }))
        .filter((course) => !query || course.name.toLowerCase().includes(query) || course.code.toLowerCase().includes(query)),
    }));
  }, [searchTerm, semesters]);

  const results = useMemo(() => calculateResults(visibleSemesters, grades, settings.defaultGrade, settings.numSemesters, syllabus), [
    grades,
    settings.defaultGrade,
    settings.numSemesters,
    syllabus,
    visibleSemesters,
  ]);

  useEffect(() => saveJson(settingsKey, settings), [settings]);
  useEffect(() => saveJson(storageKey, grades), [grades]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  useEffect(() => {
    if (!chartCanvasRef.current) return undefined;
    if (chartRef.current) chartRef.current.destroy();

    const textColor = isDark ? '#ecf0f1' : '#2c3e50';
    const gridColor = isDark ? 'rgba(236, 240, 241, 0.2)' : 'rgba(0,0,0,0.1)';
    chartRef.current = new ChartJS(chartCanvasRef.current, {
      type: 'line',
      data: {
        labels: results.semesterResults.map((semester) => semester.name),
        datasets: [{
          label: 'Semester GPA',
          data: results.semesterResults.map((semester) => Number(semester.gpa.toFixed(2))),
          borderColor: isDark ? '#74b9ff' : '#3498db',
          backgroundColor: isDark ? 'rgba(116, 185, 255, 0.12)' : 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'top', labels: { color: textColor } } },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { beginAtZero: true, max: 10, ticks: { color: textColor }, grid: { color: gridColor } },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [isDark, results.semesterResults]);

  function updateSetting(name, value) {
    setSettings((current) => ({ ...current, [name]: value }));
  }

  function setGrade(id, point) {
    setGrades((current) => ({ ...current, [id]: point }));
  }

  function gradeFor(id) {
    return grades[id] ?? settings.defaultGrade;
  }

  function fillAllGrades(point) {
    const next = { ...grades };
    visibleSemesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        next[course.id] = point;
      });
    });
    setGrades(next);
  }

  function copyFromPreviousSemester() {
    if (settings.numSemesters < 2) {
      alert('Need at least 2 semesters to copy from previous.');
      return;
    }
    const previous = syllabus[settings.numSemesters - 2];
    const current = syllabus[settings.numSemesters - 1];
    const next = { ...grades };
    const limit = Math.min(previous.courses.length, current.courses.length);
    for (let i = 0; i < limit; i += 1) {
      next[`s${settings.numSemesters - 1}c${i}`] = next[`s${settings.numSemesters - 2}c${i}`] ?? settings.defaultGrade;
    }
    setGrades(next);
  }

  function quickPasteGrades() {
    const semesterIndex = settings.numSemesters - 1;
    const semesterName = syllabus[semesterIndex]?.name || `Semester ${semesterIndex + 1}`;
    const input = window.prompt(`Paste grades for ${semesterName}\nExamples: S A+ A B+ B C or 10,9,8,7,6,5`, '');
    if (!input?.trim()) return;

    const parsed = input.trim().split(/[\s,]+/).flatMap((token) => {
      const key = token.toUpperCase();
      if (/^\d+(\.\d+)?$/.test(key)) {
        const point = Math.round(Number.parseFloat(key));
        return [0, 5, 6, 7, 8, 9, 10].includes(point) ? [point] : [];
      }
      return gradeLetterMap[key] !== undefined ? [gradeLetterMap[key]] : [];
    });

    if (parsed.length === 0) {
      alert('No valid grades found. Use S, A+, A, B+, B, C, U/RA/SA/WC or 10..0.');
      return;
    }

    const next = { ...grades };
    const limit = Math.min(syllabus[semesterIndex]?.courses.length || 0, parsed.length);
    for (let i = 0; i < limit; i += 1) next[`s${semesterIndex}c${i}`] = parsed[i];
    setGrades(next);
    alert(`Applied ${limit} grades to ${semesterName}.${Math.max(0, parsed.length - limit) ? ' Ignored extra item(s).' : ''}`);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ grades, settings, exportDate: new Date().toISOString(), version: '3.0' }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cgpa_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (imported.grades) setGrades(imported.grades);
      if (imported.settings) setSettings((current) => ({ ...current, ...imported.settings }));
      alert('Data imported successfully!');
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to import data. Please check the file format.');
    } finally {
      event.target.value = '';
    }
  }

  function clearAllData() {
    if (!confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) return;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(settingsKey);
    setGrades({});
    setSettings(defaultSettings);
    alert('All data has been cleared.');
  }

  function handleGradeKeyDown(event, id) {
    const shortcuts = { 0: 0, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 1: 10 };
    if (shortcuts[event.key] === undefined) return;
    event.preventDefault();
    setGrade(id, shortcuts[event.key]);
  }

  return (
    <main className={`container ${settings.rowDensity === 'compact' ? 'density-compact' : ''}`}>
      <h1>Anna University CGPA Calculator</h1>
      <p className="subtitle">Calculate your CGPA for CSE and IT departments with persistent data storage</p>

      <section className="controls-section">
        <div className="control-group">
          <label htmlFor="department">Department:</label>
          <select id="department" value={settings.department} onChange={(event) => updateSetting('department', event.target.value)}>
            <option value="cse">Computer Science Engineering (CSE)</option>
            <option value="it">Information Technology (IT)</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="numSem">Number of semesters:</label>
          <select id="numSem" value={settings.numSemesters} onChange={(event) => updateSetting('numSemesters', Number(event.target.value))}>
            {Array.from({ length: 8 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} Semester{index ? 's' : ''}</option>)}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="defaultGrade">Default grade:</label>
          <select id="defaultGrade" value={settings.defaultGrade} onChange={(event) => updateSetting('defaultGrade', Number(event.target.value))}>
            {gradeOptions.map((grade) => <option key={grade.label} value={grade.point}>{grade.label}</option>)}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="search">Search Courses:</label>
          <input id="search" type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Enter course name or code" />
        </div>

        <div className="control-group">
          <label htmlFor="inputMode">Input mode:</label>
          <select id="inputMode" value={settings.inputMode} onChange={(event) => updateSetting('inputMode', event.target.value)}>
            <option value="dropdown">Dropdowns</option>
            <option value="chips">Quick grade chips</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="rowDensity">Row density:</label>
          <select id="rowDensity" value={settings.rowDensity} onChange={(event) => updateSetting('rowDensity', event.target.value)}>
            <option value="comfy">Comfy</option>
            <option value="compact">Compact</option>
          </select>
        </div>

        <div className="control-group">
          <button type="button" onClick={exportData}>Export Data</button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>Import Data</button>
          <button type="button" onClick={clearAllData} className="danger-btn">Clear All Data</button>
          <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={importData} hidden />
        </div>

        <div className="control-group">
          <label>Bulk Operations:</label>
          <button type="button" onClick={() => fillAllGrades(10)}>Fill All S</button>
          <button type="button" onClick={() => fillAllGrades(9)}>Fill All A+</button>
          <button type="button" onClick={() => fillAllGrades(8)}>Fill All A</button>
          <button type="button" onClick={() => fillAllGrades(7)}>Fill All B+</button>
          <button type="button" onClick={copyFromPreviousSemester}>Copy Prev Sem</button>
          <button type="button" onClick={quickPasteGrades}>Quick Paste Grades</button>
        </div>

        <div className="control-group">
          <button type="button" onClick={() => setIsDark((value) => !value)}>Toggle Dark Mode</button>
        </div>
      </section>

      <DataStatus gradeCount={Object.keys(grades).length} />

      <section>
        {visibleSemesters.map((semester) => (
          <div className="fade-in" key={semester.name}>
            <h2>{semester.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {semester.courses.map((course) => (
                  <tr key={course.id}>
                    <td><strong>{course.code}</strong></td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <GradeInput
                        id={course.id}
                        mode={settings.inputMode}
                        value={gradeFor(course.id)}
                        onChange={(point) => setGrade(course.id, point)}
                        onKeyDown={(event) => handleGradeKeyDown(event, course.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="results">
        <h3>Semester-wise GPA</h3>
        {results.semesterResults.map((semester) => (
          <span className="semester-gpa" key={semester.name}>{semester.name}: <strong>{semester.gpa.toFixed(2)}</strong></span>
        ))}

        <div className="cgpa-highlight">
          Overall CGPA ({settings.numSemesters} semester{settings.numSemesters > 1 ? 's' : ''}): <strong>{results.cgpa.toFixed(2)}</strong>
        </div>

        <div className="stats-grid">
          <StatCard value={results.cgpa.toFixed(2)} label="Overall CGPA" />
          <StatCard value={results.totalCredits} label="Total Credits" />
          <StatCard value={results.highestGPA.toFixed(2)} label="Highest Semester GPA" />
          <StatCard value={results.lowestGPA.toFixed(2)} label="Lowest Semester GPA" />
        </div>

        <h3>GPA Trend Chart</h3>
        <canvas ref={chartCanvasRef} width="400" height="200" />

        <h3>CGPA Prediction</h3>
        <p>Assuming remaining semesters have the same average GPA as current semesters:</p>
        <div className="cgpa-highlight">
          {results.remainingSemesters > 0 ? (
            <>Predicted Final CGPA: <strong>{results.predictedCGPA.toFixed(2)}</strong><br /><small>Based on {results.remainingSemesters} remaining semesters with avg GPA {results.averageGPA.toFixed(2)}</small></>
          ) : 'All semesters completed!'}
        </div>

        <h3>Detailed Calculations</h3>
        {results.semesterResults.map((semester) => (
          <details key={`${semester.name}-details`}>
            <summary>{semester.name}: GPA <strong>{semester.gpa.toFixed(5)}</strong></summary>
            <div className="details-body">
              {semester.courses.length ? semester.courses.map((course) => (
                <div key={course.id}><strong>{course.code}</strong> - {course.credits} credits x {course.gradePoint} = <strong>{(course.credits * course.gradePoint).toFixed(5)}</strong></div>
              )) : 'No courses included in calculation.'}
              {semester.courses.length ? <div className="formula-line">GPA = ( {semester.formula} ) / {semester.credits} = <strong>{semester.gpa.toFixed(5)}</strong></div> : null}
            </div>
          </details>
        ))}
        <div className="cgpa-highlight">Consolidated: {results.totalCredits ? <>CGPA = ( {results.totalWeightedSum.toFixed(5)} ) / {results.totalCredits} = <strong>{results.cgpa.toFixed(5)}</strong></> : 'CGPA: No data'}</div>
      </section>
    </main>
  );
}

function GradeInput({ id, mode, value, onChange, onKeyDown }) {
  if (mode === 'chips') {
    return (
      <div className="grade-input">
        <div className="grade-chips">
          {gradeOptions.map((grade) => (
            <button
              className={`grade-chip ${value === grade.point ? 'active' : ''}`}
              key={grade.label}
              type="button"
              onClick={() => onChange(grade.point)}
            >
              {grade.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <select className="grade grade-select" data-id={id} value={value} onChange={(event) => onChange(Number(event.target.value))} onKeyDown={onKeyDown}>
      {gradeOptions.map((grade) => <option key={grade.label} value={grade.point}>{grade.label}</option>)}
    </select>
  );
}

function DataStatus({ gradeCount }) {
  if (gradeCount > 0) {
    return (
      <div className="data-status">
        Data saved: {gradeCount} course grades stored locally
        <br /><small>Last updated: {new Date().toLocaleString()}</small>
      </div>
    );
  }
  return <div className="data-status no-data-status">No saved data found. Your grades will be automatically saved as you enter them.</div>;
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function calculateResults(visibleSemesters, grades, defaultGrade, numSemesters, syllabus) {
  let totalWeightedSum = 0;
  let totalCredits = 0;
  const semesterResults = visibleSemesters.map((semester) => {
    const courses = semester.courses.map((course) => ({ ...course, gradePoint: grades[course.id] ?? defaultGrade }));
    const weightedSum = courses.reduce((sum, course) => sum + (course.credits * course.gradePoint), 0);
    const credits = courses.reduce((sum, course) => sum + course.credits, 0);
    totalWeightedSum += weightedSum;
    totalCredits += credits;
    return {
      name: semester.name,
      courses,
      credits,
      weightedSum,
      formula: courses.map((course) => `${course.credits}x${course.gradePoint}`).join(' + '),
      gpa: credits ? weightedSum / credits : 0,
    };
  });

  const cgpa = totalCredits ? totalWeightedSum / totalCredits : 0;
  const gpas = semesterResults.map((semester) => semester.gpa);
  const averageGPA = gpas.length ? gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length : cgpa;
  const remainingSemesters = 8 - numSemesters;
  const remainingCredits = syllabus.slice(numSemesters).reduce((sum, semester) => sum + semester.courses.reduce((innerSum, course) => innerSum + course.credits, 0), 0);
  const predictedCredits = totalCredits + remainingCredits;
  const predictedCGPA = predictedCredits ? (totalWeightedSum + (averageGPA * remainingCredits)) / predictedCredits : cgpa;

  return {
    semesterResults,
    totalWeightedSum,
    totalCredits,
    cgpa,
    averageGPA,
    remainingSemesters,
    predictedCGPA,
    highestGPA: gpas.length ? Math.max(...gpas) : 0,
    lowestGPA: gpas.length ? Math.min(...gpas) : 0,
  };
}

export default App;
