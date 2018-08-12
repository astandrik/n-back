let innerChildConstructor = function(i, j, blockSize) {
    return `<div id="block-${i}-${j}" class='invisible' style='width:${blockSize - 6}px;background-color:red;height:${blockSize - 6}px;margin:auto'>

    </div>`;
}

let fieldBlockConstructor = function(i, j, blockSize) {
    return `<div class='block'
     style='position:absolute;width:${blockSize - 4}px;background-color:white;display:flex;white;height:${blockSize - 4}px;top:${j*(blockSize)}px;left:${i*blockSize}px'>
      ${innerChildConstructor(i, j, blockSize)}
    </div>`;
}

const nSize = 3;
const fieldSize = 400;
const blockSize = (fieldSize/nSize);

let blocks = '';

for(let i = 0; i < nSize; i++) {
  for(let j = 0; j < nSize; j++) {
    blocks += fieldBlockConstructor(i, j, blockSize);
  }
}

const chain = [];

let debugMode = false;
let chainSize = 1;
let timeout = 2000;

function chainTypeChange(e) {
  const value = e.target.value;
  chainSize = value;
}

function timeoutChange(e) {
  const value = e.target.value;
  timeout = value;
}

function debugModeChange(e) {
  const value = e.target.checked;
  debugMode = value;
  if (debugMode === true) {
    document.querySelector('.debug-info').classList.remove('no-display');
  } else {
    document.querySelector('.debug-info').classList.add('no-display');
  }
}

function updateChainDebugInfo() {
  const chainArray = `<div>${chain.map((item, index) => `<div class='chain-row' id="debug-chain-${index}"><span>${item.i} </span><span> ${item.j}</span></div>`).reverse().join('')}</div>`;
  const currentIndex = chain.length - 1;
  document.querySelector('.chain-container').innerHTML = chainArray;
  document.querySelector(`#debug-chain-${currentIndex}`).classList.add('bold');
  const prev = document.querySelector(`#debug-chain-${currentIndex - chainSize - 1}`);
  if (prev) {
    prev.classList.add('bold');
  }
}

function handleSuccess() {
    let elementToCompare = chain[chain.length - chainSize - 2];
    let currentElement= chain[chain.length - 1];
    if (elementToCompare.i === currentElement.i && elementToCompare.j === currentElement.j) {
      alert('success');
    } else {
      alert('failure');
    }
}

function startChain() {
    document.getElementById('main-menu-screen').classList.add('no-display');
    document.getElementById('game-screen').classList.remove('no-display');
    setInterval(() => {
        const prevBlock = chain[chain.length - 1];
        let oldBlockDiv = null;
        if (prevBlock) {
          oldBlockDiv = document.querySelector(`#block-${prevBlock.i}-${prevBlock.j}`);
          oldBlockDiv.classList.add('going-to-dissapear');
        }
        setTimeout(() => {
          if(oldBlockDiv) {
            oldBlockDiv.classList.remove('going-to-dissapear');
            oldBlockDiv.classList.add('invisible');
          }
          let randI = Math.floor((Math.random() * ( nSize )));
          let randJ = Math.floor((Math.random() * ( nSize )));
          const block = document.querySelector(`#block-${randI}-${randJ}`);
          block.classList.remove('invisible');
          chain.push({i: randI, j: randJ });
          updateChainDebugInfo();
        }, 200);
    }, timeout);
}

document.body.innerHTML = `<div class="container">
    <div id="game-screen" class="no-display">
      <div class="game-container">
          ${blocks}
      </div>
      <div class="button-container">
        <div class="success-button" onclick="(${ handleSuccess })()">Совпадение</div>
      </div>
      <div class="debug-info no-display">
          <div class='chain-container'>

          </div>
      </div>
    </div>
    <div id='main-menu-screen'>
          <input type="text" value="${chainSize}" onchange="(${ chainTypeChange })(event)">Длина цепи</input>
          <input type="text" value="${timeout}" onchange="(${ timeoutChange })(event)">Задержка(мс.)</input>
          <input type="checkbox" onchange="(${ debugModeChange })(event)">Режим дебага</input>
          <div class="start-button" onclick="(${ startChain })()">Начать</div>
    </div>
</div>`;


var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = `.container {
    width:${fieldSize}px;
}

.invisible {
  visibility: hidden;
}

.game-container {
  background-color:black;
  height:${fieldSize}px;
  width:${fieldSize}px;
  position: relative;
  border-left: 4px solid black;
  border-top: 4px solid black;
}

.button-container {
  display:flex;
  justify-content:space-between;
  align-items:center;
  cursor:pointer;
}

.going-to-dissapear {
  visibility: hidden;
}

.success-button {
  width:100px;
  height:50px;
  text-align:center;
  line-height: 50px;
  background-color:green;
}

.start-button {
  width:100px;
  height:50px;
  text-align:center;
  line-height: 50px;
  background-color:red
}

body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.no-display {
   display: none!important;
}

#main-menu-screen {
  display: flex;
  flex-direction: column;
}

.chain-container {
  display: flex;
  flex-direction: column;
}

input {
  margin-top: 10px;
}

.debug-info {
  position: absolute;
  top: 25px;
  left: 25px;
}

.bold {
  font-weight: bold;
  font-size: 30px;
}
`;
document.body.appendChild(css);
