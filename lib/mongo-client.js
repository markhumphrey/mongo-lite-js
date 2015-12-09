"use strict";

var Db = require("./db");
var MemoryStore = require("./memory-db/store");
var IndexedDBStore = require("./indexed-db/store");

var MongoClient = function() {
  var that = this;
  var secret = 3;

  var secretMethod = function() {
    return secret;
  };

  this.privMethod = function() {
    return secret;
  };

};

MongoClient.prototype.connect = function(url, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (callback === null)
    throw new Error("no callback function provided");

  var store;
  options.store = options.store || "";
  switch (options.store.toLowerCase()) {
    case "indexed-db":
      store = new IndexedDBStore();
      break;
    case "memory":
      store = new MemoryStore();
      break;
    default:
      store = new MemoryStore();
  }

  var db = new Db(url, store);
  var error = null;
  callback(error, db);
};

module.exports = MongoClient;
