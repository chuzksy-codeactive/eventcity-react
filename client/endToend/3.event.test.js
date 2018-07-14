const path = require('path');
const faker = require('faker');
const APP_BASE_URL = "http://localhost:8090";
const imagePath = path.resolve('/User');
let urlPath;

module.exports = {
  "before": function (browser, done) {
    browser.maximizeWindow(done);
  },
  "User should be able to log in as Admin": browser => {
    browser
      .url(`${APP_BASE_URL}/login`)
      .waitForElementVisible("body", 2000)
      .clearValue("#sigin-name")
      .clearValue("#sigin-password")
      .pause(1000)
      .setValue("#sigin-name", "chikason")
      .pause(1000)
      .setValue("#sigin-password", "password")
      .click("#sigin-button")
      .pause(1000)
      .assert.urlEquals(`${APP_BASE_URL}/centers`)
      .pause(1000)
  },
  "User should be able to book an event": browser => {
    browser
      .assert.elementPresent('#more-details')
      .getAttribute("#more-details", 'href', function (result) {
        urlPath = result.value;
        console.log(urlPath)
        this.click('#more-details')
        this.pause(2000)
        this.waitForElementVisible('#book-now', 2000)
        this.click('#book-now')
        this.pause(2000)
        this.assert.urlEquals(`${APP_BASE_URL}${urlPath}`)
        this.assert.elementPresent('input[name=name]')
        this.assert.elementPresent('input[name=purpose]')
        this.assert.elementPresent('textarea[name=note]')
        this.assert.elementPresent('div[aria-label="Mon Jul 30 2018"]')
        this.assert.elementPresent('div[aria-label="Tue Jul 31 2018"]')
        this.setValue('input[name=name]', 'Andela Meetup')
        this.pause(1000)
        this.setValue('input[name=purpose]', 'Pair Programming')
        this.pause(1000)
        this.setValue('textarea[name=note]', 'Pair Programming')
        this.pause(1000)
        this.click('div[aria-label="Mon Jul 30 2018"]')
        this.pause(1000)
        this.click('div[aria-label="Tue Jul 31 2018"]')
        this.pause(1000)
        this.assert.elementPresent('#close-button')
        this.click('#close-button')
        this.pause(5000)
        this.click('#close-modal')
        this.pause(5000)
      })
  },
  "User should be able to view center for an event": browser => {
    browser
      .waitForElementVisible('body', 2000)
      .assert.elementPresent('#event-link')
      .click('#event-link')
      .pause(1000)
      .assert.elementPresent('#view-link')
      .click('#view-link')
      .pause(1000)
      .waitForElementVisible('#event-list', 2000)
      .assert.elementPresent('#event-list')
      .assert.elementPresent('i[class=ion-android-arrow-dropdown]')
      .click('i[class=ion-android-arrow-dropdown]')
      .pause(1000)
      .click('i[class=ion-android-arrow-dropdown]')
      .pause(1000)
      .click('i[class=ion-android-arrow-dropdown]')
  },
  "User should be able to view booked events": browser => {
    browser
      .waitForElementVisible('body', 2000)
      .assert.elementPresent('#event-link')
      .click('#event-link')
      .pause(1000)
      .assert.elementPresent('#view-link')
      .click('#view-link')
      .pause(1000)
      .waitForElementVisible('#event-list', 2000)
      .assert.elementPresent('#event-list')
      .assert.elementPresent('i[class="ion-edit ion-icon"]')
      .click('i[class="ion-edit ion-icon"]')
      .pause(1000)
      .assert.elementPresent('input[name=name]')
      .assert.elementPresent('input[name=purpose]')
      .assert.elementPresent('textarea[name=note]')
      .assert.elementPresent('div[aria-label="Mon Jul 30 2018"]')
      .assert.elementPresent('div[aria-label="Tue Jul 31 2018"]')
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'Fisherman\'s Meetup')
      .pause(1000)
      .clearValue('input[name=purpose]')
      .setValue('input[name=purpose]', 'Comming together to achieve common goal.')
      .pause(1000)
      .clearValue('textarea[name=note]')
      .setValue('textarea[name=note]', 'This will be the first ever meetup for us')
      .pause(1000)
      .click('div[aria-label="Sat Jul 28 2018"]')
      .pause(2000)
      .click('#cancel-btn')
      .pause(2000)
  },
  "User should be able to delete his/booked center": browser => {
    browser
      .waitForElementVisible('body', 2000)
      .assert.elementPresent('#event-link')
      .click('#event-link')
      .pause(1000)
      .assert.elementPresent('#view-link')
      .click('#view-link')
      .pause(1000)
      .waitForElementVisible('#event-list', 2000)
      .assert.elementPresent('#event-list')
      .assert.elementPresent('i[class=ion-trash-a]')
      .click('i[class=ion-trash-a]')
      .pause(2000)
      .assert.elementPresent('#close-button')
      .click('#close-button')
      .pause(2000)
      .end()
  }
}