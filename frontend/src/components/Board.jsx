import './Board.css'

export default function Board(props) {
    return (
        <div className='boardOverview'>
            <div className='boardImage'>
                IMG
            </div>
            <div className='boardTitle'>
                {props.board.title}
            </div>
            <div className='boardSubtitle'>
                {props.board.subtitle}
            </div>
            <div className='boardButtons'>
                <button className='viewBoardBtn'>
                LEFTBTN
                </button>
                <button className='deleteBoardBtn'>
                RIGHTBTN
                </button>
            </div>
        </div>
    )
}