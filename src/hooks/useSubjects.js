import cse2023 from '../data/regulations/regulation2023/cse.json';
import it2023 from '../data/regulations/regulation2023/it.json';
import cse2026 from '../data/regulations/regulation2026/cse.json';
import it2026 from '../data/regulations/regulation2026/it.json';

const regulations = {
  '2023': { cse: cse2023, it: it2023 },
  '2026': { cse: cse2026, it: it2026 },
};

export function useSubjects(settings) {
  const regulation = regulations[settings.regulation] || regulations['2023'];
  const data = regulation[settings.department] || regulation.cse;
  const semesters = (data.semesters || []).map((sem, sIdx) => ({
    ...sem,
    semesterIndex: sIdx,
    courses: sem.courses.map((course, cIdx) => ({
      ...course,
      id: `s${sIdx}c${cIdx}`,
    })),
  }));

  return { data, semesters };
}
