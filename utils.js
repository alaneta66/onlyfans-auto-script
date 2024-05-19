const { random } = require('lodash/number');

function generateRandomUsername(lengthLetters, lengthNumbers) {
    let resultLetters = '';
    let resultNumbers = '';
    const charactersLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersNumbers = '0123456789';
    const charactersLengthLetters = charactersLetters.length;
    const charactersLengthNumbers = charactersNumbers.length;
    for (let i = 0; i < lengthLetters; i++) {
        resultLetters += charactersLetters.charAt(Math.floor(Math.random() * charactersLengthLetters));
    }
    for (let i = 0; i < lengthNumbers; i++) {
        resultNumbers += charactersNumbers.charAt(Math.floor(Math.random() * charactersLengthNumbers));
    }
    return resultLetters + resultNumbers;
}

function generatePassword() {
    const digits = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()';
    const allChars = digits + letters + specialChars;

    let password = '';
    password += digits[Math.floor(Math.random() * digits.length)];
    password += letters[Math.floor(Math.random() * letters.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = 3; i < 10; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle password characters
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

function generateMail(len_email) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len_email; i++) {
        result += chars[random(0, chars.length)];
    }
    const domains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@protonmail.com'];
    result += domains[random(0, domains.length)];
    return result;
}

module.exports = {
    generateRandomUsername,
    generateMail,
    generatePassword
}