const INPUT = 'R5, L2, L1, R1, R3, R3, L3, R3, R4, L2, R4, L4, R4, R3, L2, L1, L1, R2, R4, R4, L4, R3, L2, R1, L4, R1, R3, L5, L4, L5, R3, L3, L1, L1, R4, R2, R2, L1, L4, R191, R5, L2, R46, R3, L1, R74, L2, R2, R187, R3, R4, R1, L4, L4, L2, R4, L5, R4, R3, L2, L1, R3, R3, R3, R1, R1, L4, R4, R1, R5, R2, R1, R3, L4, L2, L2, R1, L3, R1, R3, L5, L3, R5, R3, R4, L1, R3, R2, R1, R2, L4, L1, L1, R3, L3, R4, L2, L4, L5, L5, L4, R2, R5, L4, R4, L2, R3, L4, L3, L5, R5, L4, L2, R3, R5, R5, L1, L4, R3, L1, R2, L5, L1, R4, L1, R5, R1, L4, L4, L4, R4, R3, L5, R1, L3, R4, R3, L2, L1, R1, R2, R2, R2, L1, L1, L2, L5, L3, L1';
const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const startingDirection = 'NORTH';

function parseInput(input) {
    return input.trim().split(', ').map(parseInstruction);
}

function parseInstruction(instruction) {
    const direction = instruction.charAt(0);
    const distance = parseInt(instruction.substr(1), 10);
    return { direction, distance };
}

function processInstruction(instruction, currentDirection) {
    findNewDirection(instruction.direction, currentDirection);
}

function findNewDirection(turnDirection, currentDirection) {
    const index = DIRECTIONS.indexOf(currentDirection);
    let newIndex = (turnDirection === 'R') ? index + 1 : index - 1;
    if (newIndex === 4) newIndex = 0;
    if (newIndex === -1) newIndex = 3;
    return DIRECTIONS[newIndex];
}

function instructionReducer(currentDistance, instruction) {
    const newDistance = currentDistance;
    const newDirection = findNewDirection(instruction.direction, currentDistance.currentDirection);
    const positive = newDirection === 'NORTH' || newDirection === 'EAST';
    if (positive) {
        newDistance[newDirection] += instruction.distance;
    } else {
        const direction = (newDirection === 'SOUTH') ? 'NORTH' : 'EAST';
        newDistance[direction] -= instruction.distance;
    }
    newDistance.currentDirection = newDirection;
    return newDistance;
}

function findTotalDistance(input, startingDirection) {
    const instructions = parseInput(input);
    const distance = {
        NORTH: 0,
        EAST: 0,
        currentDirection: startingDirection,
    };
    const totalDistance = instructions.reduce(instructionReducer, distance);
    return Math.abs(totalDistance.NORTH) + Math.abs(totalDistance.EAST);
}

const activityA = findTotalDistance(INPUT, startingDirection);

const startingLocation = [0, 0]; // [N, E]

function twiceReducer(locationData, instruction) {
    const newData = locationData;
    const newDirection = findNewDirection(instruction.direction, locationData.currentDirection);
    const positive = newDirection === 'NORTH' || newDirection === 'EAST';
    const directionIndex = DIRECTIONS.indexOf(newDirection);
    const whichWay = directionIndex % 2;
    for (let i = 1; i < instruction.distance + 1; i += 1) {
        if (positive) {
            newData.currentLocation[whichWay] += 1;
        } else {
            const direction = (newDirection === 'SOUTH') ? 'NORTH' : 'EAST';
            newData.currentLocation[whichWay] -= 1;
        }
        const directionString = newData.currentLocation.join(',');
        if (newData.attendedLocations.indexOf(directionString) !== -1 && !newData.firstVisitedLocation) newData.firstVisitedLocation = directionString;
        newData.attendedLocations.push(directionString);
    }
    newData.currentDirection = newDirection;
    return newData;
}

function findTwiceToldLocation(input, startingDirection, startingLocation) {
    const instructions = parseInput(input);
    const locationData = {
        attendedLocations: [],
        firstVisitedLocation: null,
        currentDirection: startingDirection,
        currentLocation: startingLocation,
    };
    const twiceToldLocation = instructions.reduce(twiceReducer, locationData);
    const location = twiceToldLocation.firstVisitedLocation.split(',');
    return Math.abs(parseInt(location[0], 10)) + Math.abs(parseInt(location[1], 10));
}

const activityB = findTwiceToldLocation(INPUT, startingDirection, startingLocation);
