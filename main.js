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
        ]
    }} else { 
        gameObject = JSON.parse(localStorage.getItem('gameObject'))
    }

let playerTracker = {currentPlayer: gameObject.firstPlayer.marker,
    nextPlayer: gameObject.secondPlayer.marker}


const playerMarkerDisplay = document.querySelector('.playerturn span')

function createGameBoard() {
    const gameBoardDisplay = document.querySelector('.game-board')
    playerMarkerDisplay.textContent = gameObject.firstPlayer.marker
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
    event.target.textContent = playerTracker.currentPlayer
    const idCordinates = event.target.id.split('')
    const row = idCordinates[0]
    const column = idCordinates[1]
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
        winAccouncement.id = 'yes-win'
        gameObject.gameBoard = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
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

const playerOneFormInput = document.querySelector('#player-one-name input')
const playertwoFormInput = document.querySelector('#player-two-name input')


const formButton = document.querySelectorAll('.player-panel button')

formButton.forEach((element) => element.addEventListener('click', function (event) {
    event.preventDefault()
    if(event.target.id === 'player-one-button') {
        gameObject.firstPlayer.name = playerOneFormInput.value
        console.log(event.target.id)
    }
    if(event.target.id === 'player-two-button') {
        gameObject.secondPlayer.name = playertwoFormInput.value
        console.log(event.target.id)

    }
}))

