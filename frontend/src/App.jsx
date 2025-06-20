import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import BoardPage from './components/BoardPage.jsx';
import { ThemeProvider } from './components/ThemeContext.jsx';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage onBoardAdded={() => window.location.href = '/'}/>} />
          <Route path="/:id" element={<BoardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;