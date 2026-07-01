import { useCallback, useEffect, useState } from 'react';
import { loadJson, saveJson } from '../services/storage';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => loadJson(key, initialValue));

  useEffect(() => {
    saveJson(key, value);
  }, [key, value]);

  return [value, setValue];
}

export function useGradesStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = loadJson(key, null);
    if (raw && typeof raw === 'object' && !raw['2023'] && !raw['2026']) {
      const migrated = { '2023': { '0': raw } };
      saveJson(key, migrated);
      return migrated;
    }
    return raw || initialValue;
  });

  const updateGrade = useCallback((regulation, semesterIndex, subjectId, point) => {
    setValue((current) => {
      const next = { ...current };
      if (!next[regulation]) next[regulation] = {};
      if (!next[regulation][semesterIndex]) next[regulation][semesterIndex] = {};
      if (point == null) {
        delete next[regulation][semesterIndex][subjectId];
      } else {
        next[regulation][semesterIndex] = {
          ...next[regulation][semesterIndex],
          [subjectId]: Number(point),
        };
      }
      return next;
    });
  }, []);

  useEffect(() => {
    saveJson(key, value);
  }, [key, value]);

  return [value, setValue, updateGrade];
}
