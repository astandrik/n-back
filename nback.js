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
    </div>
    <div id='main-menu-screen'>
          <input type="text" value="${chainSize + 1}" onchange="(${ chainTypeChange })(event)">Длина цепи</input>
          <input type="text" value="${timeout}" onchange="(${ timeoutChange })(event)">Задержка(мс.)</input>
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

input {
  margin-top: 10px;
}
`;
document.body.appendChild(css);
