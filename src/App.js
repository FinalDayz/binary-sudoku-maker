import logo from './logo.svg';
import './App.css';
import SudokuDisplay from "./ui/sudoku-display";
import {useState} from "react";
import SudokoPossibilities from "./ui/possibilities";

function App() {
    const [currentSudoku, setCurrentSudoku] = useState('01??0?1??100?10??1?0??10001????1??1??');

    function edit(sudoku) {
        setCurrentSudoku(sudoku);
    }

    return (
        <div className="App wrapper">
            <div className={'main-sudoku'}>
                <SudokuDisplay
                    onEdit={edit}
                    sudoku={currentSudoku}
                ></SudokuDisplay>
            </div>

            <div className={'variations'}>
                <SudokoPossibilities sudoku={currentSudoku}></SudokoPossibilities>
            </div>
        </div>
    );
}

export default App;
