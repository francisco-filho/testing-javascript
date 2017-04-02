module.exports = {
  'after': (browser) => {
    browser.end()
  },
  'Index' : (browser) => {
    browser
      .url("http://localhost:8081/public/index.html")
      .waitForElementVisible("div.select", 1000)
      .assert.title("Title")
      .assert.visible("h1")
  },
  '<Select />': (browser) => {
    browser
      .url("http://localhost:8081/public/index.html")
      .waitForElementVisible("div.select", 1000)
      .click("div.select")
      .waitForElementVisible("div.select li:nth-child(2)", 1000)
      .click("div.select li:nth-child(2)")
      .assert.containsText("div.select", "SEGUNDO")
      .click("div.select")
      .click("div.select li:last-of-type")
      .assert.containsText("div.select", "QUINTO")
  },
  '<Noticia/>': (browser) => {
    browser
      .url("http://localhost:8081/public/index.html")
      .waitForElementVisible(".news:nth-child(1)", 500)
      .assert.visible(".news>img")
  }
}