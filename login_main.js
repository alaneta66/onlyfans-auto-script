const aysnc = require('async');
const fs = require('fs');
const login = require('./login');

async function login_main() {
    const list = fs.readFileSync('./data/account.txt', 'utf-8')
        .split('/n')
        .map(item => {
            const [email, password, username] = item.split('|');
            return {
                email, password, username
            }
        })
    await aysnc.eachLimit(list, 10, async ({ email, password, username }) => {

        await login(email, password, username);
    })
    console.log('done')
}

login_main();