import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BoardGrid from './components/BoardGrid'
import data from './data/data.js'

function App() {
  const [count, setCount] = useState(0)
  const [gridBoard, setGridBoard] = useState(data); 

  console.log(gridBoard); 

  return (
    <div className='App'>
      <header>
          HEADER
      </header>
      <main>
        <BoardGrid gridBoard={gridBoard}>

        </BoardGrid>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
