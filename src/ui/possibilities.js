import { useState } from "react";
import { getVariations } from "../logic/variations"
import SudokuDisplay from "./sudoku-display";

function SudokuPossibilities(
    {
        sudoku
    }
) {
    if (!sudoku.includes("?")) {
        return <h2>Sudoku complete, no variations available</h2>
    }

    const variations = getVariations(sudoku);
    console.log(variations);
    return <div>
        <h2>Sudoku variations ({variations.length}):</h2>
        <div className='possibilities-wrapper'>
            {variations.map((sudokuVariation, index) => index < 100 ? (
                <SudokuDisplay
                    key={index}
                    small={true}
                    sudoku={sudokuVariation}
                // highlighted={sudoku}
                ></SudokuDisplay>) : '')}
        </div>
    </div>

}
export default SudokuPossibilities;
