"use strict";

var Db = require("./db");
var MemoryStore = require("./memory-db/store");
var IndexedStore = require("./indexed-db/store");

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
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};
  
  if (callback === null)
    throw new Error("no callback function provided");

  var db = new Db("test", new MemoryStore());
  var error = null;
  callback(error, db);
};

module.exports = MongoClient;
