let gameObject = {
    playerMarker: 'O',
    nextPlayer: 'X',
    gameBoard:  [
        ['','',''],
        ['','',''],
        ['','','']
    ]
}
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
}
createGameBoard()

const allGameDivs = document.querySelectorAll('.game-div')
allGameDivs.forEach(element => element.addEventListener('click', clickHandler))

function clickHandler(event) {
    event.target.textContent = gameObject.playerMarker
    const idCordinates = event.target.id.split('')
    const row = idCordinates[0]
    const column = idCordinates[1]
    gameObject.gameBoard[row][column] = gameObject.playerMarker
    gameObject.playerMarker = gameObject.nextPlayer
    gameObject.nextPlayer = event.target.textContent
    playerMarkerDisplay.textContent = gameObject.playerMarker
    checkWinner()

}

function checkWinner() {
    //this works, but I need to loop through this.
    // gameObject.gameBoard[i][i] in a loop should work.
        //diagonal
        let win = false
        if(gameObject.gameBoard[0][0] === gameObject.nextPlayer
            && gameObject.gameBoard[1][1] === gameObject.nextPlayer
            && gameObject.gameBoard[2][2] === gameObject.nextPlayer){
            win = true
        }
        //other diagonal
        if(gameObject.gameBoard[0][2] === gameObject.nextPlayer
            && gameObject.gameBoard[1][1] === gameObject.nextPlayer
            && gameObject.gameBoard[2][0] === gameObject.nextPlayer){
            win = true
        }
        if(win){
            alert(`${gameObject.nextPlayer} wins!`)
        }

    //rows
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[i][j] !== gameObject.nextPlayer){
                win = false
                break;
            }
        }
        if(win){
            alert(`${gameObject.nextPlayer} wins!`)
        }
    }
    //columns
    for(let i = 0; i < gameObject.gameBoard.length; i++){
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][i] !== gameObject.nextPlayer){
                win = false
                break;
            }
        }
        if(win){
            alert(`${gameObject.nextPlayer} wins!`)
        }
    }

}

//okay what do I need to do.
// if 