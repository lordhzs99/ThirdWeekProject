import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import BoardPage from './components/BoardPage.jsx';
import BoardForm from './components/BoardForm.jsx';
import './App.css'
function App() {
  const handleBoardAdded = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage onBoardAdded={() => window.location.href = '/'}/>}/>
        {/* <Route path="/board-form" element={<BoardForm />} /> */}
        <Route path="/:id" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;