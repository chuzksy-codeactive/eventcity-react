const faker = require('faker');
const APP_BASE_URL = "http://localhost:8090";


module.exports = {
  "beforeEach": function (browser, done) {
    browser.maximizeWindow(done);
  },
  "User signing up": browser => {
    browser
      .url(APP_BASE_URL)
      .waitForElementVisible("body", 2000)
      .assert.urlEquals(`${APP_BASE_URL}/`)
      .pause(2000)
      .assert.visible(".video-content")
      .pause(1000)
      .waitForElementVisible(".video-content", 1000)
      .assert.elementPresent(".form-container")
      .assert.elementPresent('input[name=username]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=firstname]')
      .assert.elementPresent('input[name=lastname]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=confirmPassword]')
      .setValue('input[name=username]', faker.name.findName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=firstname]', faker.name.firstName())
      .setValue('input[name=lastname]', faker.name.lastName())
      .setValue('input[name=password]', 'password')
      .setValue('input[name=confirmPassword]', 'password')
      .pause(1000)
      .click('#btn-signup')
      .pause(5000)
  },
  "User signing out of the app": browser => {
    browser
      .waitForElementVisible("body", 1000)
      .assert.elementPresent("#username_link")
      .click("#username_link")
      .pause(1000)
      .click("#username_sign_out")
      .pause(1000)
  },
  "User should not be able to sign in with wrong password": browser => {
    browser
      .setValue("#sigin-name", "chikason")
      .pause(1000)
      .clearValue("#sigin-password")
      .setValue("#sigin-password", "passwodr")
      .pause(1000)
      .click("#sigin-button")
      .waitForElementVisible("#submitting", 1000)
      .assert.containsText("#submitting", "Wrong password")
  },
  "User should be able to log in as Admin": browser => {
    browser
      .pause(2000)
      .clearValue("#sigin-name")
      .clearValue("#sigin-password")
      .pause(1000)
      .setValue("#sigin-name", "chuzksy")
      .pause(1000)
      .setValue("#sigin-password", "password")
      .click("#sigin-button")
      .pause(2000)
      .assert.urlEquals(`${APP_BASE_URL}/centers`)
      .pause(5000)
      .end();
  },
}