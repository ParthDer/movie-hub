'use client';
import useDarkMode from '../hooks/useDarkMode';

export default function DarkModeToggle() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <button
      onClick={typeof toggleDark === 'function' ? toggleDark : undefined}
      className="p-2 border rounded text-sm"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}