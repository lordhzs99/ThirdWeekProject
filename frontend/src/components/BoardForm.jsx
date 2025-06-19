import './BoardForm.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function BoardForm({ onBoardAdded, open, close }){
    if (!open) return null;
   
    const [board, setBoard] = useState([]); 
    const [formData, setFormData] = useState({
        title: '', 
        category: '', 
        creator: '',
    });


    const createNewBoard = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/board', {
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
                <button onClick={close}>close</button>
                <h3>Create a new form</h3>
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}></input>
                <label>Category</label>
                <select value={formData.category} name="category" onChange={handleChange}>
                    <option>Select...</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="thank you">Thank you</option>
                    <option value="celebration">Celebration</option>
                </select>
                <label>Creator</label>
                <input type="text" name="creator" value={formData.creator} onChange={handleChange}></input>
                <button className='submit' onClick={createNewBoard}>Create board</button>
            </div>
        </div>
    )
}