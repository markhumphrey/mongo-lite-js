"use strict";

//var IDBStore = require("idb-wrapper");

var Store = function(dbName, options) {
  this.dbName = dbName;
  this.cols = {};
};

Store.prototype.open = function(callback) {
  this.cols = {};
  callback(null, this);
};

Store.prototype.close = function(force, callback) {
  this.cols = {};
  callback(null, this);
};

Store.prototype.collection = function(name, options, callback) {
  if (!(name in this.cols))
    callback(new Error("collection " + name + " does not exist"), null);

  callback(null, this.cols[name]);
};

Store.prototype.collections = function(callback) {
  var colsArray = Object.keys(this.cols).map(function(key) {
    return this.cols[key];
  }, this);
  callback(null, colsArray);
};

Store.prototype.createCollection = function(name, options, callback) {
  //var col = new Collection();
  var meta = {
    name: name,
    count: 0,
    store: this
  };
  this.cols[name] = [];
  callback(null, meta);
};

Store.prototype.dropCollection = function(name, callback) {
  delete this.cols[name];
  callback(null, {});
};

Store.prototype.dropDatabase = function(callback) {
  this.cols = [];
  callback(null, {});
};

Store.prototype.findDocuments = function(meta, filter, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.deleteDocuments = function(meta, filter, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.insertDocuments = function(meta, docs, options, callback) {
  docs = Array.isArray(docs) ? docs : [docs];
  var collection = this.cols[meta.name];
  Array.prototype.push.apply(collection, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.updateDocuments = function(meta, query, document, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.findDocuments = function(meta, filter, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.oneDocument = function(meta, index, filter, options, callback) {
  var collection = this.cols[meta.name];
  var doc = collection[index];
  callback(null, doc);
};

Store.prototype.allDocuments = function(meta, filter, options, callback) {
  var collection = this.cols[meta.name];
  callback(null, collection.slice(0));
};

module.exports = Store;
