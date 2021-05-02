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
        for(let i = 0; i < gameObject.gameBoard.length; i++) {
        let win = true
        for(let j = 0; j < gameObject.gameBoard[i].length; j++){
            if(gameObject.gameBoard[j][j] !== gameObject.nextPlayer){
                win = false
                break;
            }
        }
            if(win){
                alert(`${gameObject.nextPlayer} wins!`)
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
                if(gameObject.gameBoard[diagColumn - j][j] !== gameObject.nextPlayer){
                    win = false
                    console.log(gameObject.gameBoard[-j][j])
                    break;
                }
            }
                if(win){
                    alert(`${gameObject.nextPlayer} wins!`)
                }
                break
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