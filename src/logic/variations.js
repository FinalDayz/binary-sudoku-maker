import raw from './rawVariations.js';

const splitted = raw
    .split('\n')
    .filter(
        sudokuStr => sudokuStr.match(/^[0-1]{36}$/)
    );

const splittedInt = splitted.map(
    sudokuStr => BigInt('0b' + sudokuStr)
);

function getVariations(sudoku) {
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
/**
 * Given a sudoku structure filled with '?' and 'x',
 * search among all possibilities to find the number of solutions for any '?' combination
 * and return the possibility with the least amount of solutions
 * @param {string} variationSudoku 
 */
function getMinimalVariations(variationSudoku, returnOneOfEachMinimalConcreteSudoku = false) {
    const start = Date.now();
    const maskInt = BigInt(
        '0b' +
        variationSudoku.replaceAll('?', '0').replaceAll('x', '1').split('').reverse().join('')
    );

    const possibilitiesMap = {};
    const possibilityToConcreteSudoku = {};

    for (const sudoku of splittedInt) {
        const maskedSudoku = (sudoku & maskInt).toString(2);
        if (!possibilitiesMap[maskedSudoku]) {
            possibilityToConcreteSudoku[maskedSudoku] = sudoku.toString(2);
            possibilitiesMap[maskedSudoku] = 0;
        }

        possibilitiesMap[maskedSudoku]++;
    }

    console.log(possibilitiesMap);
    for (const sudokuPossibility in possibilitiesMap) {
        console.log(possibilitiesMap[sudokuPossibility] === 1 ? '10' : 1,
            sudokuPossibility.padStart(36, '0').split('').reverse().join(''),
            possibilitiesMap[sudokuPossibility],
            maskInt.toString(2).padStart(36, '0').split('').reverse().join(''))
    }

    let minimalVariations = Number.MAX_SAFE_INTEGER;
    let minimalSudokuStr = 'No sudokus... ';

    for (const sudokuPossibility in possibilitiesMap) {
        if (possibilitiesMap[sudokuPossibility] < minimalVariations) {
            minimalVariations = possibilitiesMap[sudokuPossibility];
            minimalSudokuStr = sudokuPossibility;
        }
    }

    if (returnOneOfEachMinimalConcreteSudoku) {
        const result = [];

        for (const sudokuPossibility in possibilitiesMap) {
            const posibilities = possibilitiesMap[sudokuPossibility];
            if (posibilities === minimalVariations) {
                result.push(possibilityToConcreteSudoku[sudokuPossibility])
            }
        }

        return result.map(sudoku => {
            console.log(sudoku)
            sudoku = sudoku.padStart(36, '0').split('').reverse().join('');
            let masked = '';
            let solution = '';
            for (let i = 0; i < 36; i++) {
                solution += sudoku[i] === '1' ? 1 : 0;
                if (variationSudoku[i] === 'x')
                    masked += sudoku[i] === '1' ? 1 : 0;
                else
                    masked += '?';
            }
            return { masked, solution };
        });
    }


    return minimalVariations;
}

export { getVariations, getMinimalVariations }
