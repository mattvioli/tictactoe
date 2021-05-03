let gameObject = {}
    if(localStorage.getItem('gameObject') === null) {
        gameObject = {
        firstPlayer: {
                marker: 'O',
                counter: 0
        },
        secondPlayer: {  
            marker: 'X',
            counter: 0
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

//need to rewrite logic that changes who the current player is

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
    } else {
        playerTracker.currentPlayer  = gameObject.firstPlayer.marker
        playerTracker.nextPlayer = gameObject.secondPlayer.marker
    }
    playerMarkerDisplay.textContent = playerTracker.currentPlayer
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
    const winCounterContainer =  document.querySelector('.win-counter')

    const firstMarkCounter = document.createElement('div')
    firstMarkCounter.className = 'win-counter-display'
    firstMarkCounter.id = 'first-player-counter'
    firstMarkCounter.textContent = `${gameObject.firstPlayer.marker} has won ${gameObject.firstPlayer.counter} times`    
    winCounterContainer.appendChild(firstMarkCounter)

    const secondMarkCounter = document.createElement('div')
    secondMarkCounter.className = 'win-counter-display'
    secondMarkCounter.id = 'second-player-counter'
    secondMarkCounter.textContent = `${gameObject.secondPlayer.marker} has won ${gameObject.secondPlayer.counter} times`    
    winCounterContainer.appendChild(secondMarkCounter)
}

function winAnouncer(win, player) {
    if(win){
        alert(`${player} wins!`)
        if(player === gameObject.firstPlayer.marker){
            gameObject.firstPlayer.counter++
            const firstMark = document.querySelector('#first-player-counter')
            firstMark.textContent = `${gameObject.firstPlayer.marker} has won ${gameObject.firstPlayer.counter} times`
        } else {
            gameObject.secondPlayer.counter++
            const secondMark = document.querySelector('#second-player-counter')
            secondMark.textContent = `${gameObject.secondPlayer.marker} has won ${gameObject.secondPlayer.counter} times`
        }
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