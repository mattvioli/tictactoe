let gameObject = {}
    if(localStorage.getItem('gameObject') === null) {
        gameObject = {
        firstPlayer: {
                marker: 'O',
                counter: 0,
                name: 'O'
        },
        secondPlayer: {  
            marker: 'X',
            counter: 0,
            name: 'X'
        },
        gameBoard:  [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        turnCounter: 0,
        maxTurn: 9
    }} else { 
        gameObject = JSON.parse(localStorage.getItem('gameObject'))
    }

    let playerTracker = {
        currentPlayer: gameObject.firstPlayer.marker,
        nextPlayer: gameObject.secondPlayer.marker
    }

const winAudio = new Audio('victory.mp3')
const turnAudio = new Audio('turn.mp3')


const playerOneHeader = document.querySelector('#player-one h2')
const playerTwoHeader = document.querySelector('#player-two h2')
const playerMarkerDisplay = document.querySelector('.playerturn span')
const gameBoardDisplay = document.querySelector('.game-board')

function createGameBoard() {
    playerMarkerDisplay.textContent = gameObject.firstPlayer.marker
    playerOneHeader.textContent = gameObject.firstPlayer.name
    playerTwoHeader.textContent = gameObject.secondPlayer.name

    for(let i = 0; i < gameObject.gameBoard.length; i++){
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
        let element = document.createElement('div')
        element.className = 'game-div'
        element.id = `${i}${j}`
        gameBoardDisplay.appendChild(element)
        }
    }
    winCounter()
}
createGameBoard()

const allGameDivs = document.querySelectorAll('.game-div')
allGameDivs.forEach(element => element.addEventListener('click', clickHandler))

function clickHandler(event) {
    const idCordinates = event.target.id.split('')
    const row = idCordinates[0]
    const column = idCordinates[1]
    if(gameObject.gameBoard[row][column] === '') {
    turnAudio.play()
    event.target.textContent = playerTracker.currentPlayer
    gameObject.gameBoard[row][column] = playerTracker.currentPlayer
    if(playerTracker.currentPlayer  === gameObject.firstPlayer.marker) {
        playerTracker.currentPlayer = gameObject.secondPlayer.marker
        playerTracker.nextPlayer = gameObject.firstPlayer.marker
        playerMarkerDisplay.textContent = gameObject.secondPlayer.name
    } else {
        playerTracker.currentPlayer  = gameObject.firstPlayer.marker
        playerTracker.nextPlayer = gameObject.secondPlayer.marker
        playerMarkerDisplay.textContent = gameObject.firstPlayer.name
    }
    checkWinner()
    }
}

function checkWinner() {
        //diagonal
        for(let i = 0; i < gameObject.gameBoard.length; i++) {
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][j] !== playerTracker.nextPlayer){
                win = false
                break;
            }
        }
            winAnouncer(win, playerTracker.nextPlayer)
            break
            //break needed otherwise it alerts three times
        }
        //other diagonal
         for(let i = 0; i < gameObject.gameBoard.length; i++) {
            let win = true
            for(let j = 0; j < gameObject.gameBoard[i].length; j++){
                const diagColumn = (gameObject.gameBoard[i].length - 1)
                if(gameObject.gameBoard[diagColumn - j][j] !== playerTracker.nextPlayer){
                    win = false
                    break;
                }
            }
            winAnouncer(win, playerTracker.nextPlayer)
            break
            }

    //rows
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[i][j] !== playerTracker.nextPlayer){
                win = false
                break;
            }
        }
        winAnouncer(win, playerTracker.nextPlayer)
    }
    //columns
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][i] !== playerTracker.nextPlayer){
                win = false
                break;
            }
        }
        winAnouncer(win, playerTracker.nextPlayer)
    }
    //this counts how many turns happen, if it reaches 9, no one wins.
    gameObject.turnCounter++
    if(gameObject.turnCounter === gameObject.maxTurn) {
        const winAccouncement = document.querySelector('.win-announcement')
        winAccouncement.id = 'yes-win'
        gameObject.gameBoard = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
        gameObject.turnCounter = 0 
        localStorage.setItem('gameObject', JSON.stringify(gameObject))
    }
}

