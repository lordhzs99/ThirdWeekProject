import "./BoardPage.css"
import CardForm from "./CardForm";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";

export default function BoardPage(){
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false); 
    const [gridCard, setGridCard] = useState([]); 



    useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
        fetch(`http://localhost:3000/board/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title)
                // setGridCard(data)
                // console.log(data.card)
            })
            .catch(error => console.error('Error fetching posts:', error))
    };
    fetchData();
    }, []);


    useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
        fetch(`http://localhost:3000/board/${id}/card`)
            .then(response => response.json())
            .then(data => {
                setGridCard(data)
                console.log("datafromboard", data)
            })
            .catch(error => console.error('Error fetching posts:', error))
    };
    fetchData();
    }, []);


  const handleCreateSuccess = (newCard) => {
    console.log("id: ", newCard.card_id)
    if (newCard) {
      setGridCard([...gridCard, newCard]);
      setIsOpen(false);
    } else {
      console.error("Invalid card data received:", newCard);
    }
  };


  const currentCards = () => {
    return gridCard.map((card, idx) => (
            <div className='cardOverview'>
                <div className='cardImage'>
                    IMAGE
                </div>
                <div className='cardTitle'>
                    {card.title}
                </div>
                <div className='cardDescription'>
                    {card.description}
                </div>
                <div className='boardAuthor'>
                    {card.author}
                </div>
                <div className='cardButtons'>
                    {/* <button className='viewBoardBtn'> */}
                <Link
                to={`/${card.id}`}
                className="button-common view-board"
                >
                View Board
                </Link>
                    {/* </button> */}
                        {/* <button onClick={() => handlelOnDelete(card.id)}>
                    Delete board
                    </button> */}
                </div>
            </div>
        ))
    }


    // console.log(id); 
    return(
        <div className="boardPage">
            <Header/>
            <Link to="/">
                <span className="back-arrow"></span>
            </Link>
            <main>
            <div>
                {title}
            </div>
            <button onClick={() => setIsOpen(true)}>Create new card</button>
                <CardForm 
                            onSuccess={handleCreateSuccess}
                            open={isOpen}
                            close={() => setIsOpen(false)}
                            id={id}
                            //  onBoardAdded={onBoardAdded}
                />
            <div className="gridOfCards">
                {currentCards()}
            </div>
            </main>
            <Footer/>
        </div>
    )
}