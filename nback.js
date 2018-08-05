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

const nSize = 6;
const fieldSize = 400;
const blockSize = (fieldSize/nSize);

let blocks = '';

for(let i = 0; i < nSize; i++) {
  for(let j = 0; j < nSize; j++) {
    blocks += fieldBlockConstructor(i, j, blockSize);
  }
}

const chain = [];

function startChain() {
    setInterval(() => {
        let randI = Math.floor((Math.random() * ( nSize - 1 )+ 1));
        let randJ = Math.floor((Math.random() * ( nSize - 1 )+ 1));classList
        const block = document.querySelector(`#block-${randI}-${randJ}`);
        console.log(randI, randJ)
        block.classList.remove('invisible');
    },1000);
}

document.body.innerHTML = `<div class="container">
    <div class="game-container">
        ${blocks}
    </div>
    <div class="button-container">
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
  display:relative
}

.button-container {
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
}

.start-button {
  width:100px;
  height:50px;
  text-align:center;
  line-height: 50px;
  background-color:red
}
`;
document.body.appendChild(css);
