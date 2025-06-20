import './Card.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Card({ cardId, title, description, author, gif, onDelete, votes, boardId }){
    const [currentVotes, setCurrentVotes] = useState(votes || 0);

    const handleUpvote = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/board/${boardId}/card/${cardId}/votes`,
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

    // Optionally, get the updated card from the response
    // const updatedCard = await response.json();

    setCurrentVotes(currentVotes + 1);
  } catch (error) {
    console.error("Error upvoting card:", error);
  }
};

    return (
         <div className='cardOverview'>
            <div className='cardImage'>
                IMAGE
            </div>
            <div className='cardTitle'>
                {title}
            </div>
            <div className='cardDescription'>
                {description}
            </div>
            <div className='boardAuthor'>
                {author}
            </div>
            <img src={gif} alt="GIF" />
            <div className='cardButtons'>
                  <button className='upvote-button' onClick={handleUpvote}>Upvote: {currentVotes}</button>

                <button className="delete-button" onClick={onDelete}>
                    Delete
                    </button>
            </div>
        </div>
    )
}