const INPUT = `\
ULL
RRDDD
LURDL
UUUUD`;

const KEYPAD = `\
  1
 234
56789
 ABC
  D`;

function processInput(input) {
    return input.split('\n').map(line => line.split(''));
}

function processLine(line, startingSpot, keypad) {
    return line.reduce(lineReducer, startingSpot);
}

function findInKeypad(character, keypad) {
    let line = 0;
    let index = 0;
    keypad.forEach((keypadLine, i) => {
        const place = keypadLine.indexOf(character);
        if (place !== -1) {
            line = i;
            index = place;
        }
    });
    return { line, index };
}

function lineReducer(keypad, startingSpot, instruction) {
    const spotClone = Object.assign({}, startingSpot);
    switch (instruction) {
        case 'U':
            if (startingSpot.line !== 0) spotClone.line -= 1;
            break;
        case 'R':
            if (keypad[startingSpot.line].length - 1 > startingSpot.index) spotClone.index += 1;
            break;
        case 'D':
            if(keypad.length - 1 > startingSpot.line) spotClone.line += 1;
            break;
        case 'L':
            if (startingSpot.index !== 0) spotClone.index -= 1;
            break;
    }
    const key = keypad[spotClone.line][spotClone.index];
    console.log(startingSpot, instruction, spotClone, key);
    return (key && key !== ' ') ? spotClone : startingSpot;
}

function decipher(code, keypad) {
    return code.map(location => keypad[location.line][location.index]).join('');
}

function findKeyCode(input, keypadInput) {
    const lines = processInput(input);
    const keypad = processInput(keypadInput);
    const startingSpot = '5';
    let start = findInKeypad(startingSpot, keypad);
    const reducer = lineReducer.bind(null, keypad);
    const code = lines.map((line) => {
        start = line.reduce(reducer, start);
        return start;
    });
    return decipher(code, keypad);
}

console.log(findKeyCode(INPUT, KEYPAD));