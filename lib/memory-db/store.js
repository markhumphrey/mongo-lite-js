"use strict";

var IDBStore = require("idb-wrapper");

var Store = function(dbName, options) {
  this.dbName = dbName;
  this.collections = {};
};

Store.prototype.collection = function(name, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (!(name in this.collections))
    callback(new Error("collection " + name  + " does not exist"), null);

  callback(null, this.collections[name]);
};

Store.prototype.collections = function(callback) {
  var error = null;
  callback(error, this.collections);
};

Store.prototype.createCollection = function(name) {
  this.collections[name] = new Collection();
};

Store.prototype.dropCollection = function(name) {
  delete this.collections[name];
};

Store.prototype.open = function() {
  this.collections = {};
};

module.exports = Store;
