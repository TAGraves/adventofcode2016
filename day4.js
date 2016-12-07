const ROOMLIST = ``;

function getRooms(roomList) {
    return roomList.split('\n').map((room) => {
        const split = room.split(/\[|\]/g);
        const sector = room.match(/\-(\d+)\[/);
        return {
            name: split[0].replace(/\d/g, ''),
            checksum: split[1],
            sector: parseInt(sector[1], 10),
        };
    });
}

function countCharacters(str) {
    return str.split('').reduce((counts, char) => {
        if (!counts[char]) {
            counts[char] = 1;
        } else {
            counts[char] += 1;
        }
        return counts;
    }, {});
}

function checkRoomValidity({ name, checksum }) {
    const count = countCharacters(name.replace(/-/g, ''));
    return generateChecksum(count) === checksum;
}

function generateChecksum(count) {
    const chars = Object.keys(count);
    return chars.sort((a, b) => {
        const sub = count[b] - count[a];
        if (sub === 0) {
            return (a < b) ? -1 : 1;
        }
        return sub;
    }).slice(0, 5).join('');
}

function getValidRooms(roomList) {
    const rooms = getRooms(roomList);
    return rooms.filter(checkRoomValidity);
}

function getRoomName(room) {
    const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const rotation = room.sector % 26;
    return room.name.split('').map(char => {
        if (char === '-') return char;
        const index = alph.indexOf(char) + rotation;
        return alph[index] || alph[index - 26];
    }).join('');
}

function getValidRoomNames(roomList) {
    const validRooms = getValidRooms(roomList);
    return validRooms.map(getRoomName);
}

function findNorthPoleRoom(roomList) {
    const validRooms = getValidRooms(roomList);
    const rooms = validRooms.map(getRoomName);
    let possibilities = [];
    rooms.forEach((name, i) => {
        if (name.match(/north/)) possibilities.push({ name, room: validRooms[i] });
    });
    return possibilities;
}

console.log(findNorthPoleRoom(ROOMLIST));