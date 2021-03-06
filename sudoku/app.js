let sudokuTable;

let successSudokuTable = false;
let view = document.getElementById("sudoku")
let alertMsg = document.getElementById("alertMsg")
let emptyFields = document.getElementById("emptyFields")
let nextSquare = 0;
let gameLevel;
let difficulty = [2, 4, 6, 7]

// restarter parameters (No need to touch it. If generation is unsolvable, it will restart)
const tryLimit = 1000;
let stopper = 0;

// Generate 3x3 squares here.
async function createNineSquare(level) {
    try {
        if (typeof level !== "undefined") {
            gameLevel = level
        }
        sudokuTable = [
            [],[],[],
            [],[],[],
            [],[],[]
        ]
        //Start 3x3 generate (Each subsequent square adapts vertically and horizontally during generation)
        await createSquareOne()
        await createSquareTwo()
        await createSquareThree()
        await createSquareFour()
        await createSquareFive()
        await createSquareSix()
        await createSquareSeven()
        await createSquareEight()
        await createSquareNine()
        // Generate end
        if (successSudokuTable) { // Create new view 
            nextSquare = 0;
            while (view.firstChild) { // Remove last board
                view.removeChild(view.firstChild);
            }
            let newTable = sudokuTable;
            for (let i = 0; i < 9; i++) { // Create view with generated numbers
                let newSquare = document.createElement("div")
                newSquare.classList = `row col-4 text-center square`
                view.appendChild(newSquare)
                for (let i = 0; i < 9; i++) {
                    let nineSquare = document.createElement("div")
                    nineSquare.classList = `col-4  smallSquare`
                    nineSquare.style = "min-height: 35px"
                    if (await randomNumbers() < difficulty[gameLevel]) {
                        nineSquare.innerHTML = "";
                        nineSquare.style.backgroundColor = "white"
                        nineSquare.addEventListener("click", function () {
                            let value = prompt("Enter a number: (1-9 or empty)");
                            if (isNaN(value) || value < 1 || value > 9) {
                                nineSquare.innerHTML = null
                            } else {
                                nineSquare.innerHTML = parseInt(value);
                                checkTheStatusOfTheTable()
                            }
                        })
                    } else {
                        nineSquare.innerHTML = `${newTable[nextSquare][i]}`;
                    }
                    newSquare.appendChild(nineSquare)
                }
                nextSquare++
            }
        }
    } catch {
        // If it cannot be generated successfully. It will start again
        return restart()
    }
}

// Generate a random Number 1-9
function randomNumbers() {
    return new Promise((resolve, reject) => {
        resolve(Math.ceil(Math.random() * 9))
    })
}

