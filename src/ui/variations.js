import { useState } from "react";
import { getVariations, getMinimalVariations } from "../logic/variations"
import SudokuDisplay from "./sudoku-display";

function SudokuVariations(
    {
        sudoku
    }
) {
    if (!sudoku.includes("?")) {
        return <h2>Sudoku complete, no variations available</h2>
    }

    const variationResult = getMinimalVariations(sudoku);

    if (variationResult > 1) {
        return <div>
            <h2>Optimal filled in X's has got {variationResult.toLocaleString()} variation(s)</h2>
            Specify more X's to show sudoku's
        </div>
    }

    const variations = getMinimalVariations(sudoku, true);
    console.log(variations);
    return <div>
        <h2>Found {variations.length.toLocaleString()} variation(s) with only 1 solution for the given X's</h2>
        <p>(Hover to see answer)</p>

        <div className='variations-wrapper'>
            {variations.map((sudokuInfo, index) => index < 100 ? (
                <SudokuDisplay
                    key={index}
                    small={true}
                    sudoku={sudokuInfo.masked}
                    hoverSolution={sudokuInfo.solution}
                ></SudokuDisplay>) : '')}
        </div>
    </div>

}

export default SudokuVariations;
