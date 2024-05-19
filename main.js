const aysnc = require('async');
const register = require('./register');
const { generateMail, generateRandomUsername, generatePassword } = require('./utils');

async function main() {
    await aysnc.eachLimit(new Array(50).fill(1), 10, async item => {
        const email = generateMail(10);
        const username = generateRandomUsername(6, 10);
        const password = generatePassword();
        await register(email, password, username);
    })
    console.log('done')
}
main();