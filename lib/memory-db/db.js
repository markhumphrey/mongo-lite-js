"use strict";

var Collection = require("./collection");

var Db = function(dbName, store, options) {
  this.dbName = dbName;
  this.store = store;
};

Db.prototype.collection = function(name, options, callback) {
  if (typeof options == 'function') callback = options;
  options = {};
  options = options || {};

  this.store.collection(name, options, function(error, result) {
    var collection = null;
    if (result) {
      collection = new Collection(result);
    }
    callback(error, collection);
  });
};

Db.prototype.collections = function(callback) {
  this.store.collections(function(error, results) {
    var collections = results.map(function(elem) {
      return new Collection(elem);
    });
    callback(error, collections);
  });
};

Db.prototype.createCollection = function(name, options, callback) {
  if (typeof options == 'function') callback = options;
  options = {};
  options = options || {};

  this.store.createCollection(name, options, function(error, result) {
    var collection = null;
    if (result) {
      collection = new Collection(result);
    }
    callback(error, collection);
  });
};

Db.prototype.dropCollection = function(name, callback) {
  this.store.dropCollection(name, function(error, result) {
    callback(error, result);
  });
};

Db.prototype.dropDatabase = function(callback) {
  this.store.dropDatabase(function(error, result) {
    callback(error, result);
  });
};

Db.prototype.open = function(callback) {
  this.store.open(function(error, result) {
    callback(error, result);
  });
};

Db.prototype.close = function(force, callback) {
  if (typeof force == 'function') callback = force;
  force = {};
  force = force || {};

  this.store.close(force, function(error, result) {
    callback(error, result);
  });
};

module.exports = Db;
