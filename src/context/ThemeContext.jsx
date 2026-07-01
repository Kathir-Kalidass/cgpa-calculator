import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem(STORAGE_KEYS.theme, String(isDark));
  }, [isDark]);

  const value = useMemo(() => ({ isDark, toggleTheme: () => setIsDark((current) => !current) }), [isDark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
