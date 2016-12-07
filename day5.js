const input = 'reyedfim';

function md5(str) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}

function getPassword(input) {
    let password = '';
    let i = 0;
    while (password.length < 8) {
        const hash = md5(input + i);
        if (hash.startsWith('00000')) {
            password += hash.substr(5, 1);
        }
        i += 1; 
    }

    return password;
}

function getPasswordWithIndices(input) {
    const password = [];
    let i = 0;
    while (Object.keys(password).length < 8) {
        const hash = md5(input + i);
        if (hash.startsWith('00000')) {
            const index = parseInt(hash.substr(5, 1));
            if (index < 8 && !password[index]) {
                password[index] = hash.substr(6, 1);
                console.log(password);
            }
        }
        i += 1; 
    }

    return password.join('');
}

console.log(getPasswordWithIndices(input));

