"use strict";

var IDBStore = require("idb-wrapper");
var Collection = require("./collection");

var Db = function(dbName, options) {
  this.dbName = dbName;
  this.collections = {};
};

Db.prototype.collection = function(name, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (!(name in this.collections))
    callback(new Error("collection " + name  + " does not exist"), null);

  callback(null, this.collections[name]);
};

Db.prototype.collections = function(callback) {
  callback(null, this.collections);
};

Db.prototype.createCollection = function(name, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  var col = new Collection();
  this.collections[name] = col;
  callback(null, col);
};

Db.prototype.dropCollection = function(name, callback) {
  delete this.collections[name];
  callback(null, {});
};

Db.prototype.dropDatabase = function(callback) {
  this.collections = [];
  callback(null, {});
};

Db.prototype.open = function(callback) {
  this.collections = {};
  callback(null, this);
};

Db.prototype.close = function(force, callback) {
  if(typeof force == 'function') callback = force; force = {};
  force = force || {};

  this.collections = {};
  callback(null, this);
};

module.exports = Db;
