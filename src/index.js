import createBlocks, { nSize } from './js/blocks-constructor';

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


document.querySelector('.game-container').innerHTML = createBlocks();

document.querySelector('#timeoutInput').addEventListener('change', timeoutChange);
document.querySelector('#timeoutInput').value = timeout;

document.querySelector('#debugInput').addEventListener('change', debugModeChange);

document.querySelector('#chainSizeInput').addEventListener('change', chainTypeChange);
document.querySelector('#chainSizeInput').value = chainSize;

document.querySelector('.start-button').addEventListener('click', startChain);
document.querySelector('.success-button').addEventListener('click', handleSuccess);
