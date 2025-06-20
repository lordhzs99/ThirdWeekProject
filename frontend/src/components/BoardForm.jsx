import './BoardForm.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function BoardForm({ onBoardAdded, open, close }){
    if (!open) return null;
   
    const [formData, setFormData] = useState({
        title: '', 
        category: '', 
        creator: '',
    });


    const createNewBoard = (e) => {
    e.preventDefault()
      if(formData.title === '' || (formData.category === '' || formData.category === 'Select...')){ 
        alert("Please fill out the required fields");
        return
      }
    fetch(`${import.meta.env.VITE_URL}/board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to add board.')
    })
    .then(data => {
      console.log('Success:', data)
      onBoardAdded();
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

    return (
        <div className='overlayModal'>
            <div className='form'>
                <button onClick={close}>Close</button>
                <h3>Create a new board</h3>
                <label>Title (required)</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required></input>
                <label>Category (required)</label>
                <select value={formData.category} name="category" onChange={handleChange} required>
                    <option>Select...</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="thank you">Thank you</option>
                    <option value="celebration">Celebration</option>
                </select>
                <label>Creator (optional)</label>
                <input type="text" name="creator" value={formData.creator} onChange={handleChange}></input>
                <button className='submit' onClick={createNewBoard}>Create board</button>

            </div>
        </div>
    )
}