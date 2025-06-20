import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './ThemeToggle.css'; 

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="theme-toggle-container">
      <button
        className="theme-toggle-btn"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </div>
  );
}