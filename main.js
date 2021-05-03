let gameObject = {
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
    ],
}
let currentPlayer = gameObject.firstPlayer.marker
//need to rewrite logic that changes who the current player is

const playerMarkerDisplay = document.querySelector('.playerturn span')

function createGameBoard() {
    const gameBoardDisplay = document.querySelector('.game-board')
    playerMarkerDisplay.textContent = gameObject.playerMarker
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
    event.target.textContent = currentPlayer 
    const idCordinates = event.target.id.split('')
    const row = idCordinates[0]
    const column = idCordinates[1]
    gameObject.gameBoard[row][column] = currentPlayer 
    playerMarkerDisplay.textContent = currentPlayer
    if(currentPlayer  === gameObject.firstPlayer.marker) {
        currentPlayer = gameObject.secondPlayer.marker
    } else {
        currentPlayer  = gameObject.firstPlayer.marker

    }
    checkWinner()
}

function checkWinner(playerMarker) {
    //this works, but I need to loop through this.
    // gameObject.gameBoard[i][i] in a loop should work.
        //diagonal
        for(let i = 0; i < gameObject.gameBoard.length; i++) {
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][j] !== currentPlayer){
                win = false
                break;
            }
        }
            if(win){
                alert(`${currentPlayer} wins!`)
            }
            break
            //break needed otherwise it alerts three times
        }
        //other diagonal
         //diagonal
         for(let i = 0; i < gameObject.gameBoard.length; i++) {
            let win = true
            for(let j = 0; j < gameObject.gameBoard[i].length; j++){
                const diagColumn = gameObject.gameBoard[i].length - 1
                if(gameObject.gameBoard[diagColumn - j][j] !== currentPlayer){
                    win = false
                    console.log(gameObject.gameBoard[-j][j])
                    break;
                }
            }
                if(win){
                    alert(`${currentPlayer} wins!`)
                }
                break
            }

    //rows
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[i][j] !== currentPlayer){
                win = false
                break;
            }
        }
        if(win){
            alert(`${currentPlayer} wins!`)
        }
    }
    //columns
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][i] !== currentPlayer){
                win = false
                break;
            }
        }
        if(win){
            alert(`${currentPlayer} wins!`)
        }
    }
}

function winCounter() {
    const winCounterContainer =  document.querySelector('.win-counter')

    const firstMarkCounter = document.createElement('div')
    firstMarkCounter.className = 'win-counter-display'
    firstMarkCounter.textContent = `${gameObject.firstPlayer.marker} has won ${gameObject.firstPlayer.counter} times`    
    winCounterContainer.appendChild(firstMarkCounter)

    const secondMarkCounter = document.createElement('div')
    secondMarkCounter.className = 'win-counter-display'
    secondMarkCounter.textContent = `${gameObject.secondPlayer.marker} has won ${gameObject.secondPlayer.counter} times`    
    winCounterContainer.appendChild(secondMarkCounter)
}