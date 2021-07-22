// Create the required arrays
let squareOne = []
let squareTwo = []
let squareThree = []
let squareFour = []
let squareFive = []
let squareSix = []
let squareSeven = []
let squareEight = []
let squareNine = []

let successSudokuTable = false;
let view = document.getElementById("sudoku")
let nextSquare = 0;
let gameLevel;
let difficulty = [2, 4, 6, 7]


// restarter parameters (No need to touch it. If generation is unsolvable, it will restart)
const tryLimit = 1000;
let stopper = 0;
let exit = 0;



// Generate 3x3 squares here.
async function createNineSquare(level) {
    try {
        if (typeof level !== "undefined") {
            gameLevel = level
        }
        squareOne = []
        squareTwo = []
        squareThree = []
        squareFour = []
        squareFive = []
        squareSix = []
        squareSeven = []
        squareEight = []
        squareNine = []
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
            let newTable = [squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight, squareNine]

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
                            let value = parseInt(prompt("Enter a number: (1-9)"));
                            if (isNaN(value) || value < 1 || value > 9) {
                                alert("Only numbers 1-9")
                            } else {
                                nineSquare.innerHTML = value;
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
                .then((randomNumber => {
                    if (!squareOne.includes(randomNumber)) {
                        squareOne.push(randomNumber)
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
                .then((randomNumber => {
                    stopper++;
                    if (i < 3 && !squareTwo.includes(randomNumber) && !squareOne.slice(0, 3).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && !squareTwo.includes(randomNumber) && !squareOne.slice(3, 6).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && !squareTwo.includes(randomNumber) && !squareOne.slice(6, 9).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++;
                        squareTwo = [];
                        i = 10;
                        return resolve(createSquareTwo())
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
                .then((randomNumber => {
                    stopper++;
                    if (i < 3 && !squareThree.includes(randomNumber) && !squareOne.slice(0, 3).includes(randomNumber) && !squareTwo.slice(0, 3).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && !squareThree.includes(randomNumber) && !squareOne.slice(3, 6).includes(randomNumber) && !squareTwo.slice(3, 6).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && !squareThree.includes(randomNumber) && !squareOne.slice(6, 9).includes(randomNumber) && !squareTwo.slice(6, 9).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++;
                        squareThree = [];
                        i = 10;
                        return resolve(createSquareThree())
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
                .then((randomNumber => {
                    stopper++;
                    if (i < 3 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i + 3] !== randomNumber && squareOne[i + 6] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i + 3] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i - 6] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++;
                        squareFour = [];
                        i = 10;
                        return resolve(createSquareFour())
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
                .then((async randomNumber => {
                    stopper++;
                    if (i < 3 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i + 3] !== randomNumber && squareTwo[i + 6] !== randomNumber && !squareFour.slice(0, 3).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i + 3] !== randomNumber && !squareFour.slice(3, 6).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i - 6] !== randomNumber && !squareFour.slice(6, 9).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++
                        squareFive = [];
                        i = 10;
                        return resolve(createSquareFive())
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
                .then((async randomNumber => {
                    stopper++;
                    if (i < 3 && squareThree[i] !== randomNumber && !squareSix.includes(randomNumber) && squareThree[i + 3] !== randomNumber && squareThree[i + 6] !== randomNumber && !squareFour.slice(0, 3).includes(randomNumber) && !squareFive.slice(0, 3).includes(randomNumber)) {
                        squareSix.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && squareThree[i] !== randomNumber && !squareSix.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i + 3] !== randomNumber && !squareFour.slice(3, 6).includes(randomNumber) && !squareFive.slice(3, 6).includes(randomNumber)) {
                        squareSix.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && squareThree[i] !== randomNumber && !squareSix.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i - 6] !== randomNumber && !squareFour.slice(6, 9).includes(randomNumber) && !squareFive.slice(6, 9).includes(randomNumber)) {
                        squareSix.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++
                        squareSix = [];
                        i = 10;
                        return resolve(createSquareSix())
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
                .then((randomNumber => {
                    stopper++;
                    if (i < 3 && squareOne[i] !== randomNumber && squareFour[i] !== randomNumber && !squareSeven.includes(randomNumber) && squareOne[i + 3] !== randomNumber && squareOne[i + 6] !== randomNumber && squareFour[i + 3] !== randomNumber && squareFour[i + 6] !== randomNumber) {
                        squareSeven.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && squareOne[i] !== randomNumber && squareFour[i] !== randomNumber && !squareSeven.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i + 3] !== randomNumber && squareFour[i - 3] !== randomNumber && squareFour[i + 3] !== randomNumber) {
                        squareSeven.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && squareOne[i] !== randomNumber && squareFour[i] !== randomNumber && !squareSeven.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i - 6] !== randomNumber && squareFour[i - 3] !== randomNumber && squareFour[i - 6] !== randomNumber) {
                        squareSeven.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++
                        squareSeven = [];
                        i = 10;
                        return resolve(createSquareSeven())
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
                .then((async randomNumber => {
                    stopper++;
                    if (i < 3 && squareTwo[i] !== randomNumber && squareFive[i] !== randomNumber && !squareEight.includes(randomNumber) && squareTwo[i + 3] !== randomNumber && squareTwo[i + 6] !== randomNumber && !squareSeven.slice(0, 3).includes(randomNumber) && squareFive[i + 3] !== randomNumber && squareFive[i + 6] !== randomNumber) {
                        squareEight.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && squareTwo[i] !== randomNumber && squareFive[i] !== randomNumber && !squareEight.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i + 3] !== randomNumber && !squareSeven.slice(3, 6).includes(randomNumber) && squareFive[i - 3] !== randomNumber && squareFive[i + 3] !== randomNumber) {
                        squareEight.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && squareTwo[i] !== randomNumber && squareFive[i] !== randomNumber && !squareEight.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i - 6] !== randomNumber && !squareSeven.slice(6, 9).includes(randomNumber) && squareFive[i - 3] !== randomNumber && squareFive[i - 6] !== randomNumber) {
                        squareEight.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++
                        squareEight = [];
                        i = 10;
                        return resolve(createSquareEight())
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
                .then((async randomNumber => {
                    stopper++;
                    if (i < 3 && squareThree[i] !== randomNumber && squareSix[i] !== randomNumber && !squareNine.includes(randomNumber) && squareThree[i + 3] !== randomNumber && squareThree[i + 6] !== randomNumber && squareSix[i + 3] !== randomNumber && squareSix[i + 6] !== randomNumber && !squareSeven.slice(0, 3).includes(randomNumber) && !squareEight.slice(0, 3).includes(randomNumber)) {
                        squareNine.push(randomNumber)
                        i++
                    } else if (i < 6 && i > 2 && squareThree[i] !== randomNumber && squareSix[i] !== randomNumber && !squareNine.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i + 3] !== randomNumber && squareSix[i - 3] !== randomNumber && squareSix[i + 3] !== randomNumber && !squareSeven.slice(3, 6).includes(randomNumber) && !squareEight.slice(3, 6).includes(randomNumber)) {
                        squareNine.push(randomNumber)
                        i++
                    } else if (i < 9 && i > 5 && squareThree[i] !== randomNumber && squareSix[i] !== randomNumber && !squareNine.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i - 6] !== randomNumber && squareSix[i - 3] !== randomNumber && squareSix[i - 6] !== randomNumber && !squareSeven.slice(6, 9).includes(randomNumber) && !squareEight.slice(6, 9).includes(randomNumber)) {
                        squareNine.push(randomNumber)
                        i++
                    } else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    } else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++
                        squareNine = [];
                        i = 10;
                        return resolve(createSquareNine())
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
    createNineSquare(level)
}

function checkTheStatusOfTheTable() {
    let allSquare = 0;
    let badValue = 0;
    let emptySquare = 0;
    let newTable = [squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight, squareNine]
    for (let i = 0; i < 9; i++) {
        for (let i = 0; i < 9; i++) {
            if (view.children[allSquare].children[i].firstChild !== null) {
                if (parseInt(view.children[allSquare].children[i].firstChild.textContent) === newTable[allSquare][i]) {
                } else {
                    badValue++; // if value bad
                }

            } else {
                emptySquare++ // if empty feild
            }
        }
        allSquare++
    }
    if (badValue > 0 && allSquare === 9 && emptySquare === 0) { // Completed but the value is bad
        alert("One of the numbers is incorrect! :((")
    }
    if (badValue === 0 && allSquare === 9 && emptySquare === 0) { // if check all square and no bad value or emptySquare. You win
        alert("Successfully completed it")
    }
}