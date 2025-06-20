import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BoardForm from './BoardForm.jsx';
import ThemeToggle from './ThemeToggle';
import './HomePage.css'

function HomePage({ onBoardAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gridBoard, setGridBoard] = useState([]); 
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCategory] = useState('all'); 
  const [filteredBoard, setFilteredBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/board`)
      .then(response => response.json())
      .then(data => {
        const boardsWithImages = data.map(board => ({
          ...board,
          randomImage: Math.floor(Math.random() * 1000)
        }));
        setGridBoard(boardsWithImages);
      })
      .catch(error => console.error('Error fetching boards:', error))
  }, []);

  useEffect(() => {
    let boards = [...gridBoard];
    if (currentCategory && currentCategory !== 'all') {
      if (currentCategory === 'recent') {
        boards.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
      } else {
        boards = boards.filter(board =>
          board.category.toLowerCase().includes(currentCategory)
        );
      }
    } else {
      boards.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
    }
    if (searchQuery) {
      boards = boards.filter(board =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBoards(boards);
  }, [searchQuery, gridBoard, currentCategory]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const handleClearButton = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  function handleCategoryButton(category) {
    setCategory(category);
  }

  const currentBoards = () => {
    const boardsToShow = currentCategory === 'all' ? filteredBoard : filteredBoard.slice(0, 6);
    return boardsToShow.map((board) => {
      const imgUrl = `https://picsum.photos/200/300?random=${board.randomImage}`;
      return (
        <div className='boardOverview' key={board.id}>
          <div className='boardImage'>                        
            <img src={imgUrl} alt="GIF" />
          </div>
          <h3 className='boardTitle'>{board.title}</h3>
          <div className='boardSubtitle'>{board.category}</div>
          <div className='boardButtons'>
            <Link to={`/${board.id}`} className="button-common view-board">View Board</Link>
            <button onClick={() => handlelOnDelete(board.id)}>Delete board</button>
          </div>
        </div>
      );
    });
  };

  const handlelOnDelete = (id) => {
    fetch(`${import.meta.env.VITE_URL}/board/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete the board.');
        setGridBoard(prevBoards => prevBoards.filter(board => board.id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCreateSuccess = () => setIsOpen(false);

  return (
    <div className='HomePage'>
      <Header/>
      <ThemeToggle />
      <main>
        <form onSubmit={handleSearch} style={{ display: 'inline-block', marginBottom: '1rem' }}>
          <input 
            className="searchVar" 
            type="text" 
            placeholder='Search for boards' 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(e); }}
            style={{ width: '135px' }}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={handleClearButton}>Clear</button>
        </form>
        <div className='categoryButtons'>
          <button onClick={() => handleCategoryButton('all')}>All</button>
          <button onClick={() => handleCategoryButton('recent')}>Recent</button>
          <button onClick={() => handleCategoryButton('celebration')}>Celebration</button>
          <button onClick={() => handleCategoryButton('thank you')}>Thank you</button>
          <button onClick={() => handleCategoryButton('inspiration')}>Inspiration</button>
        </div>
        <div className='createNewBoardBtn'>
          <button onClick={() => setIsOpen(true)}>Create new board</button>
          <BoardForm 
            onSuccess={handleCreateSuccess}
            open={isOpen}
            close={() => setIsOpen(false)}
            onBoardAdded={onBoardAdded}
          />
        </div>
        <div className='gridOfBoards'>
          {currentBoards()}
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default HomePage;