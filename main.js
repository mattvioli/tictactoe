let gameObject = {
    playerMarker: 'O',
    nextPlayer: 'X'
}

const allGameDivs = document.querySelectorAll('.game-div')
allGameDivs.forEach(element => element.addEventListener('click', clickHandler))

function clickHandler(event) {
    event.target.textContent = gameObject.playerMarker
    gameObject.playerMarker = gameObject.nextPlayer
    gameObject.nextPlayer = event.target.textContent
}