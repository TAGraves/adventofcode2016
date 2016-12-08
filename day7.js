const INPUT = `\
aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`;

function parseInput(input) {
    return input.split('\n').map((str) => {
        const regex = /\[.*?\]/g;
        const hypernets = str.match(regex);
        const supernets = str.split(regex);
        return { hypernets, supernets };
    });
}

function hasAbba(sequence) {
    return /(.)(?!\1)(.)\2\1/.test(sequence);
}

function findAbas(supernet) {
    const matches = [];
    let match;
    let remainingString = supernet;
    while ((match = /(.)(?!\1)(.)\1/g.exec(remainingString)) !== null) {
        matches.push(match[0]);
        remainingString = remainingString.substr(match.index + 1);
    }
    return matches;
}

function findAllAbas(supernets) {
    return supernets.map(findAbas).reduce((abaArray, abas) => [...abaArray, ...abas], []);
}

function hasBab(hypernet, aba) {
    const bab = aba[1] + aba[0] + aba[1];
    return !!hypernet.match(bab);
}

function hasSomeBab(hypernets, aba) {
    return !!hypernets.filter(hypernet => hasBab(hypernet, aba)).length;
}

function supportsSSL(ip) {
    return !!findAllAbas(ip.supernets).filter(hasSomeBab.bind(null, ip.hypernets)).length;
}

function supportsTLS(ip) {
    return !!ip.supernets.filter(hasAbba).length && !ip.hypernets.filter(hasAbba).length;
}

function countHowManySupportSSL(input) {
    const ips = parseInput(input);
    return ips.filter(supportsSSL).length;
}

function countHowManySupportTLS(input) {
    const ips = parseInput(input);
    return ips.filter(supportsTLS).length;
}

console.log(countHowManySupportSSL(INPUT));