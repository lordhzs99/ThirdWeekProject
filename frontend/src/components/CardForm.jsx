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

        const gifData = response.data.data;
        const gifUrls = gifData.map((gif) => gif.images.original.url);
        setGifOptions(gifUrls);
        } catch (error) {
        console.error("Error searching for GIFs:", error);
        }
    };

    const createNewCard = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/board/${id}/card`, {
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
        setCard(prev => ({
            ...prev,
            gif: gifUrl
        }));
        console.log("GIF: ", gif)
    };


    const handleCopyGifUrl = () => {
        setGif(selectedGifUrl);
    };

    const handleChange = (e) => {
        const { name, value } = e.target

        setCard(prevState => ({
        ...prevState,
        [name]: value
        }))
    }

    return (
         <div className='overlayModalCard'>
            <div className='formCard'>
                <button onClick={close}>close</button>
                <h3>Create a new card</h3>
                <label>Title</label>
                <input type="text" name="title" value={card.title} onChange={handleChange}></input>
                <label>description</label>
                <input type="text" name="description" value={card.description} onChange={handleChange}></input>
                <input
                    type="text"
                    placeholder="Search GIFs..."
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
                            // onClick={(e) => {setSelectedGifUrl(e.target.value); setGif(e.target.value); setGifOptions([]);}}
                            />
                        </div>
                        ))}
                    </div>
                    )}
                     <input
                    type="text"
                    placeholder="Enter GIF URL"
                    value={gif}
                    onChange={(e) => setGif(e.target.value)}
                    />
                    <button
                    className="copy-button"
                    type="button"
                    onClick={handleCopyGifUrl}
                    >
                    Copy GIF URL
                    </button>
                <label>Owner</label>
                <input type="text" name="author" value={card.author} onChange={handleChange}></input>
                <button className='submit' onClick={createNewCard}>Create card</button>
            </div>
        </div>
    )
}