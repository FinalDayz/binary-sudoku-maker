import raw from './rawVariations.js';

const splitted = raw
    .split('\n')
    .filter(
        sudokuStr => sudokuStr.match(/^[0-1]{36}$/)
    );

function getVariations(sudoku) {
    console.log(splitted.length, sudoku);
    const matches = splitted.filter(
            sudokuStr => {
                for (let i = 0; i < sudokuStr.length; i++) {
                    if (sudoku[i] !== sudokuStr[i] && sudoku[i] !== '?') {
                        return false;
                    }
                }
                return true;
            }
        );
    return matches;
}

export {getVariations}
