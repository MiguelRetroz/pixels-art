function randomNumber(min, max) {
  let number = 0;
  do {
    number = Math.ceil(Math.random() * max);
  } while (number === min);
  return number;
}

function rgbCodeArrayGenerator() {
  const rgbCodes = [];
  for (let index = 1; index <= 3; index += 1) {
    rgbCodes.push(randomNumber(0, 254));
  }
  return rgbCodes;
}

function elementsComparator(arrayOfArrays, array01, array02, elementsIndex) {
  if (arrayOfArrays[array01][elementsIndex]
    === arrayOfArrays[array02][elementsIndex]) {
    return true;
  }
  return false;
}

function boxesColorCheckerInsideLoop(outLoopIndex, arrayLength, codesArray) {
  for (let index = outLoopIndex + 1; index < arrayLength; index += 1) {
    if (elementsComparator(codesArray, outLoopIndex, index, 0)
    && elementsComparator(codesArray, outLoopIndex, index, 1)
    && elementsComparator(codesArray, outLoopIndex, index, 2)) {
      return false;
    }
  }
  return true;
}

function boxesColorsCodesChecker(rgbAllBoxesCodesArray) {
  const listLength = rgbAllBoxesCodesArray.length;
  const checkResult = Object.keys(rgbAllBoxesCodesArray).map((codesArrayIndex) => {
    const outLoopIndex = parseInt(codesArrayIndex, 10);
    return boxesColorCheckerInsideLoop(outLoopIndex, listLength, rgbAllBoxesCodesArray);
  });
  return !checkResult.includes(false);
}

function rgbCodesArrayGenerator(boxesAmount) {
  let rgbStringArray = [];
  let isNotEqual = false;
  do {
    rgbStringArray = [];
    for (let index = 1; index <= boxesAmount; index += 1) {
      rgbStringArray.push(rgbCodeArrayGenerator());
    }
    isNotEqual = boxesColorsCodesChecker(rgbStringArray);
  } while (!isNotEqual);
  return rgbStringArray;
}

function rgbFormatArray(boxesAmount) {
  const colorsCodes = rgbCodesArrayGenerator(boxesAmount);
  const rgbFormat = colorsCodes.map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`);
  return rgbFormat;
}

function selectColor(event) {
  const currentSelected = document.querySelector('.selected');
  const eventTargeted = event.target;
  currentSelected.className = 'color';
  eventTargeted.className += ' selected';
}

function eventApplier(elementsList, event, action) {
  Object.values(elementsList).forEach((element) => {
    element.addEventListener(event, action);
  });
}

function colorsBoxesGenerator(boxesAmount) {
  const colorsPalette = document.querySelector('#color-palette');
  const colors = rgbFormatArray(boxesAmount);
  const blackBox = document.createElement('div');
  blackBox.className = 'color selected';
  blackBox.style.backgroundColor = 'rgb(0, 0, 0)';
  colorsPalette.appendChild(blackBox);
  for (let index = 0; index < boxesAmount; index += 1) {
    const box = document.createElement('div');
    box.className = 'color';
    box.style.backgroundColor = colors[index];
    colorsPalette.appendChild(box);
  }
  eventApplier(document.getElementsByClassName('color'), 'click', selectColor);
}

colorsBoxesGenerator(3);

function linesOfPixelBoard(lineAmount) {
  const pixelBoard = document.querySelector('#pixel-board');
  for (let index = 1; index <= lineAmount; index += 1) {
    const line = document.createElement('div');
    line.className = 'line';
    pixelBoard.appendChild(line);
  }
}

linesOfPixelBoard(5);

function pixelsOfPixelBoard() {
  const lineAmount = document.getElementsByClassName('line').length;
  const lines = document.getElementsByClassName('line');
  for (let line = 0; line < lineAmount; line += 1) {
    for (let index = 0; index < lineAmount; index += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'white';
      lines[line].appendChild(pixel);
    }
  }
}

pixelsOfPixelBoard();

function coloringPixels(event) {
  const eventTargeted = event.target;
  const colorSelected = document.querySelector('.selected');
  if (eventTargeted.classList.contains('pixel')) {
    eventTargeted.style.backgroundColor = window.getComputedStyle(colorSelected, null)
      .getPropertyValue('background-color');
  }
}

document.addEventListener('click', coloringPixels);

function clearPixelsBoard() {
  const pixelsList = document.getElementsByClassName('pixel');
  Object.values(pixelsList).forEach((pixel) => {
    const pixelCopy = pixel;
    pixelCopy.style.backgroundColor = 'white';
  });
}

const btnClearBoard = document.getElementById('clear-board');

btnClearBoard.addEventListener('click', clearPixelsBoard);

const inputBoardSize = document.getElementById('board-size');
const inputColorPaletteSize = document.getElementById('color-palette-size');

function resizeValueChecker(newSizeValue, min = 5, max = 50) {
  if (newSizeValue < min) {
    return min;
  } if (newSizeValue > max) {
    return max;
  }
  return newSizeValue;
}

function pixelsRemover() {
  const pixelsListLength = document.getElementsByClassName('line').length;
  const pixelsBoard = document.getElementById('pixel-board');
  for (let index = 0; index < pixelsListLength; index += 1) {
    pixelsBoard.removeChild(document.querySelector('.line'));
  }
}

function colorsRemover() {
  const colorsList = Object.values(document.getElementsByClassName('color'));

  colorsList.forEach((color) => color.remove());
}

function resizePixelsBoard() {
  let newSizeValue = inputBoardSize.value === '' ? 5 : parseInt(inputBoardSize.value, 10);
  newSizeValue = resizeValueChecker(newSizeValue);
  pixelsRemover();
  linesOfPixelBoard(newSizeValue);
  pixelsOfPixelBoard();
  inputBoardSize.value = newSizeValue;
}

function resizeColorPalette() {
  let newSizeValue = 3;
  if (inputColorPaletteSize.value !== '') {
    newSizeValue = resizeValueChecker(parseInt(inputColorPaletteSize.value, 10), 3, 500);
    inputColorPaletteSize.value = newSizeValue;
  }
  colorsRemover();
  colorsBoxesGenerator(newSizeValue);
}

inputBoardSize.addEventListener('input', resizePixelsBoard);
inputColorPaletteSize.addEventListener('input', resizeColorPalette);
