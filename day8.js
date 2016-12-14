const INPUT = `\
rect 1x1
rotate row y=0 by 7
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 7
rect 6x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 2
rect 1x2
rotate row y=1 by 10
rotate row y=0 by 3
rotate column x=0 by 1
rect 2x1
rotate column x=20 by 1
rotate column x=15 by 1
rotate column x=5 by 1
rotate row y=1 by 5
rotate row y=0 by 2
rect 1x2
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=2 by 15
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=2 by 5
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=2 by 10
rotate row y=0 by 10
rotate column x=8 by 1
rotate column x=5 by 1
rotate column x=0 by 1
rect 9x1
rotate column x=27 by 1
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate column x=42 by 1
rotate column x=40 by 1
rotate column x=22 by 1
rotate column x=17 by 1
rotate column x=12 by 1
rotate column x=7 by 1
rotate column x=2 by 1
rotate row y=3 by 10
rotate row y=2 by 5
rotate row y=1 by 3
rotate row y=0 by 10
rect 1x4
rotate column x=37 by 2
rotate row y=3 by 18
rotate row y=2 by 30
rotate row y=1 by 7
rotate row y=0 by 2
rotate column x=13 by 3
rotate column x=12 by 1
rotate column x=10 by 1
rotate column x=7 by 1
rotate column x=6 by 3
rotate column x=5 by 1
rotate column x=3 by 3
rotate column x=2 by 1
rotate column x=0 by 1
rect 14x1
rotate column x=38 by 3
rotate row y=3 by 12
rotate row y=2 by 10
rotate row y=0 by 10
rotate column x=7 by 1
rotate column x=5 by 1
rotate column x=2 by 1
rotate column x=0 by 1
rect 9x1
rotate row y=4 by 20
rotate row y=3 by 25
rotate row y=2 by 10
rotate row y=0 by 15
rotate column x=12 by 1
rotate column x=10 by 1
rotate column x=8 by 3
rotate column x=7 by 1
rotate column x=5 by 1
rotate column x=3 by 3
rotate column x=2 by 1
rotate column x=0 by 1
rect 14x1
rotate column x=34 by 1
rotate row y=1 by 45
rotate column x=47 by 1
rotate column x=42 by 1
rotate column x=19 by 1
rotate column x=9 by 2
rotate row y=4 by 7
rotate row y=3 by 20
rotate row y=0 by 7
rotate column x=5 by 1
rotate column x=3 by 1
rotate column x=2 by 1
rotate column x=0 by 1
rect 6x1
rotate row y=4 by 8
rotate row y=3 by 5
rotate row y=1 by 5
rotate column x=5 by 1
rotate column x=4 by 1
rotate column x=3 by 2
rotate column x=2 by 1
rotate column x=1 by 3
rotate column x=0 by 1
rect 6x1
rotate column x=36 by 3
rotate column x=25 by 3
rotate column x=18 by 3
rotate column x=11 by 3
rotate column x=3 by 4
rotate row y=4 by 5
rotate row y=3 by 5
rotate row y=2 by 8
rotate row y=1 by 8
rotate row y=0 by 3
rotate column x=3 by 4
rotate column x=0 by 4
rect 4x4
rotate row y=4 by 10
rotate row y=3 by 20
rotate row y=1 by 10
rotate row y=0 by 10
rotate column x=8 by 1
rotate column x=7 by 1
rotate column x=6 by 1
rotate column x=5 by 1
rotate column x=3 by 1
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 9x1
rotate row y=0 by 40
rotate column x=44 by 1
rotate column x=35 by 5
rotate column x=18 by 5
rotate column x=15 by 3
rotate column x=10 by 5
rotate row y=5 by 15
rotate row y=4 by 10
rotate row y=3 by 40
rotate row y=2 by 20
rotate row y=1 by 45
rotate row y=0 by 35
rotate column x=48 by 1
rotate column x=47 by 5
rotate column x=46 by 5
rotate column x=45 by 1
rotate column x=43 by 1
rotate column x=40 by 1
rotate column x=38 by 2
rotate column x=37 by 3
rotate column x=36 by 2
rotate column x=32 by 2
rotate column x=31 by 2
rotate column x=28 by 1
rotate column x=23 by 3
rotate column x=22 by 3
rotate column x=21 by 5
rotate column x=20 by 1
rotate column x=18 by 1
rotate column x=17 by 3
rotate column x=13 by 1
rotate column x=10 by 1
rotate column x=8 by 1
rotate column x=7 by 5
rotate column x=6 by 5
rotate column x=5 by 1
rotate column x=3 by 5
rotate column x=2 by 5
rotate column x=1 by 5`;

function parseInput(input) {
    return input.split('\n');
}

function createScreen(length, width) {
    const screen = [];
    for (let i = 0; i < length; i += 1) {
        const row = [];
        for (let j = 0; j < width; j += 1) {
            row.push(0);
        }
        screen.push(row);
    }
    return screen;
}

function parseInstruction(screen, instruction) {
    const rectMatch = instruction.match(/rect (\d+)x(\d+)/);
    if (rectMatch) {
        return processRect(screen, parseInt(rectMatch[1], 10), parseInt(rectMatch[2], 10));
    }
    const rotateMatch = instruction.match(/rotate (row|column) (x|y)=(\d+) by (\d+)/);
    const a = parseInt(rotateMatch[3], 10);
    const b = parseInt(rotateMatch[4], 10);
    if (rotateMatch[1] === 'row') {
        return processYRotation(screen, a, b);
    }
    return processXRotation(screen, a, b);
}

function processRect(screen, x, y) {
    for (let i = 0; i < y; i += 1) {
        for (let j = 0; j < x; j += 1) {
            screen[i][j] = 1;
        }
    }
    return screen;
}

function processYRotation(screen, rowInt, amount) {
    const row = screen[rowInt];
    const newRow = row.map((val, i) => {
        return (i - amount < 0) ? row[row.length + i - amount] : row[i - amount];
    });
    screen[rowInt] = newRow;
    return screen;
}

function processXRotation(screen, colInt, amount) {
    const newScreen = screen.map(row => row.map(col => col));
    screen.forEach((row, i) => {
        newScreen[i][colInt] = (i - amount < 0) ? screen[screen.length + i - amount][colInt] : screen[i - amount][colInt];
    });
    return newScreen;
}

function addColumns(allTotal, row) {
    return row.reduce((total, value) => total + value, allTotal);
}

function followSequence(input, length, width) {
    const screen = createScreen(length, width);
    const instructions = parseInput(input);
    const sequence = instructions.reduce(parseInstruction, screen);
    return sequence.reduce(addColumns, 0);
}

function findLetters(input, length, width) {
    const screen = createScreen(length, width);
    const instructions = parseInput(input);
    const sequence = instructions.reduce(parseInstruction, screen);
    for (let c = 0; c < 50; c += 5) {
        const batch = []
        for (let i = 0; i < 6; i += 1) {
            const col = [];
            for (let j = 0; j < 5; j += 1) {
                col.push(sequence[i][j+45])
            }
            batch.push(col);
        }
        console.log(batch);
    }
}

console.log(findLetters(INPUT, 6, 50));
