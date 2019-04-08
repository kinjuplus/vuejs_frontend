module.exports = {
    'click menu': browser => {
      browser
        .url(process.env.VUE_DEV_SERVER_URL)
        .waitForElementVisible('#app', 1000)
        .assert.elementPresent('#body')
        .moveToElement("#queryParentMenu", 1, 1, function(result) {
          browser.isVisible("a[rel='queryCustomer']", function(result2) {
                this.assert.equal(result2.value,true);
          });
        }) 
        .click("a[rel='queryCustomer']")
        .pause(2000)
        .assert.containsText('th','編號')
        .end();
    }
  }