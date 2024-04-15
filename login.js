const axios = require('axios').default;
const NextCaptcha = require('nextcaptcha-ts').default;
const puppeteer= require('puppeteer');

const clientKey = process.env.NEXTCAPTCHA_KEY || '';
const client = new NextCaptcha(clientKey);

const websiteKey='6LddGoYgAAAAAHD275rVBjuOYXiofr1u4pFS5lHn'
const url = 'https://onlyfans.com';

async function main() {

    if (process.argv.slice(2).length !== 2) {
        console.log('Usage: register.js <email> <password>');
        process.exit(0);
    }
    const [email, password, name] = process.argv.slice(2)
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    const token = await client.recaptchaV2Enterprise({websiteKey, websiteURL: url, pageAction: 'login'});

    page.on('request', async interceptedRequest => {

        if ( interceptedRequest.url().includes('/api2/v2/users/login')) {
            const originData = JSON.parse(interceptedRequest.postData());
            delete originData['e-recaptcha-response'];
            delete originData['ec-recaptcha-response'];

            const overrides = {
                'method': 'POST',
                postData: JSON.stringify({
                    ...originData,
                    "ec-recaptcha-response": token.solution.gRecaptchaResponse,
                }),
                'headers': {
                    ...interceptedRequest.headers()
                },
            };
            await interceptedRequest.continue(overrides);
        } else {
            await interceptedRequest.continue();
        }
    })

    page.on('response', async (response) => {
        const url = response.url();
        const status = response.status();
        const headers = response.headers();

        if (url.includes('/api2/v2/users/login')) {
            if (status === 200) {
                console.log('login success');
                process.exit(0);
            } else {
                console.error('register failed', await response.json());
                process.exit(0);
            }
        }
    });

    await page.goto(url, {
        waitUntil: 'networkidle0',
    });


    const emailInput = await page.waitForSelector('[name="email"]');
    await emailInput.focus();
    await emailInput.type(email);

    const passwordInput = await page.waitForSelector('[name="password"]');
    await passwordInput.focus();
    await passwordInput.type(password);
    const submitElement = await page.waitForSelector('[at-attr="submit"]');
    await submitElement.click();

}

main()