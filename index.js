const { count } = require('console');

fs = require('fs');

function resolveInput(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    return data.split('\r\n').map(line => line.split(' '));
}

function checkOldPasswordValid(demanded, recurring, password) {
    const [minRec, maxRec] = demanded.split('-');
    recurring = recurring.replace(':', '');
    var counter = 0;
    password.split('').forEach(c => {
        if (c === recurring) {
            counter++;
        }
    });
    return minRec <= counter && counter <= maxRec;
}

function checkNewPasswordValid(positions, expected, password) {
    const [pos1, pos2] = positions.split('-');
    expected = expected.replace(':', '');
    return password[pos1 - 1] === expected ^ password[pos2 - 1] === expected;
}

const input = resolveInput('input.txt');

var counter = 0;

input.forEach(line => {
    const [demanded, recurring, password] = line;
    if (checkOldPasswordValid(demanded, recurring, password)) {
        counter++;
    }
});

console.log(counter);

var counter = 0;

input.forEach(line => {
    const [positions, expected, password] = line;
    if (checkNewPasswordValid(positions, expected, password)) {
        counter++;
    }
});

console.log(counter);