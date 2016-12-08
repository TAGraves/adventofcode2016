const INPUT = ``;

function parseInput(input) {
    return input.split('\n');
}

function getMostFrequentCharacterAtPosition(input, position) {
    const totalCount = input.reduce((total, str) => {
        const char = str.charAt(position);
        total[char] = (total[char]) ? total[char] + 1 : 1;
        return total;
    }, {});
    // totalCount[b] - totalCount[a] for most frequent
    return Object.keys(totalCount).sort((a, b) => totalCount[a] - totalCount[b])[0];
}

function decipherMessage(input) {
    const scrambledMessages = parseInput(INPUT);
    const length = scrambledMessages[0].length;
    let message = '';
    for (let i = 0; i < length; i += 1) {
        message += getMostFrequentCharacterAtPosition(scrambledMessages, i);
    }
    return message;
}

console.log(decipherMessage(INPUT));