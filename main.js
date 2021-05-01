let gameObject = {
    playerMarker: 'O',
    nextPlayer: 'X'
}

const allGameDivs = document.querySelectorAll('.game-div')
const playerMarkerDisplay = document.querySelector('.playerturn span')
allGameDivs.forEach(element => element.addEventListener('click', clickHandler))

function clickHandler(event) {
    event.target.textContent = gameObject.playerMarker
    gameObject.playerMarker = gameObject.nextPlayer
    gameObject.nextPlayer = event.target.textContent
    playerMarkerDisplay.textContent = gameObject.playerMarker
}

function gameBoard() {
    playerMarkerDisplay.textContent = gameObject.playerMarker
}
gameBoard()