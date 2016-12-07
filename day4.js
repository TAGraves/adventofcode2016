const ROOMLIST = '';
function getRooms(roomList) {
    return roomList.replace(/-/g, '').split('\n').map((room) => {
        const split = room.split(/\[|\]/g);
        const sector = room.match(/(\d+)\[/);
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
    const count = countCharacters(name);
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

function countValidRooms(roomList) {
    const rooms = getRooms(roomList);
    return rooms.filter(checkRoomValidity).reduce((total, { sector }) => total + sector, 0);
}

console.log(countValidRooms(ROOMLIST));