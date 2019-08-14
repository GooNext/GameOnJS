var $start = document.querySelector("#start")
var $game = document.querySelector("#game")
var $time = document.querySelector("#time")
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector("#result")
var $gameTime = document.querySelector("#game-time")


var score = 0
var isGameStarted = false



$start.addEventListener("click", startGame)
$game.addEventListener("click", handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function startGame() {
	score = 0
	setGameTime ()
	$gameTime.setAttribute('disabled', true)
	$timeHeader.classList.remove ('hide')
	$resultHeader.classList.add ('hide')
	isGameStarted = false
	console.log('start')
	$start.classList.add ('hide')
	$game.style.background = 'none'

	var interval = setInterval (function(){
		var time = parseFloat($time.textContent)

		if (time <=0) {
			clearInterval (interval)
			endGame ()
		} else {
			$time.textContent = (time - 0.1).toFixed(1)
		}
	}, 100)

	renderBox ()
}

function endGame () {
	$timeHeader.classList.add ('hide')
	$resultHeader.classList.remove ('hide')
	isGameStarted = true
	setGameScore ()
	$start.classList.remove ('hide')
	$game.innerHTML = ''
	$game.style.backgroundColor = "ccc"
	$gameTime.removeAttribute('disabled')
}

function handleBoxClick(event){
	if (isGameStarted){
		return
	}
	if (event.target.dataset.box) {
		score++
		renderBox()
	}
}


function setGameScore (){
	$result.textContent = score.toString()
}

function setGameTime (){
	var time = +$gameTime.value
	$time.textContent = time.toFixed(1)
}

function renderBox (){

	$game.innerHTML = ''
	var box = document.createElement("div")
	var boxSize = getRandom (30, 100)
	var gameSize = $game.getBoundingClientRect ()
	var maxTop = gameSize.height - boxSize
	var maxLeft = gameSize.width - boxSize

	box.style.height = box.style.width = boxSize + "px"
	box.style.position = 'absolute'
	box.style.backgroundColor = '#000'
	box.style.top = getRandom (0 , maxTop) + 'px'
	box.style.top = getRandom (0, maxLeft) + 'px'
	box.style.left = '70px'
	box.style.cursor = 'pointer'
	box.setAttribute("data-box", "true")

	$game.insertAdjacentElement ('afterbegin', box)

}

function getRandom(min, max){
	return Math.floor(Math.random() * (max - min) + min) 
}