function createSquareOne() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((rN => {
                    if (!sudokuTable[0].includes(rN)) {
                        sudokuTable[0].push(rN)
                        i++
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareTwo() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((rN => {
                    stopper++;
                    if (i < 3 && !sudokuTable[1].includes(rN) && !sudokuTable[0].slice(0, 3).includes(rN)) {
                        sudokuTable[1].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && !sudokuTable[1].includes(rN) && !sudokuTable[0].slice(3, 6).includes(rN)) {
                        sudokuTable[1].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && !sudokuTable[1].includes(rN) && !sudokuTable[0].slice(6, 9).includes(rN)) {
                        sudokuTable[1].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareThree() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((rN => {
                    stopper++;
                    if (i < 3 && !sudokuTable[2].includes(rN) && !sudokuTable[0].slice(0, 3).includes(rN) && !sudokuTable[1].slice(0, 3).includes(rN)) {
                        sudokuTable[2].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && !sudokuTable[2].includes(rN) && !sudokuTable[0].slice(3, 6).includes(rN) && !sudokuTable[1].slice(3, 6).includes(rN)) {
                        sudokuTable[2].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && !sudokuTable[2].includes(rN) && !sudokuTable[0].slice(6, 9).includes(rN) && !sudokuTable[1].slice(6, 9).includes(rN)) {
                        sudokuTable[2].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareFour() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((rN => {
                    stopper++;
                    if (i < 3 && sudokuTable[0][i] !== rN && !sudokuTable[3].includes(rN) && sudokuTable[0][i + 3] !== rN && sudokuTable[0][i + 6] !== rN) {
                        sudokuTable[3].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && sudokuTable[0][i] !== rN && !sudokuTable[3].includes(rN) && sudokuTable[0][i - 3] !== rN && sudokuTable[0][i + 3] !== rN) {
                        sudokuTable[3].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && sudokuTable[0][i] !== rN && !sudokuTable[3].includes(rN) && sudokuTable[0][i - 3] !== rN && sudokuTable[0][i - 6] !== rN) {
                        sudokuTable[3].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareFive() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((async rN => {
                    stopper++;
                    if (i < 3 && sudokuTable[1][i] !== rN && !sudokuTable[4].includes(rN) && sudokuTable[1][i + 3] !== rN && sudokuTable[1][i + 6] !== rN && !sudokuTable[3].slice(0, 3).includes(rN)) {
                        sudokuTable[4].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && sudokuTable[1][i] !== rN && !sudokuTable[4].includes(rN) && sudokuTable[1][i - 3] !== rN && sudokuTable[1][i + 3] !== rN && !sudokuTable[3].slice(3, 6).includes(rN)) {
                        sudokuTable[4].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && sudokuTable[1][i] !== rN && !sudokuTable[4].includes(rN) && sudokuTable[1][i - 3] !== rN && sudokuTable[1][i - 6] !== rN && !sudokuTable[3].slice(6, 9).includes(rN)) {
                        sudokuTable[4].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareSix() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((async rN => {
                    stopper++;
                    if (i < 3 && sudokuTable[2][i] !== rN && !sudokuTable[5].includes(rN) && sudokuTable[2][i + 3] !== rN && sudokuTable[2][i + 6] !== rN && !sudokuTable[3].slice(0, 3).includes(rN) && !sudokuTable[4].slice(0, 3).includes(rN)) {
                        sudokuTable[5].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && sudokuTable[2][i] !== rN && !sudokuTable[5].includes(rN) && sudokuTable[2][i - 3] !== rN && sudokuTable[2][i + 3] !== rN && !sudokuTable[3].slice(3, 6).includes(rN) && !sudokuTable[4].slice(3, 6).includes(rN)) {
                        sudokuTable[5].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && sudokuTable[2][i] !== rN && !sudokuTable[5].includes(rN) && sudokuTable[2][i - 3] !== rN && sudokuTable[2][i - 6] !== rN && !sudokuTable[3].slice(6, 9).includes(rN) && !sudokuTable[4].slice(6, 9).includes(rN)) {
                        sudokuTable[5].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}


function createSquareSeven() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((rN => {
                    stopper++;
                    if (i < 3 && sudokuTable[0][i] !== rN && sudokuTable[3][i] !== rN && !sudokuTable[6].includes(rN) && sudokuTable[0][i + 3] !== rN && sudokuTable[0][i + 6] !== rN && sudokuTable[3][i + 3] !== rN && sudokuTable[3][i + 6] !== rN) {
                        sudokuTable[6].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && sudokuTable[0][i] !== rN && sudokuTable[3][i] !== rN && !sudokuTable[6].includes(rN) && sudokuTable[0][i - 3] !== rN && sudokuTable[0][i + 3] !== rN && sudokuTable[3][i - 3] !== rN && sudokuTable[3][i + 3] !== rN) {
                        sudokuTable[6].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && sudokuTable[0][i] !== rN && sudokuTable[3][i] !== rN && !sudokuTable[6].includes(rN) && sudokuTable[0][i - 3] !== rN && sudokuTable[0][i - 6] !== rN && sudokuTable[3][i - 3] !== rN && sudokuTable[3][i - 6] !== rN) {
                        sudokuTable[6].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareEight() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((async rN => {
                    stopper++;
                    if (i < 3 && sudokuTable[1][i] !== rN && sudokuTable[4][i] !== rN && !sudokuTable[7].includes(rN) && sudokuTable[1][i + 3] !== rN && sudokuTable[1][i + 6] !== rN && !sudokuTable[6].slice(0, 3).includes(rN) && sudokuTable[4][i + 3] !== rN && sudokuTable[4][i + 6] !== rN) {
                        sudokuTable[7].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && sudokuTable[1][i] !== rN && sudokuTable[4][i] !== rN && !sudokuTable[7].includes(rN) && sudokuTable[1][i - 3] !== rN && sudokuTable[1][i + 3] !== rN && !sudokuTable[6].slice(3, 6).includes(rN) && sudokuTable[4][i - 3] !== rN && sudokuTable[4][i + 3] !== rN) {
                        sudokuTable[7].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && sudokuTable[1][i] !== rN && sudokuTable[4][i] !== rN && !sudokuTable[7].includes(rN) && sudokuTable[1][i - 3] !== rN && sudokuTable[1][i - 6] !== rN && !sudokuTable[6].slice(6, 9).includes(rN) && sudokuTable[4][i - 3] !== rN && sudokuTable[4][i - 6] !== rN) {
                        sudokuTable[7].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

function createSquareNine() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((async rN => {
                    stopper++;
                    if (i < 3 && sudokuTable[2][i] !== rN && sudokuTable[5][i] !== rN && !sudokuTable[8].includes(rN) && sudokuTable[2][i + 3] !== rN && sudokuTable[2][i + 6] !== rN && sudokuTable[5][i + 3] !== rN && sudokuTable[5][i + 6] !== rN && !sudokuTable[6].slice(0, 3).includes(rN) && !sudokuTable[7].slice(0, 3).includes(rN)) {
                        sudokuTable[8].push(rN)
                        i++
                    } else if (i < 6 && i > 2 && sudokuTable[2][i] !== rN && sudokuTable[5][i] !== rN && !sudokuTable[8].includes(rN) && sudokuTable[2][i - 3] !== rN && sudokuTable[2][i + 3] !== rN && sudokuTable[5][i - 3] !== rN && sudokuTable[5][i + 3] !== rN && !sudokuTable[6].slice(3, 6).includes(rN) && !sudokuTable[7].slice(3, 6).includes(rN)) {
                        sudokuTable[8].push(rN)
                        i++
                    } else if (i < 9 && i > 5 && sudokuTable[2][i] !== rN && sudokuTable[5][i] !== rN && !sudokuTable[8].includes(rN) && sudokuTable[2][i - 3] !== rN && sudokuTable[2][i - 6] !== rN && sudokuTable[5][i - 3] !== rN && sudokuTable[5][i - 6] !== rN && !sudokuTable[6].slice(6, 9).includes(rN) && !sudokuTable[7].slice(6, 9).includes(rN)) {
                        sudokuTable[8].push(rN)
                        i++
                    } else if (stopper === tryLimit) {
                        i = 10;
                        return reject()
                    }
                    if (i === 9) {
                        resolve(successSudokuTable = true)
                    }
                }))
        }
    })
}

// Fresh empty arrays. Generating new Sudoku table
async function restart(level) {
    stopper = 0;
    emptyFields.innerHTML = "";
    alertMsg.innerText = "";
    createNineSquare(level)
}

function checkTheStatusOfTheTable() {
    let allSquare = 0;
    let badValue = 0;
    let emptySquare = 0;
    let newTable = sudokuTable;
    for (let i = 0; i < 9; i++) {
        for (let i = 0; i < 9; i++) {
            if (view.children[allSquare].children[i].firstChild !== null) {
                if (parseInt(view.children[allSquare].children[i].firstChild.textContent) === newTable[allSquare][i]) {} else {
                    badValue++; // if value bad
                }

            } else {
                emptySquare++ // if empty feild
            }
        }
        allSquare++
    }
    if (badValue > 0 && allSquare === 9 && emptySquare === 0) { // Completed but the value is bad
        alertMsg.classList = "text-danger text-center mt-3"
        alertMsg.innerText = `${badValue} numbers are incorrect`
    }
    if (badValue === 0 && allSquare === 9 && emptySquare === 0) { // if check all square and no bad value or emptySquare. You win
        alertMsg.classList = "text-success text-center mt-3"
        alertMsg.innerText = "Congratulations! Successfully completed it"
    }
    emptyFields.innerHTML = `Remaining empty fields: ${emptySquare}`
}