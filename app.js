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

// restarter parameters (No need to touch it. If generation is unsolvable, it will restart)
const tryLimit = 1000;
let stopper = 0;
let exit = 0;

// Generate 3x3 squares here.
async function createNineSquare() {
    try {
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

        // Shows the console generated sudoku board (Can be deleted)
        console.log("Successful generation! New Sudoku Board");
        console.log("Preview");
        console.log("--------------------")
        console.log(squareOne[0],squareOne[1],squareOne[2],squareTwo[0],squareTwo[1],squareTwo[2],squareThree[0],squareThree[1],squareThree[2])
        console.log(squareOne[3],squareOne[4],squareOne[5],squareTwo[3],squareTwo[4],squareTwo[5],squareThree[3],squareThree[4],squareThree[5])
        console.log(squareOne[6],squareOne[7],squareOne[8],squareTwo[6],squareTwo[7],squareTwo[8],squareThree[6],squareThree[7],squareThree[8])
        console.log(squareFour[0],squareFour[1],squareFour[2],squareFive[0],squareFive[1],squareFive[2],squareSix[0],squareSix[1],squareSix[2])
        console.log(squareFour[3],squareFour[4],squareFour[5],squareFive[3],squareFive[4],squareFive[5],squareSix[3],squareSix[4],squareSix[5])
        console.log(squareFour[6],squareFour[7],squareFour[8],squareFive[6],squareFive[7],squareFive[8],squareSix[6],squareSix[7],squareSix[8])
        console.log(squareSeven[0],squareSeven[1],squareSeven[2],squareEight[0],squareEight[1],squareEight[2],squareNine[0],squareNine[1],squareNine[2])
        console.log(squareSeven[3],squareSeven[4],squareSeven[5],squareEight[3],squareEight[4],squareEight[5],squareNine[3],squareNine[4],squareNine[5])
        console.log(squareSeven[6],squareSeven[7],squareSeven[8],squareEight[6],squareEight[7],squareEight[8],squareNine[6],squareNine[7],squareNine[8])
        console.log("--------------------")
        // Preview end 
    } catch {
        // If it cannot be generated successfully. It will start again
        return restart()
    }
}

createNineSquare()  

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
                    }
                    else if (i < 6 && i > 2 && !squareTwo.includes(randomNumber) && !squareOne.slice(3, 6).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && !squareTwo.includes(randomNumber) && !squareOne.slice(6, 9).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && !squareThree.includes(randomNumber) && !squareOne.slice(3, 6).includes(randomNumber) && !squareTwo.slice(3, 6).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && !squareThree.includes(randomNumber) && !squareOne.slice(6, 9).includes(randomNumber) && !squareTwo.slice(6, 9).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i + 3] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i - 6] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i + 3] !== randomNumber && !squareFour.slice(3, 6).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i - 6] !== randomNumber && !squareFour.slice(6, 9).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && squareThree[i] !== randomNumber && !squareSix.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i + 3] !== randomNumber && !squareFour.slice(3, 6).includes(randomNumber) && !squareFive.slice(3, 6).includes(randomNumber)) {
                        squareSix.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && squareThree[i] !== randomNumber && !squareSix.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i - 6] !== randomNumber && !squareFour.slice(6, 9).includes(randomNumber) && !squareFive.slice(6, 9).includes(randomNumber)) {
                        squareSix.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && squareOne[i] !== randomNumber && squareFour[i] !== randomNumber && !squareSeven.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i + 3] !== randomNumber && squareFour[i - 3] !== randomNumber && squareFour[i + 3] !== randomNumber) {
                        squareSeven.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && squareOne[i] !== randomNumber && squareFour[i] !== randomNumber && !squareSeven.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i - 6] !== randomNumber && squareFour[i - 3] !== randomNumber && squareFour[i - 6] !== randomNumber) {
                        squareSeven.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && squareTwo[i] !== randomNumber && squareFive[i] !== randomNumber && !squareEight.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i + 3] !== randomNumber && !squareSeven.slice(3, 6).includes(randomNumber) && squareFive[i - 3] !== randomNumber && squareFive[i + 3] !== randomNumber) {
                        squareEight.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && squareTwo[i] !== randomNumber && squareFive[i] !== randomNumber && !squareEight.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i - 6] !== randomNumber && !squareSeven.slice(6, 9).includes(randomNumber) && squareFive[i - 3] !== randomNumber && squareFive[i - 6] !== randomNumber) {
                        squareEight.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
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
                    }
                    else if (i < 6 && i > 2 && squareThree[i] !== randomNumber && squareSix[i] !== randomNumber && !squareNine.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i + 3] !== randomNumber && squareSix[i - 3] !== randomNumber && squareSix[i + 3] !== randomNumber && !squareSeven.slice(3, 6).includes(randomNumber) && !squareEight.slice(3, 6).includes(randomNumber)) {
                        squareNine.push(randomNumber)
                        i++
                    }
                    else if (i < 9 && i > 5 && squareThree[i] !== randomNumber && squareSix[i] !== randomNumber && !squareNine.includes(randomNumber) && squareThree[i - 3] !== randomNumber && squareThree[i - 6] !== randomNumber && squareSix[i - 3] !== randomNumber && squareSix[i - 6] !== randomNumber && !squareSeven.slice(6, 9).includes(randomNumber) && !squareEight.slice(6, 9).includes(randomNumber)) {
                        squareNine.push(randomNumber)
                        i++
                    }
                    else if (exit === 3) {
                        i = 10
                        exit = 0;
                        return reject()
                    }
                    else if (stopper === tryLimit) {
                        stopper = 0;
                        exit++
                        squareNine = [];
                        i = 10;
                        return resolve(createSquareNine())
                    }
                    if (i === 9) {
                        resolve()
                    }
                }))
        }
    })
}

// Fresh empty arrays. Generating new Sudoku table
async function restart() {
    squareOne = []
    squareTwo = []
    squareThree = []
    squareFour = []
    squareFive = []
    squareSix = []
    squareSeven = []
    squareEight = []
    squareNine = []
    createNineSquare()
}