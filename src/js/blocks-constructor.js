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

export const nSize = 3;
const blockSize = (400/nSize);

function createBlocks() {
  let blocks = '';
  for(let i = 0; i < nSize; i++) {
    for(let j = 0; j < nSize; j++) {
      blocks += fieldBlockConstructor(i, j, blockSize);
    }
  }

  return blocks;
}

export default createBlocks;
