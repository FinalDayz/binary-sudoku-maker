import SudokuBlock from "./sudoku-block";
import SudokuRow from "./sudoku-row";
import './sudoku.css';

function SudokuDisplay(props) {
    let rows = [];

    for (let y = 0; y < props.height; y++) {
        rows.push(
            <SudokuRow key={y}>
                {renderRow(props, y)}
            </SudokuRow>
        );
    }

    return <div>{rows}</div>;
}

SudokuDisplay.defaultProps = {
    width: 6,
    height: 6,
    isSmall: false,
};

function renderRow(props, y) {
    let blocks = [];
    const sudoku = props.sudoku;

    function clickEdit(index) {
        if(!props.onEdit) return;
        const valuesMap = {
            '?': '0',
            '0': '1',
            '1': '?',
        };
        const oldValue = sudoku[index];
        const newValue = valuesMap[oldValue];
        const newSudoku = sudoku.substr(0, index) + newValue + sudoku.substr(index + 1);

        props.onEdit(newSudoku)
    }

    for (let x = 0; x < 6; x++) {
        const index = y * props.width + x;
        const value = sudoku.toString()[index];

        blocks.push(
            <div className='sudoku-block-wrapper' key={x}>
                <SudokuBlock
                    small={props.small}
                    value={value}
                    onclick={() => {
                        clickEdit(index)
                    }}
                    onhover={() => {
                    }}
                ></SudokuBlock>
            </div>
        );
    }

    return blocks;
}

export default SudokuDisplay;
