"use strict";

var IDBStore = require("idb-wrapper");
var Collection = require("./collection");

var Db = function(dbName, options) {
  this.dbName = dbName;
  this.collections = {};
};

Db.prototype.collection = function(name, options, callback) {
  var error = null;
  callback(error, this.collections[name]);
};

Db.prototype.collections = function(callback) {
  var error = null;
  callback(error, this.collections);
};

Db.prototype.createCollection = function(name) {
  this.collections[name] = new Collection();
};

Db.prototype.dropCollection = function(name) {
  delete this.collections[name];
};

Db.prototype.open = function() {
  this.collections = {}
};

module.exports = Db;
