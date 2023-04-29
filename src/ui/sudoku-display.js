import SudokuBlock from "./sudoku-block";
import SudokuRow from "./sudoku-row";
import './sudoku.css';
import { getMinimalVariations } from "../logic/variations"
import { hover } from "@testing-library/user-event/dist/hover";
import { useState, useEffect } from "react";

function SudokuDisplay(props) {
    let rows = [];
    const hasHoverSolution = !!props.hoverSolution;
    let [shownSudoku, setShownSudoku] = useState(props.sudoku);

    if (!hasHoverSolution) {
        shownSudoku = props.sudoku;
    }

    function enter() {
        if (hasHoverSolution) {
            setShownSudoku(props.hoverSolution)
        }
    }

    function exit() {
        if (hasHoverSolution) {
            setShownSudoku(props.sudoku)
        }
    }

    for (let y = 0; y < props.height; y++) {
        rows.push(
            <SudokuRow key={y}>
                {renderRow(props, shownSudoku, y)}
            </SudokuRow>
        );
    }

    return <div
        onMouseEnter={() => enter()}
        onMouseLeave={() => exit()}
    >{rows}</div>;
}

SudokuDisplay.defaultProps = {
    width: 6,
    height: 6,
    isSmall: false,
};

function renderRow(props, sudoku, y) {
    let blocks = [];

    function clickEdit(index) {
        if (!props.onEdit) return;
        const valuesMap = props.valuesMap;
        const oldValue = sudoku[index];
        const newValue = valuesMap[oldValue];
        const newSudoku = sudoku.substr(0, index) + newValue + sudoku.substr(index + 1);

        props.onEdit(newSudoku)
    }

    for (let x = 0; x < 6; x++) {
        const index = y * props.width + x;
        const value = sudoku.toString()[index];

        const posibities = props.posibilityMatrix ? props.posibilityMatrix[index] : undefined;

        blocks.push(
            <div className='sudoku-block-wrapper' key={x}>
                <SudokuBlock
                    posibities={posibities}
                    small={props.small}
                    value={value}
                    onclick={() => {
                        clickEdit(index)
                    }}
                ></SudokuBlock>
            </div>
        );
    }

    return blocks;
}

export default SudokuDisplay;