function winCounter() {

    const firstMarkCounter = document.querySelector('#first-player-counter')
    firstMarkCounter.textContent = `${gameObject.firstPlayer.marker} has won ${gameObject.firstPlayer.counter} times`    

    const secondMarkCounter = document.querySelector('#second-player-counter')
    secondMarkCounter.textContent = `${gameObject.secondPlayer.marker} has won ${gameObject.secondPlayer.counter} times`    
}

function winAnouncer(win, player) {
    if(win){
        const winAccouncement = document.querySelector('.win-announcement')
        const winAccouncementSpan = document.querySelector('.win-announcement span')
        if(player === gameObject.firstPlayer.marker){
            gameObject.firstPlayer.counter++
            winAccouncementSpan.textContent = `${gameObject.firstPlayer.name}`
            const firstMark = document.querySelector('#first-player-counter')
            firstMark.textContent = `${gameObject.firstPlayer.marker} has won ${gameObject.firstPlayer.counter} times`
        } else {
            gameObject.secondPlayer.counter++
            winAccouncementSpan.textContent = `${gameObject.secondPlayer.name}`
            const secondMark = document.querySelector('#second-player-counter')
            secondMark.textContent = `${gameObject.secondPlayer.marker} has won ${gameObject.secondPlayer.counter} times`
        }
        winAudio.play()
        winAccouncement.id = 'yes-win'
        gameObject.gameBoard = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
        gameObject.turnCounter = 0 
        localStorage.setItem('gameObject', JSON.stringify(gameObject))
   }
}

const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', function () { 
    localStorage.clear()
    location.reload()
} )

//this is probably not the best way to reset the game, however as it is one page I am okay with this.
const continueButton = document.querySelector('.win-announcement button')
continueButton.addEventListener('click', () => location.reload())

//The below code grabs the input elements.
const playerOneFormInput = document.querySelector('#player-one-name input')
const playerTwoFormInput = document.querySelector('#player-two-name input')
//This grabs the submit names button
const submitNamesButton = document.querySelector('#names-button')

//This event listener checks if the input form is empty, it if is not it sets the names.
// This also replaces the textContent of the sub headers
submitNamesButton.addEventListener('click', function (event) {
    event.preventDefault()

    if(playerOneFormInput.value !== '' ) {
        gameObject.firstPlayer.name = playerOneFormInput.value
        playerOneHeader.textContent = gameObject.firstPlayer.name
    }
    if(playerTwoFormInput.value !== '') {
        gameObject.secondPlayer.name = playerTwoFormInput.value
        playerTwoHeader.textContent = gameObject.secondPlayer.name
    }
})

//to change the board size, I will need to grab two loops, take the inputted amount and push to the gameBoard array,
// then call the gameBoard function to create it.
//first the event listner to the button.
const changeBoardSizeButton = document.querySelector('#board-size-button')

changeBoardSizeButton.addEventListener('click', changeBoardSize)

function changeBoardSize(event) {
    event.preventDefault()
    console.log('click')
    const boardSizeInput = document.querySelector('#board-size')
    //creates the additional rows
    for(let i = 3; i < boardSizeInput.value; i++){
            gameObject.gameBoard.push(['','',''])

        }
        //creates the addition columns, must start the loop at 0 to get every array
    for(let i = 0; i < boardSizeInput.value; i++){
        //must start at 3 as we are having minimum value 3
        for(let j = 3; j < boardSizeInput.value; j++){
            gameObject.gameBoard[i].push('')
        }
    }
    //uses while loop to remove all gameBoardDiv's
    while (gameBoardDisplay.firstChild) {
        gameBoardDisplay.removeChild(gameBoardDisplay.lastChild);
        console.log(gameBoardDisplay.firstChild)
    }
    //changes the max turns to be able to announce when no one wins
    gameObject.maxTurn = boardSizeInput.value * boardSizeInput.value
    //changes the grid number
    gameBoardDisplay.style.gridTemplateColumns = `repeat(${boardSizeInput.value}, 1fr)`
    gameBoardDisplay.style.gridTemplateRows = `repeat(${boardSizeInput.value}, 1fr)`

    //creates the game board again and adds the event listeners
    createGameBoard()
    const allGameDivs = document.querySelectorAll('.game-div')
    allGameDivs.forEach(element => element.addEventListener('click', clickHandler))
}
