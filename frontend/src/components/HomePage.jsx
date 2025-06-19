import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getData } from '../data/data.js';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BoardForm from './BoardForm.jsx';
import BoardPage from './BoardPage.jsx';
import './Homepage.css'





function HomePage({ onBoardAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0)
  const [gridBoard, setGridBoard] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCategory] = useState(''); 
  const [filteredBoard, setFilteredBoards] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
        fetch('http://localhost:3000/board')
            .then(response => response.json())
            .then(data => setGridBoard(data))
            .catch(error => console.error('Error fetching boards:', error))
    };
    fetchData();
  }, []);

  useEffect(() => { // for searching
    let searchBoard = gridBoard; 
    if (searchQuery) {
      searchBoard = searchBoard.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if(currentCategory === "recent"){
       searchBoard = searchBoard.sort((a, b) => 
        new Date(b.creation_date) - new Date(a.creation_date));
    } else if(currentCategory) {
      console.log("Category: ", currentCategory); 
      searchBoard = searchBoard.filter((board) => 
        board.category.toLowerCase().includes(currentCategory)
      )
    } else {
      searchBoard = searchBoard.sort((a, b) => 
        new Date(b.creation_date) - new Date(a.creation_date));
    }
    setFilteredBoards(searchBoard);
    // console.log("useEffect: ", filteredBoard)
  }, [searchQuery, gridBoard, currentCategory]);

  console.log(gridBoard); 


  const handlelOnDelete = (id) => {
    fetch(`http://localhost:3000/board/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the board.')
      }
      setBoard(boards.filter(board => board.id !== id))
      onBoardAdded();
    })
    .catch(error => {
      console.error('Error:', error)
      setError('Failed to delete board. Please try again later.')
    });
  };


  function handleCategoryButton(currentCategory) {
    setCategory(currentCategory); 
    // console.log(currentCategory); 
  }

  const handleClearButton = () => {
    setSearchQuery(""); 
  }

  const currentBoards = () => {
    return filteredBoard.map((board, idx) => (
                <div className='boardOverview'>
                    <div className='boardImage'>
                        IMAGE
                    </div>
                    <div className='boardTitle'>
                        {board.title}
                    </div>
                    <div className='boardSubtitle'>
                        {board.category}
                    </div>
                    <div className='boardButtons'>
                        {/* <button className='viewBoardBtn'> */}
                    <Link
                    to={`/${board.id}`}
                    className="button-common view-board"
                    >
                    View Board
                    </Link>
                        {/* </button> */}
                         <button onClick={() => handlelOnDelete(board.id)}>
                        Delete board
                        </button>
                    </div>
                </div>
            ))
  }


  const handleCreateSuccess = () => {
    // fetchBoards();
    setIsOpen(false);
  };

  return (
    <div className='HomePage'>
      <Header/>
      <main>
        <input 
          className="searchVar" 
          type="text" 
          placeholder='Search for movies' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(); // Trigger search on Enter key
          console.log("searchQ: ", searchQuery); 
          }} 
          style={{ width: '135px' }}
        />
        <button type="submit" value="Search">Search</button>
        <button type="submit" value="Search" onClick={handleClearButton}>Clear</button>
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
        {/* <BoardGrid gridBoard={gridBoard}>

        </BoardGrid> */}
      </main>
      <Footer/>
    </div>
  )
}

export default HomePage;
