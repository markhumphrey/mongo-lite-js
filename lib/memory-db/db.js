"use strict";

var IDBStore = require("idb-wrapper");
var Collection = require("./collection");

var Db = function(dbName, options) {
  this.dbName = dbName;
  this.cols = {};
};

Db.prototype.collection = function(name, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (!(name in this.cols))
    callback(new Error("collection " + name  + " does not exist"), null);

  callback(null, this.cols[name]);
};

Db.prototype.collections = function(callback) {
  callback(null, this.cols);
};

Db.prototype.createCollection = function(name, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  var col = new Collection();
  this.cols[name] = col;
  callback(null, col);
};

Db.prototype.dropCollection = function(name, callback) {
  delete this.cols[name];
  callback(null, {});
};

Db.prototype.dropDatabase = function(callback) {
  this.cols = [];
  callback(null, {});
};

Db.prototype.open = function(callback) {
  this.cols = {};
  callback(null, this);
};

Db.prototype.close = function(force, callback) {
  if(typeof force == 'function') callback = force; force = {};
  force = force || {};

  this.cols = {};
  callback(null, this);
};

module.exports = Db;
