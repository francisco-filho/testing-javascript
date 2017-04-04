describe('Nightwatch tests using Mocha', () => {
  after((browser, done)=> {
    browser.end(() => done())
  })

  it('Index', (browser) => {
    browser.page.local()
      .navigate()
      .waitForElementVisible("@select", 1000)
      .assert.title("Title")
      .assert.visible("@header")
  })

  it('<Select />', (browser) => {
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
  })

  it('<Noticia/>', (browser) => {
    browser
      .url("http://localhost:8081/public/index.html")
      .waitForElementVisible(".news:nth-child(1)", 500)
      .assert.visible(".news>img")
  })
})