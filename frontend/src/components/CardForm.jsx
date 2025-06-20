import { useEffect, useState } from 'react'
import './CardForm.css'
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY;


export default function CardForm({ open, close, id, onSuccess }){ 
    if (!open) return null; 
    const [gifOptions, setGifOptions] = useState([]);
    const [selectedGifUrl, setSelectedGifUrl] = useState("");
    const [gif, setGif] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [card, setCard] = useState({
        title: '', 
        description: '', 
        gif: '', 
        author: '',
        board_id: id
    })


    const searchGifs = async () => {
        try {
        const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
            params: {
            api_key: apiKey,
            q: searchTerm,
            limit: 6,
            },
        });

        const gdata = response.data.data;
        const gurl = gdata.map((gif) => gif.images.original.url);
        setGifOptions(gurl);
        } catch (error) {
        console.error("Error", error);
        }
    };

    const createNewCard = (e) => {
        e.preventDefault()
        
        if(card.gif === '' || (card.title === '' || card.description.category === '')){ 
        alert("Please fill out the required fields");
        return
        }

        fetch(`${import.meta.env.VITE_URL}/board/${id}/card`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...card, 
            board_id: Number(id)
        }),
        })
        .then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error('Failed to add card.')
        })
        .then(data => {
        console.log('Success:', data)
        
        onSuccess(data);
        })
        .catch((error) => {
        console.error('Error:', error)
        })
    }

    const handleSelectGif = (gifUrl) => {
        setSelectedGifUrl(gifUrl);
        setGif(gifUrl);
        setGifOptions([]);
        setCard(before => ({
            ...before,
            gif: gifUrl
        }));
        console.log("GIF: ", gif)
    };


    const handleCopyGifUrl = () => {
        setGif(selectedGifUrl);
        console.log("HERE", selectedGifUrl); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setCard(before => ({
        ...before,
        [name]: value
        }))
    }

    return (
         <div className='overlayModalCard'>
            <div className='formCard'>
                <button onClick={close}>Close</button>
                <h3>Create a new card</h3>
                <label>Title (required)</label>
                <input type="text" name="title" value={card.title} onChange={handleChange} required></input>
                <label>Description (required)</label>
                <input type="text" name="description" value={card.description} onChange={handleChange} required></input>
                <label>Type a gif... (required)</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" type="search" onClick={searchGifs}>
                    Search
                    </button>
                    {gifOptions.length > 0 && (
                    <div className="gif-options">
                        {gifOptions.map((gifUrl) => (
                        <div className="gif-container">
                            <img
                            className="gif"
                            key={gifUrl}
                            src={gifUrl}
                            alt="GIF"
                            onClick={() => handleSelectGif(gifUrl)}
                            />
                        </div>
                        ))}
                    </div>
                    )}
                     <input
                    type="text"
                    value={gif}
                    onChange={(e) => setGif(e.target.value)}
                    />
                    <button
                    className="copy-button"
                    type="button"
                    onClick={handleCopyGifUrl}
                    >
                    Copy URL
                    </button>
                <label>Owner (optional)</label>
                <input type="text" name="author" value={card.author} onChange={handleChange}></input>
                <button className='submit' onClick={createNewCard}>Create card</button>
            </div>
        </div>
    )
}