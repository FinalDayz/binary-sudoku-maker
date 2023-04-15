import {getRandomFont} from "../logic/font";
import {useState} from "react";

function SudokuBlock(
    {
        small,
        value,
        onclick,
        onhover,
    }
) {
    let blockType = small ? 'sudoku-block-small' : 'sudoku-block-normal';
    let borderPx = small ? '2' : '3';
    let [hasBorder, setBorder] = useState(false);
    let border = hasBorder ?
        borderPx+"px solid blue" : borderPx+'px solid rgba(0,0,0,0)';

    const type = value === '?' ? 'type-question' : 'type-one-or-zero';

    function onMouseLeave(event) {
        setBorder(false);
    }

    function onMouseOver(event) {
        setBorder(true);
        onhover(event);
    }

    return <div
        className={[blockType, 'sudoku-block', type].join(' ')}
        style={{fontFamily: 'Rockwell', border: border}}
        onClick={onclick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
    >{value}</div>
}

export default SudokuBlock;
