import './Card.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Card({ cardId, title, description, author, gif, onDelete, votes, boardId }){
    const [currentVotes, setCurrentVotes] = useState(votes || 0);

    const handleUpvote = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/board/${boardId}/card/${cardId}/votes`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    setCurrentVotes(currentVotes + 1);
  } catch (error) {
    console.error("Error upvoting card:", error);
  }
};

    return (
         <div className='cardOverview'>
            <div className="cardContent">
                <div className='cardTitle'>{title}</div>
                <div className='cardDescription'>{description}</div>
                <div className='cardImage'>
                    <img src={gif} alt="GIF" />
                </div>
                <div className='boardAuthor'>{author}</div>
            </div>
            <div className='cardButtons'>
                <button className='upvote-button' onClick={handleUpvote}>Upvote: {currentVotes}</button>
                <button className="delete-button" onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}