"use strict";

const config = require("exp-config");
const fs = require("fs");
const itermTitle = require("iterm-title");
const scheduler = require("bella-scheduler");
const vo = require("vo");

const alertsDumper = require("../alertsDumper");

const urls = new Set();

vo([setupApp])((err) => {
  if (err) throw err;
});

function* setupApp() {
  itermTitle("Alerts Dumper");
  console.log("Starting Alerts Dumper!");

  scheduler.every(config.repeatInterval, vo([run]));
}

function* run() {
  console.log("Running", new Date());
  const fetchedUrls = yield alertsDumper(config.feeds);
  fetchedUrls.forEach((foundUrl) => {
    urls.add(foundUrl);
  });

  saveUrls(Array.from(urls));
}

function saveUrls(urlsToSave) {
  console.log(`Saving ${urlsToSave.length} URLs!`);
  fs.writeFileSync(config.saveUrls, urlsToSave.join("\n"));
}

module.exports = setupApp;
