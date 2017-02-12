"use strict";

const regex = /url=(.*)&ct/;

function extract(item) {
  const matched = regex.exec(item.link);
  if (matched) return matched[1];
  return item.link;
}

module.exports = extract;
