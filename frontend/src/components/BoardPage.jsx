import "./BoardPage.css"
import Card from "./Card";
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
}, [id]);


    
// const handlelOnDelete = (card_id) => {
//     console.log("cardddd: ", card_id)
//   fetch(`http://localhost:3000/board/${id}/card/${card_id}`, {
//     method: 'DELETE',
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to delete the board.')
//     }
//     setGridCard(prevCards => prevCards.filter(card => card.id !== card_id));
//   })
//   .catch(error => {
//     console.error('Error:', error)
//     // setError('Failed to delete board. Please try again later.')
//   });
// };

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