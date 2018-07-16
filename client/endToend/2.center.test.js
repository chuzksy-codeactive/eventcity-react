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
      .setValue("#sigin-name", "chuzksy")
      .pause(1000)
      .setValue("#sigin-password", "password")
      .click("#sigin-button")
      .pause(1000)
      .assert.urlEquals(`${APP_BASE_URL}/centers`)
      .pause(1000)
  },
  "Admin should be able to add a new center": browser => {
    browser
      .assert.elementPresent('#admin-link')
      .click("#admin-link")
      .pause(1000)
      .assert.elementPresent('#add-center')
      .click('span[id=add-center]')
      .pause(1000)
      .waitForElementVisible('#center-form', 2000)
      .assert.elementPresent('input[name=name]')
      .assert.elementPresent('input[name=capacity]')
      .assert.elementPresent('input[name=location]')
      .assert.elementPresent('input[name=price]')
      .assert.elementPresent('textarea[name=facilities]')
      .assert.elementPresent('option[value=Theatre]')
      .setValue('input[name=name]', faker.company.companyName())
      .setValue('input[name=capacity]', 2000)
      .setValue('input[name=location]', faker.address.streetName())
      .setValue('input[name=price]', 200000)
      .setValue('textarea[name=facilities]', faker.random.words())
      .click('#hall')
      .setValue('#file-image', path.resolve('/Users/andeladeveloper/Documents/andela_projects/eventcity/server/sample.jpg'))
      .pause(1000)
      .click('button[type=submit]')
      .pause(5000)
  },
  "Admin should be able to edit center": browser => {
    browser
      .assert.urlEquals(`${APP_BASE_URL}/centers/list`)
      .pause(2000)
      .assert.elementPresent('.list-wrapper')
      .assert.elementPresent('#ion-edit')
      .getAttribute('#ion-edit', 'href', function (result) {
        urlPath = result.value;
        this.click('#ion-edit')
        this.pause(2000)
        this.waitForElementVisible('#form', 2000)
        this.assert.elementPresent('input[name=name]')
        this.assert.elementPresent('input[name=capacity]')
        this.assert.elementPresent('input[name=location]')
        this.assert.elementPresent('input[name=price]')
        this.assert.elementPresent('textarea[name=facilities]')
        this.assert.elementPresent('option[value=Theatre]')
        this.clearValue('input[name=name]')
        this.clearValue('input[name=capacity]')
        this.clearValue('input[name=location]')
        this.clearValue('input[name=price]')
        this.clearValue('textarea[name=facilities]')
        this.setValue('input[name=name]', faker.company.companyName())
        this.setValue('input[name=capacity]', 2000)
        this.setValue('input[name=location]', faker.address.streetName())
        this.setValue('input[name=price]', 200000)
        this.setValue('textarea[name=facilities]', faker.random.words())
        this.click('#hall')
        this.pause(1000)
        this.setValue('#file-image', path.resolve('/Users/andeladeveloper/Documents/andela_projects/eventcity/server/sample.jpg'))
        this.pause(1000)
        this.click('#edit-center')
        this.pause(3000)
      })

  },
  "Admin should be able to delete a center": browser => {
    browser
      .waitForElementVisible('body', 2000)
      .waitForElementVisible('.list-wrapper', 2000)
      .assert.urlEquals(`${APP_BASE_URL}/centers/list`)
      .pause(2000)
      .assert.elementPresent('.list-wrapper')
      .assert.elementPresent('#trash')
      .click('#trash')
      .waitForElementVisible('#modal-footer', 2000)
      .pause(100)
      .assert.elementPresent('#cancel')
      .waitForElementVisible('#cancel',2000)
      .click('#cancel')
      .pause(5000)
      .end();
  }
}