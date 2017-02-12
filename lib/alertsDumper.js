"use strict";

const feedparser = require("feedparser-promised");

const linkExtractor = require("./linkExtractor");

function index(rsss) {
  const fetches = rsss.map((rss) => {
    return fetch(rss);
  });

  return Promise.all(fetches).then((results) => {
    return [].concat.apply([], results);
  });
}

function fetch(rss) {
  return feedparser.parse(rss).then((items) => {
    return items.map((item) => {
      return linkExtractor(item);
    });
  }).catch((error) => {
    console.log("error: ", error);
  });
}

module.exports = index;
