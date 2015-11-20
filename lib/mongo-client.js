"use strict";

var MemoryDb = require("./memory-db/db");

var MongoClient = function(dbName, options) {
  this.dbName = dbName || "";
  this.storageEngine = {};
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
  if (callback === null)
    throw new Error("no callback function provided");

  var db = new MemoryDb();
  var error = null;
  callback(error, db);
};

module.exports = MongoClient;
