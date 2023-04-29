import logo from './logo.svg';
import './App.css';
import SudokuDisplay from "./ui/sudoku-display";
import { useState, useEffect } from "react";
import SudokuVariations from "./ui/variations";
import SudokuPossibilities from "./ui/possibilities";

import { getMinimalVariations } from "./logic/variations";

function App() {

    const [isSolver, setIsSolver] = useState(false);

    return (
        <div className="App">
            <h2>mode:
                <input type='button' value='Solver' onClick={() => setIsSolver(true)}></input>
                <input type='button' value='Maker' onClick={() => setIsSolver(false)}></input>
            </h2>
            <div className={"inline " + (isSolver ? 'show' : 'hidden')}>
                <Solver></Solver>
            </div>
            <div className={"inline " + (!isSolver ? 'show' : 'hidden')}>
                <Maker></Maker>
            </div>

        </div>
    );
}

function Solver() {
    const [currentSudoku, setCurrentSudoku] = useState(
        '??????' +
        '??????' +
        '??????' +
        '??????' +
        '??????' +
        '??????');

    function edit(sudoku) {
        setCurrentSudoku(sudoku);
    }

    const valuesMap = {
        '?': '0',
        '0': '1',
        '1': '?',
    };

    return (
        <div className='wrapper'>
            <div className={'main-sudoku'}>
                <button onClick={() => { setCurrentSudoku(''.padStart(36, '?')) }} className='inline'>clear</button>
                <SudokuDisplay
                    valuesMap={valuesMap}
                    onEdit={edit}
                    sudoku={currentSudoku}
                ></SudokuDisplay>
            </div>

            <div className={'variations'}>
                <SudokuPossibilities
                    sudoku={currentSudoku}
                ></SudokuPossibilities>
            </div>
        </div>
    );
}

function Maker() {
    const [posibilityMatrix, setPosibilityMatrix] = useState([]);

    const [currentVariationSudoku, setCurrentVariationSudoku] = useState(
        'x???x?' +
        '??x???' +
        '??x??x' +
        'x?????' +
        'x?x?x?' +
        '??????');

    function edit(sudoku) {
        setCurrentVariationSudoku(sudoku);
    }

    const valuesMap = {
        '?': 'x',
        'x': '?',
    };

    useEffect(() => {
        const start = Date.now();
        for (let i = 0; i < currentVariationSudoku.length; i++) {
            if (currentVariationSudoku[i] === 'x') continue;

            const sudokuToCheck = currentVariationSudoku.substr(0, i) + 'x' + currentVariationSudoku.substr(i + 1);
            const result = getMinimalVariations(sudokuToCheck);
            posibilityMatrix[i] = result;
            setPosibilityMatrix({
                ...posibilityMatrix,
            });
        }
        console.log("that took", Date.now() - start)
    }, [currentVariationSudoku]);


    return (
        <div className='wrapper'>

            <div className={'main-sudoku'}>
                <button onClick={() => { setCurrentVariationSudoku(''.padStart(36, '?')) }} className='inline'>clear</button>
                <SudokuDisplay
                    valuesMap={valuesMap}
                    onEdit={edit}
                    sudoku={currentVariationSudoku}
                    posibilityMatrix={posibilityMatrix}
                ></SudokuDisplay>
            </div>

            <div className={'variations'}>
                <SudokuVariations sudoku={currentVariationSudoku}></SudokuVariations>
            </div>
        </div>
    );
}

export default App;
