//This is the game object that holds all of our data.
let gameObject = {}
    //if statement to either set a blank gameObject or grab it from localStorage
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
        maxTurn: 9,
        ai: false
    }} else { 
        gameObject = JSON.parse(localStorage.getItem('gameObject'))
    }

//Tracks who's turn it is
let turnTracker = {
        currentPlayer: gameObject.firstPlayer.marker,
        nextPlayer: gameObject.secondPlayer.marker
}

//The audio files
const winAudio = new Audio('victory.mp3')
const turnAudio = new Audio('turn.mp3')

//elememt selectors that are needing in multiple functions
const playerOneHeader = document.querySelector('#player-one h2')
const playerTwoHeader = document.querySelector('#player-two h2')
const playerMarkerDisplay = document.querySelector('.playerturn span')
const gameBoardDisplay = document.querySelector('.game-board')

//Create the gameboard
function createGameBoard() {
    //populate the page with dynamic content
    playerMarkerDisplay.textContent = gameObject.firstPlayer.marker
    playerOneHeader.textContent = gameObject.firstPlayer.name
    playerTwoHeader.textContent = gameObject.secondPlayer.name

    //creates the game divs.
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
        let element = document.createElement('div')
        element.className = 'game-div'
        element.id = `${i}${j}`
        gameBoardDisplay.appendChild(element)
        }
    }
    //calls winCounter function to populate it
    winCounter()
}
//calls gameBoard
createGameBoard()

//selects all the divs and adds an event listener
const allGameDivs = document.querySelectorAll('.game-div')
allGameDivs.forEach(element => element.addEventListener('click', clickHandler))

function clickHandler(event) {
    //uses the div Id's as the co-ordinates and splits them.
    const idCordinates = event.target.id.split('')
    const row = idCordinates[0]
    const column = idCordinates[1]
    //checks if the game board hasn't been clicked
    fillBoard(row, column)
    //checks if anyone one has one
    checkWinner()
    if(gameObject.ai) {
        console.log()
        if(turnTracker.currentPlayer === gameObject.secondPlayer.marker){
            let row = Math.floor(Math.random() * gameObject.gameBoard.length)
            let column = Math.floor(Math.random() * gameObject.gameBoard.length)
            gameObject.gameBoard[row][column] = turnTracker.nextPlayer
            const divID = `${row}${column}`
            const gameDiv = document.getElementById(divID)
            gameDiv.textContent = turnTracker.nextPlayer
            console.log(divID)
            // fillBoard(row, column)
        }
    }
    }
// okay, I need to figure out how to use the two numbers to access the ID's

function fillBoard(row, column) {
    if(gameObject.gameBoard[row][column] === '') {
        turnAudio.play()
        //fills the board with the current player marker
        event.target.textContent = turnTracker.currentPlayer
        //updates the game board to reflect the website
        gameObject.gameBoard[row][column] = turnTracker.currentPlayer
    
        //updates the turn tracker
        if(turnTracker.currentPlayer  === gameObject.firstPlayer.marker) {
            turnTracker.currentPlayer = gameObject.secondPlayer.marker
            turnTracker.nextPlayer = gameObject.firstPlayer.marker
            playerMarkerDisplay.textContent = gameObject.secondPlayer.name
        } else {
            turnTracker.currentPlayer  = gameObject.firstPlayer.marker
            turnTracker.nextPlayer = gameObject.secondPlayer.marker
            playerMarkerDisplay.textContent = gameObject.firstPlayer.name
        }
    }
}

function resetBoard(){
    gameObject.gameBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    gameObject.turnCounter = 0 
    localStorage.setItem('gameObject', JSON.stringify(gameObject))
}

function checkWinner() {
        //diagonal
        for(let i = 0; i < gameObject.gameBoard.length; i++) {
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][j] !== turnTracker.nextPlayer){
                win = false
                break;
            }
        }
            winAnouncer(win)
            break
            //break needed otherwise it alerts three times
        }
        //other diagonal
         for(let i = 0; i < gameObject.gameBoard.length; i++) {
            let win = true
            for(let j = 0; j < gameObject.gameBoard[i].length; j++){
                const diagColumn = (gameObject.gameBoard[i].length - 1)
                if(gameObject.gameBoard[diagColumn - j][j] !== turnTracker.nextPlayer){
                    win = false
                    break;
                }
            }
            winAnouncer(win)
            break
            }

    //rows
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[i][j] !== turnTracker.nextPlayer){
                win = false
                break;
            }
        }
        winAnouncer(win)
    }
    //columns
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][i] !== turnTracker.nextPlayer){
                win = false
                break;
            }
        }
        winAnouncer(win)
    }
    //this counts how many turns happen, if it reaches 9, no one wins.
    gameObject.turnCounter++
    //Announces that no one has one and resets the gameBoard and turnCounter
    if(gameObject.turnCounter === gameObject.maxTurn) {
        const winAccouncement = document.querySelector('.win-announcement')
        winAccouncement.id = 'yes-win'
        resetBoard()
    }
}

//diplays the winCounter
function winCounter() {

    const firstMarkCounter = document.querySelector('#first-player-counter')
    firstMarkCounter.textContent = `${gameObject.firstPlayer.marker} has won ${gameObject.firstPlayer.counter} times`    

    const secondMarkCounter = document.querySelector('#second-player-counter')
    secondMarkCounter.textContent = `${gameObject.secondPlayer.marker} has won ${gameObject.secondPlayer.counter} times`    
}

// this accounces the winner, takes win and the player
function winAnouncer(win) {
    if(win){
        const winAccouncement = document.querySelector('.win-announcement')
        const winAccouncementSpan = document.querySelector('.win-announcement span')
        if(turnTracker.nextPlayer === gameObject.firstPlayer.marker){
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
        resetBoard()
   }
}

//reset button just clears the local storage and reloads the page
const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', function () { 
    localStorage.clear()
    location.reload()
} )

//this is probably not the best way to reset the game, however as it is one page I am okay with this.
const continueButton = document.querySelector('.win-announcement button')
continueButton.addEventListener('click', () => location.reload(), gameObject.maxTurn = 9)

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
    const boardSizeInput = document.querySelector('#board-size')
    //creates the additional rows
    if(boardSizeInput.value > 10) {
        alert('Maximum 10')
    } else if(boardSizeInput.value < 3) {
        alert('Minimum 3')
    } else {
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
}

const aiButton = document.querySelector('#ai-button')
aiButton.addEventListener('click', () => gameObject.ai = true)

// function easyAI() {
//     //on next players turn pick random co-ordinate
//     if(turnTracker.currentPlayer === gameObject.secondPlayer.marker){
//         let column = Math.floor(Math.random() * gameObject.gameBoard.length)
//         let row = Math.floor(Math.random() * gameObject.gameBoard.length)
//         fillBoard(row, column)
//     }
// }