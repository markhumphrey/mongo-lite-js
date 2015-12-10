"use strict";

//var IDBStore = require("idb-wrapper");
var Dexie = require("dexie");

var Store = function(dbName, options) {
  this.dbName = dbName;
  this.db = new Dexie(this.dbName);
};

Store.prototype.open = function(callback) {
  this.db.open();
  callback(null, this);
};

Store.prototype.close = function(force, callback) {
  this.db.close();
  callback(null, this);
};

Store.prototype.collection = function(name, options, callback) {
  if (!(name in this.db))
    callback(new Error("collection " + name + " does not exist"), null);

  callback(null, this.db[name]);
};

Store.prototype.collections = function(callback) {
  var colsArray = Object.keys(this.cols).map(function(key) {
    return this.cols[key];
  }, this);
  callback(null, colsArray);
};

Store.prototype.createCollection = function(name, options, callback) {
  var meta = {
    name: name,
    store: this
  };
  //this.cols[name] = [];
  this.db.close()
  this.db.version(1).stores({ name : '_id'});
  this.db.open();
  callback(null, meta);
};

Store.prototype.dropCollection = function(name, callback) {
  //delete this.cols[name];
  this.db.close();
  this.db.version(1).stores({ name : null });
  this.db.open();
  callback(null, {});
};

Store.prototype.dropDatabase = function(callback) {
  this.cols = [];
  callback(null, {});
};

var matchDocument = function(doc, filter) {
  // empty query matches all documents
  if (Object.keys(filter).length === 0) {
    return true;
  }
  // match each field against document
  for (var field in filter) {
    var value = filter[field];
    if (field in doc && doc[field] === value)
      return true;
  }
  return false;
};

Store.prototype.findDocuments = function(meta, filter, options, callback) {
  var docs = [];
  var collection = this.cols[meta.name];

  // match query against each document
  docs = collection.filter(function(doc) {
    return matchDocument(doc, filter);
  });

  callback(null, docs);
};

Store.prototype.deleteDocuments = function(meta, filter, options, callback) {
  var collection = this.cols[meta.name];

  // match query against each document
  var docs = collection.filter(function(doc) {
    return !matchDocument(doc, filter);
  });

  this.cols[meta.name] = docs;
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

  var result = {}; // TODO: populate result object
  callback(null, result);
};

module.exports = Store;
