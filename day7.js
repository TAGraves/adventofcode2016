const INPUT = ``;

function parseInput(input) {
    return input.split('\n').map((str) => {
        const regex = /\[.*?\]/g;
        const hypernets = str.match(regex);
        const sequences = str.split(regex);
        return { hypernets, sequences };
    });
}

function hasAbba(sequence) {
    return /(.)(?!\1)(.)\2\1/.test(sequence);
}

function supportsTLS(ip) {
    return ip.sequences.filter(hasAbba).length && !ip.hypernets.filter(hasAbba).length;
}

function countHowManySupportTLS(input) {
    const ips = parseInput(input);
    return ips.filter(supportsTLS).length;
}

console.log(countHowManySupportTLS(INPUT));