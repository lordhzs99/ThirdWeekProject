import Board from './board.jsx'
import './BoardGrid.css'

export default function BoardGrid(props) {
    return(
        props.gridBoard && props.gridBoard.length > 0 && 
          <div className="gridOfBoards">
            {props.gridBoard.map((board, idx) => (
              <Board key={idx} board={board}/>
            ))}
          </div>
    )
}