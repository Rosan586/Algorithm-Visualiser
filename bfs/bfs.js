const container = document.getElementById('container');
const squares = [];

// Create the grid
for (let i = 0; i < 10; i++) {
  squares[i] = [];
  for (let j = 0; j < 10; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id', `${i}-${j}`);
    container.appendChild(square);
    squares[i][j] = square;
  }
}

// Set the start node randomly
const startRow = Math.floor(Math.random() * squares.length);
const startCol = Math.floor(Math.random() * squares[0].length);
const startNode = squares[startRow][startCol];

const endNode = squares[9][9];
startNode.classList.add('start');
endNode.classList.add('end');

// Create the adjacency matrix
const adjacencyMatrix = [];
for (let i = 0; i < squares.length; i++) {
  adjacencyMatrix[i] = [];
  for (let j = 0; j < squares[i].length; j++) {
    const neighbors = [];
    if (i > 0) neighbors.push(squares[i - 1][j]);
    if (i < squares.length - 1) neighbors.push(squares[i + 1][j]);
    if (j > 0) neighbors.push(squares[i][j - 1]);
    if (j < squares[i].length - 1) neighbors.push(squares[i][j + 1]);
    adjacencyMatrix[i][j] = neighbors;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startBFS() {
  const queue = [startNode];
  const visited = new Set();
  const prev = new Map();

  while (queue.length > 0) {
    const currNode = queue.shift();
    visited.add(currNode);

    if (currNode === endNode) {
      let curr = endNode;6
      while (curr !== startNode) {
        await sleep(50);
        curr.classList.add('path');
        curr = prev.get(curr);
      }
      curr.classList.add('path');
      return;
    }

    for (const neighbor of adjacencyMatrix[currNode.getAttribute('id').split('-')[0]][currNode.getAttribute('id').split('-')[1]]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
        prev.set(neighbor, currNode);
        if (neighbor !== endNode) {
          await sleep(50);
          neighbor.classList.add('visited');
        }
      }
    }
  }
}

const reloadButton = document.getElementById('reload-button');
reloadButton.addEventListener('click', function() {
  location.reload();
});
