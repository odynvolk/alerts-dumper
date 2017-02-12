"use strict";

const nock = require("nock");
const path = require("path");

const alertsDumper = require("../lib/alertsDumper");

Feature("index", () => {

  Scenario("Fetch RSS from source and extract links", () => {
    let links;

    Given("There is a RSS feed to consume", () => {
      nock("http://something.com")
        .get("/some-path")
        .replyWithFile(200, path.join(__dirname, "/../test/data/google_alerts.xml"));
    });

    When("Consuming feed", (done) => {
      alertsDumper(["http://something.com/some-path"]).then((resp) => {
        links = resp;
        done();
      });
    });

    Then("We should have 3 links", () => {
      links.length.should.eql(3);
    });

    And("First link should be correct", () => {
      links[0].should.eql("https://themerkle.com/what-is-mimblewimble/");
    });
  });
});
