import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getData } from '../data/data.js';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BoardForm from './BoardForm.jsx';
import BoardPage from './BoardPage.jsx';
import './HomePage.css'


function HomePage({ onBoardAdded }) {
  const [isOpen, setIsOpen] = useState(false);
//   const [count, setCount] = useState(0)
  const [gridBoard, setGridBoard] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCategory] = useState(''); 
  const [filteredBoard, setFilteredBoards] = useState([]);
  const navigate = useNavigate();
  


    useEffect(() => {
    const fetchData = async () => {
        fetch(`${import.meta.env.VITE_URL}/board`)
        .then(response => response.json())
        .then(data => {
            const boardsWithImages = data.map(board => ({
            ...board,
            randomImage: Math.floor(Math.random() * 1000)
            }));
            setGridBoard(boardsWithImages);
            // currentBoards();
        })
        .catch(error => console.error('Error fetching boards:', error))
    };
    fetchData();
    }, []);
    // console.log("currgrid: ", gridBoard)


    useEffect(() => {
    let searchBoard = gridBoard; 
    if (searchQuery) {
        searchBoard = searchBoard.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    } else if(currentCategory === "recent"){
        searchBoard = searchBoard.sort((a, b) => 
        new Date(b.creation_date) - new Date(a.creation_date));
    } else if(currentCategory && currentCategory !== "all") {
        searchBoard = searchBoard.filter((board) => 
        board.category.toLowerCase().includes(currentCategory)
        );
    } else {
        searchBoard = searchBoard.sort((a, b) => 
        new Date(b.creation_date) - new Date(a.creation_date));
    }
    setFilteredBoards(searchBoard);
    }, [searchQuery, gridBoard, currentCategory]);



    const handlelOnDelete = (id) => {
    fetch(`${import.meta.env.VITE_URL}/board/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to delete the board.')
        }
        setGridBoard(prevBoards => prevBoards.filter(board => board.id !== id));
        
    })
    .catch(error => {
        console.error('Error:', error)
    });
    };


    function handleCategoryButton(category) {

    if (category === 'all') {
        // console.log("ALL")
        setCategory('all');
    } else {
        setCategory(category);
    }
    }

    const handleClearButton = () => {
        setSearchQuery(""); 
    }


  const currentBoards = () => {

  const boardsToShow = currentCategory === 'all' ? filteredBoard : filteredBoard.slice(0, 6);
  return boardsToShow.map((board, idx) => {
    const imgUrl = `https://picsum.photos/200/300?random=${board.randomImage}`;
    return (
      <div className='boardOverview' key={board.id}>
        <div className='boardImage'>                        
          <img src={imgUrl} alt="GIF" />
        </div>
        <h3 className='boardTitle'>
          {board.title}
        </h3>
        <div className='boardSubtitle'>
          {board.category}
        </div>
        <div className='boardButtons'>
          <Link
            to={`/${board.id}`}
            className="button-common view-board"
          >
            View Board
          </Link>
          <button onClick={() => handlelOnDelete(board.id)}>
            Delete board
          </button>
        </div>
      </div>
    );
  });
};


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
          placeholder='Search for boards' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(); 
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
      </main>
      <Footer/>
    </div>
  )
}

export default HomePage;
