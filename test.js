const assert = require('assert');
const webdriver = require('selenium-webdriver');
const firefoxDriver = require('selenium-webdriver/firefox');

describe('Cat', function () {
    let driver = null;

    this.timeout(10000);

    before(async () => {
        const fxOptions = new firefoxDriver.Options();

        fxOptions.headless();

        driver = await new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(fxOptions).build();

        await driver.get(`file://${__dirname}/index.html`);
    });

    describe('Groom', () => {
        it('should yield only one purr', async () => {
            await driver.findElement(webdriver.By.css('button#groom')).click();
            assert.strictEqual(await driver.findElement(webdriver.By.css('div#purrs')).getAttribute('textContent'), 'Purrr');
        });

        it('should yield the second purr without spaces inbetween', async () => {
            await driver.findElement(webdriver.By.css('button#groom')).click();
            assert.strictEqual(await driver.findElement(webdriver.By.css('div#purrs')).getAttribute('textContent'), 'PurrrPurrr');
        });
    })
});
