let squareOne = []
let squareTwo = []
let squareThree = []
let squareFour = []
let squareFive = []
let squareSix = []
let squareSeven = []
let squareEight = []
let squareNine = []

const tryLimit = 2000;
let stopper = 0;

async function createNineSquare() {
    await createSquareOne()
    await createSquareTwo()
    await createSquareThree()
    await createSquareFour()
    await createSquareFive()
    // await createSquareSix()
    // await createSquareSeven()
    // await createSquareEight()
    // await createSquareNine()
}

createNineSquare()

function randomNumbers() {
    return new Promise((resolve, reject) => {
        const newRandomNumber = Math.random() * 9;
        const ceilRandomNumber = Math.ceil(newRandomNumber)
        resolve(ceilRandomNumber)
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
                        resolve(console.log("squareOne done! " + squareOne))
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
                    if (i > 3) {
                        stopper++;
                    }
                    if (i < 9 && i > 5 && !squareTwo.includes(randomNumber) && !squareOne.slice(6, 9).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && !squareTwo.includes(randomNumber) && !squareOne.slice(3, 6).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    }
                    if (i < 3 && !squareTwo.includes(randomNumber) && !squareOne.slice(0, 3).includes(randomNumber)) {
                        squareTwo.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        squareTwo = [];
                        i = 10;
                        return resolve(createSquareTwo())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("squareTwo done! " + squareTwo))
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
                    if (i > 3) {
                        stopper++;
                    }
                    if (i < 9 && i > 5 && !squareThree.includes(randomNumber) && !squareOne.slice(6, 9).includes(randomNumber) && !squareTwo.slice(6, 9).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && !squareThree.includes(randomNumber) && !squareOne.slice(3, 6).includes(randomNumber) && !squareTwo.slice(3, 6).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    }
                    if (i < 3 && !squareThree.includes(randomNumber) && !squareOne.slice(0, 3).includes(randomNumber) && !squareTwo.slice(0, 3).includes(randomNumber)) {
                        squareThree.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        squareThree = [];
                        i = 10;
                        return resolve(createSquareThree())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("squareThree done! " + squareThree))
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
                    if (i > 3) {
                        stopper++;
                    }
                    if (i < 3 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i + 3] !== randomNumber && squareOne[i + 6] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i + 3] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    }
                    if (i < 9 && i > 5 && squareOne[i] !== randomNumber && !squareFour.includes(randomNumber) && squareOne[i - 3] !== randomNumber && squareOne[i - 6] !== randomNumber) {
                        squareFour.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        squareFour = [];
                        i = 10;
                        return resolve(createSquareFour())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("squareFour done! " + squareFour))
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
                    if (i > 3) {
                        stopper++;
                    }
                    if (i < 3 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i + 3] !== randomNumber && squareTwo[i + 6] !== randomNumber && !squareFour.slice(0, 3).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i + 3] !== randomNumber && !squareFour.slice(3, 6).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    }
                    if (i < 9 && i > 5 && squareTwo[i] !== randomNumber && !squareFive.includes(randomNumber) && squareTwo[i - 3] !== randomNumber && squareTwo[i - 6] !== randomNumber && !squareFour.slice(6, 9).includes(randomNumber)) {
                        squareFive.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        squareFive = [];
                        i = 10;
                        return resolve(createSquareFive())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("squareFive done! " + squareFive))
                    }
                }))
        }
    })
}