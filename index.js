const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''
let scorePlayer1 = 0
let scorePlayer2 = 0

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').textContent = playerInput.value
}

function updateScoreboard() {
  document.getElementById('scorePlayer1').textContent = scorePlayer1
  document.getElementById('scorePlayer2').textContent = scorePlayer2
}

function initializeGame() {
  // Inicializa as variáveis globais 
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1'
  // Ajusta o título da página
  document.querySelector('h2').textContent = 'Vez de: '
  const turnPlayerSpan = document.createElement('span')
  turnPlayerSpan.id = 'turnPlayer'
  document.querySelector('h2').appendChild(turnPlayerSpan)
  updateTitle()
  // Limpa o tabuleiro e adiciona os eventos de clique
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.textContent = ''
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
  })
  updateScoreboard() // Atualiza o placar na inicialização do jogo
}

// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
  const winRegions = []
  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

// Desabilita uma região do tabuleiro para que não seja mais possível clicar
function disableRegion(element) {
  element.classList.remove('cursor-pointer')
  element.removeEventListener('click', handleBoardClick)
}

// Pinta as regiões que fizeram o player vencer e desabilita o tabuleiro
function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').textContent = playerName + ' venceu!'
  
  // Atualizar o placar
  if (turnPlayer === 'player1') {
    scorePlayer1++
  } else {
    scorePlayer2++
  }
  updateScoreboard()
  
  // Desabilitar cliques em todas as regiões
  boardRegions.forEach(disableRegion)
}

function handleBoardClick(ev) {
  // Obter índices das regiões
  const span = ev.currentTarget
  const region = span.dataset.region // N.N
  const rowColumnPair = region.split('.') // ["N", "N"]
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  // Marca a região clicada com X no caso de player 1 e O no caso de player 2
  if (turnPlayer === 'player1') {
    span.textContent = 'X'
    vBoard[row][column] = 'X'
  } else {
    span.textContent = 'O'
    vBoard[row][column] = 'O'
  }
  // Limpa o console e exibe o tabuleiro 
  console.clear()
  console.table(vBoard)
  // Desabilita a região clicada
  disableRegion(span)
  // Verificar se teve algum vencedor
  const winRegions = getWinRegions()
  if (winRegions.length > 0) {
    handleWin(winRegions)
  } else if (vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    document.querySelector('h2').textContent = 'Empate!'
  }
}

// Botão para iniciar ou recomeçar o jogo
document.getElementById('start').addEventListener('click', initializeGame)
