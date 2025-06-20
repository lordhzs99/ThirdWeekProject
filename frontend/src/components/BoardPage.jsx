import "./BoardPage.css"
import Card from "./Card";
import CardForm from "./CardForm";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { HiArrowCircleLeft } from "react-icons/hi";


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
}, [id]);


const handlelOnDelete = (card_id) => {
  fetch(`http://localhost:3000/board/${id}/card/${card_id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete the card.')
    }
    setGridCard(prevCards => prevCards.filter(card => card.card_id !== card_id));
  })
  .catch(error => {
    console.error('Error:', error)
  });
};


  const handleCreateSuccess = (newCard) => {
    // console.log("id: ", newCard.card_id)
    if (newCard) {
      setGridCard([...gridCard, newCard]);
      setIsOpen(false);
    } else {
      console.error("Invalid card data received:", newCard);
    }
  };


  const currentCards = () => {
    return gridCard.map((card, idx) => (
            <Card
                key={card.card_id}
                cardId={card.card_id}
                title={card.title}
                description={card.description}
                author={card.author}
                gif={card.gif}
                onDelete={() => handlelOnDelete(card.card_id)}
                votes={card.votes}
                boardId={card.board_id}
            />
        ))
    }


    // console.log(id); 
    return(
        <div className="boardPage">
            <Header/>
            <Link to="/">
                <HiArrowCircleLeft style={{ fontSize: '2rem', color: '#01959d', marginLeft: '25px', width: '3vw', height: '3vw', display: "block"}}/>
            </Link>
            <main>
            <h1>
                {title}
            </h1>
            <div className="createCard">
            <button onClick={() => setIsOpen(true)}>Create new card</button>
                <CardForm 
                            onSuccess={handleCreateSuccess}
                            open={isOpen}
                            close={() => setIsOpen(false)}
                            id={id}
                            //  onBoardAdded={onBoardAdded}
                />
            </div>

            <div className="gridOfCards">
                {currentCards()}
            </div>
            </main>
            <Footer/>
        </div>
    )
}