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
  var col = {
    name: name,
    store: this
  };
  this.cols[name] = col;
  callback(null, col);
};

Store.prototype.dropCollection = function(name, callback) {
  delete this.cols[name];
  callback(null, {});
};

Store.prototype.dropDatabase = function(callback) {
  this.cols = [];
  callback(null, {});
};

Store.prototype.findDocuments = function(self, filter, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.deleteDocuments = function(self, filter, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.insertDocuments = function(self, docs, options, callback) {
  docs = Array.isArray(docs) ? docs : [docs];

  Array.prototype.push.apply(self.documents, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Store.prototype.updateDocuments = function(self, query, document, options, callback) {
  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

module.exports = Store;
