let cubeOne = []
let cubeTwo = []
let cubeThree = []
let cubeFour = []
let cubeFive = []
let cubeSix = []
let cubeSeven = []
let cubeEight = []
let cubeNine = []

const tryLimit = 250;
let stopper = 0;

async function createNineCube() {
    await createCubeOne()
    await createCubeTwo()
    await createCubeThree()
    await createCubeFour()
    // await createCubeFive()
    // await createCubeSix()
    // await createCubeSeven()
    // await createCubeEight()
    // await createCubeNine()
}

createNineCube()

function randomNumbers() {
    return new Promise((resolve, reject) => {
        const newRandomNumber = Math.random() * 9;
        const ceilRandomNumber = Math.ceil(newRandomNumber)
        resolve(ceilRandomNumber)
    })
}

function createCubeOne() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((randomNumber => {
                    if (!cubeOne.includes(randomNumber)) {
                        cubeOne.push(randomNumber)
                        i++
                    }
                    if (i === 9) {
                        resolve(console.log("CubeOne done! " + cubeOne))
                    }
                }))
        }
    })
}

function createCubeTwo() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((randomNumber => {
                    if (i === 6 || i === 7 || i === 8) {
                        stopper++;
                    }
                    if (i < 9 && i > 5 && !cubeTwo.includes(randomNumber) && !cubeOne.slice(6, 9).includes(randomNumber)) {
                        cubeTwo.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && !cubeTwo.includes(randomNumber) && !cubeOne.slice(3, 6).includes(randomNumber)) {
                        cubeTwo.push(randomNumber)
                        i++
                    }
                    if (i < 3 && !cubeTwo.includes(randomNumber) && !cubeOne.slice(0, 3).includes(randomNumber)) {
                        cubeTwo.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        cubeTwo = [];
                        i += 10;
                        return resolve(createCubeTwo())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("CubeTwo done! " + cubeTwo))
                    }
                }))
        }
    })
}

function createCubeThree() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((randomNumber => {
                    if (i === 6 || i === 7 || i === 8) {
                        stopper++;
                    }
                    if (i < 9 && i > 5 && !cubeThree.includes(randomNumber) && !cubeOne.slice(6, 9).includes(randomNumber) && !cubeTwo.slice(6, 9).includes(randomNumber)) {
                        cubeThree.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && !cubeThree.includes(randomNumber) && !cubeOne.slice(3, 6).includes(randomNumber) && !cubeTwo.slice(3, 6).includes(randomNumber)) {
                        cubeThree.push(randomNumber)
                        i++
                    }
                    if (i < 3 && !cubeThree.includes(randomNumber) && !cubeOne.slice(0, 3).includes(randomNumber) && !cubeTwo.slice(0, 3).includes(randomNumber)) {
                        cubeThree.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        cubeThree = [];
                        i += 10;
                        return resolve(createCubeThree())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("CubeThree done! " + cubeThree))
                    }
                }))
        }
    })
}

function createCubeFour() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 9;) {
            await randomNumbers()
                .then((randomNumber => {
                    if (i === 6 || i === 7 || i === 8) {
                        stopper++;
                    }
                    if (i < 3 && cubeOne[i] !== randomNumber && !cubeFour.includes(randomNumber) && cubeOne[i + 3] !== randomNumber && cubeOne[i + 6] !== randomNumber) {
                        cubeFour.push(randomNumber)
                        i++
                    }
                    if (i < 6 && i > 2 && cubeOne[i] !== randomNumber && !cubeFour.includes(randomNumber) && cubeOne[i - 3] !== randomNumber && cubeOne[i + 3] !== randomNumber) {
                        cubeFour.push(randomNumber)
                        i++
                    }
                    if (i < 9 && i > 5 && cubeOne[i] !== randomNumber && !cubeFour.includes(randomNumber) && cubeOne[i - 3] !== randomNumber && cubeOne[i - 6] !== randomNumber) {
                        cubeFour.push(randomNumber)
                        i++
                    }
                    if (stopper === tryLimit) {
                        stopper = 0;
                        cubeFour = [];
                        i += 10;
                        return resolve(createCubeFour())
                    }
                    if (i === 9) {
                        i++
                        resolve(console.log("CubeFour done! " + cubeFour))
                    }
                }))
        }
    })
}