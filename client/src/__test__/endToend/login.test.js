const APP_BASE_URL = "http://localhost:8090";

module.exports = {
  "beforeEach": function (browser, done) {
    browser.resizeWindow(1480, 1480, done);
  },
  "User should be able to login into the app": browser => {
    browser
      .url(APP_BASE_URL)
      .waitForElementVisible("body", 5000)
      .assert.urlEquals(`${APP_BASE_URL}/`)
      .pause(2000)
      .assert.visible(".video-content")
      .waitForElementVisible("#login", 1000)
      .click("#login")
      .pause(1000)
      .setValue("#sigin-name", "chikason")
      .pause(500)
      .setValue("#sigin-password", "password")
      .click("#sigin-button")
      .pause(2000)
      .end()
  }
}